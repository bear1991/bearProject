// pages/index/feedback/feedback.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestAllState: false,     //保存加载全部数据状态
    searchState: false,     //保存搜索状态

    now: 1,    //保存上拉触底序列初始值
    linkIp: ''
  },

  
  //点击图片预览
  catchPreviewTap: function(event){
    //console.log(event);
    /*
    //小程序自带的预览API接口使用时，当退出预览模式时会直接退出小程序
    var viewPic = event.currentTarget.dataset.picurl,
      viewPicList = event.currentTarget.dataset.piclist,
      viewPicUrls = [];
    viewPicList.forEach(function(item){
      viewPicUrls.push(item.fileLink);
    });
    //预览图片
    wx.previewImage({
      current: viewPic,     // 当前显示图片的http链接
      urls: viewPicUrls,     // 需要预览的图片http链接列表
      success: function(res){
        //console.log(res);
      }
    })
    */

    //console.log(event);
    var viewPicIndex = event.currentTarget.dataset.picindex,
      viewPicList = event.currentTarget.dataset.piclist,
      viewPicUrls = [];
    var This = this;
    viewPicList.forEach(function (item,index) {
      viewPicUrls.push(app.globalData.linkIp + item.fileLink);
    });
    //console.log(viewPic,viewPicList,viewPicUrls);
    wx.navigateTo({
      url: '../../preview/preview?viewPicIndex=' + viewPicIndex + '&viewPicUrls=' + JSON.stringify(viewPicUrls)
    })

  },


  //服务反馈详情页
  catchBackDetailTap: function(){
    wx.navigateTo({
      url: './backdetail/backdetail',
    })
  },


  //请求数据
  dataContent: function (options, bool){
    var param = {
      requestUrl: app.globalData.linkIp + '/contractFeedback/contractFeedbacklist',
      option: options,
      strCont: 'contractFeedbackList',
      obj: this
    };
    util.requestData(param, bool);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      linkIp: app.globalData.linkIp
    });
    wx.showNavigationBarLoading();
    var options = {
      custom_id: app.globalData.loginInfor.loginId,
      now: 1
    };
    this.dataContent(options,false);
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
    util.onShow.call(this, app, function () {
      //数据恢复初始化
      this.setData({
        now: 1,
        requestAllState: false,
        requestContent: ''
      });
    }.bind(this));
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
    //console.log('下拉刷新');

    var options = {
      custom_id: app.globalData.loginInfor.loginId,
      now: 1
    };
    util.onPullDownRefresh.call(this, options);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //console.log('上拉触底，加载更多');

    var options = {
      custom_id: app.globalData.loginInfor.loginId,
      now: this.data.now + 1
    };
    util.onReachBottom.call(this, options);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})