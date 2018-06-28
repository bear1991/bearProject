<template>
  <div id="picture">
    <div class="picture-header">
      <p class="title">图片笑话大全</p>
      <ul class="action">
        <li>图片收藏数：{{collectPictureNum}}</li>
        <li class='action-button' v-on:click='refresh'>刷新</li>
        <li class='action-button' v-on:click='prev'>上页</li>
        <li class='action-button' v-on:click='next'>下页</li>
      </ul>
    </div>
    <div class="picture-cont">
      <pictureList
        v-bind:collection='collection'
        v-bind:collectTitleArr='collectArr'
        v-bind:pictureListData='pictureData' 
        v-on:addCollect='addPictureCollect'
      ></pictureList>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

import PictureList from './PictureList'

Vue.use(axios)

export default {
  name: 'picture',
  props: ['data'],
  data: function () {
    return {
      page: this.data[`${this.$route.query.name}`].pageNum,
      maxResult: 6,
      collection: this.data[`${this.$route.query.name}`].collection,     // 保存收藏数
      collectArr: this.data[`${this.$route.query.name}`].collectArr,    // 保存被收藏的标题
      pictureData: []
    }
  },
  computed: {
    pageValue: function () {
      return --this.page < 1 ? 1 : this.page
    },
    collectPictureNum: function () {
      // console.log(this.$route)
      this.$emit('collectSave', this.page, this.collection, this.collectArr, this.$route.query.name)
      return this.collection
    }
  },
  methods: {
    getPictureDate: function () {
      var pictureUrl = 'https://route.showapi.com/341-2'
      axios.get(pictureUrl, {
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
        this.pictureData = response.data.showapi_res_body.contentlist
        // console.log(this.pictureData)
      })
    },
    refresh: function () {
      console.log('刷新')
      this.page = 1
      this.getPictureDate()
    },
    prev: function () {
      console.log('上页')
      if (this.page > 1) {
        this.page--
        this.getPictureDate()
      }
    },
    next: function () {
      console.log('下页')
      this.page++
      this.getPictureDate()
    },
    addPictureCollect: function (collectNum, collectTitle, collectState) {
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
    PictureList
  },
  mounted: function () {
    this.getPictureDate()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#picture{
  height: 100%;
  /* background: yellow; */
}
.picture-header{
  height: 14%;
  /* background: purple; */
}
.picture-cont{
  height: 86%;
  overflow-y: auto;
}
</style>
