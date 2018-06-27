//app.js     
var util = require('./utils/util.js');

App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    //授权并获取用户信息
    wx.getSetting({
      success: function (res) {
        //console.log('查看用户相关授权信息');
        //console.log(res);
        if (res.authSetting['scope.userInfo']) {
          //console.log('获取用户信息已授权');
          // 已授权，直接调用getUserInfo获取头像昵称，不会弹框
          util.getUserInfo(this);
        } else {
          //console.log('获取用户信息未授权');
          var This = this;
          //如果未授权，调用authorize进行授权操作(弹窗授权）
          //第一次调用时有效，当第一次操作为取消授权后，以后重新进入小程序，就不再出现授权弹窗，
          //需要重新调用openSetting方法，调起客户端小程序设置界面更改授权
          wx.authorize({
            scope: 'scope.userInfo',
            success(res) {
              //console.log('调用授权获取用户信息弹窗成功');
              //console.log(res);
              //授权成功后，调用getUserInfo 获取头像昵称，不会弹框
              util.getUserInfo(This);
            },
            fail: function (err) {
              //console.log('调用授权获取用户信息弹窗失败');
              //console.log(err);
            }
          })
        }
      }.bind(this)
    })


    //登录
    wx.login({
      success: function (res) {
        //console.log(res);
        if(res.code){    
          //传递code到后台，后台从'https://api.weixin.qq.com/sns/jscode2session'中获取openid返回到前台
          wx.request({
            url: this.globalData.linkIp + '/open/openIdGet',
            data: {
              code: res.code
            },
            success: function(res){
              //console.log(res);
              //检测openid是否存在
              if (res.data.Openid){
                var openid = res.data.Openid;
                //console.log(openid);
                //console.log(this.globalData.linkIp + '/custom/customInfo');
                //将openid保存在全局变量中
                this.globalData.openid = openid;
                wx.request({
                  url: this.globalData.linkIp + '/custom/customInfo',
                  data: {
                    open_id: openid
                  },
                  success: function (res) {
                    //console.log(res);    //此处返回数据包含部分账号和用户信息
                    if (res.data.code == 0) {     //请求成功时，返回的code为0
                      if (res.data.customFamilyMember == null && res.data.custom == null) {
                        //console.log('未绑定');
                        //console.log(this.globalData.openid);
                        
                        this.globalData.loginInfor.loginState = false;
                      } else {
                        //console.log('已绑定');
                        util.saveRequest(res, this);    //保存用户信息和请求index主页消息通知
                      }
                      this.globalData.displayWaitPage = false;
                      this.globalData.showIndexPage = true;
                      //console.log(1);
                    }else{
                      this.globalData.displayWaitPage = false;
                      this.globalData.exitPage = true;
                      this.globalData.waitMessage = '请求信息失败，请联系管理员';
                    }
                  }.bind(this)
                })
              }else{
                this.globalData.displayWaitPage = false;
                this.globalData.exitPage = true;
                this.globalData.waitMessage = '加载异常，请退出重新加载';
              }
              
            }.bind(this)
          })
          
        }else{
          //console.log('获取用户登录态失败！' + res.errMsg)
          wx.showModal({
            title: '提示',
            content: '获取登录态失败，请重新进入',
            showCancel: false
          })
        }
      }.bind(this)
    });

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },

  //app.js中可以定义全局变量和全局函数
  globalData: {
    //linkIp: 'http://192.168.2.106:8080/gadmin-api',      //保存项目域名
    linkIp: 'https://phone.ntczyl.com/gadmin-api',      //保存项目域名

    openid: '',     //保存用户微信账号关联的openid,
    avatarUrl: '',    //保存用户微信关联头像
    
    loginInfor:{
      loginState: false,     //保存登录绑定状态
      loginId: 0       //保存用户身份id
    },

    showIndexPage: false,      //保存初始进入小程序时不显示实际内容(false)
    displayWaitPage: true,     //保存初始进入小程序时显示等待提示

    exitPage: false,      //保存加载异常时显示加载异常，重新进入提示
    waitMessage: '',      //保存异常情况的提示内容
    
    noticeMessage: [],    //保存消息通知

    loginDetailInfor: {},    //保存登录账号信息
    userDetailInfor:{},    //保存用户信息
    towerList:[],      //保存小区门牌号信息

    subState: false     ////保存我的预约/服务反馈/任务确认提交返回
  }
})
