<template>
  <div class="rightSideWrap">
    <div class="rightSideView" v-if="!descView.title">
        <div class="routerViewWrap">
            <div class="routerView">
                <router-view></router-view>
            </div>
        </div>
    </div>
    <div class="rightSideView" v-if="descView.title">
        <div class="labelView">
            <span v-text="descView.title"></span>
        </div>
        <div class="routerViewWrap">
            <span>Demo</span>
            <div class="routerView">
                <router-view></router-view>
            </div>
        </div>
        <div class="descView">
            <div class="descViewCode" v-text="descView.code"></div>
            <div class="descViewParams" v-html="descView.params"></div>
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
        $route: function () {
            this.routeChange();
        },
    },
    created() {
            this.routeChange();
    },
  methods: {
    routeChange: function () {
        switch (this.$route.path) {
            case "/iworkCalendar":
                this.descView = {
                    title: this.$route.name,
                    code: `<IworkCalendar :isInitNow="isInitNow" iworkData="date" :format="format" :level="level"></IworkCalendar>`,
                    params: `
                        <pre>
                        isInitNow:是否使用初始化时间标志
                        iworkData:初始化时间,该属性生效需要依赖 isInitNow
                        format:格式化时间
                        level:日历选择等级
                        备注:isInitNow 为false  iworkData不起作用且输入框为空
                            isInitNow 为true   iworkData不为空 则使用iworkData 若iworkData为空,日期为当前日期
                            iworkData  子组件会自动将日期传给父组件
                            level      1 表示可选择到年 2 表示可选择到月 3 表示可选择到日

                        模拟数据:
                        {
                            date: "",
                            isInitNow: false,
                            format: "yyyy/MM/dd",
                            level: 3,
                        }
                        </pre>`,
                };
                break;
            case "/iworkUpload":
                this.descView = {
                    title: this.$route.name,
                    code: ` <IworkUpload file="file" :isMultiple="isMultiple" :isHand="isHand" @upload="upload"></IworkUpload>`,
                    params: `
                    <pre>
                        file:存储文件变量
                        isMultiple:是否允许多文件上传
                        isHand:是否有小手主动触发上传,与upload组合使用
                        upload:上传文件的回到函数,与isHand组合使用
                        备注:isInitNow 为false  iworkData不起作用且输入框为空
                            isInitNow 为true   iworkData不为空 则使用iworkData 若iworkData为空,日期为当前日期
                        模拟数据:
                        {
                            file: [],    //选择的文件，子组件自动传递父组件，可能为数组，也可能为对象，取决于isMultiple
                            isHand:false,  //是否有手动上传图标
                            isMultiple: false, //默认是单文件上传
                            upload: function(file) {} //file 上传的文件
                        }
                    </pre>`,
                };
                break;
            case "/iworkPictureMagnifier":
                this.descView = {
                    title: this.$route.name,
                    code: `<IworkPictureMagnifier :photo="photo" :photoSize="photoSize" :scale="scale"></IworkPictureMagnifier>`,
                    params: `
                    <pre>
                    photo:图片路径地址
                    photoSize:原图片大小
                    scale:放大倍数或缩小倍数
                    备注:photo     默认值为  '../assets/picture-magnifier.jpg'
                        photoSize 默认值为400px
                        scale     为4   将图片放大到原图片的scale倍,将覆盖阴影缩小为原图片的scale倍
                    模拟数据:
                    {
                        photo: "../assets/picture-magnifier.jpg"
                        photoSize: "400px",  //原图片的为400px * 400px
                        scale: 4,            //放大图片为1600px*1600px   覆盖阴影为100px * 100px
                    }
                    {
                        photo: "../assets/picture-magnifier.jpg"
                        photoSize: "400px",  //原图片的为400px * 400px
                        scale: 2,            //放大图片为800px*800px   覆盖阴影为200px * 200px
                    }
                    </pre>`,
                };
                break;
            case "/iworkLuckDraw":
                this.descView = {
                    title: this.$route.name,
                    code: `<IworkLuckDraw :luckDrawSize="luckDrawSize" :selectorParts="selectorParts" :isBlackCurtain="isBlackCurtain" :setRegion="setRegion" :customColor="customColor" :callGift="callGift"></IworkLuckDraw>`,
                    params: `
                        <pre>
                        luckDrawSize:抽奖转盘大小
                        selectorParts:转盘奖项
                        isBlackCurtain:转盘是否具有黑幕
                        setRegion:在有黑幕下指定转到哪一个奖项
                        customColor:转盘颜色控制(必输)
                        callGift:奖项信息回调
                        备注:  luckDrawSize      字符串 默认值为  '400px'
                                selectorParts     数组 默认值为 [
                                                                { text: "苹果1" },{ text: "苹果2" },{ text: "苹果3" },
                                                                { text: "苹果4" },{ text: "苹果5" },{ text: "苹果6" },
                                                                { text: "苹果7" },{ text: "苹果8" },{ text: "苹果9" },{ text: "苹果10" },
                                                            ]
                                isBlackCurtain    默认值为false  与setRegion配合使用
                                setRegion       默认值为1   与isBlackCurtain配合使用
                                customColor    必输(详情请看模拟数据)
                                callGift     默认值为(gift)=>{
                                                    console.warn("======gift=====")
                                                    console.warn(gift)
                                                    console.warn("======gift=====") 
                                                    }    gift为奖项信息
                        模拟数据:
                        {
                            luckDrawSize:"200px",
                            selectorParts:[
                            {text:"华为1"},{text:"华为2"},{text:"华为3"},
                            {text:"华为4"},{text:"华为5"},{text:"华为6"},
                            {text:"华为7"},{text:"华为8"},{text:"华为9"},{text:"华为10"},
                            ],
                            isBlackCurtain:false,
                            setRegion:4,
                            customColor: {
                            outCircle: "red",   //外层圆颜色
                            singlePart: "yellow",   //奖品单区域颜色
                            doublePart: "blue",     //奖品双区域颜色
                            text: "green",          //文字颜色
                            cursorPoint: "red",     //指针颜色
                            animation: {            //转盘灯颜色
                                "0%": "#eaff99",
                                "20%": "#e0ff66",
                                "40%": "#d6ff32",
                                "60%": "#ccff00",
                                "80%": "#a3cc00",
                                "100%": "#7a9900",
                            },
                            },
                            // callGift放在methods里面
                            callGift(gift){
                            console.log("hello")
                            }
                        }
                        </pre>`,
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
            background: var(--eleventh);
            border-radius: 8px;
            margin: 5vh auto;
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
            margin: 5vh auto;
            border: 1px var(--eleventh) solid;
            padding: 50px 0;
            border-radius: 8px;
            display: flex;
            position: relative;
            span {
                position: absolute;
                top: 0;
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
        .descView {
            width: 90%;
            margin: 5vh auto;
            border: 1px var(--eleventh) solid;
            border-radius: 8px;
            .descViewCode {
                background: var(--eleventh);
                text-align: center;
                line-height: 40px;
                color: var(--tenth);
                font-weight: 600;
            }
            .descViewParams {
                text-align: left;
                margin: 3vh 0;
                color: var(--ninth);
                pre {
                text-align: left;
                }
            }
        }
    }
}
</style>
