// pages/fans/fans.js

const app = getApp();   // 获取应用实例
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkIp: '',

    fansData: [],    // 保存关注当前用户的人员数据

    fansDetailStatus: false,    // 保存粉丝详情弹出状态
    fansDetailData: {},    // 保存粉丝详情数据
  },

  toDetail:function(e){
    var userid = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../userdetail/userdetail?userid=' + userid,
    })
  },

  // 事件处理函数
  // 获取人员详细信息
  fansCatchtap: function(e){
    // console.log(e);
    this.setData({
      fansDetailStatus: true
    }, () => {
      wx.request({
        url: app.globalData.linkIp + 'getUserInfoByUserid.do',
        method: 'POST',
        data: util.getJsonData({
          'userid': app.globalData.userInfo.uid,
          'objectid': Number(e.currentTarget.dataset.id)
        }),
        success: res => {
          // console.log(res);
          if (res.data.success) {
            this.setData({
              fansDetailData: res.data.data
            });
          } else {
            util.showInfo(res.data.msg);
          }
        }
      })
    });
  },


  // 关闭粉丝详情信息
  closeCatchtap: function () {
    this.setData({
      fansDetailStatus: false
    });
  },

  fetchGetFans:function(){
    wx.request({
      url: app.globalData.linkIp + 'followMeUsers.do',
      method: 'POST',
      data: util.getJsonData({
        'memberid': app.globalData.userInfo.uid
      }),
      success: res => {
        // console.log(res);
        if (res.data.success) {
          if (res.data.data.length) {
            res.data.data.forEach((item, index) =>{
              if (item.avatar && item.avatar.substr(0, 4) != "http" || !(item.avatar)) {
                item.avatar = '../../images/my/ic_default_head.png';
              }
            });
            this.setData({
              fansData: res.data.data
            });
          } else {
            util.showNoData('暂无粉丝');
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

    wx.setNavigationBarTitle({
      title: options.title
    })

    this.setData({
      linkIp: app.globalData.linkIp
    });
    // 请求粉丝数据
    this.fetchGetFans();
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
    this.fetchGetFans();
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