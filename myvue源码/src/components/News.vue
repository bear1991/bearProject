<template>
  <div class="wrap">
    <!-- <p>设置页</p> -->
    <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-form-list" v-if="!setStatus">
        <li class="aui-list-item" id="reg-log">
          <div class="aui-btn aui-btn-info">
            <router-link :to="{name: 'RegLog', params: {status: true}}">注册</router-link>
          </div>
          <div class="aui-btn aui-btn-info">
            <router-link :to="{name: 'RegLog', params: {status: false}}">登录</router-link>
          </div>
        </li>
      </ul>
      <section class="aui-grid aui-margin-b-15" v-else>
        <ul class="aui-list aui-list-in">
          <li class="aui-list-item">
              <div class="aui-list-item-inner" id="exit">
                <span>你好，{{userName}}</span>
                <div class="aui-btn aui-btn-info" v-on:click="exit">退出</div>
              </div>
          </li>
        </ul>
        <div class="aui-row">
          <div class="aui-col-xs-3">
              <i class="aui-iconfont aui-icon-map"></i>
              <div class="aui-grid-label">地图</div>
          </div>
          <div class="aui-col-xs-3">
              <i class="aui-iconfont aui-icon-calendar"></i>
              <div class="aui-grid-label">日历</div>
          </div>
          <div class="aui-col-xs-3">
            <i class="aui-iconfont aui-icon-date"></i>
            <div class="aui-grid-label">日期</div>
          </div>
          <div class="aui-col-xs-3">
            <i class="aui-iconfont aui-icon-paper"></i>
            <div class="aui-grid-label">发现</div>
          </div>
          <div class="aui-col-xs-3">
            <div class="aui-badge">35</div>
            <i class="aui-iconfont aui-icon-image"></i>
            <p>图片</p>
          </div>
          <div class="aui-col-xs-3">
              <i class="aui-iconfont aui-icon-video"></i>
              <div class="aui-grid-label">视频</div>
          </div>
          <div class="aui-col-xs-3">
            <i class="aui-iconfont aui-icon-camera"></i>
            <p>camera</p>
          </div>
          <div class="aui-col-xs-3">
            <div class="aui-badge"></div>
            <i class="aui-iconfont aui-icon-mail"></i>
            <div class="aui-grid-label">邮件</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  // import fn from '../../static/js/fn.js'
  // import axios from 'axios'

  export default {
    name: 'news',
    data: function () {
      return {
        setStatus: false,
        userName: ''
      }
    },
    methods: {
      exit: function () {
        this.$store.state.setStatus = false
        this.setStatus = false
      }
    },
    created: function () {
      // console.log(this.$route.params)
      if (this.$store.state.setStatus) {
        this.setStatus = this.$store.state.setStatus
        this.userName = this.$store.state.userNameNow
      }
    }
  }
</script>

<style scoped> 
  #reg-log{
    justify-content: space-around;
  }
  a{
    color: #FFF;
  }
</style>
