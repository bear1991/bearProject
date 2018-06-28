<template>
  <div class="wrap">
    <!-- <p>新闻页</p> -->
    <section class="aui-content-padded" v-for="(newsItem, index) in newsData" v-bind:key="index">
      <div class="aui-card-list" id="news-answer">
        <a v-bind:href="newsItem.url">
          <div class="aui-card-list-header">标题：{{newsItem.title}}</div>
          <div class="aui-card-list-content-padded">最佳回答：{{newsItem.content}}</div>
          <div class="aui-card-list-footer">回答人物：{{newsItem.author}}</div>
        </a>
      </div>
      <!-- <div class="aui-card-list-content-padded aui-border-b aui-border-t">
        <div class="aui-row aui-row-padded">
            <div class="aui-col-xs-4"></div>
        </div>
      </div> -->
  </section>
  </div>
</template>

<script>
  import fn from '../../static/js/fn.js'
  import axios from 'axios'

  export default {
    name: 'news',
    data: function () {
      return {
        newsData: []
      }
    },
    methods: {
      requestData: function () {
        var params = fn.options
        axios.get(fn.urlData.news, {
          params
        })
        .then((res) => {
          console.log(res)
          var newsData = res.data.showapi_res_body.result
          newsData.forEach(function (item, index) {
            item.url = 'https://www.zhihu.com' + item.url
          })
          console.log(newsData)
          this.newsData = newsData
        })
      }
    },
    created: function () {
      this.requestData()
    }
  }
</script>

<style>
  a{
    display: block;
    width: 100%;
  }
  #news-answer{
    text-align: left;
  }
</style>
