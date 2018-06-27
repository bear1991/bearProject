// pages/index/share/share.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: { 
    requestAllState: false,     //保存加载全部数据状态
    searchState: false,     //保存搜索状态

    inputVal:'',    //保存搜索框默认初始值
    now: 1,    //保存上拉触底序列初始值
  },

  //保存输入框内容
  bindSearchInput: function(event){
    var inputCont = event.detail.value;
    this.setData({
      inputCont: inputCont
    }); 
    //当输入框内容为空时，显示所有内容
    if (!inputCont){
      this.setData({
        requestContent: this.data.requestContentClone,
        searchState: false
      });
    }
    //console.log(this.data.requestAllState);
  },
  
  //点击按钮搜索
  catchSearchTap:function(){
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
        content: searchCont
      }
      this.dataContent(options,false);
    }
  },


  //点击资讯列表缩略图预览
  catchPreviewTap: function(event){
    //console.log(event);
    /*
    //第一种方法：使用小程序自带预览接口
    //不合适：小程序自带的预览API接口使用时，当退出预览模式时，真机会直接退出小程序
    var viewPic = event.currentTarget.dataset.picurl;
    //预览图片
    wx.previewImage({
      current: viewPic, // 当前显示图片的http链接
      urls: [viewPic], // 需要预览的图片http链接列表
      success: function(res){
        //console.log(res);
      }
    })
    */

    //第二种方法：跳转到新页面进行图片展示
    var viewPicUrl = event.currentTarget.dataset.picurl,
      viewPicIndex = 0,
    viewPicUrls = [viewPicUrl];
    wx.navigateTo({
      url: '../../preview/preview?viewPicIndex=' + viewPicIndex + '&viewPicUrls=' + JSON.stringify(viewPicUrls)
    })


    /*
    //wx.downloadFile下载文件之后，再直接wx.openDocument打开文件(有效值 doc, xls, ppt, pdf, docx, xlsx, pptx)
    wx.downloadFile({
      url: event.currentTarget.dataset.picurl,
      success: function(res){
        console.log(res.tempFilePath);
        wx.openDocument({
          filePath: res.tempFilePath,
          success:function(res){
            console.log(res);
            console.log('打开文件成功');
          }
        });
      },
      fail: function(err){
        console.log(err);
      }
    });
    */
    
  },


  //资讯分享详情页
  catchShareDetailTap: function (event) {
    //console.log(event);
    //var shareDetail = JSON.stringify(event.currentTarget.dataset.sharedetail);
    var shareDetailId = event.currentTarget.dataset.sharedetail.id;
    //console.log(shareDetail);
    
    wx.navigateTo({
      //url: './sharedetail/sharedetail?shareDetail=' + shareDetail,
      url: './sharedetail/sharedetail?shareDetailId=' + shareDetailId,
    })
  },


  //请求数据(searchBool：控制显示搜索操作时的消息提示)
  dataContent: function (options, bool){
    /*
        requestUrl：请求地址,
        option：传参, 
        strCont: 字段, 
        obj: this指向
      */
    var param = {
      requestUrl: app.globalData.linkIp + '/news/newslist',
      option: options,
      strCont: 'newsList',
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