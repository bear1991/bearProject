// pages/person/login/login.js
var util = require('../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //用户手机号输入
  bindUserOpenidInput: function(event){
    //console.log(event);
    var userPhone = event.detail.value;
    if(userPhone){
      /*
      userPhone = userPhone.split('');
      //console.log(userPhone);
      var userPhoneList = [];
      userPhone.forEach(function(item){
        if(item != ' '){    //去除输入内容中的空格空格
          userPhoneList.push(item);
        }
      });
      //console.log(userPhoneList);
      userPhone = userPhoneList.join('');
      */
      userPhone = userPhone.replace(/(^\s*)|(\s*$)/g, '');     //去除输入内容的首尾空格
    }
    //console.log(userPhone);
    //console.log(userPhone.length);
    this.setData({
      userPhone: userPhone
    });
  },

  //用户登录/绑定
  catchLoginsubmitTap: function(){
    //var userAccountInfor = [this.data.userAccount,this.data.userPassword];
    var userAccountInfor = [this.data.userPhone,app.globalData.openid]
    //console.log(userAccountInfor);
    //console.log(app.globalData.avatar);

    //授权获取用户信息验证(强制用户授权)
    if (!app.globalData.avatar) {
      //从第二次进入小程序时，自动提示更改获取用户信息授权
      wx.showModal({
        title: '提示',
        content: '请先授权获取用户信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            //调起客户端小程序设置界面
            wx.openSetting({
              success: function (res) {
                //小程序客户端更改获取用户信息授权
                //console.log('小程序客户端更改同意授权获取用户信息');
                //console.log(res);
                if (res.authSetting['scope.userInfo']) {
                  //授权成功后，调用getUserInfo 获取头像昵称，不会弹框
                  util.getUserInfo(app);
                }
              },
              fail: function (err) {
                //console.log('小程序客户端更改拒绝授权获取用户信息');
                //console.log(err);
              }
            })
          }
        }
      })
      return;
    }

    //验证手机号码
    if(this.data.userPhone){
      var phonePattern = /^1[3|4|5|7|8][0-9]{9}$/;
      if (phonePattern.test(this.data.userPhone)){
        //验证绑定账号，并传递openid
        //console.log(this.data.userPhone, app.globalData.openid);
        wx.request({
          url: app.globalData.linkIp + '/custom/openIdandAvatarupdate',
          data: {
            phone: this.data.userPhone,
            open_id: app.globalData.openid,
            avatar: app.globalData.avatar     //头像
          },
          success: function (res) {
            //console.log(res);    //此处返回数据包含部分账号和用户信息
            if (res.data.code == 0) {     //会员绑定成功
              wx.showToast({
                title: '绑定成功',
                duration: 4000,
                success: function () {
                  util.saveRequest(res,app);     //保存用户信息和请求index主页消息通知
                  var timer = setTimeout(function () {
                    clearTimeout(timer);
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1000);
                }
              });
            } else if (res.data.code == 2){     //非会员绑定失败(手机号在后台中不存在记录)
              wx.showModal({
                title: '提示',
                content: '绑定失败，请先成为庭院会员',
                showCancel: false,
              })
            } else if (res.data.code == 3){
              wx.showModal({
                title: '提示',
                content: '手机号已绑定，请更换手机号绑定',
                showCancel: false
              })
            } else{
              wx.showModal({
                title: '提示',
                content: '绑定失败，请联系管理员',
                showCancel: false
              })
            }
          }
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '请输入有效的手机号码',
          showCancel: false
        })
      }
    }else{
      wx.showModal({
        title: '提示',
        content: '手机号码不能为空',
        showCancel: false
      })
    }

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