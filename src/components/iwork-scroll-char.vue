<template>
    <div class="scroll-char-wrapper" ref="scroll-char-wrapper" :style="styleValue">
        <div class="scroll-char-show" ref="scroll-char-show">
            <div class="scroll-char-arr" ref="scroll-char-arr">
                <div class="scroll-char-item" ref="scroll-char-item" v-for="(char,index) of charArr" :style="styleValue"
                    :key="index" :value="char" :pos="posFn(index)">
                    {{char}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"iworkScrollChar",
    props: {
        charArr: {
            type: Array,
            default: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
        styleValue: {
            type: Object,
            default: () => {
                return {
                    width: "100px",
                    height: "100px",
                };
            },
        },
        value: {
            type: Number,
            default: NaN,
        },
    },
    data() {
        return {
            char: null,
            scrollCharWrapper: null,
            scrollCharShow: null,
            scrollCharArr: null,
            scrollCharItem: null,
        };
    },
    watch: {
        value: {
            handler: function (n, o) {
                if (!isNaN(n)) {
                    let pos = this.computdePos(n);
                    this.start(pos);
                }
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        this.scrollCharWrapper = this.$refs["scroll-char-wrapper"];
        this.scrollCharShow = this.$refs["scroll-char-show"];
        this.scrollCharArr = this.$refs["scroll-char-arr"];
        this.scrollCharItem = this.$refs["scroll-char-item"];

        if (
            this.scrollCharWrapper &&
            this.scrollCharShow &&
            this.scrollCharArr &&
            this.scrollCharItem
        ) {
            this.scrollCharArr.style.top = 0;
            this.scrollCharArr.style.height =
                this.charArr.length * parseInt(this.styleValue.height) + "px";
            this.scrollCharArr.classList.add("animate");
        }
    },
    methods: {
        start(pos) {
            this.scrollCharArr.classList.add("animate");
            this.scrollCharArr.style.top = -pos + "px";
        },

        posFn(idx) {
            return parseInt(this.styleValue.height) * idx;
        },

        computdePos(value) {
            const item = Array.from(this.scrollCharItem).find((item) => {
                let itemValue = item.getAttribute("value");
                if (parseInt(itemValue) === parseInt(value)) {
                    return item;
                }
            });
            return item?.getAttribute("pos");
        },
    },
};
</script>
<style lang="scss" scoped>
.scroll-char-wrapper {
    overflow: hidden;
    & > .scroll-char-show {
        width: 100%;
        height: 100%;
        background-color: rebeccapurple;
        position: relative;
        & > .scroll-char-arr {
            width: 100%;
            background-color: var(--eigth);
            position: absolute;
            & > .scroll-char-item {
                color: #fff;
            }
        }
    }
}
.animate {
    transition-property: top;
    transition-duration: 2s;
    transition-delay: 0;
    transition-timing-function: ease;
}
</style>
