<template>
    <div class="scroll-char-wrapper" ref="scroll-char-wrapper" :style="styleValue">
        <div class="scroll-char-show" ref="scroll-char-show">
            <div class="scroll-char-arr" ref="scroll-char-arr">
                <div 
                    class="scroll-char-item" ref="scroll-char-item"
                    v-for="(char,index) of charArrShow" :style="styleValue"
                    :key="index" :value="char" :pos="posFn(index)">
                        {{char}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        charArr: {
            type: Array,
            default: () => [
                9,8,7,6,5,4,3,2,1,9
            ],
        },
        styleValue:{
            type: Object,
            default: () => {
                return {
                    width:"100px",
                    height:"100px"
                };
            },
        },
        time:{
            type: Number,
            default: 1000,
        },
    },
    data() {
        return {
            charArrShow:[],
            char:null,
            scrollCharWrapper:null,
            scrollCharShow:null,
            scrollCharArr:null,
            scrollCharItem:null,
            
            value:0
        };
    },
    created() {
        // 多添加一条
        this.charArrShow = Object.assign([],this.charArr,[this.charArr[0]])
    },
    mounted(){
        this.scrollCharWrapper = this.$refs["scroll-char-wrapper"]
        this.scrollCharShow = this.$refs["scroll-char-show"]
        this.scrollCharArr = this.$refs["scroll-char-arr"]
        this.scrollCharItem = this.$refs["scroll-char-item"]

        if(this.scrollCharWrapper&&this.scrollCharShow&&this.scrollCharArr&&this.scrollCharItem){
            this.scrollCharArr.style.top = 0
            this.start()
        }
    },
    methods:{

        start(){
            let height = parseInt(this.scrollCharItem[0].getStyle().height)*this.scrollCharItem.length
            this.timer =  setInterval(()=>{
                this.scrollCharArr.classList.add("animate")
                this.scrollCharArr.style.top = parseInt(this.scrollCharArr.style.top)-parseInt(this.styleValue.height)+"px"
                
                if(parseInt(this.scrollCharArr.style.top)===-height){
                    this.scrollCharArr.classList.remove("animate")
                    this.scrollCharArr.style.top = 0+"px";
                    clearInterval(this.timer)
                    this.timer = setInterval(()=>{
                        this.scrollCharArr.classList.add("animate")
                        this.scrollCharArr.style.top = parseInt(this.scrollCharArr.style.top)-parseInt(this.styleValue.height)+"px"
                        this.value = this.computdePos(this.scrollCharArr.style.top)
                        clearInterval(this.timer)
                        this.start()
                    },0)
                }
                this.value = this.computdePos(this.scrollCharArr.style.top)
            },this.time)
        },

        posFn(idx){
            return parseInt(this.styleValue.height)*idx
        },

        computdePos(top){
            const item = Array.from(this.scrollCharItem).find(item=>{
                let pos = item.getAttribute("pos")
                if(parseInt(pos)=== Math.abs(parseInt(top))){
                    return item
                }
            })
            return item?.getAttribute("value")
        }

    },
}
</script>
<style lang="scss" scoped>
.scroll-char-wrapper{
    overflow: hidden;
    &>.scroll-char-show{
        width: 100%;
        height: 100%;
        background-color: rebeccapurple;
        position: relative;
        &> .scroll-char-arr{
            height: 1000px;
            width: 100%;
            background-color: var(--eigth);
            position: absolute;
            &> .scroll-char-item{
                font-size: .9rem;
                color: #fff;
            }
        }
    }
}
.animate{
    transition-property:top;
    transition-duration:.2s;
    transition-delay:0;
    transition-timing-function:ease;
}

</style>
