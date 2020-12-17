<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <IworkPictureMagnifier :photoSize="photoSize" :scale="scale"></IworkPictureMagnifier> -->
    <IworkLuckDraw :luckDrawSize="luckDrawSize" :selectorParts="selectorParts" :isBlackCurtain="isBlackCurtain" :setRegion="setRegion" :callGift="callGift"></IworkLuckDraw>
  </div>
</template>

<script>
// 引入
import IworkPictureMagnifier from '@/components/iwork-picture-magnifier.vue'
import IworkLuckDraw from '@/components/iwork-luck-draw.vue'
export default {
  name: 'HelloWorld',
   components: {
    IworkPictureMagnifier,
    IworkLuckDraw
  },
  data () {
      return {
        msg:"hello",
        photoSize:"400px",
        scale:2,

        luckDrawSize:"200px",
        selectorParts:[
          {text:"华为1"},{text:"华为2"},{text:"华为3"},
          {text:"华为4"},{text:"华为5"},{text:"华为6"},
          {text:"华为7"},{text:"华为8"},{text:"华为9"},{text:"华为10"},
        ],
        isBlackCurtain:false,
        setRegion:4,


      }
  },
  methods:{
    callGift(gift){
      console.log("hello")
    }
  }
}
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
