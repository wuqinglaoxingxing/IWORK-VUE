<template>
    <div class="iwork-code-rain-wrap">
        <canvas ref="code-rain-cloth"></canvas>
    </div>
</template>
<script>
export default {
    props:{
        fontSize:{
            type:Number,
            default:16
        },
    },
    data(){
        return{
            index:[],
            fontColumn:0,
            codeRainClothWidth:0,
            codeRainClothHeight:0,
            codeRainClothCtx:null,
            
        }
    },
    mounted(){
        let iworkCodeRainWrap = document.querySelector(".iwork-code-rain-wrap")
        let iworkCodeRainWrapStyles = iworkCodeRainWrap.getStyle();

        let codeRainCloth = document.querySelector("canvas");
        this.codeRainClothWidth = codeRainCloth.width = parseInt(iworkCodeRainWrapStyles.width);
        this.codeRainClothHeight = codeRainCloth.height  = parseInt(iworkCodeRainWrapStyles.height);
        this.codeRainClothCtx = codeRainCloth.getContext("2d");
        // 画的列数
        this.fontColumn = codeRainCloth.width/this.fontSize|0;
        for(var i=0;i<this.fontColumn;i++){
            this.index[i] = 1;
        }
        // 调用画代码雨
        this.drawCode()
    },
    methods:{
        getRandChar(num){
            let str = "";
            for(let i=0;i<num;i++){
                let level = Math.random()*3|0
                switch(level){
                    case 0:
                        str+= Math.random()*10|0
                        break;
                    case 1:
                        str+=String.fromCharCode((Math.random()*26)|0+65);
                        break;
                    default:
                        str+=String.fromCharCode((Math.random()*26)|0+97);
                }
            }
            return str;
        },
        drawCode(){
            let _this = this;
            this.codeRainClothCtx.fillStyle="rgba(0,0,0,0.05)"
            this.codeRainClothCtx.fillRect(0,0,this.codeRainClothWidth,this.codeRainClothHeight)
            for(let i=0;i<this.fontColumn;i++){
                this.codeRainClothCtx.fillStyle="#096";
                this.codeRainClothCtx.font = `${this.fontSize}px 黑体 blod`;
                // 获取unicode 码
                let code = ""
                while(code.length!=1){
                    code = unescape("%u"+this.getRandChar(4));
                }  
                 /**
                 * 核心算法：利用arrIndex保存纵坐标,纵坐标随横坐标变化,达到屏幕最大高度根据概率是否重置
                 * */ 
                this.codeRainClothCtx.fillText(code,i*this.fontSize,this.fontSize*this.index[i]++);
                if(this.fontSize*this.index[i]>this.codeRainClothHeight&&Math.random()>0.99){
                    this.index[i] = 0;
                }
            }
            requestAnimationFrame(this.drawCode)
        }
    }

}
</script>
<style lang="scss" scoped>
    .iwork-code-rain-wrap{
        width: 100%;
        height: 100%;
    }
    canvas{
        background-color: #000;
    }
</style>