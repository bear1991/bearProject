// pages/moment/moment.js

const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkIpUpload: '',       // 保存网络地址

    pageIndex: 1,     // 保存话题列表当前页
    topicListData: [],    // 保存话题列表数据

    addMomentStatus: true,     // 保存追加评论弹窗显示状态

    topicId: 0,     // 保存当前追加的评论所属话题id
    momentData: '',   // 保存追加的评论内容

    picShow: true,      // 保存话题图片展示状态

    picUrl: '',    // 保存单张图片预览时图片地址

    pictureListData: {     // 保存展示的话题图片列表
      current: 0,
      pictureList: []
    }    
  },

  toDetail:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: '../userdetail/userdetail?userid=' + this.data.topicListData[index].uid,
    })
  },

  // 事件处理函数
  // 加载更多话题
  momentListMore: function(e){
    // console.log(e);
    var pageIndex = this.data.pageIndex;
    this.setData({
      pageIndex: ++pageIndex
    });
    this.momentList(pageIndex);
  },

  // 查看话题大图
  showCatchtap: function(e){
    // console.log(e);
    
    // 单张图片预览
    var picUrl = e.currentTarget.dataset.url;
    this.setData({
      picShow: false,
      picUrl
    });

    /*
    // 多张图片轮播预览
    var currentIndex = e.currentTarget.dataset.index;
    var picList = e.currentTarget.dataset.list;
    var picType = ['jpg', 'gif', 'png', 'JPEG'];
    var pictureListData = {
      current: 0,
      pictureList: []
    };
    var num = 0;
    picList.forEach((item, index) => {
      // console.log(item.url,index);
      if (picType.indexOf(item.url.substring(item.url.lastIndexOf('.') + 1)) != -1) {
        if (index == currentIndex) {
          pictureListData.current = num;
        }
        pictureListData.pictureList.push(item.url);
        num++;
      }
    });
    // console.log(pictureListData);
    this.setData({
      picShow: false,
      pictureListData
    });
    */
  },

  // 隐藏话题大图
  hideCatchtap: function(e){
    console.log(e);
    this.setData({
      picShow: true
    });
  },


  // 点赞(like)/取消点赞(unlike)话题
  supportCatchtap: function(e){
    console.log(e);
    // console.log(app.globalData.userInfo.uid);
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      var indexId = e.currentTarget.dataset.index;
      var islike = e.currentTarget.dataset.islike;
      wx.request({
        url: app.globalData.linkIp + (islike ? 'unlikeSof.do' : 'likeSof.do'),
        method: 'POST',
        data: util.getJsonData({
          'id': indexId,
          'userid': app.globalData.userInfo.uid
        }),
        success: res => {
          console.log(res);
          if(res.data.success){
            var topicListData = this.data.topicListData;
            topicListData.forEach((item,index) => {
              if(item.id == indexId){
                item.islike = 1-islike;
                if(islike){
                  var azLikes = [];
                  item.azLikes.forEach((value,list) => {
                    if (value.uid !== app.globalData.userInfo.uid){
                      azLikes.push(value);
                    }
                  });
                  item.azLikes = azLikes;
                }else{
                  item.azLikes.push({
                    uid: app.globalData.userInfo.uid,
                    user_nicename: app.globalData.userInfo.nickName
                  });
                } 
              }
            });
            console.log(topicListData);
            this.setData({
              topicListData
            });
          }else{
            util.showInfo(res.data.msg);
          }
        }
      })
    }
  },

  // 追加评论
  addCommentCatchtap: function(e){
    // console.log(e);
    this.setData({
      topicId: e.currentTarget.dataset.index
    });
    this.momentShowHide();
  },

  // 退出追加评论
  removeMaskCatchtap: function(e){
    // console.log(e);
    this.momentShowHide();
  },

  // 点击追加评论输入框阻止冒泡
  bubbleCatchtap: function(e){
    // console.log(e);
  },

  // 保存追加评论内容
  contCatchtap: function(e){
    // console.log(e);
    this.setData({
      momentData: e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
    });
  },

  // 提交追加评论内容 
  finishBindconfirm: function(e){
    console.log(e);
    // console.log(this.data.topicId);
    // console.log(this.data.momentData);

    wx.request({
      url: app.globalData.linkIp + 'addSofReply.do',
      method: 'POST',
      data: util.getJsonData({
        'sofid': this.data.topicId,
        'userid': app.globalData.userInfo.uid,
        'content': this.data.momentData
      }),
      success: res => {
        console.log(res);
        if(res.data.success){   // res.data.replyid   返回评论id
          this.momentShowHide();
          var topicListData = this.data.topicListData;
          topicListData.forEach((item,index) => {
            if (item.id == this.data.topicId){
              item.azReplyList.push({
                id: res.data.replyid,
                user_nicename: app.globalData.userInfo.nickName,
                content: this.data.momentData
              });
            }
          });
          this.setData({
            topicListData
          });
        }else{
          util.showInfo(res.data.msg);
        }
      }
    })
  },

  // 跳转评论发布页面
  publishCatchtap: function(e){
    console.log(e);
    wx.navigateTo({
      url: '../publish/publish'
    })
  },

  // 公共函数
  // 弹窗显示隐藏
  momentShowHide: function(){
    var addMomentStatus = this.data.addMomentStatus;
    this.setData({
      addMomentStatus: !addMomentStatus
    });
  },

  // 获取话题列表数据
  momentList: function(pageIndex){
    // console.log(pageIndex);
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.linkIp + 'getSofList.do',
      method: 'POST',
      data: util.getJsonData({
        'pageIndex': pageIndex,
        'userid': app.globalData.userInfo.uid
      }),
      success: res => {
        console.log(res);
        if (res.data.success) {
          if(res.data.data.length){
            var topicListData = this.data.topicListData;
            topicListData.push(...res.data.data);
            console.log(topicListData);

            topicListData.forEach((item, index) => {
              item.create_time1 = util.formatCommentTime(item.create_time);

              // 解析富文本内容
              /**
              * WxParse.wxParse(bindName , type, data, target,imagePadding)
              * 1.bindName绑定的数据名(必填)
              * 2.type可以为html或者md(必填)
              * 3.data为传入的具体数据(必填)
              * 4.target为Page对象,一般为this(必填)
              * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
              */
              WxParse.wxParse('article', 'html', item.content, this, 20);
              //配置小表情emojis
              WxParse.emojisInit('[]', "../../wxParse/emojis/", {
                "00": "00.gif",
                "01": "01.gif",
                "02": "02.gif",
                "03": "03.gif",
                "04": "04.gif",
                "05": "05.gif",
                "06": "06.gif",
                "07": "07.gif",
                "08": "08.gif",
                "09": "09.gif",
                "09": "09.gif",
                "10": "10.gif",
                "11": "100.gif",
                "12": "101.gif",
                "13": "102.gif",
                "14": "103.gif",
                "15": "104.gif",
                "16": "105.gif",
                "17": "106.gif",
                "18": "107.gif",
                "19": "108.gif",
                "20": "109.gif",
                "21": "11.gif",
                "22": "110.gif",
                "23": "111.gif",
                "24": "112.gif",
                "25": "113.gif",
                "26": "114.gif",
                "27": "115.gif",
                "28": "116.gif",
                "29": "117.gif",
                "30": "118.gif",
                "31": "119.gif",
                "32": "12.gif",
                "33": "120.gif",
                "34": "121.gif",
                "35": "122.gif",
                "36": "123.gif",
                "37": "124.gif",
                "38": "125.gif",
                "39": "126.gif",
                "40": "127.gif",
                "41": "128.gif",
                "42": "129.gif",
                "43": "13.gif",
                "44": "131.gif",
                "45": "132.gif",
                "46": "133.gif",
                "47": "134.gif",
                "48": "14.gif",
                "49": "15.gif",
                "50": "16.gif",
                "51": "17.gif",
                "52": "18.gif",
                "53": "19.gif",
                "54": "20.gif",
                "55": "21.gif",
                "56": "22.gif",
                "57": "23.gif",
                "58": "24.gif",
                "59": "25.gif",
                "60": "26.gif",
                "61": "27.gif",
                "62": "28.gif",
                "63": "29.gif",
                "64": "30.gif",
                "65": "31.gif",
                "66": "32.gif",
                "67": "33.gif",
                "68": "34.gif",
                "69": "35.gif",
                "70": "36.gif",
                "71": "37.gif",
                "72": "38.gif",
                "73": "39.gif",
                "74": "40.gif",
                "75": "41.gif",
                "76": "42.gif",
                "77": "43.gif",
                "78": "44.gif",
                "79": "45.gif",
                "80": "46.gif",
                "81": "47.gif",
                "82": "48.gif",
                "83": "49.gif",
                "84": "50.gif",
                "85": "51.gif",
                "86": "52.gif",
                "87": "53.gif",
                "88": "54.gif",
                "89": "55.gif",
                "90": "56.gif",
                "91": "57.gif",
                "92": "58.gif",
                "93": "59.gif",
                "94": "60.gif",
                "95": "61.gif",
                "96": "62.gif",
                "97": "63.gif",
                "98": "64.gif",
                "99": "65.gif",
                "100": "66.gif",
                "101": "67.gif",
                "102": "68.gif",
                "103": "69.gif",
                "104": "70.gif",
                "105": "71.gif",
                "106": "72.gif",
                "107": "73.gif",
                "108": "74.gif",
                "109": "75.gif",
                "110": "76.gif",
                "111": "77.gif",
                "112": "78.gif",
                "113": "79.gif",
                "114": "80.gif",
                "115": "81.gif",
                "116": "82.gif",
                "117": "83.gif",
                "118": "84.gif",
                "119": "85.gif",
                "120": "86.gif",
                "121": "87.gif",
                "122": "88.gif",
                "123": "89.gif",
                "124": "90.gif",
                "125": "91.gif",
                "126": "92.gif",
                "127": "93.gif",
                "128": "94.gif",
                "129": "95.gif",
                "130": "96.gif",
                "131": "97.gif",
                "132": "98.gif",
                "133": "99.gif",
                "134": "130.gif"
              });
                  
            });
            this.setData({
              topicListData
            });
            wx.hideLoading();
          }else{
            util.showNoData('已加载全部');
          }
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    if(options.title){
      wx.setNavigationBarTitle({
        title: options.title
      })
    }

    this.setData({
      linkIpUpload: app.globalData.linkIpUpload
    });

    // 获取话题列表
    this.momentList(1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      topicListData: []
    });
    this.momentList(1);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})