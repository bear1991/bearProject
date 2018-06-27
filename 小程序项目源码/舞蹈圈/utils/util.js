// 验证当前是否微信登录和注册会员及相关页面跳转
const validateDirect = function(app){     
  // 验证当前是否已经微信登录
  // console.log(app.globalData.userInfo);
  if(!app.globalData.userInfo.nickName){     // 未进行微信登录时，要求用户授权用户信息
    wx.showModal({
      title: '提示',
      content: '请先进行微信登录',
      success: res => {
        // console.log(res);
        if(res.confirm){
          wx.switchTab({
            url: '../my/my',
            success: res => {
              // console.log(res);
            }
          })
        }
      }
    })
  }else{
    // console.log(app.globalData.userInfo.phoneNum);
    if(!app.globalData.userInfo.phoneNum){
      wx.showModal({
        title: '提示',
        content: '您不是会员，请先注册',
        success: res => {
          // console.log(res);
          if(res.confirm){
            wx.navigateTo({
              url: '../register/register',
              success: res => {
                // console.log(res);
              }
            })
          }
        }
      })
    }else{
      return true;
    }
  }
}


// 请求比赛/活动详情数据
const activityDetailData = function (detailUrl, matchid, userid, detailCb){
  wx.request({
    url: detailUrl,
    method: 'POST',
    data: getJsonData({
      'matchid': matchid,
      'userid': userid
    }),
    success: res => {
      // console.log(res);
      if (res.data.success) {
        detailCb && detailCb(res);
      } else {
        showInfo(res.data.msg);
      }
    }
  })
}


// 请求比赛/活动评论数据
const commentData = function (app, This){
  wx.request({
    url: app.globalData.linkIp + 'getCommentList.do',
    method: 'POST',
    data: getJsonData({
      'matchid': This.data.matchid,
      'pageIndex': This.data.commentPageIndex,
      'userid': app.globalData.userInfo.uid
    }),
    success: res => {
      // console.log(res);
      if (res.data.success) {
        var commentData = This.data.commentTemData.commentData;    // 原有评论数据

        var newCommentData = res.data.data;    // 新页评论数据
        newCommentData.forEach((item,index) => {
          item.create_time = formatCommentTime(item.create_time);
          if (item.avatar.substr(0, 4) != "http") {
            item.avatar = '../../images/my/ic_default_head.png';
          }
        });
        // console.log(newCommentData);
        commentData.push(...newCommentData);   // 将新评论数据加入commentData中
        // console.log(commentData);

        var commentTemData = {
          linkIpUpload: app.globalData.linkIpUpload,    // 保存头像显示的网络地址头部
          newCommentDataLength: res.data.replycount,     // 保存最新请求页的评论数据
          commentData    // 保存评论列表数据
        } 
        This.setData({
          commentTemData
        });
      } else {
        showInfo(res.data.msg);
      }
    }
  })
}


// 评论点赞/取消点赞    
const comAction = function(e, app){
  var data = {
    'replyid': e.currentTarget.dataset.index,
    'userid': app.globalData.userInfo.uid
  };
  if (e.currentTarget.dataset.flag == '0') {    // 当前未点赞
    // 点赞
    var url = app.globalData.linkIp + 'likeComment.do';
    var commentCb = () => {
      // 同步更新commentTemData中数据
      var commentData = this.data.commentTemData.commentData;
      commentData.forEach((item, index) => {
        if (item.id == e.currentTarget.dataset.index) {
          item.flag = '1';
          item.praise_num++;
        }
      });
      this.setData({
        'commentTemData.commentData': commentData
      });
    }
  } else {    // 当前已点赞
    // 取消点赞
    var url = app.globalData.linkIp + 'cancelLikeComment.do';
    var commentCb = () => {
      // 同步更新commentTemData中数据
      var commentData = this.data.commentTemData.commentData;
      commentData.forEach((item, index) => {
        if (item.id == e.currentTarget.dataset.index) {
          item.flag = '0';
          item.praise_num--;
        }
      });
      this.setData({
        'commentTemData.commentData': commentData
      });
    }
  }
  praiseAction(url, data, commentCb);
}   


// 点赞/取消点赞公共函数
const praiseAction = function (url, data, cb){
  wx.request({
    url,
    method: 'POST',
    data: getJsonData(data),
    success: res => {
      // console.log(res);
      if (res.data.success) {   // 点赞成功
        cb && cb();
      }else{
        showInfo(res.data.msg);
      }
    }
  })
}
/**
 * 网络请求公用方法
 */
const fetchUtil = function (url, data, callback) {
  wx.request({
    url,
    method: 'POST',
    data: getJsonData(data),
    success: res => {
      // console.log(res.data);
      if (res.data.success) {
        callback && callback(res.data);
      } else {
        showInfo(res.data.msg);
      }
    }
  })
}

/**
 * 网络请求公用方法
 */
