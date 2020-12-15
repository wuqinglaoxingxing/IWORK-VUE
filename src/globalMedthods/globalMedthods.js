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



export default {
  changeColorTheme,
  getAllParents,
  isHasInParent
}