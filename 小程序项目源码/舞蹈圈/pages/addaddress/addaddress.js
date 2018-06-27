var commonCityDataUtil = require('../../utils/city.js')
const util = require('../../utils/util.js');
var commonCityData = []
//获取应用实例
var app = getApp()
Page({
  data: {
    provinces: [],
    citys: [],
    districts: [],
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0,
    commonCityData:[],
    linkMan:'',
    address:'',
    mobile:'',
    code:''
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;

    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
        showCancel: false
      })
      return
    }
    if (this.data.selProvince == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    if (this.data.selCity == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    if (this.data.selDistrict == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请选择地区',
        showCancel: false
      })
      return
    }
    // var cityId = commonCityData[this.data.selProvinceIndex].data[this.data.selCityIndex].id;
    // var districtId;
    if (this.data.selDistrict == "请选择" || !this.data.selDistrict) {
      // districtId = '';
    } else {
      // districtId = commonCityData[this.data.selProvinceIndex].data[this.data.selCityIndex].data[this.data.selDistrictIndex].id;
    }
    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    if (code == "") {
      wx.showModal({
        title: '提示',
        content: '请填写邮编',
        showCancel: false
      })
      return
    }
    this.setData({
      linkMan:linkMan,
      address:address,
      mobile:mobile,
      code:code
    });
    var apiAddid = that.data.addressid;
    if (apiAddid) {
      //修改
      var addressdata = this.data.addressData;
      addressdata.province = this.data.selProvince;
      addressdata.city = this.data.selCity;
      addressdata.area = this.data.selDistrict;
      addressdata.code = this.data.code;
      addressdata.username = this.data.linkMan;
      addressdata.phone = this.data.mobile;
      addressdata.address = this.data.address;
      this.editMyAddress(addressdata);
    } else {
      //新增
      this.addAddress();
    }

  },
  initCityData: function (level, obj) {
    if (level == 1) {
      var pinkArray = [];
      for (var i = 0; i < commonCityData.length; i++) {
        pinkArray.push(commonCityData[i].name);
      }
      this.setData({
        provinces: pinkArray
      });
    } else if (level == 2) {
      var pinkArray = [];
      var dataArray = obj.data
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        citys: pinkArray
      });
    } else if (level == 3) {
      var pinkArray = [];
      var dataArray = obj.data
      for (var i = 0; i < dataArray.length; i++) {
        pinkArray.push(dataArray[i].name);
      }
      this.setData({
        districts: pinkArray
      });
    }

  },
  bindPickerProvinceChange: function (event) {
    var selIterm = commonCityData[event.detail.value];
    this.setData({
      selProvince: selIterm.name,
      selProvinceIndex: event.detail.value,
      selCity: '请选择',
      selCityIndex: 0,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(2, selIterm)
  },
  bindPickerCityChange: function (event) {
    var selIterm = commonCityData[this.data.selProvinceIndex].data[event.detail.value];
    this.setData({
      selCity: selIterm.name,
      selCityIndex: event.detail.value,
      selDistrict: '请选择',
      selDistrictIndex: 0
    })
    this.initCityData(3, selIterm)
  },
  bindPickerChange: function (event) {
    var selIterm = commonCityData[this.data.selProvinceIndex].data[this.data.selCityIndex].data[event.detail.value];
    if (selIterm && selIterm.name && event.detail.value) {
      this.setData({
        selDistrict: selIterm.name,
        selDistrictIndex: event.detail.value
      })
    }
  },
  onLoad: function (e) {
    var that = this;
    var citycallback = (res) => {
      console.log(res);
      commonCityData = res;
      that.setData({
        commonCityData
      });
      this.initCityData(1);
      var id = e.id;//id为0为新增
      if (id) {
        // 初始化原数据
        var addressData = wx.getStorageSync("addressdata");
        that.setData({
          addressid:id,
          addressData:addressData,
          selProvince: addressData.province,
          selCity: addressData.city,
          selDistrict: addressData.area
        });
      }
    };
    commonCityDataUtil.getCityData(app, citycallback);
  },
  // setDBSaveAddressId: function (data) {
  //   var retSelIdx = 0;
  //   for (var i = 0; i < commonCityData.length; i++) {
  //     if (data.provinceId == commonCityData[i].id) {
  //       this.data.selProvinceIndex = i;
  //       for (var j = 0; j < commonCityData[i].data.length; j++) {
  //         if (data.cityId == commonCityData[i].data[j].id) {
  //           this.data.selCityIndex = j;
  //           for (var k = 0; k < commonCityData[i].data[j].data.length; k++) {
  //             if (data.districtId == commonCityData[i].data[j].data[k].id) {
  //               this.data.selDistrictIndex = k;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // },
  selectCity: function () {

  },
  //新增地址
  addAddress:function(e){
    var that = this;
    var url = app.globalData.linkIp + 'addAddress.do';
    var data = {
      "uid": app.globalData.userInfo.uid,
      "province": this.data.selProvince,
      "city": this.data.selCity,
      "area": this.data.selDistrict,
      "code": this.data.code,
      "username": this.data.linkMan,
      "phone": this.data.mobile,
      "address": this.data.address
    };
    console.log(data);
    var callback = (res) => {
      if (res.success == 1) {
        //新增成功
        //返回上一页
        wx.navigateBack({});
      }
    };
    util.fetchUtil(url, data, callback);
  },
  //删除地址
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          that.deleteMyAddress(id);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // readFromWx: function () {
  //   let that = this;
  //   wx.chooseAddress({
  //     success: function (res) {
  //       let provinceName = res.provinceName;
  //       let cityName = res.cityName;
  //       let diatrictName = res.countyName;
  //       let retSelIdx = 0;

  //       for (var i = 0; i < commonCityData.cityData.length; i++) {
  //         if (provinceName == commonCityData.cityData[i].name) {
  //           let eventJ = { detail: { value: i } };
  //           that.bindPickerProvinceChange(eventJ);
  //           that.data.selProvinceIndex = i;
  //           for (var j = 0; j < commonCityData.cityData[i].cityList.length; j++) {
  //             if (cityName == commonCityData.cityData[i].cityList[j].name) {
  //               //that.data.selCityIndex = j;
  //               eventJ = { detail: { value: j } };
  //               that.bindPickerCityChange(eventJ);
  //               for (var k = 0; k < commonCityData.cityData[i].cityList[j].districtList.length; k++) {
  //                 if (diatrictName == commonCityData.cityData[i].cityList[j].districtList[k].name) {
  //                   //that.data.selDistrictIndex = k;
  //                   eventJ = { detail: { value: k } };
  //                   that.bindPickerChange(eventJ);
  //                 }
  //               }
  //             }
  //           }

  //         }
  //       }

  //       that.setData({
  //         wxaddress: res,
  //       });
  //     }
  //   })
  // }
  /**
   * 编辑我的地址，包含设为默认
   */
  editMyAddress: function (addressdata) {
    var that = this;
    var url = app.globalData.linkIp + 'updateAddress.do';
    var data = {
      "id": addressdata.id,
      "uid": app.globalData.userInfo.uid,
      "province": addressdata.province,
      "city": addressdata.city,
      "area": addressdata.area,
      "code": addressdata.code,
      "username": addressdata.username,
      "phone": addressdata.phone,
      "status": addressdata.status,
      "address": addressdata.address
    };
    var callback = (res) => {
      if (res.success == 1) {
        wx.navigateBack({
          
        });//重新加载数据
      }
    };
    util.fetchUtil(url, data, callback);
  },


  /**
   * 删除我的地址
   */
  deleteMyAddress: function (id) {
    var that = this;
    var url = app.globalData.linkIp + 'delAddress.do';
    var data = {
      userid: app.globalData.userInfo.uid,
      id: id
    };
    var callback = (res) => {
      if (res.success == 1) {
        util.showInfo("删除成功");
        wx.navigateBack({
          
        });
      }
    };
    util.fetchUtil(url, data, callback);
  },
})
