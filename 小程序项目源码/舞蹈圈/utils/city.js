const util = require('util.js');
var getCityData = function(app,citycallback){
  var url = app.globalData.linkIp + 'getAllAreas.do';
  var data = {
  };
  var callback = (res) => {
    if (res.success == 1) {
      var cityData = res.data;
      console.log(cityData);
      citycallback && citycallback(cityData);
    }
  };
  util.fetchUtil(url, data, callback);
};
module.exports = {
  getCityData
}