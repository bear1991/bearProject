<template>
  <div class="wrap">
    <!-- <p>电影页</p> -->
    <div class="aui-content aui-margin-b-15">
      <!-- 搜索框组件 -->
      <div id="searchComponent">
        <search v-on:searchFn="searchResult" v-bind:searchValue="keyword"></search>
      </div>
      <ul class="aui-list aui-list-in" v-if="movieData.length>=1&&movieData[0].title">
        <!-- <li class="aui-list-header">成语列表</li> -->
        <li class="aui-list-item aui-list-item-middle" v-if="movieItem.title" v-for="(movieItem,index) in movieData" v-bind:key="index">
          <!-- <router-link :to="{path:'/moviedetail', query:{cont: movieItem}}"> -->      
          <router-link v-if="movieItem.title!=='没有查到任何数据'" :to="{name:'MovieDetail', params:{cont: movieItem}}">
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-title">{{movieItem.title}}</div>
            </div>
          </router-link>
          <div class="aui-list-item-inner aui-list-item-arrow" v-else>
              <div class="aui-list-item-title">{{movieItem.title}}</div>
          </div>
        </li>
      </ul>
      <ul class="aui-list aui-list-in" v-else>
        <!-- <li class="aui-list-header">成语列表</li> -->
        <li class="aui-list-item aui-list-item-middle">   
          <router-link :to="{name:'MovieDetail', params:{cont: {title: '马到成功'}}}">
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-title">马到成功</div>
            </div>
          </router-link>
        </li>
        <li class="aui-list-item aui-list-item-middle">   
          <router-link :to="{name:'MovieDetail', params:{cont: {title: '九牛一毛'}}}">
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-title">九牛一毛</div>
            </div>
          </router-link>
        </li>
        <li class="aui-list-item aui-list-item-middle">   
          <router-link :to="{name:'MovieDetail', params:{cont: {title: '生龙活虎'}}}">
            <div class="aui-list-item-inner aui-list-item-arrow">
              <div class="aui-list-item-title">生龙活虎</div>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- <router-view v-bind:movieData="movieData"></router-view> -->
      <div class="aui-btn aui-btn-info" id="view-more" v-if="movieData.length>=1&&movieData[0].title&&movieData[0].title.length==4" v-on:click="requestMore">点击查看更多</div>
    </div>
  </div>
</template>

<script>
  import fn from '../../static/js/fn.js'
  import axios from 'axios'

  import Search from './Search'

  export default {
    name: 'movie',
    data: function () {
      return {
        page: 1,
        keyword: '',
        movieData: []
      }
    },
    components: {
      Search
    },
    methods: {
      requestData: function () {
        var params = fn.options
        params.page = this.page
        params.keyword = this.keyword
        axios.get(fn.urlData.movie, {
          params
        })
        .then((res) => {
          // console.log(res)
          this.movieData = this.movieData.concat(res.data.showapi_res_body.data || [{title: res.data.showapi_res_body.ret_message}])
          this.$store.state.typeData.movie.page = this.page
          this.$store.state.typeData.movie.keyword = this.keyword
          this.$store.state.typeData.movie.data = this.movieData
          // console.log(this.movieData)
        })
      },
      searchResult: function (searchVal) {
        // console.log(searchVal)
        this.page = 1
        this.keyword = searchVal
        this.movieData = []
        this.requestData()
      },
      requestMore: function () {
        this.page++
        this.requestData()
      }
    },
    created: function () {
      // console.log(this.$store.state.typeData.movie.data)
      if (!this.$store.state.typeData.movie.data.length) {
        this.requestData()
      } else {
        this.page = this.$store.state.typeData.movie.page
        this.keyword = this.$store.state.typeData.movie.keyword
        this.movieData = this.$store.state.typeData.movie.data
      }
    }
  }
</script>

<style scoped>
  a{
    display: block;
    width: 100%;
  }
  #searchComponent{
    position: fixed;
    top: 44px;
    left: 0;
    width: 100%;
    z-index: 9;
    background: #FFF;
  }
  #searchComponent+ul{
    margin-top: 78px;
  }
</style>
