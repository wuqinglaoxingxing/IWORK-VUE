(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-120a420c"],{"157b":function(t,e,i){t.exports=i.p+"img/img-intercep.f8e9497a.jpg"},2418:function(t,e,i){"use strict";var n=i("d3d4"),r=i.n(n);r.a},"35a8":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("iworkImgIntercep",{attrs:{picture:t.picture,wrapWidth:t.wrapWidth,edgeMax:t.edgeMax,computedUnitX:t.computedUnitX,computedUnitY:t.computedUnitY,getExtractImg:t.getExtractImg}})],1)},r=[],a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"img-intercep-wrap"},[i("div",{staticClass:"pic_wrapper"},[i("img",{attrs:{src:t.picture}}),i("canvas",{staticClass:"pic_show"})]),i("div",{staticClass:"btn_list",style:{width:t.wrapWidth+"px"}},[i("button",{staticClass:"translate"},[t._v("截取")]),i("button",{staticClass:"reset"},[t._v("重置")])]),i("canvas",{staticClass:"pic_draw"})])},o=[],s=(i("cb29"),i("a9e3"),{props:{picture:{required:!0},wrapWidth:{type:Number,default:500},computedUnitX:{type:Number,default:6},computedUnitY:{type:Number,default:6},edgeMax:{type:Number,default:10},getExtractImg:{type:Function},enLarge:{type:Number,default:2}},data:function(){return{}},mounted:function(){var t,e,i,n,r,a,o,s=this,d=document.querySelector(".img-intercep-wrap"),c=d.querySelector(".pic_wrapper"),p=c.querySelector("img"),l=d.querySelector(".translate"),u=d.querySelector(".reset"),h=c.querySelector(".pic_show"),g=h.getContext("2d");p.onload=function(){t=p.width,e=p.height,o=parseInt(p.height/p.width*s.wrapWidth),r=s.wrapWidth*s.enLarge,a=o*s.enLarge,p.width=s.wrapWidth,p.height=o,c.style.width=s.wrapWidth+"px",c.style.height=o+"px",h.width=s.wrapWidth,h.height=o,p.style.width=p.width+"px",p.style.height=p.height+"px",p.style.top=0,p.style.left=0,g.beginPath(),g.fillStyle="rgba(255,255,255,0.3)",g.arc(s.wrapWidth/2,o/2,o/2,0,Math.PI/180*360,!1),g.fill()};var w=function(t){t.preventDefault(),p.removeEventListener("mousemove",y),p.addEventListener("mousemove",y),i=t.clientX-c.offsetLeft-parseInt(p.style.left?p.style.left:0),n=t.clientY-c.offsetTop-parseInt(p.style.top?p.style.top:0)},f=function(t){p.removeEventListener("mousemove",y)},m=function(t){p.removeEventListener("mousemove",y)},v=function(t){t.preventDefault(),t.stopPropagation();var e=t.wheelDelta,i=Math.abs(e)/120;if(i=i<1?1:i,console.log(e,i),e>0){var n=p.width-i*s.computedUnitX,d=p.height-i*s.computedUnitY;n>s.wrapWidth/2?p.style.width=n+"px":p.style.width=s.wrapWidth/2+"px",p.style.height=d>o/2?d+"px":o/2+"px",console.log(n,d,s.wrapWidth)}else{var c=p.width+i*s.computedUnitX,l=p.height+i*s.computedUnitY;p.style.width=c<r?c+"px":r+"px",p.style.height=l<a?l+"px":a+"px",console.log(c,l)}},y=function(t){t.preventDefault();var e=c.getBoundingClientRect(),r=e.width,a=e.height,o=t.clientX-c.offsetLeft,d=t.clientY-c.offsetTop,l=o-i,u=d-n;r-l<s.edgeMax?l=r-s.edgeMax:l+p.width<s.edgeMax&&(l=s.edgeMax-p.width),a-u<s.edgeMax?u=a-s.edgeMax:u+p.height<s.edgeMax&&(u=s.edgeMax-p.height),p.style.left=l+"px",p.style.top=u+"px"};p.addEventListener("mousedown",w),p.addEventListener("mouseleave",m),p.addEventListener("mouseup",f),c.addEventListener("mousewheel",v),l.addEventListener("click",(function(){p.style.width,p.style.height;var i=p.style.top,n=p.style.left,r=document.querySelector(".pic_draw");r.width=o,r.height=o;var a=r.getContext("2d");a.arc(o/2,o/2,o/2,0,Math.PI/180*360,!1),a.strokeStyle="#FFFFFF",a.stroke(),a.clip();var d=t/p.width,c=e/p.height;a.drawImage(p,(s.wrapWidth/2-o/2-parseInt(n))*d,-parseInt(i)*c,o*d,o*c,0,0,o,o),s.getExtractImg(r.toDataURL("image/png"))}),!1),u.addEventListener("click",(function(){p.style.width=s.wrapWidth+"px",p.style.height=o+"px",p.style.left=0,p.style.top=0}),!1)}}),d=s,c=(i("2418"),i("2877")),p=Object(c["a"])(d,a,o,!1,null,"21329884",null),l=p.exports,u={components:{iworkImgIntercep:l},data:function(){return{picture:i("157b"),wrapWidth:500,computedUnitX:7,computedUnitY:4,edgeMax:10,getExtractImg:function(t){console.log(t)}}},created:function(){}},h=u,g=Object(c["a"])(h,n,r,!1,null,null,null);e["default"]=g.exports},"81d5":function(t,e,i){"use strict";var n=i("7b0b"),r=i("23cb"),a=i("50c4");t.exports=function(t){var e=n(this),i=a(e.length),o=arguments.length,s=r(o>1?arguments[1]:void 0,i),d=o>2?arguments[2]:void 0,c=void 0===d?i:r(d,i);while(c>s)e[s++]=t;return e}},cb29:function(t,e,i){var n=i("23e7"),r=i("81d5"),a=i("44d2");n({target:"Array",proto:!0},{fill:r}),a("fill")},d3d4:function(t,e,i){}}]);
//# sourceMappingURL=chunk-120a420c.c808e7d3.js.map