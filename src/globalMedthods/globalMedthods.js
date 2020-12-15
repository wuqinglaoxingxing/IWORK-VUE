// 改变主题颜色
const changeColorTheme = function(id,href){
    var dom   = document.getElementById(id);
    dom.href = href
}
// 全局字符串增加替换方法
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gmi"), s2);
}

export default{
    changeColorTheme
}