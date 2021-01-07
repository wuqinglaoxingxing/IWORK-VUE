// 改变主题颜色
const changeColorTheme = function (id, href) {
  var dom = document.getElementById(id);
  dom.href = href
}
// 全局字符串增加替换方法
String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, "gmi"), s2);
}
// 判断指定节点是否在父节点中,以及他是否就是含有
const isHasInParent = function (parentId, dom) {
  // 传入标签是否是DOM对象
  if (!(dom instanceof HTMLElement)) {
    return false;
  }
  // 自身是否就是含有
  if(parentId == dom.id){
    return true;
  }
  // 父级标签是否是body,是着停止返回集合,反之继续
  if ('BODY' !== dom.parentElement.nodeName) {
    if(parentId == dom.parentElement.id){
      return true;
    }
    // 再上一层寻找
    return isHasInParent(parentId, dom.parentElement)
  }else{
    return false;
  }
}
// 获取所有父节点
const getAllParents = function (dom,parentTagList = []) {
  // 传入标签是否是DOM对象
  if (!(dom instanceof HTMLElement)) {
    return console.error('receive only HTMLElement');
  }
  // 父级标签是否是body,是着停止返回集合,反之继续
  if ('BODY' !== dom.parentElement.nodeName) {
    // 放入集合
    parentTagList.push(dom.parentElement)
    // 再上一层寻找
    return getParentTag(dom.parentElement, parentTagList)
  }else{
    return parentTagList;
  }
}

/**
 * 功能: 获取元素属性值
 * 参数: prop 属性
*/
HTMLElement.prototype.getStyle = function(prop){
    if(!prop){
        return window.getComputedStyle(this,null) || this.currentStyle
    }
    if(window.getComputedStyle){
        return window.getComputedStyle(this,null)[prop]
    }else{
        return this.currentStyle[prop];
    }
}

/**
 * 功能: RGB转换为16进制
*/
String.prototype.colorHex = function () {
    // RGB颜色值的正则
    var reg = /^(rgb|RGB)/;
    var color = this;
    if (reg.test(color)) {
      var strHex = "#";
      // 把RGB的3个数值变成数组
      var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      // 转成16进制
      for (var i = 0; i < colorArr.length; i++) {
        var hex = Number(colorArr[i]).toString(16);
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      return strHex;
    } else {
      return String(color);
    }
};

/**
 * 功能: 16进制转换为RGB
*/
String.prototype.colorRgb = function () {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  var color = this.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return "RGB(" + colorChange.join(",") + ")";
  } else {
    return color;
  }
};


export default {
  changeColorTheme,
  getAllParents,
  isHasInParent
}