const fetchUtilWithDataContainsArray = function (url, data, callback) {
  wx.request({
    url,
    method: 'POST',
    data: getJsonArrayData(JSON.stringify(data)),
    success: res => {
      // console.log(res.data);
      if (res.data.success) {
        callback && callback(res.data);
      } else {
        showInfo(res.data.msg);
      }
    }
  })
}

// 格式化时间
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatCommentTime(date){
  // console.log('createTime:' + date);
  var currentDate = new Date();
  var time = currentDate.getTime();
  // console.log('time:' + time);
  var offset = time - date*1000;
  // console.log('offset:'+offset);
  //一天有多少秒
  var daymin = 24 * 60 * 60 * 1000;
  //间隔天数
  var days = offset / daymin;
  if (parseInt(days) > 0) {
    if (days == 1) {
      return "昨天";
    }
    return parseInt(days) + "天前";
  } else {
    var h = offset / (60 * 60 * 1000);
    if (h > 0) {
      return parseInt(h) + "小时前";
    } else {
      var m = offset / (60 * 1000);
      return parseInt(m) + "分钟前";
    }
  }
}


// showModal弹窗信息提示
const showInfo = function(msg){
  wx.hideLoading();
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false
  })
}


// 无数据加载时提示
const showNoData = function(cont){
  wx.showLoading({
    title: cont
  });
  var timer = setTimeout(() => {
    clearTimeout(timer);
    wx.hideLoading();
    wx.navigateBack();
  }, 1200);
}


// RSA加签
const dataFormat = {
  RSA: require('./wxapp_rsa.js'),
  key: '-----BEGIN RSA PRIVATE KEY-----'+
    'MIICXQIBAAKBgQCY5oWksTNfsKUehl0J+cCoZZPP6s + SiRBJ1TU5AZ0gGD8u + oqX' +
    'BksI6nr7+1JLY4lSqtK/OPwDfQqlXeJ5hMfCT1o4KZqGSHKT/HO0QzRKgftbDQrP'+
    'kOpxsHszrkrYfvB4eLuh4bcSA8SeYJn9SK287AAiPeYLzGS2V8fmuaNplwIDAQAB'+
    'AoGASAhaL8OXm14h/ CZ60IdL / 0mTgGF0FunhtZbvcwLSnlst8Rjxj8LUOMgW1n2J'+
    'QKENAdgeXx4ehBo1mMCJQIyQerzi84thHcTJvjvjFjjcE7P0BS1D+ 0zjq0nPjh19'+
    'ivf1G6JB/ hWkaNUdJ2 / SKpi020FzwVtujwTXEZQPTgDX9VECQQDLFzbIj1QDu8vd'+
    'V1w3tmf9AsW401iIwwP59MHSgDltSzOasgPK9TvwQuY9QIvbjzGvSYpPvE2pGB/r'+
    'w6KpyfCfAkEAwLv1S63qcKE7YFy1vUAswuCth4xKZDkaxOdn+YcTNCu187kSMqEM'+
    'NyCJ0m1668sGIZVYnWmw+dloK8APOi2MCQJBAK5lJ8j / syBlokFWpDy / KPrN56W3'+
    '7t25wO9iaxHsw+ ODYTPky3b8MVU2zWkpxS9r / jlMiDXCOFoM + lRFMahlXXcCQQCp'+
    'iW0ICk9Mjfd+F29irz3wmtTqhFS3 / qd2h5wlmlUhMkYWwzinwpTNNVkm + lkDa47U'+
    'IdxWc69SyJRiz8pVQdWJAkBtbdKoZ62oXYozBbNsjsy539yvG32nVvledOhOyn4D'+
    'g3o7PA5C3wh4LxjlqM5L9i0+ Rj9UT00lY + XoOkH2tSEn'+
    '-----END RSA PRIVATE KEY-----',
  requestJSEncrypt: function (requestStr) {
    // console.log(requestStr);
    var sign_rsa = new this.RSA.RSAKey();
    sign_rsa = this.RSA.KEYUTIL.getKey(this.key);
    // console.log('签名RSA:' + JSON.stringify(sign_rsa));
    var hashAlg = 'sha256';
    var hSig = sign_rsa.signString(requestStr, hashAlg);
    hSig = this.RSA.hex2b64(hSig); // hex 转 b64
    // console.log("签名结果：" + hSig)
    return hSig;
  }
}

// 接口请求数据规范
const getJsonData = function (data) {
  // console.log(data, dataFormat.requestJSEncrypt(JSON.stringify(data)));
  return {
    'json': data,
    'sign': dataFormat.requestJSEncrypt(JSON.stringify(data))
  }
}
const getJsonArrayData = function (data) {
  return {
    'json': data,
    'sign': dataFormat.requestJSEncrypt(data)
  }
}

module.exports = {
  validateDirect,
  activityDetailData,
  commentData,
  comAction,
  praiseAction,
  showInfo,
  showNoData,
  getJsonData,
  getJsonArrayData,
  formatTime,
  formatCommentTime,
  fetchUtil,
  fetchUtilWithDataContainsArray,
}