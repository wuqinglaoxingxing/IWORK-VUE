<template>
    <div>
        <iworkImgIntercep
            :picture="picture"
            :wrapWidth="wrapWidth"
            :edgeMax="edgeMax"
            :computedUnitX="computedUnitX"
            :computedUnitY="computedUnitY"
            :getExtractImg="getExtractImg"
        ></iworkImgIntercep>
    </div>
</template>

<script>
import iworkImgIntercep from "@/components/iwork-img-intercep.vue";
export default {
    components: {
        iworkImgIntercep,
    },
    data() {
        return {
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
        };
    },
    created() {},
};
</script>
