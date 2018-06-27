// pages/index/task/taskdetail/taskdetail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgRotateState : ['','','','',''],     //保存小图标旋转状态
    displayState : ['','','','']       //保存内容区域显示/隐藏
  },

  //任务详情显示隐藏点击切换
  catchTaskStepTap: function(event){
    //console.log(event);
    var tabIndex = event.target.dataset.index;
    //console.log(this.data.imgRotateState[tabIndex]);
    var imgRotateVal = this.data.imgRotateState,
      displayVal = this.data.displayState;
    if (!this.data.imgRotateState[tabIndex]){
      imgRotateVal[tabIndex] = 'imgRotate';
      displayVal[tabIndex] = 'display';
    }else{
      imgRotateVal[tabIndex] = '';
      displayVal[tabIndex] = '';
    }
    this.setData({
      imgRotateState: imgRotateVal,
      displayState: displayVal
    });
  },


  //图片预览
  catchPreviewTap: function (event) {
    //console.log(event);
    
    /*
    //单图显示
    var viewPicUrl = event.target.dataset.picurl,
      viewPicIndex = 0,
      viewPicUrls = [viewPicUrl];
    */

    //多图显示
    var viewPicUrlList = this.data.taskDetail.contractPlanAttachmentList,
      viewPicIndex = event.target.dataset.index,
      viewPicUrls = [];
    viewPicUrls = viewPicUrlList.map(function(item,index){
      return item.imgurl;
    });
    //console.log(viewPicIndex,viewPicUrls);

    wx.navigateTo({
      url: '../../../preview/preview?viewPicIndex=' + viewPicIndex + '&viewPicUrls=' + JSON.stringify(viewPicUrls)
    })
  },


  //任务确认提交，跳转任务列表
  catchTaskSubmitTap: function(){
    //console.log(this.data.taskDetail.id);
    wx.request({
      url: app.globalData.linkIp + '/contractPlan/update',
      data: {
        id: this.data.taskDetail.id
      },
      success: function(res){
        //console.log(res);    //{code: 500, msg: "未知异常，请联系管理员"}
        if (res.data.code == 0) {      //提交成功时，返回的code为0
          wx.showToast({
            title: '确认成功',
            duration: 4000,
            success: function(){
              var timer = setTimeout(function () {
                clearTimeout(timer);
                app.globalData.subState = true;
                wx.navigateBack({
                  delta: 1
                });
              }, 800);
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '任务确认失败，请联系管理员',
            showCancel: false
          })
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var taskDetail = JSON.parse(options.taskDetail);
    //console.log(taskDetail);
    this.setData({
      taskDetail: taskDetail
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