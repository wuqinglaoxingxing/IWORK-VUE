<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- 日历 -->
    <!-- <h1>{{ date }}</h1>
    <IworkCalendar
      :isInitNow="isInitNow"
      iworkData="date"
      :format="format"
      :level="level"
    ></IworkCalendar> -->
    <!-- 上传 -->
    <!-- <IworkUpload
      file="file"
      :isMultiple="isMultiple"
      :isHand="isHand"
      @upload="upload"
    ></IworkUpload> -->
    <!-- 图片放大镜 -->
    <!-- <IworkPictureMagnifier
      :photoSize="photoSize"
      :scale="scale"
    ></IworkPictureMagnifier> -->
    <!-- 抽奖转盘 -->
    <!-- <IworkLuckDraw
      :luckDrawSize="luckDrawSize"
      :selectorParts="selectorParts"
      :isBlackCurtain="isBlackCurtain"
      :setRegion="setRegion"
      :customColor="customColor"
      :callGift="callGift"
    ></IworkLuckDraw> -->
    <!-- 太极 -->
    <IworkTaiji
    ref="iworkTaiji"
    :taijiSize="taijiSize"
    :taijiColor="taijiColor"
    ></IworkTaiji>
  </div>
</template>

<script>
// 引入
import IworkCalendar from "@/components/iwork-calendar.vue";
import IworkUpload from "@/components/iwork-upload.vue";
import IworkPictureMagnifier from "@/components/iwork-picture-magnifier.vue";
import IworkLuckDraw from "@/components/iwork-luck-draw.vue";
import IworkTaiji from '@/components/iwork-taiji.vue'
export default {
  name: "HelloWorld",
  components: {
    IworkCalendar,
    IworkUpload,
    IworkPictureMagnifier,
    IworkLuckDraw,
    IworkTaiji
  },
  data() {
    return {
        msg: "hello",
        /**
         * 日历
         * */
        date: "",
        isInitNow: false,
        format: "yyyy/MM/dd",
        level: 3,
        /**
         * 上传
         * */
        file: [], //选择的文件，子组件自动传递父组件，可能为数组，也可能为对象，取决于isMultiple
        isHand: false, //是否有手动上传图标
        isMultiple: false, //默认是单文件上传
        /**
         * 图片放大镜
         * */
        photoSize: "400px",
        scale: 2,
        /**
         * 抽奖转盘
         * */
        luckDrawSize: "200px",
        selectorParts: [
            { text: "华为1" },
            { text: "华为2" },
            { text: "华为3" },
            { text: "华为4" },
            { text: "华为5" },
            { text: "华为6" },
            { text: "华为7" },
            { text: "华为8" },
            { text: "华为9" },
            { text: "华为10" },
        ],
        isBlackCurtain: false,
        setRegion: 4,

        customColor: {
            outCircle: "red",
            singlePart: "yellow",
            doublePart: "blue",
            text: "green",
            cursorPoint: "red",
            animation: {
            "0%": "#eaff99",
            "20%": "#e0ff66",
            "40%": "#d6ff32",
            "60%": "#ccff00",
            "80%": "#a3cc00",
            "100%": "#7a9900",
            },
        },
        /**
         * 太极
         * */
        taijiSize:"400px",
        taijiColor:["#fff","#000"]
    };
  },
  mounted(){
  } ,
  methods: {
    callGift(gift) {
      console.log("hello");
    },
    upload(file) {
      console.log(flie);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
