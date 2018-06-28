<template>
  <div id="bear">
    <!-- 头部导航 -->
    <header class="aui-bar aui-bar-nav" id="header">
      <!-- <a class="aui-pull-left aui-btn" v-if="$route.query.cont" v-on:click="$router.go(-1)">
        <span class="aui-iconfont aui-icon-left"></span>
      </a> -->
      <div class="aui-title">{{routeTitle}}</div>
    </header>
    <section id="content">
      <router-view></router-view>
    </section>
    <!-- 底部导航 -->
    <footer class="aui-bar aui-bar-tab" id="footer">
      <div class="aui-bar-tab-item" tapmode>
        <router-link to="/bear/index">
          <i class="aui-iconfont aui-icon-home"></i>
          <div class="aui-bar-tab-label">首页</div>
        </router-link>
      </div>
      <div class="aui-bar-tab-item" tapmode>
        <router-link to="/bear/book">
          <i class="aui-iconfont aui-icon-wechat"></i>
          <div class="aui-bar-tab-label">文章</div>
        </router-link>
      </div>
      <div class="aui-bar-tab-item" tapmode>
        <router-link to="/bear/movie">
          <!-- <div class="aui-badge">99</div> -->
          <i class="aui-iconfont aui-icon-edit"></i>
          <div class="aui-bar-tab-label">成语</div>
        </router-link>
      </div>
      <div class="aui-bar-tab-item" tapmode>
        <router-link to="/bear/news">
          <!-- <div class="aui-dot"></div> -->
          <i class="aui-iconfont aui-icon-gear"></i>
          <div class="aui-bar-tab-label">设置</div>
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      routeName: ''
    }
  },
  computed: {
    routeTitle: function () {
      // console.log(this.routeName)
      switch (this.routeName) {
        case 'Index':
          return '首页'
        case 'Book':
          return '文章'
        case 'Movie':
          return '成语'
        case 'News':
          return '设置'
        default:
          return '未知'
      }
    }
  },
  mounted: function () {
    // console.log(this.$route)
    this.routeName = this.$route.name
  },
  updated: function () {
    // console.log(this.$route)
    this.routeName = this.$route.name
  }
}
</script>

<style>
  
</style>
