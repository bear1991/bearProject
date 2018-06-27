// pages/userdetail/userdetail.js
const util = require('../../utils/util.js'); 
const app = getApp();     //获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{
      avatar: '../../images/my/ic_default_head.png',
    },
    userid:undefined,
  },

  error:function(){
    var user = this.data.user;
    user.avatar = '../../images/my/ic_default_head.png';
    this.setData({
      user:user,
    });
  },

  /**
   * 获取用户信息
   */
  fetchGetUserInfo:function(){
    var url = app.globalData.linkIp + 'getUserInfoByUserid.do';
    var data={
      'userid': app.globalData.userInfo.uid,
      'objectid': this.data.userid
    }
    console.log(data);
    var _this = this;
    var callback = (res)=>{
      if (res.success) {
        var user = res.data;
        if (user.avatar.substr(0,4) !='http'){
          user.avatar = '../../images/my/ic_default_head.png';
        }
        _this.setData({
          user: user
        });
        // console.log(res);
      } 
    }
    util.fetchUtil(url,data,callback);
  },

  // 关注/取消关注粉丝
  followCatchtap: function (e) {
    // console.log(e);
    if(this.data.user.id == undefined) return;
    var isfollow = this.data.user.isfollow == 1;
    var url = app.globalData.linkIp + (isfollow ? 'unfollowUser.do' : 'followUser.do');    // isfollow: 1-已关注
    // console.log(url);
    var data = {
      'userid': app.globalData.userInfo.uid,
      'followuserid': this.data.userid,
    };
    var _this = this;
    var callback = (res) => {
      // console.log(res);
      if (res.success) {
        var user = _this.data.user;
        if (user.isfollow == 0){
          user.isfollow = 1;
        }else{
          user.isfollow = 0;
        }
        _this.setData({
          user:user,
        });
      } 
    }
    util.fetchUtil(url, data, callback);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid = options.userid;
    this.setData({
      userid:userid,
    })
    this.fetchGetUserInfo();
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