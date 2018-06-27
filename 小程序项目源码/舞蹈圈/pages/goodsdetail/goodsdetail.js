// pages/goodsdetail/goodsdetail.js

var app = getApp();
const util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsdetail:{},//商品详情数据
    bannerPicData:[]//轮播图
  },
  addCarBtnClicked:function(e){
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      this.fetchAddCar();
    }
  },
  buyBtnClicked: function (e) {
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      var goods = this.data.goodsdetail;
      var goodsid = goods.id;
      var price = goods.price
      var num = 1;
      var id = 0;
      var uid = app.globalData.userInfo.uid;
      var ctime = (Date.parse(new Date()))/1000;
      var updatetime = (Date.parse(new Date())) / 1000;
      var buyNowInfoMem = {"data":[{
        "goodsid": goodsid,
        "num": num,
        "price": price,
        "ctime": ctime,
        "updatetime": updatetime,
        "id": id,
        "uid": uid,
        "active":true,
        "goods": goods
      }]}
      this.saveBuyNowInfoToStorage(buyNowInfoMem);
      wx.removeStorageSync("selectedaddressdata");//删除地址信息
      wx.navigateTo({
        url: "/pages/orderconfirm/orderconfirm?orderType=buyNow"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.data.goodsdetail);
    var goodsdetail = app.data.goodsdetail;
    var smeta = JSON.parse(goodsdetail.smeta);
    var bannerPicData = [];
    bannerPicData.push(smeta.thumb);
    for (var index in smeta.photo) {
      bannerPicData.push(smeta.photo[index].url);
    }
    // 解析富文本内容
    var article = goodsdetail.content;
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    WxParse.wxParse('article', 'html', article, this, 20);
    //配置小表情emojis
    WxParse.emojisInit('[]', "../../wxParse/emojis/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "100.gif",
      "12": "101.gif",
      "13": "102.gif",
      "14": "103.gif",
      "15": "104.gif",
      "16": "105.gif",
      "17": "106.gif",
      "18": "107.gif",
      "19": "108.gif",
      "20": "109.gif",
      "21": "11.gif",
      "22": "110.gif",
      "23": "111.gif",
      "24": "112.gif",
      "25": "113.gif",
      "26": "114.gif",
      "27": "115.gif",
      "28": "116.gif",
      "29": "117.gif",
      "30": "118.gif",
      "31": "119.gif",
      "32": "12.gif",
      "33": "120.gif",
      "34": "121.gif",
      "35": "122.gif",
      "36": "123.gif",
      "37": "124.gif",
      "38": "125.gif",
      "39": "126.gif",
      "40": "127.gif",
      "41": "128.gif",
      "42": "129.gif",
      "43": "13.gif",
      "44": "131.gif",
      "45": "132.gif",
      "46": "133.gif",
      "47": "134.gif",
      "48": "14.gif",
      "49": "15.gif",
      "50": "16.gif",
      "51": "17.gif",
      "52": "18.gif",
      "53": "19.gif",
      "54": "20.gif",
      "55": "21.gif",
      "56": "22.gif",
      "57": "23.gif",
      "58": "24.gif",
      "59": "25.gif",
      "60": "26.gif",
      "61": "27.gif",
      "62": "28.gif",
      "63": "29.gif",
      "64": "30.gif",
      "65": "31.gif",
      "66": "32.gif",
      "67": "33.gif",
      "68": "34.gif",
      "69": "35.gif",
      "70": "36.gif",
      "71": "37.gif",
      "72": "38.gif",
      "73": "39.gif",
      "74": "40.gif",
      "75": "41.gif",
      "76": "42.gif",
      "77": "43.gif",
      "78": "44.gif",
      "79": "45.gif",
      "80": "46.gif",
      "81": "47.gif",
      "82": "48.gif",
      "83": "49.gif",
      "84": "50.gif",
      "85": "51.gif",
      "86": "52.gif",
      "87": "53.gif",
      "88": "54.gif",
      "89": "55.gif",
      "90": "56.gif",
      "91": "57.gif",
      "92": "58.gif",
      "93": "59.gif",
      "94": "60.gif",
      "95": "61.gif",
      "96": "62.gif",
      "97": "63.gif",
      "98": "64.gif",
      "99": "65.gif",
      "100": "66.gif",
      "101": "67.gif",
      "102": "68.gif",
      "103": "69.gif",
      "104": "70.gif",
      "105": "71.gif",
      "106": "72.gif",
      "107": "73.gif",
      "108": "74.gif",
      "109": "75.gif",
      "110": "76.gif",
      "111": "77.gif",
      "112": "78.gif",
      "113": "79.gif",
      "114": "80.gif",
      "115": "81.gif",
      "116": "82.gif",
      "117": "83.gif",
      "118": "84.gif",
      "119": "85.gif",
      "120": "86.gif",
      "121": "87.gif",
      "122": "88.gif",
      "123": "89.gif",
      "124": "90.gif",
      "125": "91.gif",
      "126": "92.gif",
      "127": "93.gif",
      "128": "94.gif",
      "129": "95.gif",
      "130": "96.gif",
      "131": "97.gif",
      "132": "98.gif",
      "133": "99.gif",
      "134": "130.gif"
    });
    this.setData({
      goodsdetail,
      bannerPicData
    });
  },

  //加入购物车网络请求
  fetchAddCar: function () {
    var goods = this.data.goodsdetail;
    var goodsid = goods.id;
    var price = goods.price

    var shopList = [];
    var isNew = true;
    var num = 1;
    var fetchUrl = "addShopingCat.do";
    var carid = 0;
    var shopCarInfoMem = wx.getStorageSync('cardata');
    if (shopCarInfoMem && shopCarInfoMem.data) {
      shopList = shopCarInfoMem.data;
      for (var index in shopList) {
        if (goodsid == shopList[index].goodsid) {
          shopList[index].num = shopList[index].num + 1;
          num = shopList[index].num;
          isNew = false;
          carid = shopList[index].id;
          fetchUrl = "updateShopingCat.do";
        }
      }
    }
    //新增或更新
    wx.request({
      url: app.globalData.linkIp + fetchUrl,
      method: 'POST',
      data: util.getJsonData({
        'id': carid,
        'uid': app.globalData.userInfo.uid,
        'goodsid': goodsid,
        'num': num,
        'price': price
      }),
      success: res => {
        console.log(res);
        if (res.data.success) {
          if (isNew) {
            //新增
            if (shopCarInfoMem && shopCarInfoMem.data) {
              var car = res.data.data;
              car.goods = goods;
              shopList.push(car);
              shopCarInfoMem.data = shopList;
              //购物车信息存入缓存
              this.saveCarInfoToStorage(shopCarInfoMem);
            }
          } else {
            //update
            shopCarInfoMem.data = shopList;
            //购物车信息存入缓存
            this.saveCarInfoToStorage(shopCarInfoMem);
          }
          this.jumpToCarDetail();
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },
  //跳转到购物车
  jumpToCarDetail: function (e) {
    wx.navigateTo({
      url: "/pages/shoppingcar/shoppingcar"
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
  
  },

  //购物车信息存入缓存
  saveCarInfoToStorage: function (shopCarInfoMem) {
    wx.setStorageSync('cardata', shopCarInfoMem);
  },

  //立即购买信息存入缓存
  saveBuyNowInfoToStorage: function (buyNowInfoMem) {
    wx.setStorageSync('buynowdata', buyNowInfoMem);
  }
})