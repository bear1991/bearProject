//app.js
const util = require('./utils/util.js');

App({
  data:{
    goodsdetail:{}
  },
  onLaunch: function (options) {
    // console.log(options);

    // 请求用户信息(用户未授权时，需要请求授权)
    wx.getSetting({     // 获取用户授权信息
      success: res => {
        // console.log('查看用户相关授权信息');
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          console.log('获取用户信息已授权');
          // 已授权，直接调用getUserInfo获取头像昵称，不会弹框
          this.globalFunction.getUserInfo(this);
        } else {
          // console.log('获取用户信息未授权');
          
          /*
          // 如果未授权，调用authorize进行授权操作(弹窗授权）
          wx.authorize({
            scope: 'scope.userInfo',
            success: res => {
              // console.log('调用授权获取用户信息弹窗成功');
              console.log(res);
              // 授权成功后，调用getUserInfo 获取头像昵称，不会弹框
              this.globalFunction.getUserInfo(this);
            },
            fail: err => {
              // console.log('调用授权获取用户信息弹窗失败');
              // console.log(err);
            }
          })
          */
        }
      }
    })
  },
  onShow: function (options){
    // console.log(options);
  },
  onHide: function(){

  },
  onError: function(msg){
    console.log(msg);
  },
  globalData: {   // 全局数据
    // 喻
    // linkIp: 'http://192.168.2.181:8080/rootz/mobile/',
    // linkIpUpload: 'http://192.168.1.182:8080/roots',

    // linkIp: 'http://192.168.2.181:8080/rootz/mobile/',
    // linkIpUpload: 'http://192.168.2.182:8080/roots',


    // linkIp: 'http://192.168.1.104:8080/rootz/mobile/',
    // linkIpUpload: 'http://192.168.2.182:8080/roots',


    // linkIp: 'http://192.168.2.129:8080/roots/mobile/',
    // linkIpUpload: 'http://192.168.2.129:8080/roots',


    // 褚
    linkIp: 'https://api.rootz-asia.com/rootz/mobile/',
    linkIpUpload: 'https://api.rootz-asia.com/rootz',

    // linkIp: 'https://api.rootz-asia.com/rootz/mobile/',   // 项目接口地址公共部分
    // linkIpUpload: 'https://api.rootz-asia.com/rootz/',     // 文件上传地址

    userInfo: {},     // 保存用户基本信息
  
    wxLogin: false,      // 保存登录状态   true： 已登录
    
  },
  globalFunction: {   // 全局函数
    scopeUserInfo: (This, cb) => {
      wx.showModal({
        title: '提示',
        content: '请授权获取用户信息',
        success: res => {
          // console.log(res);
          if(res.confirm){     // 确定
            /*
              第一次调用时有效，当第一次操作为取消授权后，以后重新进入小程序，就不再出现授权弹窗，
              需要重新调用openSetting方法，调起客户端小程序设置界面更改授权
            */
            // 调起客户端小程序设置界面更改授权
            wx.openSetting({
              success: res => {
                // console.log('客户端小程序设置界面更改授权');
                // console.log(res);
                if (res.authSetting['scope.userInfo']) {
                  // console.log('客户端小程序设置界面授权成功');
                  // 授权成功后，调用getUserInfo 获取头像昵称，不会弹框
                  This.globalFunction.getUserInfo(This, cb);
                } else {
                  // console.log('客户端小程序设置界面直接返回，未授权');
                }
              }
            })
          }
        }
      })
    },

    getUserInfo: (This, cb) => {    // 获取用户信息(头像、昵称、性别、手机等)
      wx.getUserInfo({
        withCredentials: true,
        success: res => {
          console.log(res.userInfo);

          // 保存用户基本信息
          This.globalFunction.getUserInfo1(res.userInfo, This, cb);
        }
      })
    },

    getUserInfo1: (userInfo, This, cb) => {    // 保存用户基本信息
      for (var key in userInfo) {
        This.globalData.userInfo[key] = userInfo[key];
      }
      This.globalData.wxLogin = true;
      // console.log(This.globalData.userInfo);

      // 登录，请求后台数据，判断当前用户是否是会员
      wx.login({
        success: res => {
          // console.log(res);
          // 通过code请求服务器用户数据
          wx.request({
            url: This.globalData.linkIp + 'xcxLogin.do',
            method: 'POST',
            data: util.getJsonData({
              'code': res.code
            }),
            success: res => {
              // console.log(res);
              if (res.data.success) {
                This.globalData.userInfo.openid = res.data.data.openid;    // 保存用户openid
                if (res.data.flag) {    // 用户是会员
                  This.globalData.userInfo.phoneNum = res.data.data.azOauthUser.mobile;     // 保存用户手机
                  This.globalData.userInfo.uid = res.data.data.azOauthUser.uid;     // 保存用户序号(uid)

                  // 同步服务器中用户名称和头像
                  wx.request({
                    url: This.globalData.linkIp + 'ajaxupdateNicknameAndheadimg.do',
                    method: 'POST',
                    data: util.getJsonData({
                      'name': This.globalData.userInfo.nickName,
                      'head_img': This.globalData.userInfo.avatarUrl,
                      'openid': This.globalData.userInfo.openid
                    }),
                    success: res => {
                      // console.log(res);
                      if (res.data.success) {
                        cb && cb();
                      } else {
                        util.showInfo(res.data.msg);
                      }
                    }
                  })
                } else {    // 用户信息不存在，不是会员
                  cb && cb();
                }
              } else {
                util.showInfo(res.data.msg);
              }
            }
          })
        }
      })
    }

  }
})