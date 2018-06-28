<template>
  <ul class="textPictureList">
    <li v-for="(data, index) in textPictureListDataNew" v-bind:key='index'>
      <div class='title-time'>
        <span>{{data.title}}</span>
        <span>{{data.ct.split(' ')[0]}}</span>
      </div>
      <p class='textCont' v-if='$route.params.id === "text"'>{{data.text}}</p>
      <p class='pictureCont' v-else-if='$route.params.id === "picture"'><img v-bind:src="data.img" alt=""></p>
      <div class='collect'>
        <span v-bind:class='data.collectState?"collectAction":""' v-on:click='textPictureCollect(index)'>收藏</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'textPictureList',
  props: ['textPictureListData', 'collection', 'collectTitleArr'],
  data: function () {
    return {
      collectionNum: this.collection,
      routeTypeCont: this.$route.params.id
    }
  },
  computed: {
    textPictureListDataNew: function () {     // 监听textPictureListData变化
      // console.log(this.textPictureListData)
      // 判断当前路由(数据)是否改变，如果有改变，需要重新设置collectionNum值(注意)
      if (this.$route.params.id !== this.routeTypeCont) {
        this.collectionNum = this.collection
        this.routeTypeCont = this.$route.params.id
      }
      this.textPictureListData.forEach((item, index) => {
        // console.log(item)
        if (this.collectTitleArr.indexOf(item.title) !== -1) {
          this.$set(item, 'collectState', true)
        } else {
          this.$set(item, 'collectState', false)
        }
      })
      // console.log(this.textListData)
      return this.textPictureListData
    }
  },
  methods: {
    textPictureCollect: function (index) {
      // console.log(2, this.collectionNum)
      if (this.textPictureListData[index].collectState) {
        this.collectionNum--
      } else {
        this.collectionNum++
      }
      // console.log(3, this.collectionNum)
      this.textPictureListData[index].collectState = !this.textPictureListData[index].collectState
      this.$emit('addCollect', this.collectionNum, this.textPictureListData[index].title, this.textPictureListData[index].collectState)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .textPictureList{
    padding: 2px 4px;
    background: #CCC;
  }
  .textPictureList>li{
    margin: 8px 0;
    padding: 8px;
    background: #FFF;
  }
  .title-time{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px; 
  }
  .title-time>span:last-child{
    align-self: center;
    font-size: 12px;
  }
  .textPictureList>li>p.textCont{
    font-size: 12px;
    line-height: 20px;
    text-indent: 24px;
  }
  .textPictureList>li>p.pictureCont>img{
    display: block;
    width: 100%;
  }
</style>
