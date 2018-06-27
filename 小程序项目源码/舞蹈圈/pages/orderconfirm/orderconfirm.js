//获取应用实例
var app = getApp()
const util = require('../../utils/util.js');
Page({
  data: {
    orderType:'buyNow',
    curAddressData:{},
    goodsList:[],
    totalPrice:0,
    comment:''
  },

  onShow: function () {
    var that = this;
    var shopList = [];
    //立即购买下单
    if ("buyNow" == that.data.orderType) {
      var buyNowInfoMem = wx.getStorageSync('buynowdata');
      
      if (buyNowInfoMem && buyNowInfoMem.data) {
        shopList = buyNowInfoMem.data
      }
    } else {
      //购物车下单
      var shopCarInfoMem = wx.getStorageSync('cardata');
      if (shopCarInfoMem && shopCarInfoMem.data) {
        // shopList = shopCarInfoMem.shopList
        shopList = shopCarInfoMem.data.filter(entity => {
          return entity.active;
        });
      }
    }
    that.data.goodsList = shopList;
    that.setGoodsList(that.totalPrice(), shopList);
    var selectedaddressdata = wx.getStorageSync("selectedaddressdata");
    if (selectedaddressdata){
      that.setData({
        curAddressData: selectedaddressdata,
      });
    }else{
      //获取默认地址
      that.getDefaultAddress();
    }
    
  },

  //获取用户输入的用户名
  commentInput: function (e) {
    this.setData({
      comment: e.detail.value
    })
  },
  //公共函数
  /**
   * 获取默认地址
   */
  getDefaultAddress:function(e){
    var that = this;
    var url = app.globalData.linkIp + 'getDefaultAddress.do';
    var data = {
      userid: app.globalData.userInfo.uid,
    };
    console.log(data);
    var callback = (res) => {
      if (res.success == 1) {
        var defaultAddress = res.data;
        console.log(res);
        that.setData({
          curAddressData: defaultAddress,
        });
      }
    };
    util.fetchUtil(url, data, callback);
  },
  jiaBtnTap: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var list = that.data.goodsList;
    if (index !== "" && index != null) {
      // 添加判断当前商品购买数量是否超过当前商品可购买库存
      list[parseInt(index)].num++;
      this.setGoodsList(that.totalPrice(),list);
      if ("buyNow" == that.data.orderType) {
        //立即购买
        var buyNowInfoMem = wx.getStorageSync('buynowdata');

        if (buyNowInfoMem && buyNowInfoMem.data) {
          buyNowInfoMem.data = list;
          this.saveBuyNowInfoToStorage(buyNowInfoMem)
        }
      }else{
        //跟新购物车
        this.fetchAddCar(list[parseInt(index)].goodsid, list[parseInt(index)].price, list[parseInt(index)].num, list[parseInt(index)].id);
      }
    }
  },
  //减数量
  jianBtnTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList;
    if (index !== "" && index != null) {
      if (list[parseInt(index)].num > 1) {
        list[parseInt(index)].num--;
        this.setGoodsList(this.totalPrice(),list);
        if ("buyNow" == that.data.orderType) {
          //立即购买
          var buyNowInfoMem = wx.getStorageSync('buynowdata');

          if (buyNowInfoMem && buyNowInfoMem.data) {
            buyNowInfoMem.data = list;
            this.saveBuyNowInfoToStorage(buyNowInfoMem)
          }
        }else{
          //跟新购物车
          this.fetchAddCar(list[parseInt(index)].goodsid, list[parseInt(index)].price, list[parseInt(index)].num, list[parseInt(index)].id);
        }
        
      }
    }
  },
  totalPrice: function () {
    var list = this.data.goodsList;
    var total = 0;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.active) {
        total += parseFloat(curItem.price) * curItem.num;
      }
    }
    total = parseFloat(total.toFixed(2));//js浮点计算bug，取两位小数精度
    return total;
  },
  setGoodsList: function ( total, list) {
    this.setData({
        totalPrice: total,
        goodsList: list,
    });
  },
  //加入购物车网络请求
  fetchAddCar: function (goodsid, price, num, carid) {
    var shopList = [];
    var fetchUrl = "updateShopingCat.do";
    var shopCarInfoMem = wx.getStorageSync('cardata');
    if (shopCarInfoMem && shopCarInfoMem.data) {
      shopList = shopCarInfoMem.data;
      for (var index in shopList) {
        if (goodsid == shopList[index].goodsid) {
          shopList[index].num = num;
        }
      }
    }

    //更新
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
          //update
          shopCarInfoMem.data = shopList;
          //存入缓存
          this.saveCarInfoToStorage(shopCarInfoMem);
          this.data.goodsList.list = shopList;
          this.setGoodsList(this.totalPrice(), shopList);
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },
  onLoad: function (e) {
    var that = this;
    //显示收货地址标识
    that.setData({
      orderType: e.orderType
    });
  },

  
  addAddress: function () {
    wx.navigateTo({
      url: "/pages/addresslist/addresslist?type=select"
    })
  },
  selectAddress: function () {
    wx.navigateTo({
      url: "/pages/addresslist/addresslist?type=select"
    })
  },
  
  //购物车信息存入缓存
  saveCarInfoToStorage: function (shopCarInfoMem) {
    wx.setStorageSync('cardata', shopCarInfoMem);
  },
  //立即购买信息存入缓存
  saveBuyNowInfoToStorage: function (buyNowInfoMem) {
    wx.setStorageSync('buynowdata', buyNowInfoMem);
  },

