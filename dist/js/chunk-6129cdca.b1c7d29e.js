(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6129cdca"],{"159b":function(t,e,o){var r=o("da84"),i=o("fdbc"),n=o("17c2"),c=o("9112");for(var a in i){var l=r[a],s=l&&l.prototype;if(s&&s.forEach!==n)try{c(s,"forEach",n)}catch(u){s.forEach=n}}},"17c2":function(t,e,o){"use strict";var r=o("b727").forEach,i=o("a640"),n=o("ae40"),c=i("forEach"),a=n("forEach");t.exports=c&&a?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"1ccf":function(t,e,o){"use strict";var r=o("87d7"),i=o.n(r);i.a},4160:function(t,e,o){"use strict";var r=o("23e7"),i=o("17c2");r({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},"46c5":function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"luck-draw-wrap",style:{width:t.luckDrawSize,height:t.luckDrawSize},attrs:{id:"luck-draw-wrap"}},[t._l(t.ligthNum,(function(t){return o("div",{key:t,staticClass:"luck-draw-light luck-draw-light-rotote"})})),o("div",{staticClass:"luck-draw-out-circle",style:{background:t.customColor.outCircle?t.customColor.outCircle:""},attrs:{id:"luck-draw-out-circle"}},[o("div",{staticClass:"luck-draw-in-circle",attrs:{id:"luck-draw-in-circle"}},t._l(t.selectorParts,(function(e,r){return o("div",{key:r,staticClass:"selector"},[o("div",{staticClass:"selector-show",style:{background:r%2==1&&t.customColor.singlePart&&t.customColor.doublePart?t.customColor.singlePart:t.customColor.doublePart}},[o("span",{staticClass:"selector-show-span",style:{color:t.customColor.text?t.customColor.text:""},domProps:{textContent:t._s(e.text)}})])])})),0),o("div",{staticClass:"luck-draw-point",style:{backgroundColor:t.customColor.cursorPoint?t.customColor.cursorPoint:""},attrs:{id:"luck-draw-point"}},[o("span",{staticClass:"luck-draw-point-text",style:{color:t.customColor.text?t.customColor.text:""}},[t._v("开始")]),o("svg",{staticClass:"luck-draw-point-svg",attrs:{t:"1608087114493",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"7449",width:"240",height:"240"}},[o("path",{attrs:{d:"M512 266.5l421.2 491H90.8z",fill:t.customColor.cursorPoint?t.customColor.cursorPoint:"var(--fifth)","p-id":"7450"}})])])])],2)},i=[],n=(o("4160"),o("fb6a"),o("a9e3"),o("b64b"),o("ac1f"),o("5319"),o("159b"),{name:"IworkLuckDraw",props:{luckDrawSize:{type:String,default:"400px"},selectorParts:{type:Array,default:function(){return[{text:"苹果1"},{text:"苹果2"},{text:"苹果3"},{text:"苹果4"},{text:"苹果5"},{text:"苹果6"},{text:"苹果7"},{text:"苹果8"},{text:"苹果9"},{text:"苹果10"}]}},isBlackCurtain:{type:Boolean,default:!1},setRegion:{type:Number,default:1},customColor:{type:Object,default:function(){return{}}},callGift:{type:Function,default:function(t){console.warn("======gift====="),console.warn(t),console.warn("======gift=====")}}},data:function(){return{ligthNum:10,cicleStatic:360,lucking:!0,fontSizeScale:.06}},watch:{},computed:{},mounted:function(){var t=this,e=this,o=document.getElementById("luck-draw-wrap"),r=document.getElementById("luck-draw-point"),i=document.getElementById("luck-draw-out-circle"),n=document.getElementById("luck-draw-in-circle"),c=document.getElementsByClassName("selector"),a=document.getElementsByClassName("selector-show-span"),l=document.getElementsByClassName("luck-draw-point-text"),s=document.getElementsByClassName("luck-draw-light"),u=o.getBoundingClientRect().width,d=o.getBoundingClientRect().height,f=i.getBoundingClientRect().width,m=i.getBoundingClientRect().height,h=n.getBoundingClientRect().width,g=n.getBoundingClientRect().height;Array.prototype.slice.call(c).forEach((function(t){t.style.borderTopLeftRadius=h/2+"px",t.style.borderBottomLeftRadius=g/2+"px"})),Array.prototype.slice.call(a).forEach((function(t){var o=e.fontSizeScale*u,r=e.fontSizeScale*d;o<12&&(o=0),r<12&&(r=0),t.style.fontSize=o+"px",t.style.fontSize=r+"px"})),Array.prototype.slice.call(l).forEach((function(t){var o=e.fontSizeScale*u,r=e.fontSizeScale*d;o<12&&(o=0),r<12&&(r=0),t.style.fontSize=o+"px",t.style.fontSize=r+"px"})),Array.prototype.slice.call(s).forEach((function(o){var r=f-h,i=m-g;if(o.style.width=r/2+"px",o.style.height=i/2+"px",o.style.transformOrigin="center "+d/2+"px",t.customColor.animation){var n=e.addStyleAnimate(document.styleSheets[0],"customAnimateColor",t.customColor.animation);n&&(o.style.animation="customAnimateColor 0.5s 0s linear infinite alternate")}})),r.addEventListener("click",(function(){if(e.lucking){e.lucking=!1,r.style.transition="transform 3s cubic-bezier(.2,.93,.43,1)";var t=4*e.cicleStatic,o=Math.floor(Math.random()*e.cicleStatic),i=t+o;if(i%e.cicleStatic==0&&(i+=1),e.isBlackCurtain)while(1){if(i%e.cicleStatic==0&&(i+=1),e.getCoordinate(i)==e.setRegion)break;i=t+Math.floor(Math.random()*e.cicleStatic)}r.style.transform="rotate("+i+"deg)"}})),r.addEventListener("transitionend",(function(){var t=e.getCoordinate(parseInt(r.style.transform.replace(/\D/g,"")));e.callGift(e.selectorParts[t]),setTimeout((function(){e.lucking=!0,r.style.transition="transform 0s",r.style.transform="rotate(0deg)"}),500)}))},methods:{getCoordinate:function(t){var e=Math.ceil((t-18)%this.cicleStatic/36);return e},addStyleAnimate:function(t,e,o){if(t){var r="";return Object.keys(o).forEach((function(t){r+=t+" { background:"+o[t]+"} "})),"insertRule"in t?t.insertRule("@keyframes "+e+" {"+r+"}",void 0):"addRule"in t&&t.addRule("@keyframes "+e,r,void 0),r}},delStyleAnimate:function(t){t.deleteRule(0)}}}),c=n,a=(o("1ccf"),o("2877")),l=Object(a["a"])(c,r,i,!1,null,"e955ee42",null);e["default"]=l.exports},"87d7":function(t,e,o){},b64b:function(t,e,o){var r=o("23e7"),i=o("7b0b"),n=o("df75"),c=o("d039"),a=c((function(){n(1)}));r({target:"Object",stat:!0,forced:a},{keys:function(t){return n(i(t))}})},b727:function(t,e,o){var r=o("0366"),i=o("44ad"),n=o("7b0b"),c=o("50c4"),a=o("65f0"),l=[].push,s=function(t){var e=1==t,o=2==t,s=3==t,u=4==t,d=6==t,f=5==t||d;return function(m,h,g,p){for(var y,C,w=n(m),S=i(w),k=r(h,g,3),v=c(S.length),x=0,b=p||a,L=e?b(m,v):o?b(m,0):void 0;v>x;x++)if((f||x in S)&&(y=S[x],C=k(y,x,w),t))if(e)L[x]=C;else if(C)switch(t){case 3:return!0;case 5:return y;case 6:return x;case 2:l.call(L,y)}else if(u)return!1;return d?-1:s||u?u:L}};t.exports={forEach:s(0),map:s(1),filter:s(2),some:s(3),every:s(4),find:s(5),findIndex:s(6)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-6129cdca.b1c7d29e.js.map