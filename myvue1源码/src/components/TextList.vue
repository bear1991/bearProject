<template>
  <ul class="textList">
    <li v-for="(data, index) in textListDataNew" v-bind:key='index'>
      <div class='title-time'>
        <span>{{data.title}}</span>
        <span>{{data.ct.split(' ')[0]}}</span>
      </div>
      <p>{{data.text}}</p>
      <div class='collect'>
        <span v-bind:class='data.collectState?"collectAction":""' v-on:click='textCollect(index)'>收藏</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'textList',
  props: ['textListData', 'collection', 'collectTitleArr'],
  data: function () {
    return {
      textCollectNum: this.collection
    }
  },
  computed: {
    textListDataNew: function () {
      // console.log(this.textListData)
      this.textListData.forEach((item, index) => {
        // console.log(item)
        if (this.collectTitleArr.indexOf(item.title) !== -1) {
          this.$set(item, 'collectState', true)
        } else {
          this.$set(item, 'collectState', false)
        }
      })
      // console.log(this.textListData)
      return this.textListData
    }
  },
  methods: {
    textCollect: function (index) {
      if (this.textListData[index].collectState) {
        this.textCollectNum--
      } else {
        this.textCollectNum++
      }
      this.textListData[index].collectState = !this.textListData[index].collectState
      this.$emit('addCollect', this.textCollectNum, this.textListData[index].title, this.textListData[index].collectState)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .textList{
    padding: 2px 4px;
    background: #CCC;
  }
  .textList>li{
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
  .textList>li>p{
    font-size: 12px;
    line-height: 20px;
    text-indent: 24px;
  }
</style>
