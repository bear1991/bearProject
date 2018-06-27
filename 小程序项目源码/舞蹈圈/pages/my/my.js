// pages/my/my.js

const app = getApp();   // 获取应用实例
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},     // 保存用户基本信息
    wxLogin: false,     // 保存登录状态

    // 列表项
    list: [
      [{ title: "关注", path: "../attention/attention"}, { title: "粉丝", path: "../fans/fans"}],
      [{ title: "我的订单", path: "../myorder/myorder"}, 
        { title: "地址管理", path: "../addresslist/addresslist"}],
      /*[{ title: "收藏", path: ""},
      { title: "设置", path: ""}]
      [{ title: "话题", path: "../topic/topic"}],
      */
    ]
  },

  // 事件处理函数
  // 未登录状态时，进行授权登录
  scopeCatchtap: function(){
    /*
    app.globalFunction.scopeUserInfo(app, ()=>{
      this.setScopeData();
    });
    */
  },

  // button按钮获取用户信息，并同步数据
  bindGetUserInfo: function(e){
    console.log(e);
    var userInfo = e.detail.userInfo;
    app.globalFunction.getUserInfo1(userInfo, app, () => {
      this.setScopeData();
    });
  },


  // 跳转到会员注册页面，进行注册
  memberCatchtap: function(){
    wx.navigateTo({
      url: '../register/register'
    })
  },

  // 跳转列表选项页面
  myCatchtap: function(e){
    // console.log(e);
    if(util.validateDirect(app)){    // 验证当前是否微信登录和注册会员
      var dataset = e.currentTarget.dataset;
      // console.log(dataset);
      // console.log(dataset.path + "?&title=" + dataset.title);
      wx.navigateTo({
        url: dataset.path + "?&title=" + dataset.title
      })
    }
  },

  /* 本页公共部分函数 */
  // 设置授权后的用户信息数据
  setScopeData: function(){
    var userInfo = app.globalData.userInfo;
    var wxLogin = app.globalData.wxLogin;
    // console.log(userInfo);
    this.setData({
      userInfo,
      wxLogin
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setScopeData();
    
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
    this.setScopeData();
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