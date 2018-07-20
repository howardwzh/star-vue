<template>
  <div id="app">
    <h2>{{title}}</h2>
    <router-view/>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
