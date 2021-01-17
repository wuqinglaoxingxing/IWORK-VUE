<template>
  <div class="topWrap">
    <div class="first">
      <img :src="logoURL" alt="logo" />
    </div>
    <div class="second"></div>
    <div class="third"></div>
    <div class="four">
      <div class="iconset">
        <div
          id="user-icon"
          class="user img-format"
          @click="
            setPanelStatus = !setPanelStatus;
            themeListStatus = false;
          "
        >
          <div class="triangle" v-show="setPanelStatus"></div>
        </div>
        <div id="set-panel" class="set-panel" v-show="setPanelStatus">
          <ul>
            <li @click="themeListStatus = !themeListStatus">
              <span class="icon skin"></span>
              <span class="text">
                <button class="theme">
                  主题
                  <span class="caret_down" v-show="!themeListStatus"></span>
                  <span class="caret_top" v-show="themeListStatus"></span>
                </button>
              </span>
              <ul class="theme-list" v-show="themeListStatus">
                <li @click="changeTheme('VIOLET')">紫色</li>
                <li @click="changeTheme('BLUE')">蓝色</li>
                <li @click="changeTheme('RED')">红色</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入

export default {
  name: "top",
  data() {
    return {
      logoURL: "", //logo url
      themeColor: this.localStorage.getItem("colorItem"), // 主题颜色
      themeListStatus: false, //主题列表是否显示状态
      setPanelStatus: false, //设置面板是否设置状态
    };
  },
  created() {
    this.setLogo();
    // 增加全局事件,点击其他地方关闭设置面板,该事件值针对面板的显示隐藏
    document.addEventListener("click",  (e) => {
        // this -> vue
        let userIconStatus = this.gmtds.isHasInParent("user-icon", e.target);
        let setPanelStatus = this.gmtds.isHasInParent("set-panel", e.target);
        if (!userIconStatus && !setPanelStatus) {
            this.closePanelAndInitParams();
        }
    });
  },
  computed: {},
  methods: {
    // 改变主题
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
    // 设置logo
    setLogo(colorItem) {
      switch (colorItem || this.localStorage.getItem("colorItem")) {
        case this.staticVariable.VIOLET:
          this.logoURL = require("./assets/logo-" +
            this.staticVariable.VIOLET +
            ".png");
          break;
        case this.staticVariable.RED:
          this.logoURL = require("./assets/logo-" +
            this.staticVariable.RED +
            ".png");
          break;
        case this.staticVariable.BLUE:
          this.logoURL = require("./assets/logo-" +
            this.staticVariable.BLUE +
            ".png");
          break;
        default:
          this.logoURL = require("./assets/logo-" +
            this.staticVariable.VIOLET +
            ".png");
      }
    },
    // 关闭所有设置面板，以及初始化参数
    closePanelAndInitParams() {
      this.themeListStatus = this.setPanelStatus = false;
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  list-style: none;
}
.topWrap {
  display: flex;
  width: 100%;
  height: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  & > div {
    position: relative;
    display: flex;
    align-items: center;
    width: 25%;
  }
  & > .first {
    & > img {
      width: 100%;
      height: 100%;
      left: 10%;
      position: absolute;
    }
  }
  & > .four {
    & > .iconset {
      width: 40%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 5%;
      right: 0;
      & > .user {
        position: relative;
        background-color: var(--eigth);
        display: inline-block;
        width: 4.5vh;
        height: 4.5vh;
        border-radius: 50%;
        // background-image: url(./assets/face_default.git);
        background-image: url(./assets/face.png);
        & > .triangle {
          position: absolute;
          top: 100%;
          left: 0px;
          right: 0px;
          width: 0;
          margin: 0 auto;
          height: 0;
          border-left: 0.1rem solid transparent;
          border-bottom: 0.1rem solid var(--tenth);
          border-right: 0.1rem solid transparent;
        }
      }
      & > .set-panel {
        position: absolute;
        top: 100%;
        width: 100%;
        background: var(--eigth);
        border-radius: 0.05rem;
        z-index: 999;
        & > ul {
          margin: 0.05rem 0.06rem;
          & > li:not(:last-child) {
            border-bottom: 1px black solid;
          }
          & > li:hover {
            background: var(--seventh);
          }
          & > li {
            list-style: none;
            line-height: 0.3rem;
            height: 0.3rem;
            display: flex;
            position: relative;
            justify-content: space-around;
            color: var(--first);
            & > .icon {
              font-size: 0;
              width: 40%;
              height: 100%;
            }
            & > .skin {
              background: url(./assets/skin.png) no-repeat center;
            }
            & > .text {
              display: inline-block;
              font-size: 0.13rem;
              width: 60%;
              text-align: left;
              & > .theme {
                border: none;
                outline: none;
                color: var(--first);
                background: transparent;
                & > .caret_down {
                  display: inline-block;
                  width: 0;
                  height: 0;
                  margin-left: 2px;
                  vertical-align: middle;
                  border-top: 4px solid;
                  border-right: 4px solid transparent;
                  border-left: 4px solid transparent;
                }
                & > .caret_top {
                  display: inline-block;
                  width: 0;
                  height: 0;
                  margin-left: 2px;
                  vertical-align: middle;
                  border-bottom: 4px solid;
                  border-right: 4px solid transparent;
                  border-left: 4px solid transparent;
                }
              }
            }
            & > .theme-list {
              position: absolute;
              top: calc(100% + 0.05rem);
              border-radius: 0.03rem;
              z-index: 9999;
              width: 38%;
              color: var(--eeeefa);
              background: var(--tenth);
              box-shadow: var(--tenth) 0.06rem 0.03rem 0.1rem;
              & > li {
                cursor: pointer;
              }
              & > li:hover {
                background: var(--seventh);
              }
            }
          }
        }
      }
    }
  }
}
</style>
