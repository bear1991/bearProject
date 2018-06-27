// pages/register/register.js

const app = getApp();   // 获取应用实例
const util = require('../../utils/util.js');
const md5 = require('../../utils/md5.js');      // 引入MD5功能函数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeStatus: false,     // 保存是否获取验证码状态
    codeText: "获取验证码",     // 保存获取验证码按钮显示

    inputData: {
      mobile: 0,    // 保存手机号码
      password: '',     // 保存密码
      verificationCode: ''     // 保存验证码
    }
  },

  // 事件处理函数
  // 获取并保存输入数据(手机/密码/验证码)
  inputBindinput: function(e){
    // console.log(e);
    var typeAttr = e.currentTarget.dataset.type;
    var cont = e.detail.value.replace(/(^\s*)|(\s*$)/g, '');
    var inputData = this.data.inputData;
    inputData[typeAttr] = cont;
    this.setData({
      inputData
    });
    // console.log(this.data.inputData);
  },
  // 获取验证码
  codeCatchtap: function(){
    if(!this.data.codeStatus){
      var mobile = this.data.inputData.mobile;
      var phonePattern = /^1[3|4|5|6|7|8][0-9]{9}$/;
      // 验证手机号
      if (!mobile || !phonePattern.test(mobile)) {
        util.showInfo('请输入正确手机号');
      } else {
        wx.request({
          url: app.globalData.linkIp + 'getphonenumcode.do',
          method: 'POST',
          data: util.getJsonData({
            'phoneNum': mobile
          }),
          success: res => {    // 获取验证码成功
            // console.log(res);
            if (res.data.success) {
              this.setData({
                codeStatus: true
              }, () => {
                this.codeCallback(45);    // 进行倒计时
              });
            } else {
              util.showInfo(res.data.msg);
            }
          }
        })
      }
    }  
  },

  // 验证码倒计时方法
  codeCallback: function (codeTime){
    var timer = setTimeout(() => {
      // console.log(codeTime);
      if (codeTime != 0) {
        this.setData({
          codeText: "倒计时" + (codeTime < 10 ? '0' + codeTime : codeTime) + "s"
        }, () => {
          this.codeCallback(codeTime);
        });
      } else {
        clearTimeout(timer);
        this.setData({
          codeStatus: false,
          codeText: '重新获取'
        });
      }
      codeTime--;
    }, 1000);
  },

  // 注册会员
  registerCatchtap: function(){
    var userInfo = app.globalData.userInfo;
    var inputData = this.data.inputData;
    // console.log(userInfo);
    // 验证注册信息都不能为空值
    for (var key in inputData){
      if (!inputData[key]){
        util.showInfo('请将注册信息填写完整');
        return;
      }
    }
    // 提交注册信息
    wx.request({
      url: app.globalData.linkIp + 'xcxPerfectDn.do',
      method: 'POST',
      data: util.getJsonData({
        'name': userInfo.nickName,
        'head_img': userInfo.avatarUrl,
        'openid': userInfo.openid,
        'mobile': inputData.mobile,     // 密码加密：'###'+两层md5.hex_md5加密
        'password': '###' + md5.hex_md5(md5.hex_md5(inputData.password)),
        'verificationCode': inputData.verificationCode
      }),
      success: res => {
        // console.log(res);
        if(res.data.success){
          app.globalData.userInfo.phoneNum = res.data.data.mobile;    // 注册完成后，将手机号保存到全局数据中
          wx.navigateBack({
            delta: 1
          })
        }else{
          util.showInfo(res.data.msg);
        }
      }
    })
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