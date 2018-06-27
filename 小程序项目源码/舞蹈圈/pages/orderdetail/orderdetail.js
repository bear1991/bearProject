// pages/orderdetail/orderdetail.js
const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    hidden: true,
    PayReq:undefined,
  },

  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      hidden: true
    });
    this.fetchDelOrder();
  },

  delOrder:function(){
    this.setData({
      hidden:false,
    })
  },
  /**
   * 发起支付
   */
  pay:function(){
    var req = this.data.PayReq;
    var _this = this;
    wx.requestPayment({
      'timeStamp': req.timestamp,
      'nonceStr': req.noncestr,
      'package': 'prepay_id=' + req.prepayid,
      'signType': 'MD5',
      'paySign': req.sign,
      'success': function (res) {
        _this.showToast("支付成功");
      },
      'fail': function (res) {
        _this.showToast("支付失败"+res);
      }
    })
  },

  showToast:function(msg){
    
    wx.showToast({
      title: msg,
      icon: '',
      image: '',
      duration: 1000,
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  fetchPay:function(){
    var url = app.globalData.linkIp + 'orderpay.do';
    var data = {
      userid: app.globalData.userInfo.uid,
      orderid: this.data.order.id,
      paycode:"wechatmini",
    };
    var _this = this;
    var callback = (res) => {
      if (res.success == 1) {
        console.log(res);
        _this.setData({
          PayReq:res
        });
        _this.pay();
      }
    };
    util.fetchUtil(url, data, callback);
  },

  /**
 * 删除订单
 */
  fetchDelOrder: function () {
    var url = app.globalData.linkIp + 'delOrder.do';
    var data = {
      userid: app.globalData.userInfo.uid,
      orderid: this.data.order.id,
    };
    var _this = this;
    var callback = (res) => {
      if (res.success == 1) {
        wx.navigateBack({
          delta: 1
        })
      }
    };
    util.fetchUtil(url, data, callback);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'order',
      success: function (res) {
        console.log(res.data);
        _this.setData({
          order: res.data,
        })
      }
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