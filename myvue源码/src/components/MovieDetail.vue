<template>
  <div class="movieDetail">
    <!-- <p>成语详情</p> -->
    <header class="aui-bar aui-bar-nav" id="header">
      <!-- <a class="aui-pull-left aui-btn" v-if="$route.query.cont" v-on:click="$router.go(-1)"> -->
      <a class="aui-pull-left aui-btn" v-if="$route.params.cont" v-on:click="$router.go(-1)">
        <span class="aui-iconfont aui-icon-left"></span>
      </a>
      <div class="aui-title">成语详情</div>
    </header>
    <div class="aui-content aui-margin-b-15" id="content">
      <ul class="aui-list aui-list-in" id="movieDetail">
        <!-- <li class="aui-list-header">成语详情</li> -->
        <li class="aui-list-item">
          <div class="aui-list-item-inner">成语：{{movieDetailData.title}}</div>
        </li>
        <li class="aui-list-item">
          <div class="aui-list-item-inner">拼音：{{movieDetailData.spell}}</div>
        </li>
        <li class="aui-list-item" v-if="movieDetailData.content">
          <div class="aui-list-item-inner">解释：{{movieDetailData.content}}</div>
        </li>
        <li class="aui-list-item" v-if="movieDetailData.samples">
          <div class="aui-list-item-inner">出处：{{movieDetailData.samples}}</div>
        </li>
        <li class="aui-list-item" v-if="movieDetailData.derivation">
          <div class="aui-list-item-inner">来源：{{movieDetailData.derivation}}</div>
        </li>
      </ul>
    </div>  
  </div>
</template>

<script>
  import fn from '../../static/js/fn.js'
  import axios from 'axios'

  export default {
    name: 'moviedetail',
    data: function () {
      return {
        movieTitle: '',
        movieDetailData: []
      }
    },
    created: function () {
      // console.log(this.$route.query)
      // this.movieTitle = this.$route.query.cont.title
      // console.log(this.$route.params)
      this.movieTitle = this.$route.params.cont.title
      var params = fn.options
      params.keyword = this.movieTitle
      axios.get(fn.urlData.moviedetail, {
        params
      })
      .then((res) => {
        // console.log(res)
        this.movieDetailData = res.data.showapi_res_body.data
      })
    }
  }
</script>

<style>
  #movieDetail>li>div{
    margin: 8px 0; 
    text-align: left;
  }
</style>
