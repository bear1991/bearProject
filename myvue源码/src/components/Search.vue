<template>
  <div class="aui-list-item-inner" id="input-search">
    <div>
      <div class="aui-list-item-input">
        <input type="text" placeholder="请输入关键词" v-model="searchVal">     <!-- v-on:blur="searchCont" -->
      </div>
      <div class="aui-list-item-label">
        <div class="aui-btn aui-btn-info" v-on:click="searchBtn">搜索</div>
      </div>
    </div>
    <div id="movie-list">成语列表</div>
  </div>
</template>

<script>
  export default {
    name: 'search',
    props: ['searchValue'],
    data: function () {
      return {
        searchVal: ''
      }
    },
    methods: {
      // searchCont: function () {
      //   if (this.searchVal.length < 4) {
      //     this.$store.state.typeData.movie.page = 1
      //     this.$store.state.typeData.movie.keyword = ''
      //     this.$store.state.typeData.movie.data = []
      //   }
      // },
      searchBtn: function () {
        // console.log(this.searchVal)
        this.$emit('searchFn', this.searchVal)
      }
    },
    created: function () {
      // console.log(this.searchValue)
      if (this.searchValue) {
        this.searchVal = this.searchValue
      } else {
        this.searchVal = this.$store.state.typeData.movie.keyword
      }
    }
  }
</script>

<style>
  #input-search>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 4%;
  }
  #searchComponent #movie-list{
    background-color: #dddddd;
    color: #212121;
    font-size: 0.6rem;
    padding: 0.4rem 0.75rem;
  }
</style>
