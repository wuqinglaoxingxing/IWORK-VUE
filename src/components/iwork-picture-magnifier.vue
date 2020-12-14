<template>
     <div id="iwork-photo-magnifier-wrap" class="iwork-photo-magnifier-wrap">
        <div id="iwork-photo-magnifier-wrap-showbox" class="iwork-photo-magnifier-wrap-showbox">
            <img id="iwork-photo-magnifier-wrap-showbox-img" class="iwork-photo-magnifier-wrap-showbox-img" src="./img01.jpg" alt="">
            <div id="iwork-photo-magnifier-wrap-showbox-hoverbox" class="iwork-photo-magnifier-wrap-showbox-hoverbox"></div>
        </div>
        <div id="iwork-photo-magnifier-wrap-enlarge-showbox" class="iwork-photo-magnifier-wrap-enlarge-showbox">
            <img id="iwork-photo-magnifier-wrap-enlarge-showbox-img" class="iwork-photo-magnifier-wrap-enlarge-showbox-img" src="./img01.jpg" alt="">
        </div>
    </div>
</template>
<script>

    let iworkPhotoMagnifierWrap = document.getElementById("iwork-photo-magnifier-wrap");
    let iworkPhotoMagnifierWrapShowbox = document.getElementById("iwork-photo-magnifier-wrap-showbox");
    let iworkPhotoMagnifierWrapShowboxImg = document.getElementById("iwork-photo-magnifier-wrap-showbox-img");
    let iworkPhotoMagnifierWrapShowboxHoverbox = document.getElementById("iwork-photo-magnifier-wrap-showbox-hoverbox");
    let iworkPhotoMagnifierWrapEnlargeShowbox = document.getElementById("iwork-photo-magnifier-wrap-enlarge-showbox");
    let iworkPhotoMagnifierWrapEnlargeShowboxImg = document.getElementById("iwork-photo-magnifier-wrap-enlarge-showbox-img");
    let iworkPhotoMagnifierWrapShowboxHoverboxMouseMoveTimer = null;
    let iworkPhotoMagnifierWrapShowboxHoverboxMouseOutTimer = null;
    // 放大图片的定位 放大倍数需要同覆盖div成相应比例，才能更加优雅
    function positionEnlargeImage(hoverBox){
        var currentX = parseInt(hoverBox.style.left); 
        var currentY = parseInt(hoverBox.style.top); 
        var currentEnlargeImageX =  currentX/400*1600;
        var currentEnlargeImageY =  currentY/400*1600

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
            iworkPhotoMagnifierWrapShowboxHoverbox.style.display = "none"
        },1)
    })
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
    width: 100px;
    height: 100px;
    opacity:.3;
    background:#09f;
    z-index:10;
    pointer-events: none;
}
.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-enlarge-showbox{
    position: absolute;
    display: none;
    width: 400px;
    height: 400px;
    overflow: hidden;
}
.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-enlarge-showbox-active{
    display: inline-block;
}

.iwork-photo-magnifier-wrap>.iwork-photo-magnifier-wrap-enlarge-showbox>img{
    position: absolute;
    width: 1600px;
    height: 1600px;
}
</style>