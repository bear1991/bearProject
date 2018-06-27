function wxpay(app,orderId, redirectUrl) {
  wx.request({
    url: app.globalData.linkIp + 'orderpay.do',
    data: {
      userid: app.globalData.userInfo.uid,
      orderid:orderId,
      paycode:"wechatapp"
    },
    //method:'POST',
    success: function(res){
      if (res.data.success == 1){
        // 发起支付
        wx.requestPayment({
          timeStamp: res.data.timestamp,
          nonceStr: res.data.noncestr,
          package: 'prepay_id=' + res.data.prepayid,
          signType:'MD5',
          paySign: res.data.sign,
          fail:function (aaa) {
            wx.showToast({title: '支付失败:' + aaa})
          },
          success:function () {
            wx.showToast({title: '支付成功'})
            wx.redirectTo({
              url: redirectUrl
            });
          }
        })
      } else {
        wx.showToast({ title: '服务器忙' + res.data.code + res.data.msg})
      }
    }
  })
}

module.exports = {
  wxpay: wxpay
}