//提交订单按钮点击事件
  submitOrder:function(e){
    if (!this.data.curAddressData){
      util.showInfo("请先选择收货地址");
      return;
    }
    var goodsList = this.data.goodsList;
    for (var i = 0;i<goodsList.length;i++){
      goodsList[i].goods_id = goodsList[i].goodsid;
      goodsList[i].title = goodsList[i].goods.name;
      goodsList[i].amount = goodsList[i].num;
      goodsList[i].pic = (JSON.parse(goodsList[i].goods.smeta)).thumb;
    }
    console.log(goodsList);
    this.data.goodsList = goodsList;
    this.addOrder();
  },
  //下单
  addOrder:function(e){
    var that = this;
    var url = app.globalData.linkIp + 'addOrder.do';
    var data = {
      uid: app.globalData.userInfo.uid,
      total_money:that.totalPrice(),
      payway:'',
      payment_id:'',
      comment: that.data.comment,
      receiver: that.data.curAddressData.username,
      tel: that.data.curAddressData.phone,
      post_code: that.data.curAddressData.code,
      province: that.data.curAddressData.province,
      city: that.data.curAddressData.city,
      district: that.data.curAddressData.area,
      address: that.data.curAddressData.address,
      data: that.data.goodsList
    };
    console.log(data);
    var callback = (res) => {
      if (res.success == 1) {
        //下单成功
        if ("buyNow" == that.data.orderType) {
          wx.removeStorageSync("buydata");
        }else{
          var list = this.data.goodsList;
          var buylist = list.filter(function (curGoods) {
            return curGoods.active;
          });
          var otherlist = list.filter(function (curGoods) {
            return !curGoods.active;
          });
          var shopCarInfoMem = wx.getStorageSync('cardata');
          //update
          shopCarInfoMem.data = otherlist;
          //存入缓存
          this.saveCarInfoToStorage(shopCarInfoMem);

          this.data.goodsList = [];
          var order = res.data;
          console.log(order);
          //弹框提示
          wx.showModal({
            title: '下单结果',
            content: '恭喜您下单成功',
            cancelText:'再等等',
            confirmText:'去支付',
            success:function(res){
              if (res.confirm) {
                console.log('用户点击确定')
                //吊起微信支付
              } else if (res.cancel) {
                console.log('用户点击取消')
                //返回上一页
                wx.navigateBack({
                  
                });
              }  
            },
            
          })
        }
        
      }
    };
    util.fetchUtilWithDataContainsArray(url, data, callback);
  }
})
