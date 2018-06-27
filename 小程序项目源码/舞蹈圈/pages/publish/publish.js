// pages/publish/publish.js

const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],     // 保存上传文件临时地址数据

    publishData: '',    // 保存发布内容数据
    imgUrlData: [],     // 保存上传文件后返回的数据

  },

  // 事件处理函数
  // 保存发布内容
  momentBindinput: function(e){
    console.log(e); 
    this.setData({
      publishData: e.detail.value.replace(/(^\s*)|(\s*$)/g, '')
    });
  },
  
  // 添加图片
  uploadCatchtap: function(e){
    console.log(e);
    wx.chooseImage({
      success: res => {
        console.log(res);
        var tempFilePaths = this.data.tempFilePaths;
        tempFilePaths.push(...res.tempFilePaths);
        this.setData({
          tempFilePaths
        });
        console.log(tempFilePaths);
      }
    })
  },
  
  // 删除图片
  picdelCatchtap: function(e){
    console.log(e);
    var indexId = e.currentTarget.dataset.index;
    var tempFilePaths = this.data.tempFilePaths;
    var newTempFilePaths = tempFilePaths.filter((item,index) => {
        return index != indexId;
    });
    console.log(newTempFilePaths);
    this.setData({
      tempFilePaths: newTempFilePaths
    });
  },

  // 确认发布
  submitCatchtap: function(e){
    console.log(e);
    // console.log(this.data.publishData);
    // console.log(this.data.tempFilePaths);

    var picType = ['jpg', 'gif', 'png', 'JPEG'];
    var videoType = ['mp4', 'avi', 'rmvb', '3gp', 'wmv'];
    var picArray = [];     // 保存选择的图片
    var videoArray = [];     // 保存选择的视频
    // 判断选择的文件是图片还是视频
    this.data.tempFilePaths.forEach((value, index) => {
      var subStrVal = value.substring(value.lastIndexOf('.') + 1);
      // console.log(subStrVal);
      // 筛选出图片或视频并保存
      this.filterFile(picType, videoType, picArray, videoArray, subStrVal, value);
    });
    // console.log(picArray);
    // console.log(videoArray);

    var cb = () => {
      console.log(this.data.imgUrlData);
      // 上传文件回调--请求提交数据
      wx.request({
        url: app.globalData.linkIp + 'publishTopic.do',
        method: 'POST',
        data: util.getJsonData({
          'content': this.data.publishData,
          'userid': app.globalData.userInfo.uid,
          'data': this.data.imgUrlData
        }),
        success: res => {
          // console.log(res);
          if(res.data.success){
            wx.showToast({
              title: '话题发布成功',
              success: res => {
                console.log(res);
                var timer = setTimeout(function(){
                  wx.navigateBack();
                  clearTimeout(timer);
                },1200);
              }
            })
          }else{
            util.showInfo(res.data.msg);
          }
        }
      })
    };
    // 上传图片文件
    picArray.length ? this.uploadFile(picArray, app.globalData.linkIp + 'uploadImg.do', false, !videoArray.length ? cb : '') : '';
    // 上传视频文件   文件全部上传完成后，执行的回调(报名)
    videoArray.length ? this.uploadFile(videoArray, app.globalData.linkIp + 'uploadVideo.do', true, cb) : '';

  },
  
  // 筛选上传文件是图片还是视频
  filterFile: function (picType, videoType, picArray, videoArray, subStrVal, value) {
    if(picType.indexOf(subStrVal)!= -1){
      picArray.push(value);
    }else if(videoType.indexOf(subStrVal) != -1){
      videoArray.push(value);
    }
  },

  // 上传文件(图片、视频)
  uploadFile: function (fileArray, url, videoStatus, cb) {
    // console.log(fileArray, url, videoStatus, cb);
    fileArray.forEach((value, index) => {
      wx.uploadFile({
        url,
        filePath: value,
        name: value,
        success: res => {
          console.log(res);
          if (JSON.parse(res.data).success) {
            var imgUrlData = this.data.imgUrlData;
            var imgurl = videoStatus ? JSON.parse(res.data).mp4url : JSON.parse(res.data).imgurl;
            imgUrlData.push({
              isvideo: videoStatus ? 1 : 0,
              imgurl
            })
            this.setData({
              imgUrlData
            });
            // console.log(this.data.imgUrlData);
            // console.log(index, fileArray.length - 1);
            if (index == fileArray.length - 1) {
              cb && cb();
            }
          } else {
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: res => {
                // console.log(res);
              }
            })
          }
        }
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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