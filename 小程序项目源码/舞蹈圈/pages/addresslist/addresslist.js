// pages/addresslist/addresslist.js
//获取应用实例
var app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  },

  //设置默认地址
  setDefault:function(e){
    var index = e.currentTarget.dataset.index;
    var addressdata = this.data.addressList[index];
    if(addressdata.status){
      return;
    }
    this.setDefaultAddress(addressdata.id);
  },
  //选中地址
  selectTap:function(e){
    var type = this.data.type;
    if(type){
      console.log("准备切换地址");
      var index = e.currentTarget.dataset.index;
      var addressdata = this.data.addressList[index];
      wx.setStorageSync("selectedaddressdata", addressdata);
      wx.navigateBack({
        
      });
    }else{
      console.log("从我的进去地址管理");
    }
  },
  //编辑
  editBtnClicked:function(e){
    var index = e.currentTarget.dataset.index;
    var addressdata = this.data.addressList[index];
    wx.setStorageSync("addressdata", addressdata);
    wx.navigateTo({
      url: '/pages/newaddaddress/newaddaddress?id='+addressdata.id,
    })
  },
  //删除
  deleteBtnClicked:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var addressdata = this.data.addressList[index];
    var anotherid = 0;
    if(addressdata.status == 1){
      for (var i = 0; i<this.data.addressList.length;i++){
        if (i != index){
          anotherid = this.data.addressList[i].id;
          break;
        }
      }
    }
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          that.deleteMyAddress(id,anotherid);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    if(type && type=="select"){
      this.data.type = type;
    }
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
    this.fetchMyAddress();
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
  
  },
  addAddess: function () {
    wx.removeStorageSync("addressdata");
    wx.navigateTo({
      url: "/pages/newaddaddress/newaddaddress"
    })
  },

  /**
   * 获取我的地址
   */
  fetchMyAddress:function(){
    var that = this;
    var url = app.globalData.linkIp + 'getMyAddress.do';
    var data = {
      userid: app.globalData.userInfo.uid
    };
    var callback = (res) => {
      if (res.success == 1) {
        that.setData({
          addressList:res.data
        });
        
      }
    };
    util.fetchUtil(url, data, callback);
  },
  /**
   * 编辑我的地址，包含设为默认
   */
  editMyAddress:function(addressdata){
    var that = this;
    var url = app.globalData.linkIp + 'updateAddress.do';
    var data = {
      "id": addressdata.id,
      "uid": app.globalData.userInfo.uid,
      "province": addressdata.province,
      "city": addressdata.city,
      "area": addressdata.area,
      "code": addressdata.code,
      "username": addressdata.username,
      "phone": addressdata.phone,
      "status": addressdata.status,
      "address": addressdata.address
    };
    var callback = (res) => {
      if (res.success == 1) {
        that.onShow();//重新加载数据
      }
    };
    util.fetchUtil(url, data, callback);
  },
  /**
   * 设置默认地址
   */
  setDefaultAddress: function (id) {
    var that = this;
    var url = app.globalData.linkIp + 'setDefaultAddress.do';
    var data = {
      userid: app.globalData.userInfo.uid,
      id: id
    };
    var callback = (res) => {
      if (res.success == 1) {
        util.showInfo("设置成功");
        that.onShow();//重新加载数据
      }
    };
    util.fetchUtil(url, data, callback);
  },
  /**
   * 删除我的地址
   */
  deleteMyAddress: function (id, anotherid) {
    var that = this;
    var url = app.globalData.linkIp + 'delAddress.do';
    var data = {
      userid: app.globalData.userInfo.uid,
      id:id
    };
    var callback = (res) => {
      if (res.success == 1) {
        util.showInfo("删除成功");
        if(anotherid != 0){
          //，由于删除了默认地址，设另一个地址为默认(前提还存在另一个地址)
          that.setDefaultAddress(anotherid);
        }
        that.onShow();//重新加载数据
      }
    };
    util.fetchUtil(url, data, callback);
  },
})