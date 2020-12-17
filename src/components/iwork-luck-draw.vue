<template>
  <div
    id="luck-draw-wrap"
    class="luck-draw-wrap"
    :style="{ width: luckDrawSize, height: luckDrawSize }"
  >
    <div
      v-for="light in ligthNum"
      :key="light"
      class="luck-draw-light luck-draw-light-rotote"
    ></div>
    <div
      id="luck-draw-out-circle"
      class="luck-draw-out-circle"
      :style="{
        background: customColor.outCircle ? customColor.outCircle : '',
      }"
    >
      <div id="luck-draw-in-circle" class="luck-draw-in-circle">
        <div
          class="selector"
          v-for="(selector, index) in selectorParts"
          :key="index"
        >
          <div
            class="selector-show"
            :style="{
              background:
                index % 2 == 1 &&
                customColor.singlePart &&
                customColor.doublePart
                  ? customColor.singlePart
                  : customColor.doublePart,
            }"
          >
            <span
              class="selector-show-span"
              v-text="selector.text"
              :style="{ color: customColor.text ? customColor.text : '' }"
            ></span>
          </div>
        </div>
      </div>
      <div
        id="luck-draw-point"
        class="luck-draw-point"
        :style="{
          backgroundColor: customColor.cursorPoint
            ? customColor.cursorPoint
            : '',
        }"
      >
        <span
          class="luck-draw-point-text"
          :style="{ color: customColor.text ? customColor.text : '' }"
          >开始</span
        >
        <svg
          class="luck-draw-point-svg"
          t="1608087114493"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7449"
          width="240"
          height="240"
        >
          <path
            d="M512 266.5l421.2 491H90.8z"
            :fill="
              customColor.cursorPoint ? customColor.cursorPoint : 'var(--fifth)'
            "
            p-id="7450"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "IworkLuckDraw",
  props: {
    luckDrawSize: {
      // 转盘默认大小
      type: String,
      default: "400px",
    },
    selectorParts: {
      type: Array,
      default: () => [
        { text: "苹果1" },
        { text: "苹果2" },
        { text: "苹果3" },
        { text: "苹果4" },
        { text: "苹果5" },
        { text: "苹果6" },
        { text: "苹果7" },
        { text: "苹果8" },
        { text: "苹果9" },
        { text: "苹果10" },
      ],
    },
    isBlackCurtain: {
      //是否具有黑幕
      type: Boolean,
      default: false,
    },
    setRegion: {
      //黑幕情况下设置第一区域
      type: Number,
      default: 1,
    },
    customColor: {
      // 自定义动画
      type: Object,
      default: () => {
        return {};
      },
    },
    callGift: {
      // 动画结束奖品回调
      type: Function,
      default: (gift) => {
        console.warn("======gift=====");
        console.warn(gift);
        console.warn("======gift=====");
      },
    },
  },
  data() {
    return {
      ligthNum: 10, // 灯的数量
      cicleStatic: 360, // 圆的度数
      lucking: true, //正在抽奖状态
      fontSizeScale: 24 / 400, // 字体比例  图形大小/字体大小
    };
  },
  watch: {},
  computed: {},
  mounted() {
    let _this = this;
    let luckDrawWrap = document.getElementById("luck-draw-wrap"); //获取 -- 抽奖组件大小
    let luckDrawPoint = document.getElementById("luck-draw-point"); //获取 -- 抽奖按钮
    let luckDrawOutCircle = document.getElementById("luck-draw-out-circle"); // 获取 -- 外层奖品包裹
    let luckDrawInCircle = document.getElementById("luck-draw-in-circle"); // 获取 -- 内层奖品包裹
    let selector = document.getElementsByClassName("selector"); //获取 -- 奖品显示
    let selectorShowSpan = document.getElementsByClassName(
      "selector-show-span"
    ); //获取 -- 奖品显示文字
    let luckDrawPointText = document.getElementsByClassName(
      "luck-draw-point-text"
    );
    let luckDrawLight = document.getElementsByClassName("luck-draw-light"); //获取 -- 灯
    let luckDrawWrapWidth = luckDrawWrap.getBoundingClientRect().width; //动态设置文字大小需要
    let luckDrawWrapHeight = luckDrawWrap.getBoundingClientRect().height; //动态设置文字大小需要
    let luckDrawOutCircleWidth = luckDrawOutCircle.getBoundingClientRect()
      .width; //动态设置灯需要
    let luckDrawOutCircleHeight = luckDrawOutCircle.getBoundingClientRect()
      .height; //动态设置灯需要
    let selectorBorderRadiusTopLeft = luckDrawInCircle.getBoundingClientRect()
      .width; //动态设置奖品显示需要
    let selectorBorderRadiusBottomLeft = luckDrawInCircle.getBoundingClientRect()
      .height; //动态设置奖品显示需要
    // 类数组转为数组，改变样式
    // 转盘奖品区域
    Array.prototype.slice.call(selector).forEach((element) => {
      element.style.borderTopLeftRadius =
        selectorBorderRadiusTopLeft / 2 + "px";
      element.style.borderBottomLeftRadius =
        selectorBorderRadiusBottomLeft / 2 + "px";
    });
    // 转盘奖品区域文字
    Array.prototype.slice.call(selectorShowSpan).forEach((element) => {
      let fontSizeX = _this.fontSizeScale * luckDrawWrapWidth;
      let fontSizeY = _this.fontSizeScale * luckDrawWrapHeight;
      if (fontSizeX < 12) {
        fontSizeX = 0;
      }
      if (fontSizeY < 12) {
        fontSizeY = 0;
      }
      element.style.fontSize = fontSizeX + "px";
      element.style.fontSize = fontSizeY + "px";
    });
    // 转盘 '开始' 文字
    Array.prototype.slice.call(luckDrawPointText).forEach((element) => {
      let fontSizeX = _this.fontSizeScale * luckDrawWrapWidth;
      let fontSizeY = _this.fontSizeScale * luckDrawWrapHeight;
      if (fontSizeX < 12) {
        fontSizeX = 0;
      }
      if (fontSizeY < 12) {
        fontSizeY = 0;
      }
      element.style.fontSize = fontSizeX + "px";
      element.style.fontSize = fontSizeY + "px";
    });
    // 转盘灯
    Array.prototype.slice.call(luckDrawLight).forEach((element) => {
      let luckDrawLightWidth =
        luckDrawOutCircleWidth - selectorBorderRadiusTopLeft;
      let luckDrawLightHeight =
        luckDrawOutCircleHeight - selectorBorderRadiusBottomLeft;
      element.style.width = luckDrawLightWidth / 2 + "px";
      element.style.height = luckDrawLightHeight / 2 + "px";
      element.style.transformOrigin = "center " + luckDrawWrapHeight / 2 + "px";
      if (this.customColor.animation) {
        let rules = _this.addStyleAnimate(
          document.styleSheets[0],
          "customAnimateColor",
          this.customColor.animation
        );
        // 删除动画
        // _this.delStyleAnimate(document.styleSheets[0])
        if (rules) {
          element.style.animation =
            "customAnimateColor 0.5s 0s linear infinite alternate";
        }
      }
    });
    // 转盘开始
    luckDrawPoint.addEventListener("click", function () {
      if (!_this.lucking) {
        return;
      }
      _this.lucking = false;
      // 先来个4圈
      luckDrawPoint.style.transition =
        "transform 3s cubic-bezier(.2,.93,.43,1)";
      let initDeg = 4 * _this.cicleStatic;
      let randomDeg = Math.floor(Math.random() * _this.cicleStatic);
      let allDeg = initDeg + randomDeg;
      if (allDeg % _this.cicleStatic == 0) {
        allDeg += 1;
      }
      // 黑幕走法--有点难受
      if (_this.isBlackCurtain) {
        while (true) {
          if (allDeg % _this.cicleStatic == 0) {
            allDeg += 1;
          }
          if (_this.getCoordinate(allDeg) != _this.setRegion) {
            allDeg = initDeg + Math.floor(Math.random() * _this.cicleStatic);
            continue;
          }
          break;
        }
      }
      luckDrawPoint.style.transform = "rotate(" + allDeg + "deg)";
    });
    // 转盘动画结束回调
    luckDrawPoint.addEventListener("transitionend", function () {
      let region = _this.getCoordinate(
        parseInt(luckDrawPoint.style.transform.replace(/\D/g, ""))
      );
      _this.callGift(_this.selectorParts[region]);
      setTimeout(function () {
        // 初始化复位
        _this.lucking = true;
        luckDrawPoint.style.transition = "transform 0s";
        luckDrawPoint.style.transform = "rotate(0deg)";
      }, 500);
    });
  },
  methods: {
    // 获取当前是哪一个奖项区域
    getCoordinate(pointDeg) {
      let region = Math.ceil(((pointDeg - 18) % this.cicleStatic) / 36);
      return region;
    },
    // 创建名称为指定名称的动画
    addStyleAnimate(sheet, name, animationObj) {
      if (!sheet) return;
      let rules = "";
      Object.keys(animationObj).forEach((key) => {
        rules += key + " { background:" + animationObj[key] + "} ";
      });
      if ("insertRule" in sheet) {
        sheet.insertRule("@keyframes " + name + " {" + rules + "}", undefined);
      } else if ("addRule" in sheet) {
        sheet.addRule("@keyframes " + name, rules, undefined);
      }
      return rules;
    },
    // 删除名称为指定名称的动画
    delStyleAnimate(sheet) {
      sheet.deleteRule(0);
    },
  },
};
</script>
<style lang="scss" scoped>
.luck-draw-wrap {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}

