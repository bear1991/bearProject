// pages/activity/activity.js

const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityStatus: true,     // 保存比赛和活动切换状态

    // pageIndex: 1,     // pageIndex[0]：活动当前页    pageIndex[1]：比赛当前页
    activityData: [[], []],    // activityData[0]：保存活动列表数据    activityData[1]：保存比赛列表数据  
    actCats:[],
    index:0,
  },

  // 事件处理函数
  // 比赛和活动列表切换
  // activityCatchtap: function(e){
  //   // console.log(e);
  //   var actStatus = Number(e.currentTarget.dataset.index)?true:false;
  //   wx.setNavigationBarTitle({
  //     title: actStatus?'比赛':'活动'
  //   });
  //   this.setData({
  //     activityStatus: actStatus
  //   })

  //   this.setData({
  //     pageIndex: [1, 1]
  //   });

  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   actStatus ? this.matactRequest(1, function () {
  //     wx.hideLoading();
  //   }) : this.matactRequest(0, function () {
  //     wx.hideLoading();
  //   });
  // },

  // 比赛列表跳转比赛详情页
  // matCatchtap: function(e){
  //   // console.log(e);
  //   wx.navigateTo({
  //     url: '../matdetail/matdetail?matchid=' + e.currentTarget.dataset.index
  //   })
  // },
  // 活动列表跳转比赛详情页
  actCatchtap: function (e) {
    // console.log(e);
    wx.navigateTo({
      url: '../actdetail/actdetail?matchid=' + e.currentTarget.dataset.index
    })
  },

  selectCat:function(e){
    var index = e.currentTarget.dataset.index;
    var cat = this.data.actCats[index];
    var cats = [];
    this.data.actCats.forEach((item, i) => {
      if(i== index){
        item.isSelect = 1;
      }else{
        item.isSelect = 0;
      } 
      cats.push(item);
    });
    this.setData({
      actCats: cats,
      index: index,
    })
    if (cat.acts == undefined){
      this.matactRequest(cat.term_id,index,function(){
        wx.hideLoading();
      });
    }else{
      this.setData({
        'activityData[0]': cat.acts,
      });
    }
  },

  // 请求比赛-活动列表数据
  matactRequest: function (teamid,index, cb) {    // index： 1-比赛  0-活动 
    console.log(this.data.actCats);
    if (this.data.actCats.length == 0) return;
    wx.request({
      url: app.globalData.linkIp + 'getActivityByTermid.do',
      data: util.getJsonData({
        'pageindex': this.data.actCats[index].pageindex,
        'termid': teamid,
      }),
      method: 'POST',
      success: (res) => {
        // console.log(res);
        if (res.data.success) {
          var cats = this.data.actCats;
          if (cats[index].pageindex == 1) {
            var data = res.data.data;
          } else {
            var data = cats[index].acts;
            data.push(...res.data.data);
          }
          
          cats[index].acts = data;
          cats[index].pages = res.data.pages;
          this.setData({
            'activityData[0]': data,
            actCats:cats,
          });
          console.log(this.data.activityData[0]);
          cb && cb();
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },

  // 比赛/活动列表加载新数据
  activityListMore: function(e){
    
    // var index = e.currentTarget.dataset.index;
    var cat = this.data.actCats[this.data.index];
    console.log(cat);
    if (cat.pages<=cat.pageindex) {
      wx.showLoading({
        title: '暂无更多活动',
        success: res => {
          // console.log(res);
          var timer = setTimeout(function(){
            wx.hideLoading();
            clearTimeout(timer);
          }, 800);
        }
      })
    } else {
      // var index = Number(e.currentTarget.dataset.index);
      wx.showLoading({
        title: '加载中',
      })
      this.matactRequest(cat.term_id, this.data.index, function () {
        wx.hideLoading();
      });
    }
    
  },

  /**
  * 获取活动分类
 */
  fetchGetActCat:function(){
    var url = app.globalData.linkIp + 'getTerms.do';
    var data = {};
    var _this = this;
    
    var callback = (res) => {
      if (res.success == 1) {
        var cats = res.data;
        var cats1 = [];
        if (cats.length>0){
          cats[0].isSelect = 1;
          cats.forEach((item, index) => {
            item.pageindex = 1;
            // this.actCats.push(item);
            cats1.push(item);
          });
          this.data.index = 0;
          this.setData({
            actCats: cats1,
          });
          this.matactRequest(cats[0].term_id,0, function () {
            wx.hideLoading();
          })
        }
      }
    }
    util.fetchUtil(url, data, callback);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.fetchGetActCat();
    // wx.showLoading({
    //   title: '加载中',
    // })
    // this.matactRequest(1, function () {
    //   wx.hideLoading();
    // });    // 初始进入时，获取比赛列表数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.setNavigationBarTitle({
    //   title: '比赛'
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.showLoading({
    //   title: '加载中',
    // })
    // this.matactRequest(1, function () {
    //   wx.hideLoading();
    // });    // 初始进入时，获取比赛列表数据
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