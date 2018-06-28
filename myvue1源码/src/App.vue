<template>
  <div id="app">
    <div id="header">
      <ul>
        <li>
          <router-link to='/text'>文本笑话大全</router-link>
          <!-- <router-link :to="{path:'/text',query:{name:'text'}}">文本笑话大全</router-link> -->
        </li>
        <li>
          <router-link to='/picture'>图片笑话大全</router-link>
          <!-- <router-link :to="{path:'/picture',query:{name:'picture'}}">图片笑话大全</router-link> -->
        </li>
      </ul>
    </div>  
    <div id="content">
      <keep-alive>
        <router-view v-bind:data='data' v-on:collectSave='collectSave'></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {
      data: {
        text: {
          pageNum: 1,
          collection: 0,
          collectArr: []
        },
        picture: {
          pageNum: 1,
          collection: 0,
          collectArr: []
        }
      }
    }
  },
  methods: {
    collectSave: function (page, collection, collectArr, routeName) {
      // console.log(page, collection, collectArr, routeName)
      this.data[routeName] = {
        pageNum: page,
        collection: collection,
        collectArr: collectArr
      }
      // console.log(this.data)
    }
  },
  mounted: function () {
    // console.log('挂载成功')
  }
}
</script>

<style> 
/* 公共样式 */
*{
  margin: 0;
  padding: 0;
}
ul>li{
  list-style: none;
}
a{
  text-decoration: none;
  color: #FFF;
}
.title{
  text-align: center;
}
.action{
  display: flex;
  flex-direction:row;
  justify-content: flex-end
}
.action>li{
  margin: 10px 8px;
  padding: 4px;
  font-size: 12px;
}
.action-button{
  background: green;
  border-radius: 4px;
  color:#FFF;
}
.collect{
  margin: 16px 4px 4px;
  text-align: right;
  font-size: 12px;
}
.collect>span{
  padding: 3px 4px;
  border: 1px solid green;
  border-radius: 4px;
}
.collectAction{
  background: green;
  color: #FFF;
}


#app{
  height: 100%;
}
#header{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  /* background: red; */
}
#header>ul{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  font-size: 14px;
}
#header>ul>li{
  padding: 4px;
  border: 1px solid green;
  background: green;
}
#content{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90%;
  /* background: blue; */
}



</style>
