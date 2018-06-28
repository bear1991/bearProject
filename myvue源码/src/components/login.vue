<template>
  <div class="wrap">
    <!-- <p>登录页</p> -->
    <header class="aui-bar aui-bar-nav" id="header">
      <!-- <a class="aui-pull-left aui-btn" v-if="$route.query.cont" v-on:click="$router.go(-1)"> -->
      <a class="aui-pull-left aui-btn">
        <router-link to="/bear/news">
          <span class="aui-iconfont aui-icon-left">设置</span>
        </router-link>
      </a>
      <div class="aui-title">登录</div>
    </header>
    <div class="aui-content aui-margin-b-15" id="content">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">账号：</div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请输入账号">
                </div>
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">密码：</div>
                <div class="aui-list-item-input">
                    <input type="password" placeholder="请输入密码">
                </div>
            </div>
        </li>
        <li class="aui-list-item" id="reg-log">
          <div class="aui-btn aui-btn-info">登录</div>
        </li>
      </ul>
      <div id="log-reg">
        <router-link to="/resigter">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  // import fn from '../../static/js/fn.js'
  // import axios from 'axios'

  export default {
    name: 'login'
  }
</script>

<style>

</style>
