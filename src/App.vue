<template>
  <div id="app">
    <HelloWorld/>
    <ElInput></ElInput>
    <SyxCalendar syxData="date"></SyxCalendar>
    <SyxUpload file="file" :isMultiple="true"></SyxUpload>
    {{file}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SyxCalendar from './components/syx-calendar.vue'
import SyxUpload from './components/syx-upload.vue'

export default {
  name: 'App',
  // 注册
  components: {
    HelloWorld,
    SyxCalendar,
    SyxUpload
  },
  data() {
    return {
      date:'12138',
      file:[],
    };
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
