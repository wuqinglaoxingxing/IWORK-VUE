<template>
    <div>
        <IworkScrollChar
            :value="charValue"
            :charArr="charArr"
            :styleValue="styleValue"
        ></IworkScrollChar>
    </div>
</template>

<script>
import IworkScrollChar from "@/components/iwork-scroll-char.vue";
export default {
    components: {
        IworkScrollChar,
    },
    data() {
        return {
            charValue: NaN,
            charArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            styleValue: {
                width: "50px",
                height: "50px",
                fontSize: "40px",
            },
        };
    },
    mounted() {
        setInterval(() => {
            this.charValue = Math.ceil(Math.random() * 10);
            this.log(this.charValue);
        }, 2000);
    },
};
</script>

<style>
</style>