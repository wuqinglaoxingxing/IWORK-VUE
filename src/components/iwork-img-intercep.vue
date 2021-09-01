<template>
    <div class="img-intercep-wrap iwork-img-intercep">
        <div class="pic_wrapper">
            <img :src="picture" />
            <canvas class="pic_show"></canvas>
        </div>
        <div class="btn_list" :style="{width:wrapWidth+'px'}">
            <button class="translate">截取</button>
            <button class="reset">重置</button>
        </div>
        <canvas class="pic_draw"></canvas>
    </div>
</template>

<script>
export default {
    name: "iworkImgIntercep",
    props: {
        // 图片
        picture: {
            required: true,
        },
        // 图片显示宽度
        wrapWidth: {
            type: Number,
            default: 500,
        },
        // 放大缩小单位X轴
        computedUnitX: {
            type: Number,
            default: 6,
        },
        // 放大缩小单位Y轴
        computedUnitY: {
            type: Number,
            default: 6,
        },
        // 可以移动到边缘的最大值
        edgeMax: {
            type: Number,
            default: 10,
        },
        // 返回的截取的base64
        getExtractImg: {
            type: Function,
        },
        // 放大倍数
        enLarge: {
            type: Number,
            default: 2,
        },
        // 缩小倍数
        enSmall: {
            type: Number,
            default: 2,
        },
        // 选择区域
        sAreaTp:{
            type: String,
            default: "circle" //circle:圆形 rect:矩形
        },
        // 针对多个组件共同使用需要设定父选择器
        selector:{
            type:String
        },
        // 计算的矩形区域占比
        wRectUnitNum:{
            type: Number,
            default: 8,
        }
    },
    data() {
        return {};
    },
    mounted() {
        let that = this;
        let imgIntercepWrap, //最外层
            pic_wrapper, //图片层--包含canvas遮罩和图片显示
            img, //显示图片
            pic_show, //画布
            ctx,//画布上下文
            translate, //截取按钮
            reset; //重置按钮
            
        // 表示提供了父级选择器,更加精确
        if(this.selector){
            imgIntercepWrap = document.querySelector(this.selector)?.querySelector(".img-intercep-wrap");
        }
        // 确保一定有最外层对象
        if(!imgIntercepWrap){
            imgIntercepWrap = document.querySelector(".img-intercep-wrap");
        }
        pic_wrapper = imgIntercepWrap.querySelector(".pic_wrapper");
        img = pic_wrapper.querySelector("img");
        translate = imgIntercepWrap.querySelector(".translate");
        reset = imgIntercepWrap.querySelector(".reset");
        /** @type {HTMLCanvasElement} */
        pic_show = pic_wrapper.querySelector(".pic_show");
        ctx = pic_show.getContext("2d");

        let initWidth,//导入图片的宽
            initHeight,//导入图片的高
            disXO, //移动x轴距离
            disYO, //移动y轴距离
            maxWidth, //放大最大宽度
            maxHeight, //放大最大高度
            minWidth, //缩小最大宽度
            minHeight, //缩小最大高度
            wrapHeight, //通过宽度计算显示的高度
            wrapCircleR, //计算的截取圆区域半径
            wRectUnitX, //计算的矩形的x轴单位
            wRectUnitY, //计算的矩形的y轴单位
            wRectUnitNum=this.wRectUnitNum; //计算的矩形区域占比
        
        img.onload = function () {
            initWidth = img.width;
            initHeight = img.height;

            wrapHeight = parseInt((img.height / img.width) * that.wrapWidth);
            maxWidth = that.wrapWidth * that.enLarge;
            maxHeight = wrapHeight * that.enLarge;
            minWidth = that.wrapWidth / that.enSmall;
            minHeight = wrapHeight / that.enSmall;

            img.width = that.wrapWidth;
            img.height = wrapHeight;

            pic_wrapper.style.width = that.wrapWidth + "px";
            pic_wrapper.style.height = wrapHeight + "px";
            pic_show.width = that.wrapWidth;
            pic_show.height = wrapHeight;
            // 初始化设置
            img.style.width = img.width + "px";
            img.style.height = img.height + "px";
            img.style.top = 0;
            img.style.left = 0;

            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255,.3)";
            /*矩形代码*/
            if(that.sAreaTp==="rect"){
                wRectUnitX = that.wrapWidth / wRectUnitNum;
                wRectUnitY = wrapHeight / wRectUnitNum;
                ctx.fillRect(wRectUnitX, wRectUnitY, (wRectUnitNum-2) * wRectUnitX, (wRectUnitNum-2) * wRectUnitY);
            }
            /*矩形代码*/
            /*圆形代码*/
            if(that.sAreaTp==="circle"){
                wrapCircleR=that.wrapWidth>wrapHeight?wrapHeight:that.wrapWidth
                ctx.arc(
                    that.wrapWidth / 2,
                    wrapHeight / 2,
                    wrapCircleR / 2,
                    0,
                    (Math.PI / 180) * 360,
                    false
                );
            }
            /*圆形代码*/
            ctx.fill();
        };

        let mousedownFn = function (e) {
            e.preventDefault();
            // 针对移速过快导致拖拽物脱离鼠标问题
            pic_wrapper.removeEventListener("mousemove", mousemoveFn);
            img.addEventListener("mousemove", mousemoveFn);
            disXO =
                e.clientX -
                pic_wrapper.offsetLeft -
                parseInt(img.style.left ? img.style.left : 0);
            disYO =
                e.clientY -
                pic_wrapper.offsetTop -
                parseInt(img.style.top ? img.style.top : 0);
        };
        let mouseupFn = function (e) {
            img.removeEventListener("mousemove", mousemoveFn);
        };
        let mouseleaveFn = function (e) {
            img.removeEventListener("mousemove", mousemoveFn);
        };
        let mousewheelFn = function (e) {
            e.preventDefault();
            e.stopPropagation();
            let wheelDelta = e.wheelDelta;
            let lv = Math.abs(wheelDelta) / 120;
            // 保证放大倍数
            lv = lv < 1 ? 1 : lv;
            // 获取是否为mac
            const osMac = that.os().isMac;
            let attrWidth,attrHeight;
            // 利用属性，防止小数
            let imgWidth = img.getAttribute("attrW")? parseFloat(img.getAttribute("attrW")):img.width
            let imgHeight = img.getAttribute("attrH")? parseFloat(img.getAttribute("attrH")):img.height
            if ((wheelDelta > 0 && osMac) || (!osMac && wheelDelta < 0)) {
                let newWidth =  imgWidth - lv * that.computedUnitX;
                let newHeight = imgHeight - lv * that.computedUnitY;
                // 获取宽度,高度，将其设置到属性上
                attrWidth = newWidth > minWidth ?newWidth:minWidth
                attrHeight = newHeight > minHeight?newHeight:minHeight
            } else {
                let newWidth = imgWidth + lv * that.computedUnitX;
                let newHeight = imgHeight + lv * that.computedUnitY;
                // 获取宽度,高度，将其设置到属性上
                attrWidth = newWidth < maxWidth?newWidth:maxWidth
                attrHeight = newHeight < maxHeight?newHeight:maxHeight
            }
            img.style.width = attrWidth + "px";
            img.style.height = attrHeight + "px";
            img.setAttribute("attrW",attrWidth)
            img.setAttribute("attrH",attrHeight)
        };
        let mousemoveFn = function (e) {
            e.preventDefault();
            let { width: wWidth, height: wHeight } =
                pic_wrapper.getBoundingClientRect();
            let disXT = e.clientX - pic_wrapper.offsetLeft;
            let disYT = e.clientY - pic_wrapper.offsetTop;
            let disX = disXT - disXO;
            let disY = disYT - disYO;
            // -10可以移动到边缘的最大值
            if (wWidth - disX < that.edgeMax) {
                disX = wWidth - that.edgeMax;
            } else if (disX + img.width < that.edgeMax) {
                disX = that.edgeMax - img.width;
            }
            // -10可以移动到边缘的最大值
            if (wHeight - disY < that.edgeMax) {
                disY = wHeight - that.edgeMax;
            } else if (disY + img.height < that.edgeMax) {
                disY = that.edgeMax - img.height;
            }
            img.style.left = disX + "px";
            img.style.top = disY + "px";
        };
        img.addEventListener("mousedown", mousedownFn);
        img.addEventListener("mouseleave", mouseleaveFn);
        img.addEventListener("mouseup", mouseupFn);
        pic_wrapper.addEventListener("mousewheel", mousewheelFn);
        translate.addEventListener(
            "click",
            function () {
                const width = img.style.width;
                const height = img.style.height;
                const top = img.style.top;
                const left = img.style.left;
                const lvW = initWidth / img.width;
                const lvH = initHeight / img.height;  

                let pic_draw = imgIntercepWrap.querySelector(".pic_draw");
                let ctx1 = pic_draw.getContext("2d");
                /*圆形代码*/
                if(that.sAreaTp==="circle"){
                    pic_draw.width = wrapCircleR;
                    pic_draw.height = wrapCircleR;
                    ctx1.arc(
                        wrapCircleR / 2,
                        wrapCircleR / 2,
                        wrapCircleR / 2,
                        0,
                        (Math.PI / 180) * 360,
                        false
                    );
                    ctx1.strokeStyle = "#FFFFFF"; // 设置绘制圆形边框的颜色
                    ctx1.stroke(); // 绘制出圆形，默认为黑色，可通过 ctx.strokeStyle = '#FFFFFF'， 设置想要的颜色
                    ctx1.clip();
                    // 核心计算画的区域
                    ctx1.drawImage(
                        img,
                        (that.wrapWidth / 2 - wrapCircleR / 2 - parseInt(left)) * lvW,
                        (wrapHeight/2 - wrapCircleR/2 - parseInt(top)) * lvH,
                        wrapCircleR * lvW,
                        wrapCircleR * lvH,
                        0,
                        0,
                        wrapCircleR,
                        wrapCircleR
                    );
                }
                /*圆形代码*/
                /*矩形代码*/
                if(that.sAreaTp==="rect"){
                    pic_draw.width = (wRectUnitNum-2)*wRectUnitX;
                    pic_draw.height = (wRectUnitNum-2)*wRectUnitY;
                    ctx1.drawImage(
                        img,
                        (that.wrapWidth / wRectUnitNum - parseInt(left)) *
                            lvW,
                        (-parseInt(top) +wRectUnitY) * lvH+2,
                        (wRectUnitNum-2)*wRectUnitX * lvW,
                        (wRectUnitNum-2)*wRectUnitY * lvH,
                        0,
                        0,
                        (wRectUnitNum-2)*wRectUnitX,
                        (wRectUnitNum-2)*wRectUnitY
                    );
                }
                /*矩形代码*/
                that.getExtractImg(pic_draw.toDataURL("image/png"));
            },
            false
        );
        reset.addEventListener(
            "click",
            function () {
                img.style.width = that.wrapWidth + "px";
                img.style.height = wrapHeight + "px";
                img.style.left = 0;
                img.style.top = 0;
                img.removeAttribute("attrW")
                img.removeAttribute("attrH")
            },
            false
        );
    },
    methods: {
        os() {
            let UserAgent = window.navigator.userAgent.toLowerCase();
            return {
                isIpad: /ipad/.test(UserAgent),
                isIphone: /iphone os/.test(UserAgent),
                isAndroid: /android/.test(UserAgent),
                isWindowsCe: /windows ce/.test(UserAgent),
                isWindowsMobile: /windows mobile/.test(UserAgent),
                isWin2K: /windows nt 5.0/.test(UserAgent),
                isXP: /windows nt 5.1/.test(UserAgent),
                isVista: /windows nt 6.0/.test(UserAgent),
                isWin7: /windows nt 6.1/.test(UserAgent),
                isWin8: /windows nt 6.2/.test(UserAgent),
                isWin81: /windows nt 6.3/.test(UserAgent),
                isMac: /mac os/.test(UserAgent),
            };
        },
    },
};
</script>
<style lang="scss" scoped>
.img-intercep-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0;
    & > .pic_wrapper {
        display: inline-block;
        overflow: hidden;
        cursor: move;
        position: relative;
        background: url(../assets/touming.png);
        & > img {
            position: absolute;
            z-index: 1;
        }

        & > .pic_show {
            left: 0;
            top: 0;
            position: absolute;
            z-index: 2;
            pointer-events: none;
        }
    }

    & > .btn_list {
        margin: 0.03rem auto;
        display: flex;
        font-size: 0.14rem;
        & > button {
            flex: 1;
            border: none;
            outline: none;
        }
        & > .translate {
            border-right: 1px #ddd solid;
            background: var(--first);
        }
        & > .reset {
            background: var(--second);
        }
    }

}
</style>