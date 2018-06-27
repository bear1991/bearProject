// pages/shop/shop.js

const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkIpUpload: '',       // 保存网络地址

    goodsStatus: false,     // 保存当前为热门商品还是分类商品   false: 热门商品
    goodsTypeData: [],      // 保存商品分类
    goodsListData: [],      // 保存热门或分类商品列表数据

    goodsTypeId: 0,     // 保存当前分类类型值
    pageindex:1,
    index:0,//选择商品分类的位置
    carTitle:''
  },

  // 事件处理函数
  // // 请求热门商品数据
  // requestHotGoodsData: function(e){
  //   // console.log(e);
  //   wx.showLoading({
  //     title: '加载中',
  //   })
  //   wx.request({
  //     url: app.globalData.linkIp + 'getHotGoods.do',
  //     method: 'POST',
  //     success: res => {
  //       console.log(res);
  //       if (res.data.success) {
  //         this.setData({
  //           goodsStatus: false,
  //           goodsTypeId: 0,
  //           goodsListData: res.data.data
  //         }, () => {
  //           if (this.data.goodsTypeData.length) {
  //             wx.hideLoading();
  //           }
  //         });
  //       } else {
  //         util.showInfo(res.data.msg);
  //       }
  //     }
  //   })
  // },

  // 点击商品分类，请求初始分类商品列表数据
  requestTypeGoodsData: function(e){
    // console.log(e);

    var goodsTypeData = this.data.goodsTypeData;
    // goodsTypeData.forEach((item,index) => {
    //   item.pageIndex = 1;
    // });
    // this.setData({
    //   goodsTypeData
    // });
    console.log(goodsTypeData);
    var termid = e.currentTarget.dataset.termid;
    var index = e.currentTarget.dataset.index;
    var goodsType = goodsTypeData[index];
    var goodses = goodsType.goodses;
    console.log(goodsType,goodses);
    this.setData({
      index, index,
      goodsTypeId: termid,
    });
    if(goodses.length == 0){
      wx.showLoading({
        title: '加载中',
      })
      this.goodsTypeDataCommon(termid, this.data.goodsTypeData[index].pageIndex);
    }else{
      this.setData({
        goodsListData:goodses,
        pageindex: goodsType.pageIndex,
      });
    }
    
  },

  // 请求更多分类商品数据
  goodsMoreBindscrolltolower: function(e){
    // console.log(e);
    // 判断是请求热门商品数据，还是其他分类商品数据
    if(this.data.goodsStatus){      // 分类商品
      wx.showLoading({
        title: '加载中',
      })
      var goodsTypeId = this.data.goodsTypeId;
      var goodsTypeData = this.data.goodsTypeData;
      var indexNum = 0;
      // console.log(goodsTypeId, goodsTypeData);
      goodsTypeData.forEach((item,index) => {
        if (item.term_id == goodsTypeId){
          item.pageIndex++;
          indexNum = index;
        }
      });
      // console.log(goodsTypeData);
      this.setData({
        goodsTypeData
      });
      this.goodsTypeDataCommon(this.data.goodsTypeId, this.data.goodsTypeData[indexNum].pageIndex);
    }
  },

  // 展示商品详情页
  detailCatchtap: function(e){
    // console.log(e);
    var goodsdetail = e.currentTarget.dataset.detail;
    app.data.goodsdetail = goodsdetail;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail'
    })
  },
  //加入购物车
  addCarCatchtap:function(e){
    var goodsid = e.currentTarget.dataset.goodsid;
    var price = e.currentTarget.dataset.price;
    var index = e.currentTarget.dataset.index;
    // console.log(index);
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      this.fetchAddCar(goodsid,price,index);
    }
  },
  // 跳转购物车页面
  shoppingCarCatchtap: function (e) {
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      this.jumpToCarDetail();
    }
  },
  
  // 公共函数
  // 请求分类商品数据
  goodsTypeDataCommon: function (termid, pageindex){
    // console.log(termid, pageindex);
    wx.request({
      url: app.globalData.linkIp + 'getGoodsWithCat.do',
      method: 'POST',
      data: util.getJsonData({
        'term_id': termid,
        'pageindex': pageindex
      }),
      success: res => {
        wx.hideNavigationBarLoading()
        if (res.data.success) {
          if(res.data.data.length){
            if (pageindex == 1) {
              var goodsListData = [];
            } else {
              var goodsListData = this.data.goodsListData;
            }
            goodsListData.push(...res.data.data);
            var goodsTypeData = this.data.goodsTypeData;
            var index = this.data.index;
            goodsTypeData[index].goodses = goodsListData;
            goodsTypeData[index].pageIndex = pageindex;
            // goodsTypeData[index].pages = res.data.pages;
            var goodsType = goodsTypeData[index];
            goodsType.pages = res.data.pages;
            goodsTypeData[index] = goodsType;
            // console.log(goodsTypeData);
            this.setData({
              goodsStatus: true,
              goodsTypeId: termid,
              goodsListData,
              goodsTypeData: goodsTypeData,
              pageindex: pageindex,
            },() => {
              wx.hideLoading();
            });
            // console.log(this.data.goodsTypeData);
          }else{
            // util.showNoData('已加载全部');
          }
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },
  //加入购物车网络请求
  fetchAddCar:function(goodsid,price,index){
    var goods = this.data.goodsListData[index];
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
        'id':carid,
        'uid': app.globalData.userInfo.uid,
        'goodsid': goodsid,
        'num':num,
        'price':price
      }),
      success: res => {
        // console.log(res);
        if (res.data.success) {
          if(isNew){
            //新增
            if (shopCarInfoMem && shopCarInfoMem.data) {
              var car = res.data.data;
              car.goods = goods;
              shopList.push(car);
              shopCarInfoMem.data = shopList;
              //购物车信息存入缓存
              this.saveCarInfoToStorage(shopCarInfoMem);
            }
          }else{
            //update
            shopCarInfoMem.data = shopList;
            //购物车信息存入缓存
            this.saveCarInfoToStorage(shopCarInfoMem);
          }
          this.changeCarTitle();
          this.jumpToCarDetail();
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },

//跳转到购物车
  jumpToCarDetail:function(e){
    wx.navigateTo({
        url:"/pages/shoppingcar/shoppingcar"
    })
  },
  changeCarTitle:function(e){
    var carTitle = '';
    var shopCarInfoMem = wx.getStorageSync('cardata');
    if (shopCarInfoMem && shopCarInfoMem.data) {
      carTitle = '购物车(' + shopCarInfoMem.data.length + ')';
    } else {
      carTitle = '购物车(0)';
    }
    this.setData({
      carTitle: carTitle
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    // wx.removeStorageSync('cardata');
    this.changeCarTitle();
    this.setData({
      linkIpUpload: app.globalData.linkIpUpload
    });

    wx.showLoading({
      title: '加载中',
    });

    // 获取商品分类
    wx.request({
      url: app.globalData.linkIp + 'getGoodsCats.do',
      method: 'POST',
      success: res => {
        // console.log(res);
        if(res.data.success){
          var goodsTypeData = res.data.data;
          goodsTypeData.forEach((item,index) => {
            item.pageIndex = 1;
            item.goodses = [];
          });
          this.setData({
            goodsTypeId: goodsTypeData[0].term_id,
            pageindex: goodsTypeData[0].pageIndex,
            goodsTypeData: goodsTypeData,
          }, () => {
            //获取第一个分类的数据
            this.goodsTypeDataCommon(this.data.goodsTypeId, this.data.goodsTypeData[0].pageIndex);
            // if (this.data.goodsListData.length){
            //   wx.hideLoading();
            // } 
          });
        }else{
          util.showInfo(res.data.msg);
        }  
      }
    })

    
    // 获取热门商品
    // this.requestHotGoodsData();
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
    this.changeCarTitle();
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
    var goodsTypeData = this.data.goodsTypeData;
    var index = this.data.index;
    // console.log(goodsTypeData,index);
    var goodsType = goodsTypeData[index];
    wx.showNavigationBarLoading();
    this.goodsTypeDataCommon(goodsType.term_id, 1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var goodsTypeData = this.data.goodsTypeData;
    var index = this.data.index;
    var goodsType = goodsTypeData[index];
    // console.log(goodsType);
    if (goodsType.pages >= goodsType.pageIndex + 1)
      this.goodsTypeDataCommon(goodsType.term_id, goodsType.pageIndex+1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  //购物车信息存入缓存
  saveCarInfoToStorage: function (shopCarInfoMem) {
    wx.setStorageSync('cardata', shopCarInfoMem);
  }
})