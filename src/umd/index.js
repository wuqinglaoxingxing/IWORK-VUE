// 引入vue全局方法
import globalMedthods from '../globalMedthods/globalMedthods'
import iworkCalendar from '../components/iwork-calendar.vue'
import iworkCodeRain from '../components/iwork-code-rain.vue'
import iworkImgIntercep from '../components/iwork-img-intercep.vue'
import iworkLuckDraw from '../components/iwork-luck-draw.vue'
import iworkPictureMagnifier from '../components/iwork-picture-magnifier.vue'
import iworkScrollChar from '../components/iwork-scroll-char.vue'
import iworkTableTree from '../components/iwork-table-tree.vue'
import iworkTaiji from '../components/iwork-taiji.vue'
import iworkUpload from '../components/iwork-upload.vue'
// 设置字体
import setHtmlFontSize from '../font/fontSize'
// 设置样式
import style from './style.vue'

window.onresize = setHtmlFontSize;
setHtmlFontSize();

const components = [
    iworkCalendar,
    iworkCodeRain,
    iworkImgIntercep,
    iworkLuckDraw,
    iworkPictureMagnifier,
    iworkScrollChar,
    iworkTableTree,
    iworkTaiji,
    iworkUpload,
    style
]

const install = function (Vue, opts = {}) {
    /* istanbul ignore if */
    if (install.installed) return;

    components.map(component => {
        Vue.component(component.name, component);
    });

};


/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    version: '1.0.0',
    install,
    iworkCalendar,
    iworkCodeRain,
    iworkImgIntercep,
    iworkLuckDraw,
    iworkPictureMagnifier,
    iworkScrollChar,
    iworkTableTree,
    iworkTaiji,
    iworkUpload,
    style
};