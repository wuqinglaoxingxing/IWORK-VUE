<template>
  <div id="app">
    <div class="top">
      <top></top>
    </div>
    <div class="content">
      <div class="leftSide">
        <leftSide></leftSide>
      </div>
      <div class="rightSide">
        <rightSide></rightSide>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/top.vue";
import leftSide from "@/left-side.vue";
import rightSide from "@/right-side.vue";

export default {
  name: "App",
  // 注册
  components: {
    top,
    leftSide,
    rightSide,
  },
  data() {
    return {
    };
  },
  created(){
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    if(flag){
      this.$store.state.currentEquipment = flag
    }
  },
};
</script>

<style>
body {
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
.top {
  width: 100%;
  height: 6vh;
  background: rebeccapurple;
}
.content {
  display: flex;
  height: 94vh;
}
.leftSide {
  position: relative;
  width: 20%;
  height: 100%;
  border-right: 1px #ccc solid;
  overflow: hidden;
}
.rightSide {
  width: 80%;
  position: relative;
  overflow: hidden;
  height: 100%;
}
</style>
