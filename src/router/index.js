import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//搭配路由
export default new Router({
    // mode:"history",
    linkActiveClass:"linkActive",
    routes: [{
            // 主页
            path: '/',
            name: '首页',
        },
        {
            path: '/iworkHello',
            name: 'A',
        },
        {
            path: '/iworkCalendar',
            name: '日历组件',
        },
        {
            path: '/iworkUpload',
            name: '上传组件',
        },
        {
            path: '/iworkScrollChar',
            name: '滚动字符',
        },
        {
            path: '/iworkPictureMagnifier',
            name: '图片放大镜',
        },
        {
            path: '/iworkLuckDraw',
            name: '抽奖转盘',
        },
        {
            path: '/iworkTaiji',
            name: '太极',
        },
        {
            path: '/iworkCodeRainCloth',
            name: '代码雨',
        },
        {
            path: '/iworkTableTree',
            name: '树状表格',
        },
        {
            path: '/iworkImgIntercep',
            name: '图片拖拽放大及截图',
        },
        {
            path: '/iworkSelect',
            name: '下拉选择框',
        },
    ]
})