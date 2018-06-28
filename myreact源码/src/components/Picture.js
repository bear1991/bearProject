require('styles/Picture.css');

import React from 'react';

import axios from 'axios';
import fn from '../common/js/fn';


// 筛选请求类型type
const filterPage = (typeVal) => {
    switch(typeVal){
        case 0:
           return 'totle';
        case 10:
            return 'picture';
        case 29:
            return 'text';
        case 31:
            return 'audio';
        case 41:
            return 'video';
        default:
            return 'totle';
    }
}


// 公共请求资源方法
const requestData = (This,typeVal,ctypeVal,pageVal) => {
    var pageAttr = filterPage(typeVal);
    
    var url = fn.urlData.picture,
        options = fn.options,
        params = {};
		options.page = pageVal;
    if(typeVal){
        options.type = typeVal;
        params = options;
    }else{
        for(let key in options){
            if(key !== 'type'){
                params[key] = options[key]
            }
        }
    }
    // console.log(params);
    axios.get(url, {
        params: params
    })
    .then((res) => {
        // console.log(res);
        if(res.data.showapi_res_code == 0){
            // console.log(typeVal,ctypeVal);
            /*
            // 显示累加数据
            if(typeVal == ctypeVal){     // 获取新数据追加显示
                var dataCont = [...This.state.dataCont,...res.data.showapi_res_body.pagebean.contentlist];
            }else{
                // 切换回之前的分类时，本例只能根据当前分类在state/page中对应值获取默认数量的数据显示
                // 如果需要显示之前已经累加的数据，代码需要改造
                var dataCont = res.data.showapi_res_body.pagebean.contentlist;
            }
            */
            
            // 显示翻新数据
            var dataCont = res.data.showapi_res_body.pagebean.contentlist;

            var pageCont = This.state.page;
            var page = {};
            for(let key in pageCont){
                if(key != pageAttr){
                    page[key] = pageCont[key];
                }else{
                    page[pageAttr] = pageVal;
                }
            }

            This.setState({
                ctype: typeVal==0?'':typeVal,
                type: typeVal==0?'':typeVal,
                nctype: ctypeVal=0?'':ctypeVal,
                page: page,
                dataCont: dataCont
            });
            // console.log(This.state.page);
            console.log(dataCont);
        }
    })
}


// 底部头像/作者/创建时间组件
class PicntComponent extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<ul className='picnt'>
            <li><img src={this.props.infor.imgurl} /></li>
            <li>
                <div>{this.props.infor.name}</div>
                <div>{this.props.infor.ctime}</div>
            </li>
        </ul>)
    }
}

// 每项内容组件
class PicDetailComponent extends React.Component{
    constructor(props){
        super(props);
        this.scrollBack = this.scrollBack.bind(this);
    }
    
    // 设置在切换分类或单页数据显示方式时，内容区域回到顶部
    scrollBack(){
        // console.log(this.refs.content.scrollTop);
        //this.refs.content.scrollTop = 0;
        var scrollTop = this.refs.content.scrollTop;
        var timer = setInterval(() => {
            scrollTop *= 0.1;
            this.refs.content.scrollTop = scrollTop
            if(scrollTop<1){
                clearInterval(timer);
            }
        },200);
    }
    
