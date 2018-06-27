// import axios from 'axios'

const urlData = {
    book: 'https://route.showapi.com/181-1',
    movie:'https://route.showapi.com/1196-1',
    moviedetail: 'https://route.showapi.com/1196-2',
    news: 'https://route.showapi.com/1079-1'
}

const options = {
    showapi_appid: 37958,
    showapi_sign: '4657e887ae234d25a11b048176d33214',
    showapi_timestamp: Date.now()
}


// const requestData = function (url, obj, data) {
//     for (var key in obj) {
//         params[key] = obj[key]
//     }
//     axios.get(url, {
//       params: options
//     })
//     .then((res) => {
//       console.log(res)
//       data = res
//     })
// }


/*
const fn = {
  // requestData: requestData,
  urlData: urlData,
  options: options
}

export default fn
*/


export default {
  // requestData: requestData,
  urlData: urlData,
  options: options   
}
