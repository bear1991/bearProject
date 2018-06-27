// pages/person/user/user.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    housePicker: [],    //保存小区用于选择
    houseValue: '',     //保存选中的小区  
    doorPickerList: [],   //保存所有门牌号(二维数组)
    doorPicker: [],     //保存各个小区对应的所有门牌号(数组)
    doorValue: '',      //保存当前门牌号
    areaShowList: [],   //保存所有面积(二维数组)
    areaList: [],     //保存各个小区中的各个门牌号对应的面积
    areaValue: ''     //保存当前小区的当前门牌号的面积
  },

  //选择小区
  bindHouseChange: function(event){
    //console.log(event);
    //console.log(this.data.areaShowList);
    var houseKey = event.detail.value;
    /*
    this.setData({
      houseValue: this.data.housePicker[houseKey],
      //切换对应门牌号数组中第一个
      doorPicker: this.data.doorPickerList[houseKey],
      doorValue: this.data.doorPickerList[houseKey][0],
      //切换对应门牌号数组中第一个对应的面积数组的第一个
      areaList: this.data.areaShowList[houseKey],
      areaValue: this.data.areaShowList[houseKey][0]
    });
    */
    if (this.data.housePicker.length>0){
      this.setData({
        houseValue: this.data.housePicker[houseKey],
        //切换对应门牌号数组中第一个
        doorPicker: this.data.doorPickerList[houseKey],
        doorValue: this.data.doorPickerList[houseKey][0],
        //切换对应门牌号数组中第一个对应的面积数组的第一个
        areaList: this.data.areaShowList[houseKey],
        areaValue: this.data.areaShowList[houseKey][0]
      });
    }else{
      this.setData({
        houseValue: '',
        //切换对应门牌号数组中第一个
        doorPicker: [],
        doorValue: '',
        //切换对应门牌号数组中第一个对应的面积数组的第一个
        areaList: [],
        areaValue: ''
      });
    }
    
  },

  //选择门牌号
  bindDoorChange: function (event){
    //console.log(event);
    var doorKey = event.detail.value;
    if (this.data.doorPicker.length>0){
      this.setData({
        doorValue: this.data.doorPicker[doorKey],
        //切换对应的面积
        areaValue: this.data.areaList[doorKey]
      });
    }else{
      this.setData({
        doorValue: '',
        //切换对应的面积
        areaValue: ''
      });
    }
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userDetail = JSON.parse(options.userDetail);
    //console.log(userDetail);
    switch (userDetail.sex) {
      case 0:
        userDetail.sex = '未知';
        break;
      case 1:
        userDetail.sex = '男';
        break;
      case 2:
        userDetail.sex = '女';
        break;
    }
    var towerList = app.globalData.towerList,
      housePicker = [],
      doorPickerList = [],
      areaShowList = [];
    //console.log(towerList);
    towerList.forEach(function(item,index){
      if (housePicker.indexOf(item.houseName) == -1) {     //小区号第一次出现在housePicker中
        housePicker.push(item.houseName);
        //门牌号
        var doorPickerChild = doorPickerList[index] || [];
        doorPickerChild.push(item.doorNum);
        doorPickerList[index] = doorPickerChild;
        //console.log(doorPickerList);
        //面积
        var areaListChild = areaShowList[index] || [];
        areaListChild.push(item.area);
        areaShowList[index] = areaListChild;
      } else {      //小区号已经存在在housePicker中
        //门牌号
        var doorListIndex = housePicker.indexOf(item.houseName),
          doorPickerChild = doorPickerList[doorListIndex] || [];
        doorPickerChild.push(item.doorNum);
        doorPickerList[doorListIndex] = doorPickerChild;
        //面积
        var areaListIndex = housePicker.indexOf(item.houseName),
          areaListChild = areaShowList[areaListIndex] || [];
        areaListChild.push(item.area);
        areaShowList[areaListIndex] = areaListChild;
      }
    });
    //console.log(housePicker, doorPickerList, areaShowList);
    
    //门牌和面积是并列一一对应关系，它们都是小区的子项
    this.setData({
      userDetail: userDetail,
      //小区号
      housePicker: housePicker,
      houseValue: housePicker[0],
      //门牌号
      doorPickerList: doorPickerList,
      //面积
      areaShowList: areaShowList,
    });
    if (areaShowList.length>0){
      this.setData({
        //门牌号
        doorPicker: doorPickerList[0],
        doorValue: doorPickerList[0][0],
        //面积
        areaList: areaShowList[0],
        areaValue: areaShowList[0][0]
      });
    }else{
      this.setData({
        //门牌号
        doorPicker: [],
        doorValue: '',
        //面积
        areaList: [],
        areaValue: 0
      });
    }
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
  
  }
})