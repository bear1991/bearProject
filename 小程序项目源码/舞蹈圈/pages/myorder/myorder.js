// pages/myorder/myorder.js
const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageindex:1,
    myOrder:[],
    pageCount:0,
  },

  orderDetail:function(e){
    var index = e.currentTarget.dataset.index;
    var order = this.data.myOrder[index];
    wx.setStorage({
      key: "order",
      data: order
    })
    wx.navigateTo({
      url: '../orderdetail/orderdetail'
    })
  },
/**
 * 获取我的订单
 */
  fetchMyOrder:function(){
    var url = app.globalData.linkIp + 'getMyOrders.do';
    var data={
      userid: app.globalData.userInfo.uid,
      pageindex:this.data.pageindex,
    };
    var _this = this;
    var pageindex = this.data.pageindex;
    var callback = (res) => {
      wx.hideNavigationBarLoading();
      if (res.success == 1) {
        var orders = res.data;
        if (pageindex == 1){
          var oldorders = orders;
        }else{
          var oldorders = _this.data.myOrder;
          oldorders.push(...orders);
        }
        _this.setData({
          myOrder: oldorders,
          pageCount:res.pages,
        });
      }
    };
    util.fetchUtil(url, data, callback);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // onPullDownRefresh();
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
    this.fetchMyOrder();
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      pageindex:1
    });
    this.fetchMyOrder();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.pageCount>this.data.pageindex){
      var pageindex = this.data.pageindex;
      pageindex++;
      this.setData({ 
        pageindex: pageindex
      });
      this.fetchMyOrder();
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})