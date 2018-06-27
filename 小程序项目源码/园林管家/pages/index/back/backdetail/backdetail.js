// pages/index/back/backdetail/backdetail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //contractList: ['合同1','合同2','合同3','合同4'],
    contractValue: '',
    showPic: false,
    //showDelete: [],
    //picUrlList: [],     //保存上传图片信息
    picPath: [],    //保存上传图片路径名称
    picSize: [],     //保存上传图片大小,
    picPathName: [],    //保存到后台有效的路径文件
    picPathLink: []
  },


  //选择合同
  bindContractSelectChange: function(event){
    //console.log(event);
    var contractKey = event.detail.value;
    //console.log(contractKey);
    //console.log(this.data.contractListObj);
    if (this.data.contractListObj.length>0){
      this.setData({
        contractValue: this.data.contractListObj[contractKey].contractName,
        contractId: this.data.contractListObj[contractKey].contractId     //反馈上传的合同id
      });
    }else{
      this.setData({
        contractValue: '',
        contractId: ''     //反馈上传的合同id
      });
    }
    //console.log(this.data.contractValue, this.data.contractId);
  },

  //获取反馈内容
  bindBackContTap: function(event){
    //console.log(event.detail.value);
    this.setData({
      backCont: event.detail.value     //保存反馈内容
    });
  },

  //添加上传图片方法
  catchAddPicTap: function(){
    //console.log(app.globalData.linkIp + '/upload');
    wx.chooseImage({
      success:function(res){
        console.log(res);
        
        //限制上传文件只能是图片
        var picTypeList = ['jpg','png','gif','jpeg'],
            picTypeArr = res.tempFilePaths[0].split('.');
        //console.log(picTypeArr);
        var picType = picTypeArr[picTypeArr.length-1];
        //console.log(picType);
        if (picTypeList.indexOf(picType) == -1){
          wx.showModal({
            title: '提示',
            content: '请选择图片上传',
            showCancel: false,
          })
          return;
        }
      
        if (this.data.picPath.length === 0) {
          this.setData({
            showPic: true
          });
        }

        var picPath = this.data.picPath,    
            picSize = this.data.picSize;
        res.tempFiles.map(function (item) {      //res.tempFilesL：临时文件路径
            picPath.push(item.path);
            picSize.push(parseInt(item.size/1024));
        });
        this.setData({
          picPath: picPath,
          picSize: picSize
        });
        console.log(picPath, picSize);
      }.bind(this)
    });
  },


  //点击查看上传的图片
  catchPreviewTap: function (event){
    /*
    //只能查看当前点击的那张图片
    var viewPicUrl = event.currentTarget.dataset.picurl,
      viewPicIndex = 0,
      viewPicUrls = [viewPicUrl];
    */
    //可以查看所有已经选择的图片
    var viewPicUrl = event.currentTarget.dataset.picurl,
      viewPicIndex = event.currentTarget.dataset.deleteindex,
      viewPicUrls = this.data.picPath;
    
    wx.navigateTo({
      url: '../../../preview/preview?viewPicIndex=' + viewPicIndex + '&viewPicUrls=' + JSON.stringify(viewPicUrls)
    })
  },


  //长按已选图片显示删除图标
  catchLongImagePress: function (event){
    //console.log(event);
    
    //长按图片显示是否确认删除图片模态
    wx.showModal({
      title: '提示',
      content: '删除图片',
      success: function(res){
        var deleteIndex = event.currentTarget.dataset.deleteindex;
        if(res.confirm){
          var picPath = this.data.picPath,
              picSize = this.data.picSize;
          picPath.splice(deleteIndex, 1);
          picSize.splice(deleteIndex, 1);
          if (picPath.length == 0) {
            this.setData({
              showPic: false
            });
          }
          this.setData({
            picPath: picPath,
            picSize: picSize, 
          });
          //console.log(this.data.picPath, this.data.picSize);
        }
      }.bind(this)
    })
  },

  //提交服务反馈信息
  catchBackSubmitTap: function(){
    var backSubmitCont = [
      app.globalData.loginInfor.loginId,
      this.data.contractId,
      this.data.backCont, 
      this.data.picPath,
      this.data.picSize
    ];
    
    //验证项目选择和反馈内容存在时，才能提交成功
    if (this.data.contractId && this.data.backCont){
      
      var picPathArr = this.data.picPath,
        This = this;
        //console.log(picPathArr);
      picPathArr.forEach(function(item,index){
        console.log(item);
        //上传临时图片文件到后台服务器
        wx.uploadFile({
          url: app.globalData.linkIp + '/UploadServlet',
          filePath: item,
          name: 'file',
          header:{
            'Content-Type': 'multipart/form-data'
          },
          success: function (res) {
            console.log(res);
            if(res.statusCode == 200){
              var picPathLink = This.data.picPathLink,
                picPathName = This.data.picPathName;
              picPathLink.push(JSON.parse(res.data).fileLink);
              picPathName.push(JSON.parse(res.data).fileName);
              This.setData({
                picPathLink: picPathLink,
                picPathName: picPathName
              })

              if(This.data.picPath.length-1 == index){
                console.log(index,This.data.picPathLink, This.data.picPathName);
                
                //提交数据到后台
                wx.request({
                  url: app.globalData.linkIp + '/contractFeedback/save',
                  data: {
                    customId: app.globalData.loginInfor.loginId,
                    contractId: This.data.contractId,
                    content: This.data.backCont,
                    fileLinks: This.data.picPathLink.join(','),
                    fileNames: This.data.picPathName.join(','),
                    fileSizes: This.data.picSize.join(',')     //将保存文件大小的数组转化成字符串传递到后台
                  },
                  header: {
                    'Content-Type': 'application/json;charset=utf-8'       //设置字符编码
                  },
                  success: function (res) {
                    //console.log(res);
                    if (res.data.code == 0) {      //请求成功时，返回的code为0
                      wx.showToast({
                        title: '提交成功',
                        duration: 4000,
                        success: function () {
                          var timer = setTimeout(function () {
                            clearTimeout(timer);
                            app.globalData.subState = true;
                            wx.navigateBack({
                              delta: 1
                            });
                          }, 800);
                        }
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: '提交反馈失败',
                        showCancel: false
                      })
                    }
                  },
                  fail: function (err) {
                    //console.log(err);
                    wx.showModal({
                      title: '提示',
                      content: '提交失败，请联系管理员',
                      showCancel: false
                    })
                  }
                })
              
              }

            }
          }
        })
      });

    }else{
      wx.showModal({
        title: '提示',
        content: '项目和反馈内容必填',
        showCancel: false,
        success: function(res){
          //console.log(res);
        }
      })
    }
  
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户所有合同
    var param = {
      requestUrl: app.globalData.linkIp + '/contract/contractlist',
      option: {
        custom_id: app.globalData.loginInfor.loginId
      },
      strCont: 'contractList',
      obj: this
    };
    
    wx.request({
      url: param.requestUrl,
      data: param.option,
      success: function (res) {
        //console.log(res);
        if (res.data.code == 0) {     //请求成功时，返回的code为0
          var requestContent = res.data[param.strCont],
              contractList = [],
              contractListObj = [];
          //console.log(requestContent);
          if (requestContent){
            for (var i = 0; i < requestContent.length; i++) {
              contractList.push(requestContent[i].contractCode);
              contractListObj.push({
                contractName: requestContent[i].contractCode,
                contractId: requestContent[i].id
              });
            }
            this.setData({
              contractList: contractList,
              contractListObj: contractListObj
            });
            //console.log(this.data.contractList);
          }
        }
      }.bind(param.obj)
    })


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