<template>
     <div ref="iwork-photo-magnifier-wrap" class="iwork-photo-magnifier-wrap">
        <div ref="iwork-photo-magnifier-wrap-showbox" :style="{width:photoSize,height:photoSize}" class="iwork-photo-magnifier-wrap-showbox">
            <img ref="iwork-photo-magnifier-wrap-showbox-img" :style="{width:photoSize,height:photoSize}" class="iwork-photo-magnifier-wrap-showbox-img" src="../assets/img01.jpg" alt="">
            <div ref="iwork-photo-magnifier-wrap-showbox-hoverbox" :style="{width:hoverBox,height:hoverBox}" class="iwork-photo-magnifier-wrap-showbox-hoverbox"></div>
        </div>
        <div ref="iwork-photo-magnifier-wrap-enlarge-showbox" :style="{width:photoSize,height:photoSize}" class="iwork-photo-magnifier-wrap-enlarge-showbox">
            <img ref="iwork-photo-magnifier-wrap-enlarge-showbox-img" :style="{width:enlargeImg,height:enlargeImg}" class="iwork-photo-magnifier-wrap-enlarge-showbox-img" src="../assets/img01.jpg" alt="">
        </div>
    </div>
</template>
<script>
export default {
  name: 'iworkPictureMagnifier',
  props: {
    photoSize: {
      type: String,
      default:"400px"
    },
    scale: {
      type: Number,
      default: 4,
    },
  },
  data () {
      return {
      }
  },
  computed:{
      hoverBox:function(){
          return parseInt(this.photoSize)/this.scale+"px";
      },
      enlargeImg:function(){
          return parseInt(this.photoSize)*this.scale+"px";
      }
  },
  mounted(){
    let _this = this;
    let iworkPhotoMagnifierWrap = this.$refs["iwork-photo-magnifier-wrap"];
    let iworkPhotoMagnifierWrapShowbox = this.$refs["iwork-photo-magnifier-wrap-showbox"];
    let iworkPhotoMagnifierWrapShowboxImg = this.$refs["iwork-photo-magnifier-wrap-showbox-img"];
    let iworkPhotoMagnifierWrapShowboxHoverbox = this.$refs["iwork-photo-magnifier-wrap-showbox-hoverbox"];
    let iworkPhotoMagnifierWrapEnlargeShowbox = this.$refs["iwork-photo-magnifier-wrap-enlarge-showbox"];
    let iworkPhotoMagnifierWrapEnlargeShowboxImg = this.$refs["iwork-photo-magnifier-wrap-enlarge-showbox-img"];
    let iworkPhotoMagnifierWrapShowboxHoverboxMouseMoveTimer = null;
    let iworkPhotoMagnifierWrapShowboxHoverboxMouseOutTimer = null;
    // 放大图片的定位 放大倍数需要同覆盖div成相应比例，才能更加优雅
    function positionEnlargeImage(hoverBox){
        var currentX = parseInt(hoverBox.style.left); 
        var currentY = parseInt(hoverBox.style.top); 
        var currentEnlargeImageX =  currentX/parseInt(_this.photoSize)*parseInt(_this.enlargeImg);
        var currentEnlargeImageY =  currentY/parseInt(_this.photoSize)*parseInt(_this.enlargeImg);

        iworkPhotoMagnifierWrapEnlargeShowboxImg.style.left = -currentEnlargeImageX+"px"
        iworkPhotoMagnifierWrapEnlargeShowboxImg.style.top = -currentEnlargeImageY+"px"
    }

    // 图片外层div鼠标事件移动监听
    iworkPhotoMagnifierWrapShowbox.addEventListener("mousemove",function(e){
        clearTimeout(iworkPhotoMagnifierWrapShowboxHoverboxMouseMoveTimer)
        iworkPhotoMagnifierWrapShowboxHoverboxMouseMoveTimer = setTimeout(function(){
            // 让覆盖层出现
            iworkPhotoMagnifierWrapShowboxHoverbox.style.display = "block";
            // 让放大图片出现
            iworkPhotoMagnifierWrapEnlargeShowbox.classList.add("iwork-photo-magnifier-wrap-enlarge-showbox-active");
            // 判断元素在最左侧
            if(e.offsetX<iworkPhotoMagnifierWrapShowboxHoverbox.offsetWidth/2){
                iworkPhotoMagnifierWrapShowboxHoverbox.style.left = 0
            // 判断元素在最右侧
            }else if(e.offsetX>iworkPhotoMagnifierWrapShowbox.offsetWidth-iworkPhotoMagnifierWrapShowboxHoverbox.offsetWidth/2){
                iworkPhotoMagnifierWrapShowboxHoverbox.style.left = iworkPhotoMagnifierWrapShowbox.offsetWidth - iworkPhotoMagnifierWrapShowboxHoverbox.offsetWidth +"px"
            }else{
                iworkPhotoMagnifierWrapShowboxHoverbox.style.left = e.offsetX - iworkPhotoMagnifierWrapShowboxHoverbox.offsetWidth/2 +"px"
            }
            // 判断元素在最上侧
            if(e.offsetY<iworkPhotoMagnifierWrapShowboxHoverbox.offsetHeight/2){
                iworkPhotoMagnifierWrapShowboxHoverbox.style.top = 0
            // 判断元素在最下侧
            }else if(e.offsetY>iworkPhotoMagnifierWrapShowbox.offsetHeight-iworkPhotoMagnifierWrapShowboxHoverbox.offsetHeight/2){
                iworkPhotoMagnifierWrapShowboxHoverbox.style.top = iworkPhotoMagnifierWrapShowbox.offsetHeight - iworkPhotoMagnifierWrapShowboxHoverbox.offsetHeight +"px"
            }else{
                iworkPhotoMagnifierWrapShowboxHoverbox.style.top = e.offsetY - iworkPhotoMagnifierWrapShowboxHoverbox.offsetHeight/2 +"px"
            }
            positionEnlargeImage(iworkPhotoMagnifierWrapShowboxHoverbox)
        },1)
    })

    iworkPhotoMagnifierWrapShowbox.addEventListener("mouseout",function(e){
        clearTimeout(iworkPhotoMagnifierWrapShowboxHoverboxMouseOutTimer)
        iworkPhotoMagnifierWrapShowboxHoverboxMouseOutTimer = setTimeout(function(){
            // 让覆盖层消失
            iworkPhotoMagnifierWrapShowboxHoverbox.style.display = "none";
            // 让放大图片消失
            iworkPhotoMagnifierWrapEnlargeShowbox.classList.remove("iwork-photo-magnifier-wrap-enlarge-showbox-active");
        },1)
    })
  }
}
</script>
<style lang="scss" scoped>
.iwork-photo-magnifier-wrap{
    position: relative;
    display: inline-block;
    font-size: 0;  
}
.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-showbox{
    display: inline-block;
    cursor:move;
        
}
.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-showbox>img{
    width: 400px;
    height: 400px;
}
.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-showbox>.iwork-photo-magnifier-wrap-showbox-hoverbox{
    position: absolute;
    display: none;
    opacity:.3;
    background:#09f;
    z-index:10;
    pointer-events: none;
}
.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-enlarge-showbox{
    position: absolute;
    display: none;
    overflow: hidden;
}
.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-enlarge-showbox-active{
    display: inline-block;
}

.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-enlarge-showbox>img{
    position: absolute;
}
</style>