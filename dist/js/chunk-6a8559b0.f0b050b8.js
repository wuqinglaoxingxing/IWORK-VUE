(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a8559b0"],{"157b":function(t,e,i){t.exports=i.p+"img/img-intercep.f8e9497a.jpg"},"35a8":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("iworkImgIntercep",{attrs:{picture:t.picture,wrapWidth:t.wrapWidth,edgeMax:t.edgeMax,computedUnitX:t.computedUnitX,computedUnitY:t.computedUnitY,getExtractImg:t.getExtractImg}})],1)},n=[],r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"img-intercep-wrap"},[i("div",{staticClass:"pic_wrapper"},[i("img",{attrs:{src:t.picture}}),i("canvas",{staticClass:"pic_show"})]),i("div",{staticClass:"btn_list",style:{width:t.wrapWidth+"px"}},[i("button",{staticClass:"translate"},[t._v("截取")]),i("button",{staticClass:"reset"},[t._v("重置")])]),i("canvas",{staticClass:"pic_draw"})])},s=[],o=(i("cb29"),i("a9e3"),{props:{picture:{required:!0},wrapWidth:{type:Number,default:500},computedUnitX:{type:Number,default:200},computedUnitY:{type:Number,default:200},edgeMax:{type:Number,default:10},getExtractImg:{type:Function},enLarge:{type:Number,default:2}},data:function(){return{}},mounted:function(){var t,e,i,a,n,r,s,o=this,p=document.querySelector(".img-intercep-wrap"),c=p.querySelector(".pic_wrapper"),d=c.querySelector("img"),l=p.querySelector(".translate"),u=p.querySelector(".reset"),h=c.querySelector(".pic_show"),g=h.getContext("2d");d.onload=function(){t=d.width,e=d.height,s=parseInt(d.height/d.width*o.wrapWidth),n=o.wrapWidth*o.enLarge,r=s*o.enLarge,d.width=o.wrapWidth,d.height=s,c.style.width=o.wrapWidth+"px",c.style.height=s+"px",h.width=o.wrapWidth,h.height=s,d.style.width=d.width+"px",d.style.height=d.height+"px",d.style.top=0,d.style.left=0,g.beginPath(),g.fillStyle="rgba(255,255,255,0.3)",g.arc(o.wrapWidth/2,s/2,s/2,0,Math.PI/180*360,!1),g.fill()};var w=function(t){t.preventDefault(),d.removeEventListener("mousemove",y),d.addEventListener("mousemove",y),i=t.clientX-c.offsetLeft-parseInt(d.style.left?d.style.left:0),a=t.clientY-c.offsetTop-parseInt(d.style.top?d.style.top:0)},f=function(t){d.removeEventListener("mousemove",y)},m=function(t){d.removeEventListener("mousemove",y)},v=function(t){t.preventDefault(),t.stopPropagation();var e=t.wheelDelta;if(e>0){var i=Math.abs(e)/120,a=d.width-i*o.computedUnitX,p=d.height-i*o.computedUnitY;a>o.wrapWidth/2?d.style.width=a+"px":d.style.width=o.wrapWidth/2+"px",d.style.height=p>s/2?p+"px":s/2+"px"}else{var c=Math.abs(e)/120,l=d.width+c*o.computedUnitX,u=d.height+c*o.computedUnitY;d.style.width=l<n?l+"px":n+"px",d.style.height=u<r?u+"px":r+"px"}},y=function(t){t.preventDefault();var e=c.getBoundingClientRect(),n=e.width,r=e.height,s=t.clientX-c.offsetLeft,p=t.clientY-c.offsetTop,l=s-i,u=p-a;n-l<o.edgeMax?l=n-o.edgeMax:l+d.width<o.edgeMax&&(l=o.edgeMax-d.width),r-u<o.edgeMax?u=r-o.edgeMax:u+d.height<o.edgeMax&&(u=o.edgeMax-d.height),d.style.left=l+"px",d.style.top=u+"px"};d.addEventListener("mousedown",w),d.addEventListener("mouseleave",m),d.addEventListener("mouseup",f),d.addEventListener("mousewheel",v),l.addEventListener("click",(function(){d.style.width,d.style.height;var i=d.style.top,a=d.style.left,n=document.querySelector(".pic_draw");n.width=s,n.height=s;var r=n.getContext("2d");r.arc(s/2,s/2,s/2,0,Math.PI/180*360,!1),r.strokeStyle="#FFFFFF",r.stroke(),r.clip();var p=t/d.width,c=e/d.height;r.drawImage(d,(o.wrapWidth/2-s/2-parseInt(a))*p,-parseInt(i)*c,s*p,s*c,0,0,s,s),o.getExtractImg(n.toDataURL("image/png"))}),!1),u.addEventListener("click",(function(){d.style.width=o.wrapWidth+"px",d.style.height=s+"px",d.style.left=0,d.style.top=0}),!1)}}),p=o,c=(i("80e4"),i("2877")),d=Object(c["a"])(p,r,s,!1,null,"43735a97",null),l=d.exports,u={components:{iworkImgIntercep:l},data:function(){return{picture:i("157b"),wrapWidth:500,computedUnitX:200,computedUnitY:112,edgeMax:10,getExtractImg:function(t){console.log(t)}}},created:function(){}},h=u,g=Object(c["a"])(h,a,n,!1,null,null,null);e["default"]=g.exports},"80e4":function(t,e,i){"use strict";var a=i("8427"),n=i.n(a);n.a},"81d5":function(t,e,i){"use strict";var a=i("7b0b"),n=i("23cb"),r=i("50c4");t.exports=function(t){var e=a(this),i=r(e.length),s=arguments.length,o=n(s>1?arguments[1]:void 0,i),p=s>2?arguments[2]:void 0,c=void 0===p?i:n(p,i);while(c>o)e[o++]=t;return e}},8427:function(t,e,i){},cb29:function(t,e,i){var a=i("23e7"),n=i("81d5"),r=i("44d2");a({target:"Array",proto:!0},{fill:n}),r("fill")}}]);
//# sourceMappingURL=chunk-6a8559b0.f0b050b8.js.map