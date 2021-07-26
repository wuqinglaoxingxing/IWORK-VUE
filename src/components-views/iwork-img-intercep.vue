<template>
    <div>
        <iworkImgIntercep
            :picture="picture"
            :wrapWidth="wrapWidth"
            :edgeMax="edgeMax"
            :computedUnit="computedUnit"
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
            computedUnit:200,
            edgeMax:10,
            getExtractImg:function(imgBase64){
                console.log(imgBase64);
            }
        };
    },
    created() {},
};
</script>
