//index.js

const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');
const md5 = require('../../utils/md5.js');

Page({
  data: {
    linkIpUpload: '',      // 保存网络地址

    searchText: '',     // 保存搜索框搜索内容

    bannerPicData: [],    // 保存轮播图片
    
    lstActWrapData1: [],     // 保存最新活动
    lstActWrapData2: [],     // 保存最新比赛
    historyAct:[],
    
    hotGoodsData: [],     // 热门商品(hotGoodsData)
    
    partData1: [    // 保存当前热门数据(part)
      {
        picUrl: "../../images/activity/huodong.png",
        info1: 3627,
        info2: 36,
        info3: "05:23",
        typeStatus: true,
        title: "Block Horse1",
        time: "3'22\"" 
      },
      {
        picUrl: "../../images/activity/bisai.png",
        info1: 3627,
        info2: 36,
        info3: "05:23",
        typeStatus: false,
        title: "Block Horse2",
        time: "3'22\""
      }
    ],
    partData2: [    // 保存当前热门数据(part-other)
      {
        picUrl: "../../images/activity/huodong.png",
        info1: 3627,
        info2: 36,
        info3: "05:23",
        title: "Block Horse3",
        time: "3'22\""
      },
      {
        picUrl: "../../images/activity/bisai.png",
        info1: 3627,
        info2: 36,
        info3: "05:23",
        title: "Block Horse4",
        time: "3'22\""
      },
      {
        picUrl: "../../images/activity/bisai.png",
        info1: 3627,
        info2: 36,
        info3: "05:23",
        title: "Block Horse5",
        time: "3'22\""
      }
    ]
  },

  addCarCatchtap:function(e){
    // var goodsid = e.currentTarget.dataset.goodsid;
    // var price = e.currentTarget.dataset.price;
    var index = e.currentTarget.dataset.index;
    var goods = this.data.hotGoodsData[index];
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      this.addShoppingCart(goods);
    }
  },
  
  //事件处理函数
  // 保存搜索内容
  changeBindinput: function(e){
    // console.log(e);
    this.setData({
      searchText: e.detail.value
    });
  },
  // 跳转搜索结果展示页
  searchActList: function(e){
    // console.log(e);
    wx.navigateTo({
      url: '../actlist/actlist?searchText=' + this.data.searchText,
      success: res => {
        // console.log(res);
      }
    })
  },

  // 活动列表跳转比赛详情页
  actCatchtap: function (e) {
    // console.log(e);
    wx.navigateTo({
      url: '../actdetail/actdetail?matchid=' + e.currentTarget.dataset.index
    })
  },

  //跳转到购物车
  jumpToCarDetail: function (e) {
    wx.navigateTo({
      url: "/pages/shoppingcar/shoppingcar"
    })
  },
  
  // 展示商品详情页
  detailGoodCatchtap: function (e) {
    console.log(e);
    var goodsdetail = e.currentTarget.dataset.detail;
    app.data.goodsdetail = goodsdetail;
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail'
    })
  },
  /**
   * 添加物品到购物车
   */
  addShoppingCart: function (goods) {
    var fetchUrl = "addShopingCat.do";
    var shopCarInfoMem = wx.getStorageSync('cardata');
    if (shopCarInfoMem && shopCarInfoMem.data) {
      this.fetchAddCar(shopCarInfoMem,goods);
    }else{
      this.fetchGetShoppingcart(goods);
    }
  },
  /**
   * 获取购物车
   */
  fetchGetShoppingcart:function(goods){
    // 获取购物车数据
    wx.request({
      url: app.globalData.linkIp + 'getShopingCats.do',
      method: 'POST',
      data: util.getJsonData({
        'userid': app.globalData.userInfo.uid
      }),
      success: res => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            var shopCarInfoMem = res.data;
            // console.log(shopCarInfoMem);
            //购物车信息存入缓存
            this.saveCarInfoToStorage(shopCarInfoMem);
            this.fetchAddCar(shopCarInfoMem, goods);
          }
        } else {
          util.showInfo(res.data.msg);
        }
      }
    });
  },

  
  //加入购物车网络请求
  fetchAddCar: function (shopCarInfoMem,goods) {
    // var goods = this.data.hotGoodsData[index];
    var shopList = [];
    var isNew = true;
    var num = 1;
    var fetchUrl = "addShopingCat.do";
    var carid = 0;
    if (shopCarInfoMem && shopCarInfoMem.data) {
      shopList = shopCarInfoMem.data;
      for (var index in shopList) {
        if (goods.id == shopList[index].goodsid) {
          shopList[index].num = shopList[index].num + 1;
          num = shopList[index].num;
          isNew = false;
          carid = shopList[index].id;
          fetchUrl = "updateShopingCat.do";
          break;
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
        'goodsid': goods.id,
        'num': num,
        'price': goods.price,
      }),
      success: res => {
        // console.log(res);
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
          // this.changeCarTitle();
          this.jumpToCarDetail();
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },

  // 请求比赛-活动列表数据
  matactRequest: function (index) {    // index： 1-比赛  0-活动 
    wx.request({
      url: app.globalData.linkIp + 'getLatestActivity.do',
      method: 'POST',
      data: util.getJsonData({
        'pageIndex': 1,
        'type': index,
      }),
      success: (res) => {
        // console.log(res);
        if (res.data.success) {
          if(index){    // 比赛列表
            this.setData({
              lstActWrapData2: res.data.data
            });
          }else{    // 活动列表
            this.setData({
              lstActWrapData1: res.data.data
            });
          }
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },
  // 更多活动/比赛(跳转比赛/活动列表)
  moreActCatchtap: function(e){
    // console.log(e);
    wx.switchTab({
      url: '../activity/activity',
      success: res => {
        // console.log(res);
      }
    })
  },
  // 跳转活动详情页
  actDetailCatchtap: function(e){
    wx.navigateTo({
      url: '../actdetail/actdetail?matchid=' + e.currentTarget.dataset.matchid,
    })
  },
  // 跳转比赛详情页
  matDetailCatchtap: function(e){
    wx.navigateTo({
      url: '../matdetail/matdetail?matchid=' + e.currentTarget.dataset.matchid,
    })
  },

  onLoad: function (options) {
    // console.log(options);
    this.setData({
      linkIpUpload: app.globalData.linkIpUpload
    });

    // 请求首页轮播数据
    wx.request({
      url: app.globalData.linkIp + 'getCarouselImgs.do',
      method: 'POST',
      data: util.getJsonData({
        'imgtype': 'sof_home'
      }),
      success: (res) => {
        // console.log(res);
        if(res.data.success){
          this.setData({
            bannerPicData: res.data.data
          })
        }else{
          util.showInfo(res.data.msg);
        }
      }
    })

    // 请求最新活动数据(pageIndex为1时活动列表数据)
    this.matactRequest(0);   
    // 请求比赛热报数据(pageIndex为1时比赛列表数据))
    // this.matactRequest(1);    

    // 请求热门商品数据
    wx.request({
      url: app.globalData.linkIp + 'getHotGoods.do',
      method: 'POST',
      success: res => {
        // console.log(res);
        if(res.data.success){
          this.setData({
            hotGoodsData: res.data.data
          });
        }else{
          util.showInfo(res.data.msg);
        }
      }
    })

    // 请求历史活动
    wx.request({
      url: app.globalData.linkIp + 'getHistoryPost.do',
      method: 'POST',
      success: res => {
        // console.log(res);
        if (res.data.success) {
          this.setData({
            historyAct: res.data.data
          });
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })

  },
  onReady: function () {
    // Do something when page ready.
  },
  onShow: function () {
    // Do something when page show.
    // var url = 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK43Z2mkiaozhLhJzfnrqZxOpHwwEDxcNgJH1ILE9a2q2Zp6xtPxKpXMhzvXSF7SyS7EI9hcMv25vA/132';
    // if (url.startsWith('http')) {
    //   console.log(true);
    // } else {
    //   console.log(false);
    // }
    var s = md5.hex_md5('1');
    console.log(s);
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {
    // Do something when page close.
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function () {
    // Do something when page scroll
  },
  onTabItemTap(item) {
    // console.log(item.index)
    // console.log(item.pagePath)
    // console.log(item.text)
  },
  //购物车信息存入缓存
  saveCarInfoToStorage: function (shopCarInfoMem) {
    wx.setStorageSync('cardata', shopCarInfoMem);
  }
 
})
