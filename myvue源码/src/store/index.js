import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex插件
Vue.use(Vuex)

// 注意写法：实例化vuex中store(store需要大写Store)
export const store = new Vuex.Store({
  // 保存数据
  state: {
    typeData: {
      book: {
        page: 1,
        data: []
      },
      movie: {
        page: 1,
        keyword: '',
        data: []
      }
    },
    // 保存账号信息
    userData: [{
      id: 0,
      userName: 'bear',
      password: '1991'
    },
    {
      id: 1,
      userName: 'smile',
      password: '2017'
    }],
    setStatus: false,   // 保存当前登录状态
    userNameNow: ''     // 保存当前登录的账号的用户名
  },
  // 对数据进行进一步处理(类似computed计算属性)
  getters: {},
  // 对数据进行事件操作(类似methods)
  mutations: {},
  // 对mutatons中事件进行加强(延迟异步等)
  actions: {}
})
