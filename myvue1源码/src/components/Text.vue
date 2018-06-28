<template>
  <div id="text">
    <div class="text-header">
      <p class="title">文本笑话大全</p>
      <ul class="action">
        <li>文本收藏数：{{collectTextNum}}</li>
        <li class='action-button' v-on:click='refresh'>刷新</li>
        <li class='action-button' v-on:click='prev'>上页</li>
        <li class='action-button' v-on:click='next'>下页</li>
      </ul>
    </div>
    <div class="text-cont">
      <textList
        v-bind:collection='collection'
        v-bind:collectTitleArr='collectArr'
        v-bind:textListData='textData' 
        v-on:addCollect='addTextCollect'
      ></textList>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

import TextList from './TextList'

Vue.use(axios)

export default {
  name: 'text',
  props: ['data'],
  data: function () {
    return {
      page: this.data[`${this.$route.query.name}`].pageNum,
      maxResult: 6,
      collection: this.data[`${this.$route.query.name}`].collection,     // 保存收藏数
      collectArr: this.data[`${this.$route.query.name}`].collectArr,    // 保存被收藏的标题
      textData: []
    }
  },
  computed: {
    pageValue: function () {
      return --this.page < 1 ? 1 : this.page
    },
    collectTextNum: function () {
      // console.log(this.$route)
      this.$emit('collectSave', this.page, this.collection, this.collectArr, this.$route.query.name)
      return this.collection
    }
  },
  methods: {
    getTextDate: function () {
      var textUrl = 'https://route.showapi.com/341-1'
      axios.get(textUrl, {
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
        this.textData = response.data.showapi_res_body.contentlist
        // console.log(this.textData)
      })
    },
    refresh: function () {
      console.log('刷新')
      this.page = 1
      this.getTextDate()
    },
    prev: function () {
      console.log('上页')
      if (this.page > 1) {
        this.page--
        this.getTextDate()
      }
    },
    next: function () {
      console.log('下页')
      this.page++
      this.getTextDate()
    },
    addTextCollect: function (collectNum, collectTitle, collectState) {
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
    TextList
  },
  mounted: function () {
    this.getTextDate()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#text{
  height: 100%;
  /* background: yellow; */
}
.text-header{
  height: 14%;
  /* background: purple; */
}
.text-cont{
  height: 86%;
  overflow-y: auto;
}
</style>
