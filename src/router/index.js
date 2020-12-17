//4.1引入组件
import Vue from 'vue'
import Router from 'vue-router'
import IworkHello from '@/components/iwork-hello.vue'
import IworkCalendar from '@/components/iwork-calendar.vue'
import IworkUpload from '@/components/iwork-upload.vue'
import IworkPictureMagnifier from '@/components/iwork-picture-magnifier.vue'
import IworkLuckDraw from '@/components/iwork-luck-draw.vue'
Vue.use(Router)
//搭配路由
export default new Router({
    linkActiveClass:"linkActive",
    routes: [{
            // 主页
            path: '/',
            component: IworkHello,
            name: '首页',
        },
        {
            path: '/iworkHello',
            component: IworkHello,
            name: 'A',
        },
        {
            path: '/iworkCalendar',
            component: IworkCalendar,
            name: '日历组件',
        },
        {
            path: '/iworkUpload',
            component: IworkUpload,
            name: '上传组件',
        },
        {
            path: '/iworkPictureMagnifier',
            component: IworkPictureMagnifier,
            name: '图片放大镜',
        },
        {
            path: '/iworkLuckDraw',
            component: IworkLuckDraw,
            name: '抽奖转盘',
        },
        
    ]
})