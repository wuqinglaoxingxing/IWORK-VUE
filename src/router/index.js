//4.1引入组件
import Vue from 'vue'
import Router from 'vue-router'
import IworkHello from '@/components/iwork-hello.vue'
import IworkCalendar from '@/components/iwork-calendar.vue'
import IworkUpload from '@/components/iwork-upload.vue'
import IworkPictureMagnifier from '@/components/iwork-picture-magnifier.vue'
Vue.use(Router)
//搭配路由
export default new Router({
    linkActiveClass:"linkActive",
    routes: [{
            // 主页
            path: '/',
            component: IworkHello,
            name: '首页',
            //   iconCls: 'el-icon-message',
        },
        {
            path: '/iworkHello',
            component: IworkHello,
            name: 'A',
        },
        {
            path: '/iworkCalendar',
            component: IworkCalendar,
            name: 'B',
        },
        {
            path: '/iworkUpload',
            component: IworkUpload,
            name: 'C',
        },
        {
            path: '/iworkPictureMagnifier',
            component: IworkPictureMagnifier,
            name: 'E',
        },
        
    ]
})