    render(){
        // console.log(this.props);
        if(this.props.typeVal !== this.props.nctypeVal){
            // console.log(this.refs.content);
            this.scrollBack();    // 切换分类时内容区域回到顶部
        }
        return (<div className='picList' ref='content'>
            {
                this.props.dataCont.map(function(item,index) {
                    // console.log(item.type)
                    var infor = {
                        imgurl: item.profile_image,
                        name: item.name,
                        ctime: item.create_time
                    }
                    if(item.type == 10){
                        return <div key={index}>
                            <PicntComponent infor={infor}/>
                            <ul className='cont picCont'>
                                <li>
                                    <div>赞 {item.love}</div>
                                    <div>踩 {item.hate}</div>
                                </li>
                                <li>
                                    <a href={item.weixin_url}>{item.text}</a>
                                </li>
                                <li>
                                    <img src={item.image0} />
                                </li>
                            </ul>
                        </div>
                    }else if(item.type == 29){
                        return <div key={index}>
                            <PicntComponent  infor={infor}/>
                            <ul className='cont textCont'>
                                <li>
                                    <div>赞 {item.love}</div>
                                    <div>踩 {item.hate}</div>
                                </li>
                                <li>
                                    <a href={item.weixin_url}>{item.text}</a>
                                </li>
                            </ul>
                        </div>
                    }else if(item.type == 31){
                        if(item.voice_uri && item.voice_uri != ''){
                            return <div key={index}>
                                <PicntComponent  infor={infor}/>
                                <ul className='cont voiceCont'>
                                    <li>
                                        <div>赞 {item.love}</div>
                                        <div>踩 {item.hate}</div>
                                    </li>
                                    <li>
                                        <a href={item.weixin_url}>{item.text}</a>
                                    </li>
                                    <li>
                                        <img src={item.image3} />
                                        <audio controls='controls'>
                                            <source src={item.voice_uri} type='audio/mpeg' />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </li>
                                </ul>
                            </div>
                        }
                    }else if(item.type == 41){
                        return <div key={index}>
                            <PicntComponent  infor={infor}/>
                            <ul className='cont videoCont'>
                                <li>
                                    <div>赞 {item.love}</div>
                                    <div>踩 {item.hate}</div>
                                </li>
                                <li>
                                    <a href={item.weixin_url}>{item.text}</a>
                                </li>
                                <li>
                                    <video controls="controls" controls="controls">
                                        <source src={item.video_uri} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </li>
                            </ul>
                        </div>
                    }
                })
            }
            <div className='more'>
                <span onClick={() => {
                    this.props.clickEvent();
                    this.scrollBack();   // 显示新页数据时内容区域回到顶部
                }}>点击查看更多</span>
            </div>
        </div>)
    }
}


// 百思不得姐最外层组件
class PictureComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ctype: 0,    // 用来判断是否是分类切换还是点击加载更多
            type: 0,    // 保存当前分类  10：图片  29：段子  31：声音  41：视频
            nctype: 0,   // 用来判断当前是否是分类之间切换
            page: {
                totle: 1,
                picture: 1,
                text: 1,
                audio: 1,
                video: 1
            },
            dataCont: []
        };
        this.changeType = this.changeType.bind(this)
        this.increasePage = this.increasePage.bind(this)

        // requestData(this,this.state.type);
        requestData(this,this.state.type,this.state.ctype,this.state.page.totle);
    }

    // 切换信息类型
    changeType(typeVal,ctypeVal,val){
        // console.log(typeVal);
        for(let key in this.refs){
            if(key == 'type'+val){
                this.refs[key].className = 'active';
            }else{
                this.refs[key].className = '';
            }
        }

        var pageAttr = filterPage(typeVal);
        requestData(this,typeVal,ctypeVal,this.state.page[pageAttr]);
    }

    // 查看更多数据
    increasePage(typeVal){
        var pageAttr = filterPage(typeVal),
            pageVal = this.state.page[pageAttr] + 1;
        // console.log(pageAttr,pageVal);
        requestData(this,typeVal,typeVal,pageVal);
    }

    render(){
        return(
            <div>
                <ul className='filterType'>
                    <li ref='type1' className='active' onClick={() => {this.changeType('',this.state.ctype,1)}}>全部</li>
                    <li ref='type2' onClick={() => {this.changeType(10,this.state.ctype,2)}}>图片</li>
                    <li ref='type3' onClick={() => {this.changeType(29,this.state.ctype,3)}}>段子</li>
                    <li ref='type4' onClick={() => {this.changeType(31,this.state.ctype,4)}}>声音</li>
                    <li ref='type5' onClick={() => {this.changeType(41,this.state.ctype,5)}}>视频</li>
                </ul>
                <PicDetailComponent
                    dataCont={this.state.dataCont}
                    clickEvent={() => {this.increasePage(this.state.type)}}
                    typeVal={this.state.type}
                    nctypeVal={this.state.nctype}
                />
            </div>
        )
    }
}

// 本例点击加载更多是显示下一页数据，而不是累加数据显示
export default PictureComponent;