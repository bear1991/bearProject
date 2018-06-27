// pages/person/person.js
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showIndexPage: false,   //保存当前整个页面显示/隐藏状态
    displayWaitPage: true,
    
    exitPage: false,
    waitMessage: '',      //保存异常情况的提示内容
  },

  /****** 事件处理函数 ******/
  //跳转登录页面
  catchLoginTap: function(){
    wx.navigateTo({
      url: './login/login',
    })
  },
  //登录账号信息
  catchAccountTap: function(){
    var accountDetail = JSON.stringify(this.data.loginDetailInfor);
    wx.navigateTo({
      url: './account/account?accountDetail=' + accountDetail,
    })
  },
  //用户信息管理
  catchUserTap: function(){
    var userDetail = JSON.stringify(this.data.userDetailInfor);
    wx.navigateTo({
      url: './user/user?userDetail=' + userDetail,
    })
  },
  //关于
  catchAboutTap: function(){
    wx.navigateTo({
      url: './about/about',
    })
  },

  /*
  //退出登录
  catchExitTap: function(){
    this.setData({
      loginState:false
    });
    app.globalData.loginInfor.loginState = false;    //退出登录时，同步全局登录状态
  },
  */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

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
    //console.log(app.globalData.userDetailInfor);
    var displayWaitPage = app.globalData.displayWaitPage,  
      exitPage = app.globalData.exitPage,
      waitMessage = app.globalData.waitMessage,
      showIndexPage = app.globalData.showIndexPage, 
      loginState = app.globalData.loginInfor.loginState,
      loginDetailInfor = app.globalData.loginDetailInfor,
      userDetailInfor = app.globalData.userDetailInfor,
      avatar = app.globalData.userDetailInfor.avatar,     //保存登录时用户/用户成员头像
      customName = app.globalData.userDetailInfor.customName,     //用户登录时保存用户登录名
      memberName = app.globalData.loginDetailInfor.memberName     //用户成员登录时保存用户成员登录名
    //console.log(avatar);
    this.setData({
      displayWaitPage: displayWaitPage,
      exitPage: exitPage,
      waitMessage: waitMessage,
      showIndexPage: showIndexPage,
      loginState: loginState,
      loginDetailInfor: loginDetailInfor,
      userDetailInfor: userDetailInfor,
      avatar: avatar,
      customName: customName,
      memberName: memberName
    });
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