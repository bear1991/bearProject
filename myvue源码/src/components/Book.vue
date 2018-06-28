<template>
  <div class="wrap">
    <!-- <p>图书页</p> -->
    <div class="aui-content aui-margin-b-15">
      <ul class="aui-list aui-media-list">
        <li class="aui-list-item" v-for="(bookItem,index) in bookData" v-bind:key="index">
          <a v-bind:href="bookItem.url">
          <div class="aui-media-list-item-inner">
              <div class="aui-list-item-inner" id="book-title-description-ctime">
                  <div class="aui-list-item-title" id='book-title'>{{bookItem.title}}</div>
                  <div class="aui-list-item-text" id="type-time">
                    <span>{{bookItem.description}}</span>
                    <span>{{bookItem.ctime}}</span>
                  </div>
              </div>
              <div class="aui-list-item-media">
                  <!-- <img src="../../static/images/bear.jpg"> -->
                  <img v-bind:src="bookItem.picUrl">
              </div>
          </div>
          </a>
        </li>
      </ul>
      <div class="aui-btn aui-btn-info" id="view-more" v-if="bookData.length" v-on:click="requestMore">点击查看更多</div>
    </div>
  </div>
</template>

<script>
  import fn from '../../static/js/fn.js'
  import axios from 'axios'

  export default {
    name: 'book',
    data: function () {
      return {
        page: 1,     // 保存分页
        num: 10,     // 保存请求数量
        bookData: []
      }
    },
    methods: {
      requestData: function () {
        // fn.requestData(fn.urlData.book, {num: this.num}, this.bookData)
        var params = fn.options
        params.page = this.page
        params.num = this.num
        axios.get(fn.urlData.book, {
          params
        })
        .then((res) => {
          // console.log(res)
          this.bookData = this.bookData.concat(res.data.showapi_res_body.newslist)
          this.$store.state.typeData.book.page = this.page
          this.$store.state.typeData.book.data = this.bookData
        })
      },
      requestMore: function () {
        this.page++
        this.requestData()
      }
    },
    created: function () {
      // console.log(this.$store)
      if (!this.$store.state.typeData.book.data.length) {
        this.requestData()
      } else {
        this.page = this.$store.state.typeData.book.page
        this.bookData = this.$store.state.typeData.book.data
      }
    }
  }
</script>

<style>
  #book-title-description-ctime{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
  #book-title{
    text-align: left;
  }
  #type-time{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
