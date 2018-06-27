// pages/matdetail/matdetail.js

const app = getApp();     //获取应用实例
const util = require('../../utils/util.js');

var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkIpUpload: '',

    searchText: '',     // 保存搜索框搜索内容

    matchid: 0,    // 保存当前比赛id
    matDetailData: {},    // 保存比赛详情数据

    commentPageIndex: 1,    // 保存当前详情评论的当前页数

    menuStatus: [true, false, false],     // 保存比赛详情菜单切换显示
    
    personData: [    // 保存比赛人员数据
      {title: "晋级名单", list: []},
      {title: "比赛选手", list: []}
    ],

    commentTemData: {
      linkIpUpload: '',     // 保存头像显示的网络地址头部
      newCommentDataLength: [],     // 保存最新请求页的评论数据
      commentData: []       // 保存评论列表数据
    }, 

    uploadText: '',    // 报名流程提示信息
    chooseStatus: false,     // 保存是否选择图片状态
    chooseFile: [],     // 保存当前选中的文件
    uploadStatus: true,     // 保存是否上传成功状态
    imgUrlData: [],     // 保存上传文件后返回的数据

    slideupStatus: false,     // 保存更多人员的展示状态
    morePerson: {
      title: '',
      list: []
    }
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

  backCatchtap: function(){
    wx.navigateBack({
      delta: 1
    });
  },

  // 比赛点赞/取消点赞
  activityCatchtap: function(e){
    // console.log(e);

    if(util.validateDirect(app)){    // 验证当前是否微信登录和注册会员
      var data = {
        'matchid': e.currentTarget.dataset.index,
        'userid': app.globalData.userInfo.uid
      };
      if (e.currentTarget.dataset.islike == 0) {    // 当前未点赞
        // console.log('点赞');
        // 点赞
        var url = app.globalData.linkIp + 'likePost.do';
        var activityCb = () => {
          // 同步更新matDetailData中数据
          var matDetailData = this.data.matDetailData;
          matDetailData.islike = 1;
          matDetailData.post_like++;
          this.setData({
            matDetailData
          });
        }
      } else {    // 当前已点赞
        // console.log('取消点赞');
        // 取消点赞
        var url = app.globalData.linkIp + 'cancelLike.do';
        var activityCb = () => {
          // 同步更新matDetailData中数据
          var matDetailData = this.data.matDetailData;
          matDetailData.islike = 0;
          matDetailData.post_like--;
          this.setData({
            matDetailData
          });
        }
      }
      util.praiseAction(url, data, activityCb);
    }
  },

  menuCatchtap: function (e) {
    // console.log(e);
    var menuIndex = e.currentTarget.dataset.index;
    var menuStatus = this.data.menuStatus.map(function (item, index) {
      return index == menuIndex ? true : false;
    });
    this.setData({
      menuStatus
    });
  },

  // 报名参加比赛
  attendCatchtap: function(e){
    // console.log(e);
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      if(e.currentTarget.dataset.flag == 0){    // 未报名
        if (!this.data.chooseStatus) {    // 未选中文件
          // console.log('未选中文件');
          wx.showModal({
            title: '提示',
            content: '请先上传作品文件',
            success: res => {
              // console.log(res);
              if (res.confirm) {    // 确定上传
                wx.chooseImage({
                  success: res => {
                    // console.log(res);
                    this.setData({
                      chooseStatus: true,
                      chooseFile: res.tempFilePaths,
                      uploadText: '重新选择文件'
                    }, () => {
                      wx.showToast({
                        title: '文件选择成功',
                        success: res => {
                          // console.log(res);
                        }
                      })
                    });
                  },
                })
              }
            }
          })
        } else {    // 已选中文件(报名)
          // console.log('已选中文件');
          wx.showModal({
            title: '提示',
            content: '确定报名该比赛吗？',
            success: res => {
              // console.log(res);
              var picType = ['jpg', 'gif', 'png', 'JPEG'];
              var videoType = ['mp4', 'avi', 'rmvb', '3gp', 'wmv'];
              var picArray = [];     // 保存选择的图片
              var videoArray = [];     // 保存选择的视频
              // 判断选择的文件是图片还是视频
              this.data.chooseFile.forEach((value, index) => {
                var subStrVal = value.substring(value.lastIndexOf('.') + 1);
                // console.log(subStrVal);
                // 筛选出图片和视频并保存
                this.filterFile(picType, videoType, picArray, videoArray, subStrVal, value);
              });
              // console.log(picArray);
              // console.log(videoArray);

              var cb = () => {
                var uploadStatus = this.data.uploadStatus;
                this.setData({
                  uploadText: uploadStatus ? '文件上传成功' : '文件上传失败',
                }, () => {
                  if (uploadStatus) {
                    // 请求报名
                    // console.log(this.data.imgUrlData);
                    wx.request({
                      url: app.globalData.linkIp + 'applyCompetition.do',
                      method: 'POST',
                      data: util.getJsonData({
                        'userid': app.globalData.userInfo.uid,
                        'matchid': e.currentTarget.dataset.index,
                        'data': this.data.imgUrlData
                      }),
                      success: res => {
                        // console.log(res);
                        if (res.data.success) {    // 报名成功
                          wx.showToast({
                            title: '报名成功',
                            success: res => {
                              // console.log(res);
                              this.setData({
                                'matDetailData.flag': 1
                              });
                            }
                          })
                        } else {
                          util.showInfo(res.data.msg);
                        }
                      }
                    })
                  }
                });
              };
              // 上传图片文件
              picArray.length ? this.uploadFile(picArray, app.globalData.linkIp + 'uploadImg.do', false, !videoArray.length ? cb : '') : '';
              // 上传视频文件   文件全部上传完成后，执行的回调(报名)
              videoArray.length ? this.uploadFile(videoArray, app.globalData.linkIp + 'uploadVideo.do', true, cb) : '';
            }
          })
        } 
      }
    }
  },

  // 修改已选择的文件(重新选择文件)
  changeCatchtap: function(e){
    // console.log(e);
    if(!e.currentTarget.dataset.flag){
      if (this.data.chooseStatus) {    // 已选择文件
        wx.chooseImage({
          success: res => {
            // console.log(res);
            this.setData({
              chooseFile: res.tempFilePaths
            }, () => {
              wx.showToast({
                title: '重新选择成功'
              })
            });
          },
        })
      } else {    // 未选择文件

      }
    }else{

    }
  },


  // 筛选上传文件是图片还是视频
  filterFile: function (picType, videoType, picArray, videoArray, subStrVal, value) {
    if (picType.indexOf(subStrVal) != -1) {
      picArray.push(value);
    } else if (videoType.indexOf(subStrVal) != -1) {
      videoArray.push(value);
    }
  },
  
  // 上传文件(图片、视频)
  uploadFile: function (fileArray, url, videoStatus, cb){
    // console.log(fileArray, url, videoStatus, cb);
    fileArray.forEach((value, index) => {
      wx.uploadFile({
        url,
        filePath: value,
        name: value,
        success: res => {
          // console.log(res);
          if(JSON.parse(res.data).success){
            var imgUrlData = this.data.imgUrlData;
            var imgurl = videoStatus?JSON.parse(JSON.parse(res.data).entity).path:JSON.parse(res.data).imgurl;
            imgUrlData.push({
              imgurl,
              isvideo: videoStatus?1:0
            })
            this.setData({
              imgUrlData
            });
            // console.log(this.data.imgUrlData);
            // console.log(index, fileArray.length - 1);
            if (index == fileArray.length-1){
              cb&&cb();
            }
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel: false,
              success: res => {
                // console.log(res);
                this.setData({
                  uploadStatus: false
                });
              }
            })
          }
        }
      })
    });
  },

  // 弹出更多人员信息
  slideupCatchtap: function(e){
    // console.log(e);
    var morePerson = this.data.personData[e.currentTarget.dataset.index];
    this.setData({
      morePerson,
      slideupStatus: true
    });
  },
  // 隐藏更多人员信息
  slidedownCatch: function(e){
    // console.log(e);
    this.setData({
      slideupStatus: false 
    });
  },


  // 评论点赞/取消点赞
  comPraiseCatchtap: function(e){
    // console.log(e);
    if (util.validateDirect(app)) {    // 验证当前是否微信登录和注册会员
      util.comAction.call(this, e, app);
    }
  },

  // 查看更多评论
  moreCatchtap: function(){
    if (util.validateDirect(app, cb)) {    // 验证当前是否微信登录和注册会员
      this.setData({
        commentPageIndex: this.data.commentPageIndex + 1
      });
      util.commentData(app, this);
    }
  },

  // 初始获取活动详情页数据
  startActivityDate: function () {
    // 请求活动详情页数据
    var detailUrl = app.globalData.linkIp + 'getCompetitionDetails.do';
    var matchid = this.data.matchid;
    var userid = app.globalData.userInfo.uid == undefined ? 0 : app.globalData.userInfo.uid;  // 非会员userid取0
    var detailCb = res => {
      // 筛选出晋级名单和比赛选手
      var list = [];
      res.data.data.azUsersList.forEach((item, index) => {
        if (item.sign_status) {
          list.push(item);
        }
      });
      // console.log(list);
      var personData = [
        { title: '晋级名单', list },
        { title: '比赛选手', list: res.data.data.azUsersList }
      ];
      // console.log(personData);
      this.setData({
        matDetailData: res.data.data,
        personData
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
    // console.log(matchid, userid);
    util.activityDetailData(detailUrl, matchid, userid, detailCb);

    // 请求当前比赛评论数据
    util.commentData(app, this);
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
  
  }
})