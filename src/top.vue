<template>
  <div class="top">
    <span @click="changeTheme('BLUE')">蓝色</span>
    <span @click="changeTheme('VIOLET')">紫色</span>
    <span @click="changeTheme('RED')">红色</span>
  </div>
</template>

<script>
// 引入

export default {
  name: "top",
  data() {
    return {};
  },
  methods: {
    changeTheme(colorItem) {
      // 设置主题
      if (colorItem == this.staticVariable.VIOLET) {
        this.gmtds.changeColorTheme("theme", "./violet.css");
        this.localStorage.setItem("colorItem",this.staticVariable.VIOLET);
      } else if (colorItem == this.staticVariable.BLUE) {
        this.gmtds.changeColorTheme("theme", "./blue.css");
        this.localStorage.setItem("colorItem",this.staticVariable.BLUE);
      } else if (colorItem == this.staticVariable.RED) {
        this.gmtds.changeColorTheme("theme", "./red.css");
        this.localStorage.setItem("colorItem",this.staticVariable.RED);
      }
    },
  },
};
</script>

<style scoped></style>
