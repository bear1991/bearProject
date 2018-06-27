//获取用户信息(头像、昵称、性别、手机等)
const getUserInfo = function (param) {
  wx.getUserInfo({
    withCredentials: true,
    success: function (res) {
      //console.log(res);
      var userInfo = res.userInfo,
        nickName = userInfo.nickName,
        avatarUrl = userInfo.avatarUrl,
        gender = userInfo.gender,  //性别 0：未知、1：男、2：女
        province = userInfo.province,
        city = userInfo.city,
        country = userInfo.country;
      var userInfo = [nickName, avatarUrl, gender, province, city, country];
      //console.log(userInfo);
      //授权获取用户信息后，保存用户头像等信息
      this.globalData.avatar = avatarUrl;
      //console.log(this.globalData.avatar);
    }.bind(param)
  })
}


//保存用户信息和请求index主页轮播和通知消息
const saveRequest = function(res,param){
  //console.log(res);
  var loginId = '';

  if (res.data.customFamilyMember != null && res.data.custom == null) {    //当家庭成员登录时，户主信息是在owner字段中
    loginId = res.data.owner.id;

    param.globalData.loginDetailInfor = res.data.customFamilyMember;    //保存账号登录信息
    param.globalData.userDetailInfor = res.data.owner;    //保存用户详细信息
  } else if (res.data.custom != null) {
    loginId = res.data.custom.id;

    param.globalData.loginDetailInfor = res.data.custom;    //保存账号登录信息
    param.globalData.userDetailInfor = res.data.custom;     //保存用户详细信息
  }
  var loginInfor = {
    loginState: true,
    loginId: loginId
  };
  param.globalData.loginInfor = loginInfor;    //保存用户绑定状态和用户身份id到全局变量
  param.globalData.towerList = res.data.towerList     //保存小区、门牌号信息、家庭地址
  //console.log(this.globalData.loginInfor);

  //绑定成功后请求主页index通知消息数据
  wx.request({
    url: param.globalData.linkIp + '/baner/pushCustomMessagelist',
    data: {
      custom_id: param.globalData.loginInfor.loginId
    },
    success: function (res) {
      //console.log(res);
      if (res.data.code == 0) {     //请求成功时，返回的code为0
        var noticeCont = res.data.pushCustomMessageList,     //获取消息通知数据
          noticeMessage = [];

        //消息通知（只在用户已登录状态时获取）
        if (noticeCont && noticeCont.length > 0) {
          for (var i = 0; i < noticeCont.length; i++) {
            if (noticeCont[i].content) {
              noticeMessage.push(noticeCont[i].content);
            }
          }
          //console.log(noticeMessage);
          this.globalData.noticeMessage = noticeMessage;
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '首页信息加载失败',
          showCancel: false
        })
      }
    }.bind(param)
  })
}


//访问地址获取数据
const requestData = function (param, bool) {
  //console.log(param);
  wx.request({
    url: param.requestUrl,
    data: param.option,
    success: function (res) {
      //console.log(res);
      if (res.data.code == 0) {     //请求成功时，返回的code为0
        var requestContent = res.data[param.strCont];
        //console.log(requestContent);
        //console.log(this.data.requestContent);
        //console.log(this.data.searchState);
        if (this.data.searchState){     //搜索结果状态
          this.setData({
            requestContent: requestContent
          });
          wx.hideLoading();     //搜索获取数据成功后消除搜索提示样式

        }else{     //普通列表状态
          if (!this.data.requestContent) {
            //console.log('初始化');
            if (bool) {
              this.setData({
                requestContentClone: requestContent
              });
            }
            this.setData({
              requestContent: requestContent
            });
            wx.hideNavigationBarLoading();     //初始进入页面，数据获取成功后消除导航加载样式
          } else {
            if (requestContent.length != this.data.requestContent.length) {
              //console.log('有变化');
              wx.showLoading({
                title: this.data.showLoadingCont
              })
              if (bool) {
                this.setData({
                  requestContentClone: requestContent
                });
              }
              if(this.data.now == 1){
                this.data.requestAllState = false;
              }
              this.setData({
                requestContent: requestContent
              });
            } else {
              //console.log('无变化');
              if (this.data.now !== 1) {
                wx.showLoading({      //全部加载完成后第n=1次弹出
                  title: '已加载全部',
                  success: function () {
                    var requestAllTimer = setTimeout(function () {
                      wx.hideLoading();
                      clearTimeout(requestAllTimer);
                    }, 600);
                  }
                })
                this.setData({
                  now: this.data.now - 1
                }); 
                this.data.requestAllState = true;
              }else{
                wx.showLoading({
                  title: this.data.showLoadingCont
                })
              }
            }
          } 
        }

        wx.stopPullDownRefresh();     //停止页面下拉刷新
        var delayTimer = setTimeout(function(){
          wx.hideLoading();     //隐藏加载等待
          clearTimeout(delayTimer);
        },600);
      }else {
        wx.showModal({
          title: '提示',
          content: '获取页面信息失败',
          showCancel: false
        })
      }
    }.bind(param.obj)
  })
}


//submit提交返回上一级页面，监听页面显示
const onShow = function (app,cb) {
  if (app.globalData.subState) {
    app.globalData.subState = false;
    cb&&cb();
    var options = {
      custom_id: app.globalData.loginInfor.loginId,
      now: 1
    };
    this.dataContent(options, true);
  }
}


//下拉刷新
const onPullDownRefresh = function (options) {
  if (!this.data.searchState) {
    this.setData({
      showLoadingCont: '刷新中',
      now: 1
    });
    this.dataContent(options, true);
  } else {
    wx.stopPullDownRefresh();
  }
}


//上拉触底
const onReachBottom = function (options) {
  if (!this.data.searchState) {
    if (!this.data.requestAllState) {
      var now = this.data.now + 1;
      this.setData({
        showLoadingCont: '加载中',
        now: now
      });
      this.dataContent(options, true);
    } else {
      wx.showLoading({
        title: '已加载全部',
        success: function () {
          var requestAllTimer = setTimeout(function () {
            wx.hideLoading();
            clearTimeout(requestAllTimer);
          }, 600);
        }
      })
    }
  }
}



//抛出公共函数方法
module.exports = {
  saveRequest: saveRequest,
  requestData: requestData,
  getUserInfo: getUserInfo,
  onShow: onShow,
  onPullDownRefresh,
  onReachBottom: onReachBottom
}