.luck-draw-out-circle {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: var(--tenth);
  border-radius: 50%;
  box-shadow: 10px 10px 5px #888888;
}

.luck-draw-in-circle {
  /* 绝对定位居中 */
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* 设置内层占比外层大小 */
  width: 86%;
  height: 86%;
  background-color: #cccccc;
  border-radius: 50%;
}

.luck-draw-point {
  /* 绝对定位居中 */
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /* 设置内层占比外层大小 */
  width: 16%;
  height: 16%;
  background-color: var(--fifth);
  border-radius: 50%;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: transform 3s cubic-bezier(0.2, 0.93, 0.43, 1);
}

.luck-draw-point-svg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: -50%;
  z-index: -1;
}

.luck-draw-point-text {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  color: var(--tenth);
  text-align: center;
}

.selector {
  position: absolute;
  overflow: hidden;
  width: 50%;
  height: 100%;
  transform-origin: right center;
}

.selector:nth-child(1) {
  transform: rotate(18deg);
}

.selector:nth-child(2) {
  transform: rotate(54deg);
}

.selector:nth-child(3) {
  transform: rotate(90deg);
}

.selector:nth-child(4) {
  transform: rotate(126deg);
}

.selector:nth-child(5) {
  transform: rotate(162deg);
}

.selector:nth-child(6) {
  transform: rotate(198deg);
}

