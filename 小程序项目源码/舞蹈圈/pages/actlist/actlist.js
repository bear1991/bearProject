// pages/actlist/actlist.js

const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    pageIndex: 1,     // 保存当前页数  

    actListData: []     // 保存搜索结果数据
  },

  // 事件处理函数
  // 加载更多搜索结果
  activityListMore: function(e){
    // console.log(e)
    if (this.data.actListData.length % 10 > 0){
      wx.showLoading({
        title: '暂无更多数据',
        success: res => {
          // console.log(res);
          var timer = setTimeout(function () {
            wx.hideLoading();
            clearTimeout(timer);
          }, 800);
        }
      })
    }else{
      wx.showLoading({
        title: '加载中'
      })
      this.setData({
        pageIndex: this.data.pageIndex+1
      }, () => {
        this.searchListData(() => {
          wx.hideLoading();
        });
      });
    }
  },

  // 点击搜索结果，跳转对应详情页
  activityCatchtap: function (e) {
    // console.log(e);
    var url = "";
    if (e.currentTarget.dataset.type == 1) {     // type: 1-比赛  2-活动
      url = '../matdetail/matdetail?matchid=';
    } else if (e.currentTarget.dataset.type == 2) {
      url = '../actdetail/actdetail?matchid=';
    }
    wx.redirectTo({
      url: url + e.currentTarget.dataset.index
    })
  },

  // 请求搜索结果列表公共函数
  searchListData: function(cb){
    // console.log(1, this.data.searchText);
    wx.request({
      url: app.globalData.linkIp + 'getPostsList.do',
      method: 'POST',
      data: util.getJsonData({
        'pageIndex': this.data.pageIndex,
        'type': 2,
        'searchtext': this.data.searchText
      }),
      success: res => {
        // console.log(res);
        if (res.data.success){
          if(res.data.data.length){
            var actListData = this.data.actListData;
            actListData.push(...res.data.data);
            this.setData({
              actListData
            }, () => {
              cb && cb();
            });
          }else{
            util.showNoData('暂无搜索结果');
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
    this.setData({
      searchText: options.searchText
    }, () => {
      this.searchListData();
    });
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