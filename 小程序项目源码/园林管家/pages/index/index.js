//index.js
var app = getApp();

Page({
  data: {
    showIndexPage: false,     //保存当前整个页面显示/隐藏状态
    displayWaitPage: true,      //保存页面加载中显示/隐藏状态
    
    exitPage: false,     //保存加载异常，退出重进状态
    waitMessage: '',      //保存异常情况的提示内容

    swiperPic: [],       //保存轮播图片 
    currentIndex:0,      //保存轮播当前指示点序列
    noticeMessage:[],     //保存通知消息
  },

  /****** 事件处理函数 ******/
  //自定义轮播指示点
  bindSwiperChange: function(event){
    this.setData({
      currentIndex: event.detail.current
    });
  },


  //资讯分享
  catchShareTap: function () {
    var skipUrl = './share/share';
    //this.loginStateConfirm(skipUrl);
    wx.navigateTo({
      url: skipUrl,
    })
  },
  //我要预约
  catchAppointTap: function(){
    var skipUrl = './appoint/appoint';
    this.loginStateConfirm(skipUrl);
  },
  //服务反馈
  catchBackTap: function(){
   var skipUrl = './back/back';
   this.loginStateConfirm(skipUrl);
  },
  //我的合同
  catchContractTap: function(){
    var skipUrl = './contract/contract';
    this.loginStateConfirm(skipUrl);
  },
  //任务确认
  catchTaskTap: function(){
    var skipUrl = './task/task';
    this.loginStateConfirm(skipUrl);
  },
  
  //登录状态验证
  loginStateConfirm: function (skipUrl){
    if (this.data.loginState) {
      wx.navigateTo({
        url: skipUrl
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先绑定手机号',
        success: function (res) {
          //console.log(res);
          if (res.confirm) {
            wx.navigateTo({
              url: '../person/login/login',
            })
          }
        }
      })
    }
  },


  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.linkIp + '/baner/banerlist',
      success: function(res){
        //console.log(res);
        var bannerCont = res.data.banerList,    //获取轮播图片数据
          swiperPic = [];
        if (bannerCont && bannerCont.length > 0) {
          for (var i = 0; i < bannerCont.length; i++) {
            if (bannerCont[i].imgurl) {
              swiperPic.push(bannerCont[i].imgurl);
            }
          }
          //console.log(swiperPic);
          this.setData({
            swiperPic: swiperPic
          });
        }
      }.bind(this)
    })
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
    if (app.globalData.subState){
      app.globalData.subState = false;
    }
    var timer = setTimeout(function(){
      clearTimeout(timer);
      //console.log(2);
      var displayWaitPage = app.globalData.displayWaitPage,
        exitPage = app.globalData.exitPage,
        waitMessage = app.globalData.waitMessage,
        showIndexPage = app.globalData.showIndexPage,
        noticeMessage = app.globalData.noticeMessage,
        loginState = app.globalData.loginInfor.loginState;

      this.setData({
        displayWaitPage: displayWaitPage,
        exitPage: exitPage,
        waitMessage: waitMessage,
        showIndexPage: showIndexPage,
        noticeMessage: noticeMessage,     //通知消息
        loginState: loginState,
      });
    }.bind(this),1200);

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
