<template>
  <div class="wrap">
    <!-- <p>注册页</p> -->
    <header class="aui-bar aui-bar-nav" id="header">
      <!-- <a class="aui-pull-left aui-btn" v-if="$route.query.cont" v-on:click="$router.go(-1)"> -->
      <a class="aui-pull-left aui-btn">
        <router-link to="/bear/news">
          <span class="aui-iconfont aui-icon-left"></span>
        </router-link>
      </a>
      <div class="aui-title">{{status?"注册":"登录"}}</div>
    </header>
    <div class="aui-content aui-margin-b-15" id="content">
      <ul class="aui-list aui-form-list">
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">账号：</div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请输入账号" v-model="userName">
                </div>
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">密码：</div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请输入密码" v-model="password">
                </div>
            </div>
        </li>
        <li class="aui-list-item" v-if="status">
            <div class="aui-list-item-inner">
                <div class="aui-list-item-label">重复：</div>
                <div class="aui-list-item-input">
                    <input type="text" placeholder="请重新输入密码" v-model="repassword">
                </div>
            </div>
        </li>
        <li class="aui-list-item" id="reg-log">
          <div class="aui-btn aui-btn-info" v-if="status" v-on:click="regAction">注册</div>
          <div class="aui-btn aui-btn-info" v-else v-on:click="logAction">登录</div>
        </li>
      </ul>
      <div id="log-reg">
        <span v-if="!status" v-on:click="tabStatus">注册</span>
        <span v-else v-on:click="tabStatus">登录</span>
      </div>
      <div v-if="information">{{information}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'reglog',
    data: function () {
      return {
        status: true,    // 注册状态时为true
        userNameExist: false,
        passwordExist: false,
        information: '',
        userName: '',
        password: '',
        repassword: ''
      }
    },
    methods: {
      tabStatus: function () {    // 切换注册和登录界面
        this.userName = ''
        this.password = ''
        this.status = !this.status
      },
      delayHide: function (cb) {
        setTimeout(() => {
          this.information = ''
          cb && cb()
        }, 1000)
      },
      regAction: function () {    // 注册
        // 注册(将注册账号数据保存到store的state中)
        this.userName.replace(/(^\s*)|(\s*$)/g, '')
        this.password.replace(/(^\s*)|(\s*$)/g, '')
        this.repassword.replace(/(^\s*)|(\s*$)/g, '')
        if (this.userName && this.password && this.repassword) {
          if (this.repassword === this.password) {
            this.$store.state.userData.push({
              id: this.$store.state.userData.length,
              userName: this.userName,
              password: this.password
            })
            // console.log(this.$store.state.userData)
            this.information = '注册成功，请登录'
            this.delayHide(() => {
              this.password = ''
              this.repassword = ''
              this.status = !this.status
            })
          } else {
            this.information = '两次输入密码不一致'
            this.delayHide(() => {
              this.repassword = ''
            })
          }
        } else {
          this.information = '注册信息填写不完整'
          this.delayHide()
        }
      },
      logAction: function () {     // 登录
        this.$store.state.userData.forEach((item, value) => {
          if (this.userName === item.userName) {
            this.userExist = true
            if (this.password === item.password) {
              this.passwordExist = true
            }
          }
        })
        if (this.userExist) {
          if (this.passwordExist) {
            this.information = '登录成功'
            this.delayHide(() => {
              this.$store.state.setStatus = true    // 登录成功后，更新store中的setStatus(登录状态)
              this.$store.state.userNameNow = this.userName     // 登录成功后，更新store中的userNameNow(登录用户名)
              this.userExist = false
              this.passwordExist = false
              this.$router.push('/bear/news')
            })
          } else {
            this.information = '密码错误'
            this.delayHide(() => {
              this.userExist = false
            })
          }
        } else {
          this.information = '账号不存在'
          this.delayHide()
        }
      }
    },
    created: function () {
      // console.log(this.$route.params)
      if (this.$route.params.status) {
        this.status = true
      } else {
        this.status = false
      }
    }
  }
</script>

<style>

</style>
