const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');
Page({
  data: {
    goodsList: {
      saveHidden: true,
      totalPrice: 0,
      totalScoreToPay: 0,
      allSelect: true,
      noSelect: false,
      list: []
    },
    delBtnWidth: 120,    //删除按钮宽度单位（rpx）
  },

  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);  //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  onLoad: function (options) {
    this.initEleWidth();
    // this.onShow();
  },
  onShow: function () {
    
    var shopList = [];
    var shopCarInfoMem = wx.getStorageSync('cardata');
    if (shopCarInfoMem && shopCarInfoMem.data){
      shopList = shopCarInfoMem.data;
      this.data.goodsList.list = shopList;
      this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), shopList);
    }else{
      // 获取购物车数据
      wx.request({
        url: app.globalData.linkIp + 'getShopingCats.do',
        method: 'POST',
        data: util.getJsonData({
          'userid': app.globalData.userInfo.uid
        }),
        success: res => {
          if (res.data.success) {
            if(res.data.data.length > 0){
              shopCarInfoMem = res.data;
              console.log(shopCarInfoMem);
              //购物车信息存入缓存
              this.saveCarInfoToStorage(shopCarInfoMem);
              shopList = shopCarInfoMem.data
              this.data.goodsList.list = shopList;
            }
            
            this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), shopList);
          } else {
            util.showInfo(res.data.msg);
          }
        }
      })
    }
   
  },
  toIndexPage: function () {
    wx.switchTab({
      url: "/pages/shop/shop"
    });
  },

  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var index = e.currentTarget.dataset.index;

    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var left = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，container位置不变
        left = "margin-left:0px";
      } else if (disX > 0) {//移动距离大于0，container left值等于手指移动距离
        left = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          left = "left:-" + delBtnWidth + "px";
        }
      }
      var list = this.data.goodsList.list;
      if (index != "" && index != null) {
        list[parseInt(index)].left = left;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
      }
    }
  },

  touchE: function (e) {
    var index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      var list = this.data.goodsList.list;
      if (index !== "" && index != null) {
        list[parseInt(index)].left = left;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);

      }
    }
  },
  delItem: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    list.splice(index, 1);
    this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  selectTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      list[parseInt(index)].active = !list[parseInt(index)].active;
      this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
    }
  },
  totalPrice: function () {
    var list = this.data.goodsList.list;
    var total = 0;
    let totalScoreToPay = 0;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.active) {
        total += parseFloat(curItem.price) * curItem.num;
        totalScoreToPay += curItem.price * curItem.num;
      }
    }
    this.data.goodsList.totalScoreToPay = totalScoreToPay;
    total = parseFloat(total.toFixed(2));//js浮点计算bug，取两位小数精度
    return total;
  },
  allSelect: function () {
    var list = this.data.goodsList.list;
    var allSelect = false;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (curItem.active) {
        allSelect = true;
      } else {
        allSelect = false;
        break;
      }
    }
    return allSelect;
  },
  noSelect: function () {
    var list = this.data.goodsList.list;
    var noSelect = 0;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      if (!curItem.active) {
        noSelect++;
      }
    }
    if (noSelect == list.length) {
      return true;
    } else {
      return false;
    }
  },
  setGoodsList: function (saveHidden, total, allSelect, noSelect, list) {
    this.setData({
      goodsList: {
        saveHidden: saveHidden,
        totalPrice: total,
        allSelect: allSelect,
        noSelect: noSelect,
        list: list,
        totalScoreToPay: this.data.goodsList.totalScoreToPay
      }
    });
  },
  bindAllSelect: function () {
    var currentAllSelect = this.data.goodsList.allSelect;
    var list = this.data.goodsList.list;
    if (currentAllSelect) {
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.active = false;
      }
    } else {
      for (var i = 0; i < list.length; i++) {
        var curItem = list[i];
        curItem.active = true;
      }
    }

    this.setGoodsList(this.getSaveHide(), this.totalPrice(), !currentAllSelect, this.noSelect(), list);
  },
  jiaBtnTap: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var list = that.data.goodsList.list;
    if (index !== "" && index != null) {
      // 添加判断当前商品购买数量是否超过当前商品可购买库存
      list[parseInt(index)].num++;
      this.setGoodsList(that.getSaveHide(), that.totalPrice(), that.allSelect(), that.noSelect(), list);
      //跟新购物车
      this.fetchAddCar(list[parseInt(index)].goodsid, list[parseInt(index)].price, list[parseInt(index)].num, list[parseInt(index)].id);
      // var carShopBeanStores = 0;
      // wx.request({
      //   url: 'https://api.it120.cc/' + app.globalData.subDomain + '/shop/goods/detail',
      //   data: {
      //     id: carShopBean.goodsId
      //   },
      //   success: function (res) {
      //     carShopBeanStores = res.data.data.basicInfo.stores;
      //     console.log(' currnet good id and stores is :', carShopBean.goodsId, carShopBeanStores)
      //     if (list[parseInt(index)].num < carShopBeanStores) {
      //       list[parseInt(index)].num++;
      //       that.setGoodsList(that.getSaveHide(), that.totalPrice(), that.allSelect(), that.noSelect(), list);
      //     }
      //     that.setData({
      //       curTouchGoodStore: carShopBeanStores
      //     })
      //   }
      // })
    }
  },
  //减数量
  jianBtnTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var list = this.data.goodsList.list;
    if (index !== "" && index != null) {
      if (list[parseInt(index)].num > 1) {
        list[parseInt(index)].num--;
        this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
        //跟新购物车
        this.fetchAddCar(list[parseInt(index)].goodsid, list[parseInt(index)].price, list[parseInt(index)].num, list[parseInt(index)].id);
      }
    }
  },
  editTap: function () {
    var list = this.data.goodsList.list;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      curItem.active = false;
    }
    this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  saveTap: function () {
    var list = this.data.goodsList.list;
    for (var i = 0; i < list.length; i++) {
      var curItem = list[i];
      curItem.active = true;
    }
    this.setGoodsList(!this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  getSaveHide: function () {
    var saveHidden = this.data.goodsList.saveHidden;
    return saveHidden;
  },
  deleteSelected: function () {
    this.fetchDeleteCar();
    // var list = this.data.goodsList.list;
    /*
     for(let i = 0 ; i < list.length ; i++){
           let curItem = list[i];
           if(curItem.active){
             list.splice(i,1);
           }
     }
     */
    // above codes that remove elements in a for statement may change the length of list dynamically
    // list = list.filter(function (curGoods) {
    //   return !curGoods.active;
    // });
    // this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), list);
  },
  toPayOrder: function () {
    var shopCarInfoMem = wx.getStorageSync('cardata');
    if (shopCarInfoMem && shopCarInfoMem.data) {
      shopCarInfoMem.data = this.data.goodsList.list; 
      this.saveCarInfoToStorage(shopCarInfoMem);//跟新购物车里面的数据选中状态
    }
    wx.removeStorageSync("selectedaddressdata");//删除地址信息
    this.navigateToPayOrder();
  },
  navigateToPayOrder: function () {
    wx.hideLoading();
    wx.navigateTo({
      url: "/pages/orderconfirm/orderconfirm?orderType=carOrder"
    })
  },

  //加入购物车网络请求
  fetchAddCar: function (goodsid,price,num,carid) {
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
          this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), shopList);
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },
  //批量删除购物车
  fetchDeleteCar:function(e){
    var list = this.data.goodsList.list;
    var dellist = list.filter(function (curGoods) {
      return curGoods.active;
    });
    var otherlist = list.filter(function (curGoods) {
      return !curGoods.active;
    });
    var shopCarInfoMem = wx.getStorageSync('cardata');
    wx.request({
      url: app.globalData.linkIp + "delShopingCats.do",
      method: 'POST',
      data: util.getJsonArrayData(
        JSON.stringify(dellist),
      ),
      success: res => {
        console.log(res);
        if (res.data.success) {
          util.showInfo("删除成功");
          //update
          shopCarInfoMem.data = otherlist;
          //存入缓存
          this.saveCarInfoToStorage(shopCarInfoMem);
          this.data.goodsList.list = otherlist;
          this.setGoodsList(this.getSaveHide(), this.totalPrice(), this.allSelect(), this.noSelect(), otherlist);
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },
  //购物车信息存入缓存
  saveCarInfoToStorage: function (shopCarInfoMem){
    wx.setStorageSync('cardata', shopCarInfoMem);
  }
})
