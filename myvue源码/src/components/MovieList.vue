<template>
  <ul class="aui-list aui-list-in">
    <li class="aui-list-header">成语列表</li>
    <li class="aui-list-item aui-list-item-middle" v-for="(movieItem,index) in movieData" v-bind:key="index">
      <router-link :to="{path:'/movie/detail', query:{cont: movieItem}}">
        <div class="aui-list-item-inner aui-list-item-arrow">
          <div class="aui-list-item-title">{{movieItem.title}}</div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'movielist',
    props: ['movieData']
  }
</script>

<style>

</style>
