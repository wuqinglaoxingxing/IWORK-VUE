<template>
  <div class="lefeSideWrap">
    <div class="lefeSideView">
      <ul>
        <router-link
          v-for="(item, index) in routerLink"
          :to="item.path"
          tag="li"
          :key="index"
        >
          {{ item.desc }}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
// 引入

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "hello",
      routerLink: [
        { path: "/iworkHello", desc: "首页" },
        { path: "/iworkCalendar", desc: "日历组件" },
        { path: "/iworkUpload", desc: "上传组件" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
$leftWidth: calc(100% - 2%);
.lefeSideWrap {
  position: absolute;
  left: 0;
  top: 0;
  right: -2%;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  .lefeSideView{
    width: 100%;
  }
  ul {
    width: $leftWidth;
    li {
      font-weight: 500;
      height: 40px;
      line-height: 40px;
      border-right-color: transparent;
      border-right-style: solid;
      border-right-width: calc(3%);
      cursor: default;
    }
    .linkActive {
      background-color: var(--first);
      border-right-color: var(--third);
      border-right-style: solid;
      border-right-width: calc(3%);
      color: var(--fifth);
    }
  }
}
</style>
