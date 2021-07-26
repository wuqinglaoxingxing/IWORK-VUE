<template>
    <div class="img-intercep-wrap">
        <div class="pic_wrapper">
            <img :src="picture" />
            <canvas class="pic_show"></canvas>
        </div>
        <button class="translate">截取</button>
        <canvas class="pic_draw"></canvas>
    </div>
</template>

<script>
export default {
    props: {
        // 图片
        picture: {
            required: true,
        },
        // 图片显示宽度
        wrapWidth:{
            type: Number,
            default: 500,
        },
        // 放大缩小单位 
        computedUnit:{
            type: Number,
            default: 200,
        },
        // 可以移动到边缘的最大值
        edgeMax:{
            type: Number,
            default: 10,
        },
        // 返回的截取的base64
        getExtractImg:{
            type: Function,
        }
    },
    data() {
        return {
        };
    },
    mounted() {
        let that = this
        let pic_wrapper = document.querySelector(".pic_wrapper")
        let img = pic_wrapper.querySelector("img")
        let translate = document.querySelector(".translate")
        /** @type {HTMLCanvasElement} */
        let pic_show = pic_wrapper.querySelector(".pic_show")
        let ctx = pic_show.getContext("2d")

        let initWidth,initHeight,disXO, disYO, maxWidth, maxHeight, wrapHeight

        img.onload = function () {
            initWidth = img.width
            initHeight = img.height
            maxWidth = img.width * 2
            maxHeight = img.height * 2
            wrapHeight =  parseInt(img.height / img.width * that.wrapWidth)
            pic_wrapper.style.width = that.wrapWidth+"px"
            pic_wrapper.style.height = wrapHeight+"px"
            pic_show.width = that.wrapWidth
            pic_show.height = wrapHeight
            // 初始化设置
            img.style.width = img.width +"px"
            img.style.height = img.height +"px"
            translate.style.width = that.wrapWidth +"px"
            img.style.top = 0
            img.style.left = 0

            ctx.beginPath();
            ctx.fillStyle = "rgba(255,255,255,0.3)"
            ctx.arc(that.wrapWidth / 2, wrapHeight / 2, wrapHeight / 2, 0, Math.PI / 180 * 360, false);
            ctx.fill();
        }

        let mousedownFn = function (e) {
            e.preventDefault();
            img.removeEventListener('mousemove', mousemoveFn);
            img.addEventListener("mousemove", mousemoveFn)
            disXO = e.clientX - pic_wrapper.offsetLeft - parseInt(img.style.left ? img.style.left : 0);
            disYO = e.clientY - pic_wrapper.offsetTop - parseInt(img.style.top ? img.style.top : 0);
        }
        let mouseupFn = function (e) {
            img.removeEventListener('mousemove', mousemoveFn);
        }
        let mouseleaveFn = function (e) {
            img.removeEventListener('mousemove', mousemoveFn);
        }
        let mousewheelFn = function (e) {
            let {
                width: wWidth,
                height: wHeight
            } = pic_wrapper.getBoundingClientRect()
            let wheelDelta = e.wheelDelta
            if (wheelDelta > 0) {
                let lv = Math.abs(wheelDelta) / 120
                let newWidth = img.width - lv * that.computedUnit
                let newHeight = img.height - lv * that.computedUnit
                if (newWidth > wWidth) {
                    img.style.width = newWidth + "px"
                } else {
                    img.style.width = wWidth + "px"
                }
                if (newHeight > wHeight) {
                    img.style.height = newHeight + "px"
                } else {
                    img.style.height = wHeight + "px"
                }
            } else {
                let lv = Math.abs(wheelDelta) / 120
                let newWidth = img.width + lv * that.computedUnit
                let newHeight = img.height + lv * that.computedUnit
                if (newWidth < maxWidth) {
                    img.style.width = newWidth + "px"
                } else {
                    img.style.width = maxWidth + "px"
                }
                if (newHeight < maxHeight) {
                    img.style.height = newHeight + "px"
                } else {
                    img.style.height = maxHeight + "px"
                }
            }
            if (img.width - Math.abs(parseInt(img.style.left)) < wWidth) {
                img.style.left = wWidth - img.width + "px"
            }
            if (img.height - Math.abs(parseInt(img.style.top)) < wHeight) {
                img.style.top = wHeight - img.height + "px"
            }
        }
        let mousemoveFn = function (e) {
            e.preventDefault();
            let {
                width: wWidth,
                height: wHeight
            } = pic_wrapper.getBoundingClientRect()
            let disXT = e.clientX - pic_wrapper.offsetLeft;
            let disYT = e.clientY - pic_wrapper.offsetTop;
            let disX = disXT - disXO
            let disY = disYT - disYO
            // -10可以移动到边缘的最大值
            if (disX > wWidth-that.edgeMax) {
                disX = 0
            } else {
                if (img.width - Math.abs(parseInt(disX)) < that.edgeMax) {
                    disX = wWidth - img.width
                }
            }
            // -10可以移动到边缘的最大值
            if (disY > wHeight-that.edgeMax) {
                disY = 0
            } else {
                if (img.height - Math.abs(parseInt(disY)) < that.edgeMax) {
                    disY = wHeight - img.height
                }
            }
            img.style.left = disX + "px"
            img.style.top = disY + "px"

        }
        img.addEventListener("mousedown", mousedownFn)
        img.addEventListener("mouseleave", mouseleaveFn)
        img.addEventListener("mouseup", mouseupFn)
        img.addEventListener("mousewheel", mousewheelFn)
        translate.addEventListener("click",function(){
            const width = img.style.width
            const height = img.style.height
            const top = img.style.top
            const left = img.style.left

            let pic_draw = document.querySelector(".pic_draw")
            pic_draw.width = wrapHeight
            pic_draw.height = wrapHeight
            let ctx1 = pic_draw.getContext("2d")
            ctx1.arc(wrapHeight/2, wrapHeight/2, wrapHeight/2, 0,  Math.PI / 180 * 360, false);
            ctx1.strokeStyle = '#FFFFFF'; // 设置绘制圆形边框的颜色
            ctx1.stroke(); // 绘制出圆形，默认为黑色，可通过 ctx.strokeStyle = '#FFFFFF'， 设置想要的颜色
            ctx1.clip();
            let lvW = initWidth/img.width
            let lvH = initHeight/img.height
            ctx1.drawImage(img,
                (that.wrapWidth/2-wrapHeight/2 - parseInt(left))*lvW,-parseInt(top)*lvH,
                (wrapHeight)*lvW,wrapHeight*lvH,
                0,0, wrapHeight, wrapHeight)
            that.getExtractImg(pic_draw.toDataURL('image/png'))
        },false)
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
    & > .translate {
        display: block;
        height: .35rem;
        margin: .03rem auto;
    }

    // & > .pic_draw {
    //     display: none;
    // }
}
</style>