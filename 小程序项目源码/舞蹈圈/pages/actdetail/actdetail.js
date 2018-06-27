// pages/actdetail/actdetail.js

const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkIpUpload: '',

    matchid: 0,    // 保存当前活动id
    actDetailData: {},    // 保存活动详情数据

    commentPageIndex: 1,    // 保存当前详情评论的当前页数

    menuStatus: [true, false, false],     // 保存活动详情菜单切换显示

    commentTemData: {
      linkIpUpload: '',     // 保存头像显示的网络地址头部
      newCommentDataLength: [],     // 保存最新请求页的评论数据
      commentData: []       // 保存评论列表数据
    },
    content:'',//输入内容
    placeholderText:'说点什么吧',
    parentReplyId:0,
  },
  /**
   * 跳转到用户详情
   */
  toDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    wx.navigateTo({
      url: '../userdetail/userdetail?userid=' + this.data.commentTemData.commentData[index].uid,
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
  errorFunction: function (e) {
    console.log(this.data.commentTemData);
    var commentTemData = this.data.commentTemData;
    var commentData = commentTemData.commentData;
    commentData[e.currentTarget.dataset.index].avatar = '../../images/my/ic_default_head.png';
    commentTemData.commentData = commentData;
    this.setData({
      commentTemData: commentTemData
    });
    
  },

  inputChange:function(e){
    this.data.content = e.detail.value;
  },
  // 事件处理函数
  // 保存搜索内容
  changeBindinput: function (e) {
    // console.log(e);
    this.setData({
      searchText: e.detail.value
    });
  },
  // 跳转搜索结果展示页
  searchActList: function (e) {
    // console.log(e);
    wx.redirectTo({
      url: '../actlist/actlist?searchText=' + this.data.searchText,
      success: res => {
        // console.log(res);
      }
    })
  },
  //加入购物车
  addCarCatchtap:function(e){
    if (util.validateDirect(app)){
      var goods = e.currentTarget.dataset.detail;
      this.addShoppingCart(goods);
    }
  },

  //跳转到购物车
  jumpToCarDetail: function (e) {
    wx.navigateTo({
      url: "/pages/shoppingcar/shoppingcar"
    })
  },

  /**
   * 添加物品到购物车
   */
  addShoppingCart: function (goods) {
    var fetchUrl = "addShopingCat.do";
    var shopCarInfoMem = wx.getStorageSync('cardata');
    if (shopCarInfoMem && shopCarInfoMem.data) {
      this.fetchAddCar(shopCarInfoMem, goods);
    } else {
      this.fetchGetShoppingcart(goods);
    }
  },
  /**
   * 获取购物车
   */
  fetchGetShoppingcart: function (goods) {
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
            console.log(shopCarInfoMem);
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
  fetchAddCar: function (shopCarInfoMem, goods) {
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
          // this.changeCarTitle();
          this.jumpToCarDetail();
        } else {
          util.showInfo(res.data.msg);
        }
      }
    })
  },
  replyComment:function(e){
    var index = e.currentTarget.dataset.index;
    // console.log(index);
    var comment = this.data.commentTemData.commentData[index];
    
    this.data.parentReplyId = comment.id;
    console.log(this.data.parentReplyId);
    this.setData({
      placeholderText: '@' + comment.user_nicename,
      // parentid: comment.id,
      parentReply:comment,
    });
  },

  cancelReplyComment:function(e){
    this.setData({
      placeholderText: '说点什么吧',
      parentReplyId: 0,
    });
  },

  backCatchtap: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  // 比赛点赞/取消点赞
  activityCatchtap: function (e) {
    // console.log(e);
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      var data = {
        'matchid': e.currentTarget.dataset.index,
        'userid': app.globalData.userInfo.uid
      };
      if (e.currentTarget.dataset.islike == 0) {    // 当前未点赞
        // 点赞
        var url = app.globalData.linkIp + 'likePost.do';
        var activityCb = () => {
          // 同步更新matDetailData中数据
          var actDetailData = this.data.actDetailData;
          actDetailData.islike = 1;
          actDetailData.post_like++;
          this.setData({
            actDetailData
          });
        }
      } else {    // 当前已点赞
        // 取消点赞
        var url = app.globalData.linkIp + 'cancelLike.do';
        var activityCb = () => {
          // 同步更新matDetailData中数据
          var actDetailData = this.data.actDetailData;
          actDetailData.islike = 0;
          actDetailData.post_like--;
          this.setData({
            actDetailData
          });
        }
      }
      util.praiseAction(url, data, activityCb);
    }
  },

  menuCatchtap: function(e){
    // console.log(e);
    var menuIndex = e.currentTarget.dataset.index;
    var menuStatus = this.data.menuStatus.map(function(item,index){
      return index==menuIndex?true:false;
    });
    this.setData({
      menuStatus
    });
  },

  // 报名参加活动
  attendCatchtap: function(e){
    // console.log(e);
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      if(e.currentTarget.dataset.flag == 0){     // 未报名时进行报名
        wx.showModal({
          title: '提示',
          content: '确定报名该活动吗？',
          success: res => {
            // console.log(res);
            if(res.confirm){
              wx.request({
                url: app.globalData.linkIp + 'applyActivity.do',
                method: 'POST',
                data: util.getJsonData({
                  'matchid': e.currentTarget.dataset.index,
                  'userid': app.globalData.userInfo.uid
                }),
                success: res => {
                  // console.log(res);
                  if (res.data.success) {
                    wx.showToast({
                      title: '报名成功',
                      success: res => {
                        // console.log(res);
                        this.setData({
                          'actDetailData.flag': 1
                        });
                      }
                    })
                  } else {
                    util.showInfo(res.data.msg);
                  }
                }
              })
            }
          }
        })
      }
    }
  },

  // 评论点赞/取消点赞
  comPraiseCatchtap: function (e) {
    // console.log(e);

    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      util.comAction.call(this, e, app);
    }
  },

  // 查看更多评论
  moreCatchtap: function () {
    this.setData({
      commentPageIndex: this.data.commentPageIndex + 1
    });
    util.commentData(app, this);
  },
  /**
   * 添加评论
   */
  fetchAddComment:function(e){
    if (util.validateDirect(app)) {
      var url = app.globalData.linkIp + 'publishComment.do';
      var data = {
        'userid': app.globalData.userInfo.uid,
        'matchid': this.data.matchid,
        'content': this.data.content,
        'parentid': this.data.parentReply == undefined ? 0 : this.data.parentReply.id,
      };
      var _this = this;
      console.log(data);
      var callback = (res) => {
        console.log(res);
        if (res.success ==1){
          _this.setData({
            placeholderText: '说点什么吧',
            parentid: 0,
            content:''
          });
          _this.fetchGetComment();
        }
      }
      util.fetchUtil(url, data, callback);
    }
  },
  /**
   * 获取首页评论
   */
  fetchGetComment:function(){
    var url=app.globalData.linkIp + 'getCommentList.do';
    var data= {
      'matchid': this.data.matchid,
      'pageIndex': 1,
      'userid': app.globalData.userInfo.uid
    };
    var _this = this;
    var callback = (res) => {
      console.log(res);
      if (res.success == 1) {
        var newCommentData = res.data;
        newCommentData.forEach((item, index) => {
          item.create_time = util.formatCommentTime(item.create_time);
          if (item.avatar.substr(0, 4) != "http") {
            item.avatar = '../../images/my/ic_default_head.png';
          }
        });
        var commentTemData = {
          newCommentDataLength: res.replycount,     // 保存最新请求页的评论数据
          commentData: newCommentData   // 保存评论列表数据
        };
        _this.setData({
          commentTemData:commentTemData,
        });
      }
    }
    util.fetchUtil(url, data, callback);
  },

  // 初始获取活动详情页数据
  startActivityDate: function(){
    // 请求活动详情页数据
    var url = app.globalData.linkIp + 'getActivityDetails.do';
    var matchid = this.data.matchid;
    var userid = app.globalData.userInfo.uid == undefined ? 0 : app.globalData.userInfo.uid;  // 非会员userid取0
    var detailCb = (res) => {
      
      this.setData({
        actDetailData: res.data.data
      }, () => {

        // 解析富文本内容
        var article = res.data.data.post_content;
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
      });
    }
    util.activityDetailData(url, matchid, userid, detailCb);

    // 请求当前活动评论数据
    // util.commentData(app, this);
    this.fetchGetComment()
  }, 


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);

    this.setData({
      linkIpUpload: app.globalData.linkIpUpload,
      matchid: options.matchid
    });
    
    // 请求活动详情页数据
    this.startActivityDate();
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
    this.startActivityDate();
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
  saveCarInfoToStorage: function (shopCarInfoMem) {
    wx.setStorageSync('cardata', shopCarInfoMem);
  }
})