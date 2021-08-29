<template>
  <div class="rightSideWrap">
    <div class="rightSideView" v-if="!descView.title">
        <div class="routerViewWrap">
            <div class="routerView">
                <keep-alive>
                    <component v-bind:is="components[$route.path]"></component>
                    <!-- <router-view></router-view> -->
                </keep-alive>
                <!-- <router-view></router-view> -->
            </div>
        </div>
    </div>
    <div class="rightSideView" v-if="descView.title">
        <div class="labelView">
            <span v-text="descView.title"></span>
        </div>
        <div class="routerViewWrap">
            <span>Demo</span>
            <div class="routerView" :style="{height:$route.path=='/iworkCodeRainCloth'?'1000px':''}">
                <keep-alive>
                    <component v-bind:is="components[$route.path]"></component>
                </keep-alive>
            </div>
        </div>
        <div class="descView">
            <div class="descViewCode" v-text="descView.code"></div>
            <div class="descViewParams" v-html="descView.params"></div>
            <div class="descViewEnclosure">附件：<a @click.prevent="go(descView.enclosure)">查看</a></div>
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
            components:{
                "/":() => import('@/components/iwork-hello.vue'),
                "/iworkHello":() => import('@/components/iwork-hello.vue'),
                "/iworkCalendar":()=>import('@/components/iwork-calendar.vue'),
                "/iworkUpload":()=>import('@/components/iwork-upload.vue'),
                "/iworkPictureMagnifier":()=>import('@/components/iwork-picture-magnifier.vue'),
                "/iworkLuckDraw":()=>import('@/components/iwork-luck-draw.vue'),
                "/iworkTaiji":()=>import('@/components/iwork-taiji.vue'),
                "/iworkCodeRainCloth":()=>import('@/components/iwork-code-rain.vue'),
                "/iworkScrollChar":()=>import('@/components-views/iwork-scroll-char.vue'),
                "/iworkTableTree":()=>import('@/components-views/iwork-table-tree.vue'),
                "/iworkImgIntercep":()=>import('@/components-views/iwork-img-intercep.vue'),
            }
        };
    },
    watch: {
        $route: function (n,v) {
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
                    code: `<IworkCalendar :isInitNow="isInitNow" iworkData="date" :format="format" :level="level" :showStyle="showStyle" :dateBetWeenCall="dateBetWeenCall"></IworkCalendar>`,
                    params: `
                        <pre>
                        isInitNow:是否使用初始化时间标志
                        iworkData:初始化时间,该属性生效需要依赖 isInitNow
                        format:格式化时间
                        level:日历选择等级
                        showStyle:日历选择后展示样式
                        dateBetWeenCall:日期规定选择范围
                        备注:isInitNow 为false  iworkData不起作用且输入框为空
                            isInitNow 为true   iworkData不为空 则使用iworkData 若iworkData为空,日期为当前日期
                            iworkData  子组件会自动将日期传给父组件
                            level      1 表示可选择到年 2 表示可选择到月 3 表示可选择到日
                            showStyle:日历选择后展示样式
                            dateBetWeenCall:回调函数,自定义写法
                            /**
                             * 日期禁用
                             * time: 时间戳 页面返回回来的时间戳
                             * level:日期等级 1--年 2--月 3--日
                             * return: 返回false不禁用，true禁用
                             * */ 
                            // 例一：禁用除了2021-2023意外的的所有日期

                            //  dateBetWeenCall(time,level){
                            //     let date = new Date();
                            //     date.setTime(time)
                            //     if([2021,2022,2023].includes(date.getFullYear())){
                            //         return false
                            //     }else{
                            //         return true
                            //     }
                            // },
                            // 例二：禁用除了所有的节假日日期 0-星期天 和 6-星期六 禁用

                            // dateBetWeenCall(time,level){
                            //     let date = new Date();
                            //     date.setTime(time)
                            //     if(level==3){
                            //         if(date.getDay()==0||date.getDay()==6){
                            //             return true;
                            //         }else{
                            //             return false;
                            //         }
                            //     }else{
                            //         return false;
                            //     }
                            // }
                            // 例三：禁用指定的日期 2021-01-12 2021-01-13 2022-02-xx 2023-xx-xx
                            
                            // dateBetWeenCall(time,level){
                            //     let date = new Date();
                            //     date.setTime(time)
                            //     if(level==1){
                            //         if([2023].includes(date.getFullYear())){
                            //             return true;
                            //         }else{
                            //             return false;
                            //         }
                            //     }else if(level==2){
                            //         if(
                            //             ([2022].includes(date.getFullYear())&&[2].includes(date.getMonth()+1))
                            //             ||
                            //             ([2023].includes(date.getFullYear()))
                            //         ){
                            //             return true;
                            //         }else{
                            //             return false;
                            //         }
                            //     }else{
                            //         if(
                            //             ([2021].includes(date.getFullYear())&&[1].includes(date.getMonth()+1)&&[12,13].includes(date.getDate()))
                            //             ||
                            //             ([2022].includes(date.getFullYear())&&[2].includes(date.getMonth()+1))
                            //             ||
                            //             ([2023].includes(date.getFullYear()))
                            //         ){
                            //             return true;
                            //         }else{
                            //             return false;
                            //         }
                            //     }
                            // }
                        模拟数据:
                        {
                            date: "20210110",
                            isInitNow: true,
                            format: "yyyy-MM-dd",
                            level: 3,
                            showStyle:{
                                background: "linear-gradient(#e66465, #9198e5)"
                            },
                        }
                        dateBetWeenCall放在methods里面
                        /**
                         * 日期禁用
                         * time: 时间戳 页面返回回来的时间戳
                         * level:日期等级 1--年 2--月 3--日
                         * */ 
                        dateBetWeenCall:function(time,level) {
                            return false;
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
                            // upload放在methods里面
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
            case "/iworkTaiji":
                this.descView = {
                    title: this.$route.name,
                    code: `<IworkTaiji :taijiSize="taijiSize" :taijiColor="taijiColor"></IworkTaiji>`,
                    params: `
                        <pre>
                        taijiSize:太极尺寸
                        taijiColor:太极颜色
                        备注:    taijiSize      字符串 默认值为  '200px'
                                taijiColor     数组 必输 默认值为 []
                        模拟数据:
                        {
                            taijiSize:"400px",    
                            taijiColor:["#fff","#000"]   //黑白太极
                        }
                        </pre>`,
                };
                break;
            case "/iworkCodeRainCloth":
                this.descView = {
                    title: this.$route.name,
                    code: `<IworkTaiji :taijiSize="taijiSize" :taijiColor="taijiColor"></IworkTaiji>`,
                    params: `
                        <pre>
                        taijiSize:太极尺寸
                        taijiColor:太极颜色
                        备注:    taijiSize      字符串 默认值为  '200px'
                                taijiColor     数组 必输 默认值为 []
                        模拟数据:
                        {
                            taijiSize:"400px",    
                            taijiColor:["#fff","#000"]   //黑白太极
                        }
                        </pre>`,
                };
                break;
            case "/iworkScrollChar":
                this.descView = {
                    title: this.$route.name,
                    code: `<IworkScrollChar :charArr="charArr" :value="charValue" :styleValue="styleValue"></IworkScrollChar>`,
                    params: `
                        <pre>
                        参考首页:
                        charArr:字符数组
                        styleValue:单个显示样式
                        value:需要变化的值
                        备注:    charArr        数组 默认值为  [0,1,2,3,4,5,6,7,8,9,10]
                                styleValue     数组 对象 默认值为  {
                                                                    width:"100px",
                                                                    height:"100px"
                                                                };
                                value:必输，初始化为NaN  mounted传入具体值
                        模拟数据:
                        {
                            charValue:NaN,
                            charArr:[1,2,3,4,5,6,7,8,9,10,11,12,13],
                            styleValue:{
                                width:"50px",
                                height:"50px",
                                fontSize:"40px"
                            }
                        }
                        mounted(){
                            setInterval(()=>{
                                this.charValue = Math.ceil(Math.random()*10)
                                this.log(this.charValue)
                            },3000)
                        } ,
                        </pre>`,
                };
                break;
            case "/iworkTableTree":
                this.descView = {
                    title: this.$route.name,
                    code: `<iworkTableTree :tablekeys="tablekeys" :tablekeysDesc="tablekeysDesc" :tablevalue="tablevalue" :isNotClose="isNotClose" :isShowOprt="isShowOprt" :isSelection="isSelection" :oprtEvent="oprtEvent"></iworkTableTree>`,
                    params: `
                        <pre>
                        tablekeys：表格列key值数组，用于渲染表头和遍历数据
                        tablekeysDesc：表格列key值所对应的描述数组，用于渲染表头
                        tablevalue：表格数据---需满足树的数据结构 
                                    --拥有selectd属性的数据会添加多选框
                        isNotClose：表格初始状态的开合状态
                        isShowOprt：是否显示操作栏位
                        isSelection：具有勾选框
                        oprtEvent：操作栏位的自定义操作
                        模拟数据:
                        tablevalue: [],--查看附件
                        tablekeys: [
                            "menuitemndesc",
                            "__istramenudesc",
                            "menuitemdesc",
                            "menuitemlevnbr",
                        ],
                        tablekeysDesc: {
                            menuitemndesc: "菜单名称",
                            __istramenudesc: "菜单类型",
                            menuitemdesc: "菜单名称",
                            menuitemlevnbr: "菜单层级",
                        },
                        isNotClose:false,
                        isShowOprt:"end",  //none,start,end
                        isSelection:true, //具有勾选框
                        oprtEvent:[
                            {
                                name:"新增",
                                icon:require("../assets/addM.png"),
                                event:function(item){
                                    console.log("add",item);
                                }
                            },
                            {
                                name:"修改",
                                icon:require("../assets/editM.png"),
                                event:function(item){
                                    console.log("edit",item);
                                }
                            },
                            {
                                name:"删除",
                                icon:require("../assets/deleteM.png"),
                                event:function(item){
                                    console.log("delete",item);
                                }
                            }
                        ]
                        </pre>`,
                        enclosure:" https://gitee.com/AnHuiNG/IWORK-VUE/raw/main/json/tree.json"
                };
                break;
            case "/iworkImgIntercep":
                this.descView = {
                    title: this.$route.name,
                    code: `<iworkImgIntercep :picture="picture" :wrapWidth="wrapWidth" :edgeMax="edgeMax" :computedUnit="computedUnit"  :getExtractImg="getExtractImg"></iworkImgIntercep>`,
                    params: `
                        <pre>
                        picture:图片
                        wrapWidth:图片显示宽度
                        computedUnitX:放大缩小单位X轴
                        computedUnitY:放大缩小单位Y轴
                        edgeMax:可以移动到边缘的最大值
                        getExtractImg:返回的截取的base64
                        模拟数据:
                        {
                            picture: require("../assets/img-intercep.jpg"),
                            wrapWidth:500,
                            // computedUnitX:200,
                            // computedUnitY:112,
                            computedUnitX:7,
                            computedUnitY:4,
                            edgeMax:10,
                            getExtractImg:function(imgBase64){
                                console.log(imgBase64);
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
    go(url){
        window.open(url,"_blank")
    }
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
            .descViewEnclosure{
                text-align: left;
                text-indent: .2rem;
                font-size: .18rem;
                a{
                    color: var(--theme12);
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
