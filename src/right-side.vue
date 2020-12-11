<template>
  <div class="rightSideWrap">
    <div class="rightSideView">
      <div class="labelView">
        <span v-text="descView.title"></span>
      </div>
      <div class="routerViewWrap">
        <span v-show="descView.title">Demo</span>
        <div class="routerView">
          <router-view></router-view>
        </div>
      </div>
      <div class="descView" style="height:1000px">
      </div>
    </div>
  </div>
</template>

<script>
// 引入

export default {
  name: "rightSide",
  data() {
    return {
      descView: {
        title: "",
        desc: "",
      },
    };
  },
  watch: {
    $route: function() {
      this.routeChange();
    },
  },
  created() {
    this.routeChange();
  },
  methods: {
    routeChange: function() {
      switch (this.$route.path) {
        case "/iworkCalendar":
          this.descView = {
            title: "日历组件",
            desc: "日历组件",
          };
          break;
        case "/iworkUpload":
          this.descView = {
            title: "上传组件",
            desc: "上传组件",
          };
          break;
        default:
          this.descView = {
            title: "",
            desc: "",
          };
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
$rightWidth: calc(100% - 2%);
.rightSideWrap {
  position: absolute;
  left: 0;
  top: 0;
  right: -2%;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  .rightSideView {
    width: $rightWidth;
    .labelView {
      width: 90%;
      background: #eeeefa;
      border-radius: 8px;
      margin: 10vh auto;
      text-indent: 10px;
      text-align: left;
      font-size: 18px;
      font-weight: 800;
      span {
        line-height: 40px;
        height: 40px;
      }
    }
    .routerViewWrap {
      width: 90%;
      margin: 10vh auto;
      border: 1px #eeeefa solid;
      height: 200px;
      border-radius: 8px;
      display: flex;
      span {
        display: block;
        font-size: 18px;
        text-align: left;
        text-indent: 10px;
        color: #555;
        font-weight: 600;
      }
      .routerView {
        width: 90%;
        margin: auto;
      }
    }
  }
}
</style>
