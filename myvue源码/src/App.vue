<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a{
  color: #888;
}
.router-link-active{
  color: #0062cc;
}
#header{
  position: fixed;
  top: 0;
  left: 0;
  height: 2.25rem;
  background: #03a9f4;
}
#content{
  position: relative;
  padding: 45px 0 50px 0;
}
#view-more{
  margin-top: 10px;
  padding: 0 20px; 
}
#reg-log{
  justify-content: center;
  padding: 10px 0;
}
#log-reg{
  margin: 10px 20px;
  text-align: right;
}
</style>
