/*
    百思不得姐：https://route.showapi.com/255-1
        type 	String 	查询的类型，默认全部返回。
        type=10 图片
        type=29 段子
        type=31 声音
        type=41 视频
        title 	String 	文本中包括的内容，模糊查询
        page 	String 	第几页。每页最多返回20条记录
*/

const urlData = {
    news: 'https://route.showapi.com/181-1',
    picture: 'https://route.showapi.com/255-1'
}

const options = {
    showapi_appid: 37958,
    showapi_sign: '4657e887ae234d25a11b048176d33214',
    showapi_timestamp: Date.now()
}


// const requestData = function (url, options, data) {
//     axios.get(url, {
//       params: options
//     })
//     .then((res) => {
//       console.log(res)
//       data = res
//     })
// }


const fn = {
  // requestData: requestData,
  urlData: urlData,
  options: options
    
}

export default fn;
