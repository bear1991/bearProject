// pages/index/appoint/appoint.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestAllState: false,     //保存加载全部数据状态
    searchState: false,     //保存搜索状态

    inputVal: '',    //保存搜索框默认初始值
    now: 1,    //保存上拉触底序列初始值    
  },


  //保存输入框内容
  bindSearchInput: function (event) {
    var inputCont = event.detail.value;
    this.setData({
      inputCont: inputCont
    });
    //当输入框内容为空时，显示所有内容
    if (!inputCont) {
      this.setData({
        requestContent: this.data.requestContentClone,
        searchState: false
      });
    }
  },
  //点击按钮搜索
  catchSearchTap: function () {
    var searchCont = this.data.inputCont;
    if (!searchCont || searchCont.match(/^\s*$/)) {
      wx.showModal({
        title: '提示',
        content: '输入为空，请输入有效内容',
        showCancel: false,
        success: function () {
          this.setData({
            inputVal: ''
          });
        }.bind(this)
      })
    } else {
      //console.log(searchCont);    //搜索内容
      wx.showLoading({
        title: '搜索中',
      })

      //输入内容搜索得到的所有结果，此处禁止刷新/加载
      this.setData({
        searchState: true
      });
      var options = {
        custom_id: app.globalData.loginInfor.loginId,
        content: searchCont
      };
      this.dataContent(options, false);
    }

  },


  //我的预约详情页
  catchAppointDetailTap: function(event){
    var appointDetail = JSON.stringify(event.currentTarget.dataset.appointdetail);
    wx.navigateTo({
      url: './appointdetail/appointdetail?appointDetail=' + appointDetail,
    })
  },
  //我要预约信息输入页
  catchAppointSubmitTap: function(){
    wx.navigateTo({
      url: './appointsubmit/appointsubmit',
    })
  },


  //请求数据(searchBool：控制显示搜索操作时的消息提示)
  dataContent: function(options, bool){
    var param = {
      requestUrl: app.globalData.linkIp + '/bespeak/bespeaklist',
      option: options,
      strCont: 'bespeakList',
      obj: this
    };
    util.requestData(param, bool);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    var options = {
      custom_id: app.globalData.loginInfor.loginId,
      now: 1
    };
    this.dataContent(options, true);
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
    util.onShow.call(this,app,function(){
      //数据恢复初始化
      this.setData({
        now: 1,
        inputVal: '',
        requestAllState: false,
        searchState: false,
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