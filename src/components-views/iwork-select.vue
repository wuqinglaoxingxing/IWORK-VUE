<template>
  <div>
    <input type="text" v-iwork-select.obj.rSelect.sync="{model:keyA,list:listB}" v-model="keyA"/>
    <!-- <input type="text" v-iwork-select.arr.mSelect.async="{model:keyB,list:listB}" v-model="keyB"/> -->
  </div>
</template>

<script>
import iworkSelect from "@/directives/iwork-select";
export default {
  directives: {
    "iwork-select": iworkSelect
  },
  data() {
    return {
        keyA:"",
        keyB:"",
        listA:["A","B","C","D"],
        listB:{
            1:"A",
            2:"B",
            3:"C"
        }

    };
  },
  created() {
      setTimeout(()=>{
           this.listB = {
                1:"A",
                2:"B",
                3:"C",
                4:"F"
            }
      })
  }
};
</script>

<style>
</style>