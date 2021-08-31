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
    },
    data() {
        return {};
    },
    mounted() {
        let that = this;
        let imgIntercepWrap = document.querySelector(".img-intercep-wrap");
        let pic_wrapper = imgIntercepWrap.querySelector(".pic_wrapper");
        let img = pic_wrapper.querySelector("img");
        let translate = imgIntercepWrap.querySelector(".translate");
        let reset = imgIntercepWrap.querySelector(".reset");
        /** @type {HTMLCanvasElement} */
        let pic_show = pic_wrapper.querySelector(".pic_show");
        let ctx = pic_show.getContext("2d");

        let initWidth,
            initHeight,
            disXO,
            disYO,
            maxWidth,
            maxHeight,
            wrapHeight;

        img.onload = function () {
            initWidth = img.width;
            initHeight = img.height;

            wrapHeight = parseInt((img.height / img.width) * that.wrapWidth);
            maxWidth = that.wrapWidth * that.enLarge;
            maxHeight = wrapHeight * that.enLarge;

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
            /*测试代码*/
            let wWUnitX = that.wrapWidth / 8;
            let wWUnitY = wrapHeight / 8;
            ctx.fillRect(wWUnitX, wWUnitY, 6 * wWUnitX, 6 * wWUnitY);
            /*测试代码*/
            // ctx.arc(
            //     that.wrapWidth / 2,
            //     wrapHeight / 2,
            //     wrapHeight / 2,
            //     0,
            //     (Math.PI / 180) * 360,
            //     false
            // );
            ctx.fill();
        };

        let mousedownFn = function (e) {
            e.preventDefault();
            img.removeEventListener("mousemove", mousemoveFn);
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
            if ((wheelDelta > 0 && osMac) || (!osMac && wheelDelta < 0)) {
                let newWidth = img.width - lv * that.computedUnitX;
                let newHeight = img.height - lv * that.computedUnitY;
                if (newWidth > that.wrapWidth / 2) {
                    img.style.width = newWidth + "px";
                } else {
                    img.style.width = that.wrapWidth / 2 + "px";
                }
                if (newHeight > wrapHeight / 2) {
                    img.style.height = newHeight + "px";
                } else {
                    img.style.height = wrapHeight / 2 + "px";
                }
            } else {
                let newWidth = img.width + lv * that.computedUnitX;
                let newHeight = img.height + lv * that.computedUnitY;
                if (newWidth < maxWidth) {
                    img.style.width = newWidth + "px";
                } else {
                    img.style.width = maxWidth + "px";
                }
                if (newHeight < maxHeight) {
                    img.style.height = newHeight + "px";
                } else {
                    img.style.height = maxHeight + "px";
                }
            }
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

                let pic_draw = document.querySelector(".pic_draw");
                // pic_draw.width = wrapHeight;
                // pic_draw.height = wrapHeight;
                let wWUnitX = that.wrapWidth / 8;
                let wWUnitY = wrapHeight / 8;
                pic_draw.width = 6*wWUnitX;
                pic_draw.height = 6*wWUnitY;
                let ctx1 = pic_draw.getContext("2d");
                // ctx1.arc(
                //     wrapHeight / 2,
                //     wrapHeight / 2,
                //     wrapHeight / 2,
                //     0,
                //     (Math.PI / 180) * 360,
                //     false
                // );
                // ctx1.fillRect(wWUnitX, wWUnitY, 6 * wWUnitX, 6 * wWUnitY);


                // ctx1.strokeStyle = "#FFFFFF"; // 设置绘制圆形边框的颜色
                // ctx1.stroke(); // 绘制出圆形，默认为黑色，可通过 ctx.strokeStyle = '#FFFFFF'， 设置想要的颜色
                // ctx1.clip();
                let lvW = initWidth / img.width;
                let lvH = initHeight / img.height;
                // ctx1.drawImage(
                //     img,
                //     (that.wrapWidth / 2 - wrapHeight / 2 - parseInt(left)) *
                //         lvW,
                //     -parseInt(top) * lvH,
                //     wrapHeight * lvW,
                //     wrapHeight * lvH,
                //     0,
                //     0,
                //     wrapHeight,
                //     wrapHeight
                // );
                ctx1.drawImage(
                    img,
                    (that.wrapWidth / 8 - parseInt(left)) *
                        lvW,
                    (-parseInt(top) +wWUnitY) * lvH+2,
                    6*wWUnitX * lvW,
                    6*wWUnitY * lvH,
                    0,
                    0,
                    6*wWUnitX,
                    6*wWUnitY
                );
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
        }
        & > .translate {
            border-right: 1px #ddd solid;
            background: var(--first);
        }
        & > .reset {
            background: var(--second);
        }
    }

    // & > .pic_draw {
    //     display: none;
    // }
}
</style>