// pages/index/share/sharecont/sharecont.js
var WxParse = require('../../../../wxParse/wxParse.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    /*
    //var shareDetail = JSON.parse(options.shareDetail);
    //console.log(shareDetail);
    this.setData({
      shareDetail: shareDetail
    });
    */

    var shareDetailId = options.shareDetailId;
    wx.request({
      url: app.globalData.linkIp + '/news/getNewsById',
      data: {
        id: shareDetailId
      },
      success: function(res){
        //console.log(res);
        if(res.data.code == 0){
          var shareDetail = res.data.news;
          
          //动态设置页面标题
          wx.setNavigationBarTitle({
            title: shareDetail.title,
          })
          
          this.setData({
            shareDetail: shareDetail
          });

          //解析富文本html标签内容
          var content = shareDetail.content,
            that = this;
          WxParse.wxParse('content', 'html', content, that, 15);

          //配置小表情emojis
          WxParse.emojisInit('[]', "../../../../wxParse/emojis/", {
            "00": "00.gif",
            "01": "01.gif",
            "02": "02.gif",
            "03": "03.gif",
            "04": "04.gif",
            "05": "05.gif",
            "06": "06.gif",
            "07": "07.gif",
            "08": "08.gif",
            "09": "09.gif",
            "09": "09.gif",
            "10": "10.gif",
            "11": "100.gif",
            "12": "101.gif",
            "13": "102.gif",
            "14": "103.gif",
            "15": "104.gif",
            "16": "105.gif",
            "17": "106.gif",
            "18": "107.gif",
            "19": "108.gif",
            "20": "109.gif",
            "21": "11.gif",
            "22": "110.gif",
            "23": "111.gif",
            "24": "112.gif",
            "25": "113.gif",
            "26": "114.gif",
            "27": "115.gif",
            "28": "116.gif",
            "29": "117.gif",
            "30": "118.gif",
            "31": "119.gif",
            "32": "12.gif",
            "33": "120.gif",
            "34": "121.gif",
            "35": "122.gif",
            "36": "123.gif"
          });

        }else{
          wx.showModal({
            title: '提示',
            content: '页面信息加载失败',
            showCancel: false
          })
        }
      }.bind(this)
    })


    /*
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */

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
    /*
    //动态设置页面标题
    wx.setNavigationBarTitle({
      title: this.data.shareDetail.title,
    })
    */
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