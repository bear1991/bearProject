// pages/index/appoint/appointsubmit/appointsubmit.js
var util = require('../../../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectSelectState: false,     //保存自定义预约项目选择器显示/隐藏状态
    typePicker: [],
    typeValue: '',
    projectPicker: [],    //projectPicker.projectName：复选框的value属性值 
    /*
    projectPicker:[
      {
        projectName:'修剪1',
        projectSelectlistState: false
      },
      {
        projectName: '浇灌1',
        projectSelectlistState: false
      },
      {
        projectName: '施肥1',
        projectSelectlistState: false
      },
    ],
    */
    projectValue: '',
    dateValue: '',
    //timeValue: '',
    userName:'',
    telNumber:'',
    regionPicker: [],
    regionValue: '',
    //familyNumber:''
  },

  //预约分类选择
  bindTypeChange: function(event){
    var typeKey = event.detail.value;;
    //console.log(this.data.typePicker[typeKey]);
    this.setData({
      typeValue: this.data.typePicker[typeKey],
      typePickerIndex: this.data.typePickerList[typeKey]
    });
  },

  //预约项目选择
  bindProjectTap: function (event) {
    this.setData({
      projectSelectState: true
    });
    //设置自定义项目选择器显示/隐藏动画效果
    this.animationWrap.opacity(1).step()
    this.setData({
      projectSelectWrapAnimation: this.animationWrap.export()
    })
    this.animation.bottom(0).step()
    this.setData({
      projectSelectAnimation: this.animation.export()
    })
  },
  //点击自定义项目选择器蒙版
  catchProjectSelectWrapTap: function(){
    this.projectSelectHide();
  },
  //点击自定义项目选择器内容区（阻止冒泡）
  catchProjectSelectTap: function(event){
    return;
  },
  //自定义项目选择器取消
  catchCancelTap: function(){
    this.projectSelectHide();
  },
  //自定义项目选择器确定
  catchSureTap: function () {
    this.projectSelectHide();    //隐藏自定义项目选择器
    //console.log(this.data.projectSelectList);
    //console.log(this.data.projectPickerValue);

    //在选中项目选项后，只有点击确定才会更新数据
    var projectPickerValue = this.data.projectPickerValue;
    this.setData({
      projectPicker: projectPickerValue       //projectPicker.projectName：复选框的value属性值 
    });

    var projectValue = '';
    if (this.data.projectSelectList && this.data.projectSelectList.length){
      projectValue = this.data.projectSelectList;
    }
    this.setData({
      projectValue: projectValue
    });
    //console.log(projectValue);
  },
  //隐藏自定义项目选择器函数方法
  projectSelectHide: function () {
    this.setData({
      projectSelectState: false,
      projectSelectWrapAnimation: '',
      projectSelectAnimation: ''
    });
  },
  //获取选中项目
  bindProjectSelectChange: function(event){
    //console.log(event);
    var projectSelectList = event.detail.value;
    this.setData({
      projectSelectList: projectSelectList
    });
    /*
      将projectSelectList成员值和projectPicker中各个成员的projectName属性值比较
      如果相同，就将projectPicker中对应的成员的projectSelectlistState属性值设置为true
    */
    var projectPickerValue = this.data.projectPicker;
    for (var i = 0; i < projectPickerValue.length;i++){
      if(projectSelectList.indexOf(projectPickerValue[i].projectName) != -1){
        projectPickerValue[i].projectSelectlistState = true;
      }else{
        projectPickerValue[i].projectSelectlistState = false;
      }
    }
    //console.log(projectPickerValue);
    //projectPickerValue：作为选中项目选项和点击确定/取消直接保存数据的变量(由复选框状态和值组成的对象的数组集合)
    this.setData({
      projectPickerValue: projectPickerValue    
    });
  },


  //预约服务日期选择
  bindDateChange: function(event){
    var dateValue = event.detail.value;
      this.setData({
      dateValue: dateValue
    });
  },
  /*
  //预约服务时间选择
  bindTimeChange: function(event){
    var timeValue = event.detail.value;
    this.setData({
      timeValue: timeValue+':00'
    });
    console.log(this.data.timeValue);
  },
  */
  
  /*
  //用户姓名
  bindUserNameBlur:function(event){
    this.setData({
      userName:event.detail.value
    });
  },
  //电话号码
  bindTelNumberBlur:function(event){
    this.setData({
      telNumber:event.detail.value
    });
  },
  */

  //家庭地址选择
  bindRegionChange: function(event){
    //console.log(event);
    var regionKey = event.detail.value,
      regionPicker = this.data.regionPicker,
      regionPickerId = this.data.regionPickerId;
    //var familyNumberList = this.data.familyNumberList;

    this.setData({
      regionValue: regionPicker[regionKey],
      regionId: regionPickerId[regionKey], 
      //familyNumber: familyNumberList[regionKey]
    });
  },

  /*
  //门牌号码
  bindFamilyNumberBlur: function(event){
    this.setData({
      familyNumber:event.detail.value
    });
  },
  */
  
  //提交信息
  catchAppointInputSubmitTap: function(){
    //预约提交数据
    var submitInfor = [
      this.data.typePickerIndex,
      this.data.typeValue,
      this.data.projectValue,    //预约项目
      this.data.dateValue,
      //this.data.timeValue,
      this.data.userName,
      this.data.telNumber,
      this.data.regionId,    //用户预约地址id
      this.data.regionValue,
      //this.data.familyNumber,
      app.globalData.loginInfor.loginId
    ];
    //console.log(submitInfor);

    var type_id = this.data.typePickerIndex,
      content = this.data.projectValue,
      //bespeak_time = this.data.dateValue+' '+this.data.timeValue,     //预约日期时间
      bespeak_time = this.data.dateValue,
      custom_id = app.globalData.loginInfor.loginId,
      tower_id = this.data.regionId;
    //console.log(tower_id);
    if (type_id && content && bespeak_time && tower_id){
      //提交预约
      wx.request({
        url: app.globalData.linkIp + '/bespeak/save',
        data: {
          type_id: type_id,    //预约分类
          content: content.join('、'),    //预约项目
          bespeak_time: bespeak_time,
          custom_id: custom_id,
          tower_id: tower_id    //预约地址id
        },
        success: function (res) {
          //console.log(res);
          if (res.data.code == 0) {
            wx.showToast({
              title: '预约提交成功',
              duration: 4000,
              success: function () {
                var timer = setTimeout(function () {
                  clearTimeout(timer);
                  app.globalData.subState = true;
                  wx.navigateBack({
                    delta: 1
                  })
                }, 800);
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '预约失败，请联系管理员',
              showCancel: false
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请将预约内容填写完整',
        showCancel: false,
      })
    }
    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取预约分类，用于选择提交
    wx.request({
      url: app.globalData.linkIp + '/dict/bespeakTypeDict',
      data:{
        'label':'businessType'
      },
      success: function(res){
        //console.log(res);
        if (res.data.code == 0) {      //请求成功时，返回的code为0
          if (res.data.bespeakTypeDict) {
            var typePicker = [],
              typePickerList = [];
            res.data.bespeakTypeDict.map(function (item) {
              typePicker.push(item.name);
              typePickerList.push(item.id);
            });
            this.setData({
              typePicker: typePicker,
              typePickerList: typePickerList
            });
            //console.log(this.data.typePicker);
          }
        }
      }.bind(this)
    })

    //获取预约项目，用于选择提交
    wx.request({
      url: app.globalData.linkIp + '/dict/bespeakTypeDict',
      data: {
        'label': 'staffCost'
      },
      success: function (res) {
        //console.log(res);
        if (res.data.code == 0) {      //获取数据成功时，返回的code为0
          if (res.data.bespeakTypeDict) {
            var projectPicker = [];
            res.data.bespeakTypeDict.map(function (item) {
              projectPicker.push({
                projectName: item.name,
                projectSelectlistState: false
              });
            });
            this.setData({
              projectPicker: projectPicker
            });
            //console.log(this.data.projectPicker);
          }
        }
      }.bind(this)
    })

    //户主姓名/联系电话/门牌号
    var userDetailInfor = app.globalData.userDetailInfor;
    //console.log(userDetailInfor);
    this.setData({
      userName: userDetailInfor.customName,     //用户姓名
      telNumber: userDetailInfor.phone,      //联系电话
    });


    //获取家庭地址，用于选择提交
    var towerList = app.globalData.towerList,
      regionPicker = [],
      regionPickerId = [];
    //var familyNumberList = [];
    //console.log(towerList);
    towerList.forEach(function(item,index){
      regionPicker.push(item.address);
      regionPickerId.push(item.id);
      //familyNumberList.push(item.houseName+'-'+item.doorNum);
    });
    //console.log(regionPicker, regionPickerId);
    this.setData({
      regionPicker: regionPicker,
      regionValue: regionPicker[0],
      regionPickerId: regionPickerId,
      regionId: regionPickerId[0]
      //familyNumberList: familyNumberList,
      //familyNumber: familyNumberList[0]
    });

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
    //页面渲染完成后，创建动画实例
    this.animationWrap = wx.createAnimation({
      duration: 300
    })
    this.animation = wx.createAnimation({
      duration: 300
    })
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