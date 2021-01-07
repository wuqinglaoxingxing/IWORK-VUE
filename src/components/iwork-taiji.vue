<template>
    <div class="iwork-taiji-wrap" :style="customWrap">
        <div class="iwork-taiji-left" :style="[customSame,customLeft]"></div>
        <div class="iwork-taiji-right" :style="[customSame,customRight]"></div>
    </div>
</template>
<script>
export default {
    props:{
        taijiSize: {
            type: String,
            default: "200px",
        },
        taijiColor: {
            type: Array,
            default: ()=>{
                return []
            },
        },
    },
    data() {
        return {
            customWrap:{},
            customSame:{},
            customLeft:{},
            customRight:{}
        };
    },
    created() {
        let taijiSize = this.taijiSize;
        // 将 px 转化成 rem
        if(taijiSize.indexOf("px")!=-1){
            taijiSize = parseInt(taijiSize)/100
        }
        this.customWrap = {
            width:`${taijiSize}rem`,
            height:`${taijiSize/2}rem`,
            borderWidth: `.01rem .01rem ${taijiSize/2}rem  .01rem`,
            backgroundColor: `${this.taijiColor[0]||''}`,
            borderColor: `${this.taijiColor[1]||''}`
        };
        this.customSame = {
            top: `${taijiSize/4}rem`,
            width: `${taijiSize/2*0.2}rem`,
            height: `${taijiSize/2*0.2}rem`,
            borderWidth: `${taijiSize/2*0.4}rem`,
            borderStyle:  "solid",
        }
        this.customLeft = {
            borderColor:`${this.taijiColor[1]||''}`,
            backgroundColor: `${this.taijiColor[0]||''}`
        };
        this.customRight = {
            right: `0rem`,
            borderColor:`${this.taijiColor[0]||''}`,
            backgroundColor: `${this.taijiColor[1]||''}`
        }
    }
}
</script>
<style lang="scss" scoped>
    .iwork-taiji-wrap {
        position: relative;
        margin: auto;
        border-style: solid;  
        border-radius: 50%;
        animation: taiji_rotota 3s linear infinite;
        background-color: var(--tenth);
        border-color: var(--first);

        .iwork-taiji-left{
            position: absolute;
            border-radius: 50%;
            border-color: var(--first);
            background-color: var(--tenth);
        }
        .iwork-taiji-right{
            position: absolute;
            border-radius: 50%;
            border-color: var(--tenth);
            background-color: var(--first);
        }
    }
    @keyframes taiji_rotota {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>