.selector:nth-child(7) {
  transform: rotate(234deg);
}

.selector:nth-child(8) {
  transform: rotate(270deg);
}

.selector:nth-child(9) {
  transform: rotate(306deg);
}

.selector:nth-child(10) {
  transform: rotate(342deg);
}

.selector-show {
  position: absolute;
  left: 100%;
  width: 100%;
  height: 100%;
  border-radius: 0 50% 50% 0;
  transform: rotate(-36deg);
  transform-origin: left center;
}

.selector:nth-child(2n) .selector-show {
  background-color: var(--third);
}

.selector:nth-child(2n + 1) .selector-show {
  background-color: var(--seventh);
}

.selector-show-span {
  display: block;
  padding-top: 6px;
  width: 30%;
  height: 100%;
  color: var(--tenth);
  transform: translateX(-50%) rotate(18deg);
}

.luck-draw-light {
  position: absolute;
  background: var(--ninth);
  border-radius: 50%;
  margin: 0 auto;
  left: 0;
  z-index: 4;
  right: 0;
  /* 动画名称 动画时长 延时时间 匀速 无限循环 逆播 */
  animation: luck-draw-light-animation 0.5s 0s linear infinite alternate;
}

@keyframes luck-draw-light-animation {
  0% {
    background: var(--first);
  }
  20% {
    background: var(--third);
  }
  40% {
    background: var(--fifth);
  }
  60% {
    background: var(--seventh);
  }
  80% {
    background: var(--eigth);
  }
  100% {
    background: var(--ninth);
  }
}

.luck-draw-light-rotote:nth-child(1) {
  transform: rotate(0);
}

.luck-draw-light-rotote:nth-child(2) {
  transform: rotate(36deg);
}

.luck-draw-light-rotote:nth-child(3) {
  transform: rotate(72deg);
}

.luck-draw-light-rotote:nth-child(4) {
  transform: rotate(108deg);
}

.luck-draw-light-rotote:nth-child(5) {
  transform: rotate(144deg);
}

.luck-draw-light-rotote:nth-child(6) {
  transform: rotate(180deg);
}

.luck-draw-light-rotote:nth-child(7) {
  transform: rotate(216deg);
}

.luck-draw-light-rotote:nth-child(8) {
  transform: rotate(252deg);
}

.luck-draw-light-rotote:nth-child(9) {
  transform: rotate(288deg);
}

.luck-draw-light-rotote:nth-child(10) {
  transform: rotate(324deg);
}
</style>
