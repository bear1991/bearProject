<template>
  <ul class="pictureList">
    <li v-for="(data, index) in pictureListDataNew" v-bind:key='index'>
      <div class='title-time'>
        <span>{{data.title}}</span>
        <span>{{data.ct.split(' ')[0]}}</span>
      </div>
      <p>
        <img v-bind:src="data.img" alt="">
      </p>
      <div class='collect'>
        <span v-bind:class='data.collectState?"collectAction":""' v-on:click='pictureCollect(index)'>收藏</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pictureList',
  props: ['pictureListData', 'collection', 'collectTitleArr'],
  data: function () {
    return {
      pictureCollectNum: this.collection
    }
  },
  computed: {
    pictureListDataNew: function () {
      // console.log(this.pictureListData)
      this.pictureListData.forEach((item, index) => {
        // console.log(item)
        if (this.collectTitleArr.indexOf(item.title) !== -1) {
          this.$set(item, 'collectState', true)
        } else {
          this.$set(item, 'collectState', false)
        }
      })
      // console.log(this.pictureListData)
      return this.pictureListData
    }
  },
  methods: {
    pictureCollect: function (index) {
      if (this.pictureListData[index].collectState) {
        this.pictureCollectNum--
      } else {
        this.pictureCollectNum++
      }
      this.pictureListData[index].collectState = !this.pictureListData[index].collectState
      this.$emit('addCollect', this.pictureCollectNum, this.pictureListData[index].title, this.pictureListData[index].collectState)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pictureList{
    padding: 2px 4px;
    background: #CCC;
  }
  .pictureList>li{
    margin: 8px 0;
    padding: 8px;
    background: #FFF;
  }
  .title-time{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px; 
    font-size: 14px;
  }
  .title-time>span:last-child{
    align-self: center;
    font-size: 12px;
  }
  .pictureList>li>p>img{
    display: block;
    width: 100%;
  }
</style>
