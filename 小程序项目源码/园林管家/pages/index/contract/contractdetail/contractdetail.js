// pages/index/contract/contractdetail/contractdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //图片预览
  catchPreviewTap: function(event){
    //console.log(event);
    /*
    //单图显示
    var viewPicUrl = event.target.dataset.picurl,
      viewPicIndex = 0,
      viewPicUrls = [viewPicUrl];
    */
    
    //多图显示
    var viewPicUrlList = this.data.contractDetail.contractFileList,
      viewPicIndex = event.target.dataset.index,
    viewPicUrls = viewPicUrlList.map(function(item,index){
      return item.fileLink;
    });
    //console.log(viewPicUrls);

    wx.navigateTo({
      url: '../../../preview/preview?viewPicIndex=' + viewPicIndex + '&viewPicUrls=' + JSON.stringify(viewPicUrls)
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var contractDetail = JSON.parse(options.contractDetail);
    //console.log(contractDetail);
    this.setData({
      contractDetail: contractDetail
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