require('styles/News.css');

import React from 'react';

import axios from 'axios';
import fn from '../common/js/fn';

// 公共请求资源数据方法
const requestData = (This, page) => {
    var url = fn.urlData.news,
        options = fn.options;
    options.num = 10;
    options.page = page;
    axios.get(url, {
        params: options
    })
    .then((res) => {
        if(res.data.showapi_res_code == 0){
            var dataCont = [...This.state.dataCont,...res.data.showapi_res_body.newslist];
            This.setState({
                dataCont: dataCont
            });
        }
    })
}

class NewsComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            dataCont: []
        }
        this.increasePage = this.increasePage.bind(this);
        requestData(this,this.state.page);
    }

    // 请求新数据
    increasePage(){
        var page = this.state.page + 1;
        requestData(this,page);
    }

    render(){
        return (<div>
                {
                    this.state.dataCont.map(function(item,index) {
                        return (
                            <a className='newsTitle' href={item.url} key={index}>
                                <ul className='newsList'>
                                    <li>
                                        <p>{item.title}</p>
                                        <ul>
                                            <li>{item.description}</li>
                                            <li>{item.ctime}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <img src={item.picUrl} />
                                    </li>
                                </ul>
                            </a>
                        )
                    })
                }
                <div className='more'>
                    <span onClick={this.increasePage}>点击查看更多</span>
                </div>
        </div>)
    }
}

export default NewsComponent;