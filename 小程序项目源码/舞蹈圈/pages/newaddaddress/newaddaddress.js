var commonCityDataUtil = require('../../utils/city.js')
const util = require('../../utils/util.js');
var commonCityData = []
var animation
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
    commonCityData: [],
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    linkMan: '',
    address: '',
    mobile: '',
    code: '',
    areaInfo:''
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
    if (this.data.selDistrict == "请选择" || !this.data.selDistrict) {
    } else {
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
      linkMan: linkMan,
      address: address,
      mobile: mobile,
      code: code
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
  onLoad: function (e) {
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    var that = this;
    var citycallback = (res) => {
      console.log(res);
      commonCityData = res;
      that.setData({
        commonCityData,
        provinces: commonCityData,
        citys: commonCityData[0].data,
        districts: commonCityData[0].data[0].data,
      });
      var id = e.id;//id为0为新增
      if (id) {
        // 初始化原数据
        var addressData = wx.getStorageSync("addressdata");
        that.setData({
          addressid: id,
          addressData: addressData,
          selProvince: addressData.province,
          selCity: addressData.city,
          selDistrict: addressData.area
        });
      }
    };
    commonCityDataUtil.getCityData(app, citycallback);
  },
  selectCity: function () {
    var that = this
    console.log('111111111')
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    // 如果已经显示，不在执行显示动画
    if (that.data.addressMenuIsShow) {
      return
    }
    // 执行显示动画
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    console.log(isShow)
    var that = this
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var selProvince = that.data.provinces[value[0]].name
    var selCity = that.data.citys[value[1]].name
    var selDistrict = that.data.districts[value[2]].name
    var areaInfo = that.data.provinces[value[0]].name + '  ' + that.data.citys[value[1]].name + '  ' + that.data.districts[value[2]].name
    that.setData({
      selProvince: selProvince,
      selCity: selCity,
      selDistrict: selDistrict,
      areaInfo: areaInfo,
    })
  },
  // 点击蒙版时取消组件的显示
  hideCitySelected: function (e) {
    console.log(e)
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var districts = this.data.districts
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      this.setData({
        value: [provinceNum, 0, 0],
        citys: this.data.provinces[provinceNum].data,
        districts: this.data.provinces[provinceNum].data[0].data,
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      this.setData({
        value: [provinceNum, cityNum, 0],
        districts: this.data.provinces[provinceNum].data[cityNum].data,
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
    console.log(this.data)
  },
  //新增地址
  addAddress: function (e) {
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
  /**
   * 编辑我的地址
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
