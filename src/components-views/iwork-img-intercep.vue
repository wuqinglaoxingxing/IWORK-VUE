<template>
    <div>
        <iworkImgIntercep
            :picture="T1.picture"
            :wrapWidth="T1.wrapWidth"
            :edgeMax="T1.edgeMax"
            :computedUnitX="T1.computedUnitX"
            :computedUnitY="T1.computedUnitY"
            :getExtractImg="T1.getExtractImg"
        ></iworkImgIntercep>
        <div class="iworkImgIntercep-P">
            <iworkImgIntercep
                :picture="T2.picture"
                :selector="T2.selector"
                :wrapWidth="T2.wrapWidth"
                :edgeMax="T2.edgeMax"
                :computedUnitX="T2.computedUnitX"
                :computedUnitY="T2.computedUnitY"
                :getExtractImg="T2.getExtractImg"
                :enLarge="T2.enLarge"
                :enSmall="T2.enSmall"
                :sAreaTp="T2.sAreaTp"
                :wRectUnitNum="T2.wRectUnitNum"
            ></iworkImgIntercep>
        </div>
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
           T1:{
                picture: require("../assets/img-intercep.jpg"),
                wrapWidth:500,
                computedUnitX:7,
                computedUnitY:4,
                edgeMax:10,
                getExtractImg:function(imgBase64){
                    console.log(imgBase64);
                }
           },
           T2:{
                picture: require("../assets/picture-magnifier-car.jpg"),
                selector:".iworkImgIntercep-P",
                wrapWidth:500,
                computedUnitX:4.62,
                computedUnitY:10,
                edgeMax:10,
                getExtractImg:function(imgBase64){
                    console.log(imgBase64);
                },
                enLarge:3,
                enSmall:6,
                sAreaTp:"rect",
                wRectUnitNum:8
                        
                        
           }
        };
    },
    created() {},
};
</script>
