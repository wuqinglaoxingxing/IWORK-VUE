<template>
  <div class="topWrap">
    <div class="first">
      <img :src="logoURL" alt="logo"/>
    </div>
    <div></div>
    <div>
      <span @click="changeTheme('BLUE')">蓝色</span>
      <span @click="changeTheme('VIOLET')">紫色</span>
      <span @click="changeTheme('RED')">红色</span>
    </div>
    <div class="four">
      <div class="user"></div>
    </div>
  </div>
</template>

<script>
// 引入

export default {
  name: "top",
  data() {
    return {
      logoURL:""
    };
  },
  created(){
    this.setLogo();
  },
  computed:{
  },
  methods: {
    changeTheme(colorItem) {
      // 设置主题
      if (colorItem == this.staticVariable.VIOLET) {
        this.gmtds.changeColorTheme("theme", "./theme/violet.css");
        this.localStorage.setItem("colorItem", this.staticVariable.VIOLET);
      } else if (colorItem == this.staticVariable.BLUE) {
        this.gmtds.changeColorTheme("theme", "./theme/blue.css");
        this.localStorage.setItem("colorItem", this.staticVariable.BLUE);
      } else if (colorItem == this.staticVariable.RED) {
        this.gmtds.changeColorTheme("theme", "./theme/red.css");
        this.localStorage.setItem("colorItem", this.staticVariable.RED);
      }
      this.setLogo(colorItem);
    },
    setLogo(colorItem){
      switch(colorItem||this.localStorage.getItem("colorItem")){
        case this.staticVariable.VIOLET:
          this.logoURL = require('./assets/logo_'+this.staticVariable.VIOLET+'.png');
          break;
        case this.staticVariable.RED:
          this.logoURL = require('./assets/logo_'+this.staticVariable.RED+'.png');
          break;
        case this.staticVariable.BLUE:
          this.logoURL = require('./assets/logo_'+this.staticVariable.BLUE+'.png');
          break;
        default:
          this.logoURL = require('./assets/logo_'+this.staticVariable.VIOLET+'.png');
      }
    }
  },
};
</script>

<style scoped lang="scss">
.topWrap {
  display: flex;
  width: 100%;
  height: 100%;
  & > div {
    position: relative;
    display: flex;
    align-items: center;
    width: 25%;
    & > .user {
      position: absolute;
      right: 5%;
      background-color: red;
      display: inline-block;
      width: 4.5vh;
      height: 4.5vh;
      border-radius: 50%;
    }
  }
  & > .first {
    & > img {
      width: 100%;
      height: 100%;
      left: 10%;
      position: absolute;
    }
  }
}
</style>
