<template>
  <div id="textPicture">
    <div class="textPicture-header">
      <p class="title">{{$route.params.id}}笑话大全</p>
      <ul class="action">
        <li>{{$route.params.id}}收藏数：{{collectTextPictureNum}}</li>
        <li class='action-button' v-on:click='refresh'>刷新</li>
        <li class='action-button' v-on:click='prev'>上页</li>
        <li class='action-button' v-on:click='next'>下页</li>
      </ul>
    </div>
    <div class="textPicture-cont">
      <textPictureList
        v-bind:collection='collection'
        v-bind:collectTitleArr='collectArr'
        v-bind:textPictureListData='textPictureData' 
        v-on:addCollect='addTextPictureCollect'
      ></textPictureList>
    </div>
  </div>
</template>

<script>
// 问题：无法检测路由变化
import Vue from 'vue'
import axios from 'axios'

import TextPictureList from './TextPictureList'

Vue.use(axios)

export default {
  name: 'text',
  props: ['data'],
  data: function () {
    return {
      page: this.data[`${this.$route.params.id}`].pageNum,
      maxResult: 6,
      collection: this.data[`${this.$route.params.id}`].collection,     // 保存收藏数
      collectArr: this.data[`${this.$route.params.id}`].collectArr,    // 保存被收藏的标题
      textPictureData: [],
      routeTypeCont: this.$route.params.id,
      routeTypeNum: 1
    }
  },
  /*
  watch: {
    $route: function (to, from) {    // 监测路由$route变化(本质也是在路由改变后重新获取新数据)
      // console.log(to, from)
      // to.params.id和this.$route.params.id相同
      if (to.params.id !== from.params.id) {
        if (to.params.id === 'text') {
          this.routeTypeNum = 1
        } else if (to.params.id === 'picture') {
          this.routeTypeNum = 2
        }
        this.page = this.data[`${to.params.id}`].pageNum
        this.collection = this.data[`${to.params.id}`].collection     // 保存收藏数
        this.collectArr = this.data[`${to.params.id}`].collectArr    // 保存被收藏的标题
        this.getTextPictureDate()
        // console.log(1, this.collection)
      }
    }
  },
  // 设置beforeRouteEnter/beforeRouteUpdate/beforeRouteLeave方法时，必须在方法体中执行next()，否则对应路由组件不被允许显示
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  }，
  beforeRouteUpdate (to, from, next) {    // beforeRouteUpdate守卫，也能监测路由$route变化
    // 方法一：在导航完成之前重新获取数据
    // 在当前路由改变，但是该组件被复用时调用（本质）
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log(to, from, next)
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }，
  */
  computed: {
    collectTextPictureNum: function () {    // 监听collection变化
      // console.log(this.$route)
      // 判断当前路由是否改变，如果有改变，需要重新设置数据或请求数据(注意)
      // 方法二：在导航完成之后重新获取新数据
      if (this.$route.params.id !== this.routeTypeCont) {
        if (this.$route.params.id === 'text') {
          this.routeTypeNum = 1
        } else if (this.$route.params.id === 'picture') {
          this.routeTypeNum = 2
        }
        this.page = this.data[`${this.$route.params.id}`].pageNum
        this.collection = this.data[`${this.$route.params.id}`].collection     // 保存收藏数
        this.collectArr = this.data[`${this.$route.params.id}`].collectArr    // 保存被收藏的标题
        this.getTextPictureDate()
        this.routeTypeCont = this.$route.params.id
        // console.log(1, this.collection)
      }
      this.$emit('collectSave', this.page, this.collection, this.collectArr, this.$route.params.id)
      return this.collection
    }
  },
  methods: {
    getTextPictureDate: function () {
      var textPictureUrl = 'https://route.showapi.com/341-' + this.routeTypeNum
      axios.get(textPictureUrl, {
        params: {
          showapi_timestamp: Date.now(),
          showapi_appid: 37958,
          showapi_sign: '4657e887ae234d25a11b048176d33214',
          page: this.page,
          maxResult: this.maxResult
        }
      })
      .then(response => {
        // console.log(response)
        this.textPictureData = response.data.showapi_res_body.contentlist
        // console.log(this.textData)
      })
    },
    refresh: function () {
      console.log('刷新')
      this.page = 1
      this.getTextPictureDate()
    },
    prev: function () {
      console.log('上页')
      if (this.page > 1) {
        this.page--
        this.getTextPictureDate()
      }
    },
    next: function () {
      console.log('下页')
      this.page++
      this.getTextPictureDate()
    },
    addTextPictureCollect: function (collectNum, collectTitle, collectState) {
      // console.log(collectNum, collectTitle, collectState)
      this.collection = collectNum
      if (collectState) {
        this.collectArr.push(collectTitle)
      } else {
        this.collectArr.splice(this.collectArr.indexOf(collectTitle), 1)
      }
      // console.log(this.collectArr)
    }
  },
  components: {
    TextPictureList
  },
  mounted: function () {
    this.getTextPictureDate()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#textPicture{
  height: 100%;
  /* background: yellow; */
}
.textv-header{
  height: 14%;
  /* background: purple; */
}
.textPicture-cont{
  height: 86%;
  overflow-y: auto;
}
</style>
