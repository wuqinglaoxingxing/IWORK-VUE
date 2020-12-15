<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <IworkPictureMagnifier :photoSize="photoSize" :scale="scale"></IworkPictureMagnifier> -->
  </div>
</template>

<script>
// 引入
import IworkPictureMagnifier from '@/components/iwork-picture-magnifier.vue'
export default {
  name: 'HelloWorld',
   components: {
    IworkPictureMagnifier
  },
  data () {
      return {
        msg:"hello",
        photoSize:"400px",
        scale:2
      }
  },
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
