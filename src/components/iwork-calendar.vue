<template>
    <div class="iwork-calendar-wrap">
        <input
            type="text"
            class="iwork-calendar-input"
            @click="calendarClick"
            @blur="calendarBlur"
            v-model="dateShow"
            ref="iworkCalendarInput"
        />
        <span class="iwork-calendar-span" @click="openCalendar">
            <i class="iwork-calendar-i"></i>
        </span>
        <div
            class="iwork-picker-panel-body-wrapper"
            @mousedown="preventFocus($event)"
            v-show="openCalendarFlg"
        >
            <div class="iwork-picker-panel-body">
                <!-- 头部选择 -- 左右区域 -->
                <div class="picker-panel-header">
                    <span
                        class="picker-btn picker-prev-btn-arrow-double"
                        @click="preYear()"
                    >
                        <i class="arrow-i">&lt;&lt;</i>
                    </span>
                    <span
                        class="picker-btn picker-prev-btn-arrow"
                        v-show="currentLevel == STATIC_LEVEL.DAY"
                        @click="preMonth(STATIC_DIRECTION.PRE)"
                    >
                        <i class="arrow-i">&lt;</i>
                    </span>
                    <span
                        ><span class="picker-header-label" @click="openYear"
                        >{{ year }}年</span
                        >
                        <span
                        class="picker-header-label"
                        @click="openMonth"
                        v-show="currentLevel > STATIC_LEVEL.YEAR"
                        >{{ month }}月</span
                        ></span
                    >
                    <span
                        class="picker-btn picker-next-btn-arrow-double"
                        @click="nextYear()"
                    >
                        <i class="arrow-i">&gt;&gt;</i>
                    </span>
                    <span
                        class="picker-btn picker-next-btn-arrow"
                        v-show="currentLevel == STATIC_LEVEL.DAY"
                        @click="nextMonth(STATIC_DIRECTION.NEXT)"
                    >
                        <i class="arrow-i">&gt;</i>
                    </span>
                </div>
                <div class="picker-panel-content">
                    <!-- 年 -->
                    <div class="picker-cells" v-show="currentLevel == STATIC_LEVEL.YEAR">
                        <div class="picker-cells-years picker-cells-normal">
                        <span
                            :style="isCurrentDate(year,STATIC_LEVEL.YEAR) ? showStyle||defaultStyle:{}"
                            :is-not-between="dateBetWeenCall(getCurrentTime(year,STATIC_LEVEL.YEAR),STATIC_LEVEL.YEAR)"
                            v-for="(year, index) in years"
                            :key="index"
                            @click="chooseYear($event,year)"
                            >{{ year }}</span
                        >
                        </div>
                    </div>
                    <!-- 月 -->
                    <div class="picker-cells" v-show="currentLevel == STATIC_LEVEL.MONTH">
                        <div class="picker-cells-months picker-cells-normal">
                        <span
                            :style="isCurrentDate(month,STATIC_LEVEL.MONTH) ? showStyle||defaultStyle:{}"
                            :is-not-between="dateBetWeenCall(getCurrentTime(month,STATIC_LEVEL.MONTH),STATIC_LEVEL.MONTH)"
                            v-for="(month, index) in months"
                            :key="index"
                            @click="chooseMonth($event,month)"
                            >{{ month }}月</span
                        >
                        </div>
                    </div>
                    <!-- 日 -->
                    <div class="picker-cells" v-show="currentLevel == STATIC_LEVEL.DAY">
                        <div class="picker-cells-header">
                            <span
                                v-for="(week, index) in weekDay"
                                :key="index"
                                class="span-not-allow"
                                >{{ week }}</span
                            >
                        </div>
                        <div class="picker-cells-days picker-cells-normal">
                            <span
                                v-for="(dayObj, index) in days"
                                :key="'day' + index"
                                :style="isCurrentDate(dayObj,STATIC_LEVEL.DAY) ? showStyle||defaultStyle:{}"
                                :is-not-between="dateBetWeenCall(getCurrentTime(dayObj,STATIC_LEVEL.DAY),STATIC_LEVEL.DAY)"
                                :class="[
                                dayObj.SYMBOL == 'CURRENT' ? 'span-allow' : 'span-not-allow',
                                ]"
                                @click="chooseDay($event, dayObj)"
                                ><em
                                :class="[
                                    isToday(dayObj) ? 'em-today' : '',
                                    isBirthDay(dayObj) ? 'my-birthday' : '',
                                ]"
                                >{{ dayObj.NUMBER }}</em>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
        iworkData: {
            type: String,
        },
        format: {
            type: String,
            default: "yyyy-MM-dd",
        },
        level: {
            type: Number,
            default: 3,
        },
        isInitNow: {
            type: Boolean,
            default: false,
        },
        showStyle:{
            type: Object,
            default: null,
        },
        dateBetWeenCall:{
            type: Function,
            default:(data)=>{}
        },
    },
    data() {
        return {
            openCalendarFlg: false,
            months: 12,
            weekDay: ["日", "一", "二", "三", "四", "五", "六"],
            currentLevel: this.level, //1 表示年 2 表示月 3 表示日
            year: new Date().getFullYear(), //视图层 年 
            month: new Date().getMonth() + 1, //视图层 月
            day: new Date().getDate(),//视图层 日
            STATIC_LEVEL:{    //静态变量
                YEAR:1,
                MONTH:2,
                DAY:3
            },
            STATIC_DIRECTION:{  //前进方向
                PRE:"PRE",
                NEXT:"NEXT"
            },
            isInit: this.isInitNow,
            dateShow: "", //日期变量格式化后的
            dateShowObj:{   //日期变量未格式化
                year:"",
                month:"",
                day:""
            },
            defaultStyle:{  //默认渲染样式
                backgroundImage: "linear-gradient(var(--third), var(--fifth))"
            },
        };
    },
    computed: {
    // 日期视图计算
        days: function() {
            let days = [];
            let weekDay = this.getWeekByMonth(this.year, this.month);
            let lastDays = this.getDaysByYearAndMonthWithLastOrNext(
                this.year,
                this.month - 1,
                "LAST"
            );
            let currentDays = this.getDaysByYearAndMonth(this.year, this.month);
            let nextDaysOffset = 42 - weekDay - currentDays;
            for (let i = lastDays - weekDay + 1; i <= lastDays; i++) {
                days.push({ SYMBOL: "LAST", NUMBER: i });
            }
            for (let i = 1; i <= currentDays; i++) {
                days.push({ SYMBOL: "CURRENT", NUMBER: i });
            }
            for (let i = 1; i <= nextDaysOffset; i++) {
                days.push({ SYMBOL: "NEXT", NUMBER: i });
            }
            return days;
        },
        // 年份计算
        years: function() {
            let startYear = parseInt(this.year / 10) * 10;
            let endYear = startYear + 9;
            let year = [];
            for (let i = startYear; i <= endYear; i++) {
                year.push(i);
            }
            return year;
        },
    },
    watch: {
        // 监听月份,让月份长度变成2
        month(n, o) {
        if (n && n < 10) {
            this.month = (n + "").padStart(2, "0");
        }
        },
        // 监听日,让月份长度变成2
        day(n, o) {
        if (n && n < 10) {
            this.day = (n + "").padStart(2, "0");
        }
        },
        // 将model值分解 真实数据
        dateShow:function(n,o){
            let date = this.$parent[this.iworkData].replace(/\D/g,"");
            this.dateShowObj.year = date.substring(0,4);
            this.dateShowObj.month = date.substring(4,6);
            this.dateShowObj.day = date.substring(6,8);
        }
    },
    created() {
        if(!this.iworkData){
            this.log("iworkData is not define")
            return;
        }
        // 初始化设置日期
        let date = this.$parent[this.iworkData].replace(/\D/g,"");
        if(this.isInitNow&&date){
            this.year = date.substring(0,4);
            this.month = date.substring(4,6);
            this.day = date.substring(6,8);
        }
        this.dateShow = this.dateShowFormat();
    },
    methods: {
        // 设置父组件的值
        setModelValue(value){
            this.$parent[this.iworkData] = value;
        },
        // model值格式化
        dateShowFormat(){
            // 设置当前时间
            // 设置初始值日期为当前时间
            if (!this.isInit) {
                return "";
            }
            // 日期格式化并返回
            let dataStr = this.format;
            if (this.year && this.level >= 1) {
                dataStr = dataStr.replace("yyyy", this.year);
            } else {
                dataStr = dataStr.replace(/yyyy/g, "");
            }
            if (this.month && this.level >= 2) {
                dataStr = dataStr.replace("MM", this.month.toString().padStart(2,"0"));
            } else {
                dataStr = dataStr.replace(/[\-\/]MM/g, "");
            }
            if (this.day && this.level >= 3) {
                dataStr = dataStr.replace("dd", this.day.toString().padStart(2,"0"));
            } else {
                dataStr = dataStr.replace(/[\-\/]dd/g, "");
            }
            if (!this.year && !this.month && !this.day) {
                dataStr = "";
            }
            this.$nextTick(()=>{
                this.dateShowObj={
                    year:this.year,
                    month:this.month,
                    day:this.day
                }
            })
            this.dateShow = dataStr;
            this.setModelValue(dataStr.replace(/\D/gi,""))
            return dataStr;
        },
        // 获取当前月份第一天星期几
        getWeekByMonth(year, month) {
            return new Date(year, month - 1, "01").getDay();
        },
        // 获取当前月份有多少天 0表示上个月
        getDaysByYearAndMonth(year, month) {
            var d = new Date(year, month, 0);
            return d.getDate();
        },
        // 计算上个月或者下个月天数
        getDaysByYearAndMonthWithLastOrNext(year, month, symbol) {
            if (symbol == "LAST") {
                if (month > 1) {
                    return this.getDaysByYearAndMonth(year, month);
                } else {
                    // 前年最后一个月
                    return this.getDaysByYearAndMonth(year - 1, 12);
                }
            } else {
                if (month < 12) {
                    return this.getDaysByYearAndMonth(year, month);
                } else {
                    // 前年最后一个月
                    return this.getDaysByYearAndMonth(year + 1, 1);
                }
            }
        },
        // 日历聚焦
        calendarClick() {
            this.openCalendarFlg = true;
        },
        // 日历元素点击,防止失去焦点操作
        // 阻止默认失去焦点事件
        preventFocus(e) {
            e.preventDefault();
        },
        // 日历失去焦点
        calendarBlur() {
            // 让文字可以显示出来
            this.isInit = true;
            // 关闭日历
            this.closeCalendar();
            // 格式化数据
            let dataValue = this.dateShow.replace(/\D/gi,"")
            if(dataValue.length<8){
                dataValue = [this.dateShowObj.year,this.dateShowObj.month,this.dateShowObj.day].join("")
            }
            let newDate = new Date();
            newDate.setFullYear(dataValue.substring(0,4));
            newDate.setMonth(dataValue.substring(4,6));
            newDate.setDate(dataValue.substring(6,8))
            this.year = newDate.getFullYear();
            this.month = newDate.getMonth();
            this.day = newDate.getDate();
            this.dateShowFormat()
        },
        // 打开日历方法
        openCalendar() {
            this.openCalendarFlg = true;
            this.$refs.iworkCalendarInput.focus();
        },
        // 关闭日历方法
        closeCalendar() {
            this.openCalendarFlg = false;
            // 关闭后打开重置为第三等级(日)
            this.currentLevel = this.level;
        },
        // 打开年分
        openYear() {
            this.currentLevel = 1;
        },
        // 打开月份
        openMonth() {
            this.currentLevel = 2;
        },
        // 选择月
        chooseMonth(e,month) {
            if(e.currentTarget.getAttribute("is-not-between")){
                return;
            }
            this.month = month;
            if (this.level == this.STATIC_LEVEL.MONTH) {
                // 让文字可以显示出来
                this.isInit = true;
                this.closeCalendar();
            } else {
                this.currentLevel = this.STATIC_LEVEL.DAY;
            }
            if(this.level==this.STATIC_LEVEL.MONTH){
                this.dateShow = this.dateShowFormat();
            }
        },
        // 选择年
        chooseYear(e,year) {
            if(e.currentTarget.getAttribute("is-not-between")){
                return;
            }
            this.year = year;
            if (this.level == this.STATIC_LEVEL.YEAR) {
                // 让文字可以显示出来
                this.isInit = true;
                this.closeCalendar();
            } else {
                this.currentLevel = this.STATIC_LEVEL.MONTH;
            }
            if(this.level==this.STATIC_LEVEL.YEAR){
                this.dateShow = this.dateShowFormat();
            }
        },
        // 选择日
        chooseDay(e, dayObj) {
            e.stopPropagation();
            if(e.currentTarget.getAttribute("is-not-between")){
                return;
            }
            // 让文字可以显示出来
            this.isInit = true;
            this.closeCalendar();
            switch (dayObj.SYMBOL) {
                case "LAST":
                    this.preMonth();
                    this.day = dayObj.NUMBER;
                    break;
                case "NEXT":
                    this.nextMonth();
                    this.day = dayObj.NUMBER;
                    break;
                default:
                    this.day = dayObj.NUMBER;
            }
            this.dateShow = this.dateShowFormat();
        },
        // 上一年,根据currentLevel判断
        preYear() {
            if (this.currentLevel == this.STATIC_LEVEL.YEAR) {
                this.year = parseInt(this.year) - 10;
            } else {
                this.year = parseInt(this.year) - 1;
            }
        },
        // 下一年,根据currentLevel判断
        nextYear() {
            if (this.currentLevel == this.STATIC_LEVEL.YEAR) {
                this.year = parseInt(this.year) + 10;
            } else {
                this.year = parseInt(this.year) + 1;
            }
        },
        // 上一月
        preMonth() {
            if (this.month > 1) {
                this.month = parseInt(this.month) - 1;
            } else {
                this.month = 12;
                this.year = parseInt(this.year) - 1;
            }
        },
        // 下一月
        nextMonth() {
            if (this.month < 12) {
                this.month = parseInt(this.month) + 1;
            } else {
                this.month = 1;
                this.year = parseInt(this.year) + 1;
            }
        },
        // 今天判断
        isToday(dayObj) {
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth() + 1;
            let currentDay = new Date().getDate();
            if (
                dayObj.SYMBOL == "CURRENT" &&
                currentYear == this.year &&
                currentMonth == this.month &&
                currentDay == dayObj.NUMBER
            ) {
                return true;
            } else {
                return false;
            }
        },
        // 当前日期标注
        isCurrentDate(currentDate,level){
            let returnFlg = false;
            if(this.level!=level){
                return returnFlg;
            }
            switch(this.level){
                case 1:
                    parseInt(this.dateShowObj.year) == currentDate?returnFlg=true:returnFlg=false;
                    break;
                case 2:
                    parseInt(this.dateShowObj.year)==this.year&&
                    parseInt(this.dateShowObj.month) == currentDate?returnFlg=true:returnFlg=false;
                    break;
                case 3:
                    parseInt(this.dateShowObj.year)==this.year&&
                    parseInt(this.dateShowObj.month) == this.month&&
                    parseInt(this.dateShowObj.day) == currentDate.NUMBER&&currentDate.SYMBOL == "CURRENT"?returnFlg=true:returnFlg=false;
                    break;
                default:
                    return false;
            }
            return returnFlg;
        },
        // 生日判断
        isBirthDay(dayObj) {
            let currentYear = new Date().getFullYear();
            let currentMonth = new Date().getMonth() + 1;
            let currentDay = new Date().getDate();
            if (dayObj.SYMBOL != "CURRENT") {
                return false;
            }
            if (this.year == 1996 && 12 == this.month && 25 == dayObj.NUMBER) {
                return true;
            } else {
                return false;
            }
        },
        // 获取当前时间戳，日期选择判断
        getCurrentTime(value,level){
            switch(level){
                case this.STATIC_LEVEL.YEAR:
                    return this.getTimeWithYear(value);
                case this.STATIC_LEVEL.MONTH:
                    return this.getTimeWithMonth(value);
                case this.STATIC_LEVEL.DAY:
                    return this.getTimeWithDay(value);
                default:
                    return null;
            }
        },
        /**
         * 约定:
         * 年：获取的时间为当前year-01-01   00:00:00 000
         * 月：获取时间为yyyy-month-01  00:00:00 000
         * 日：获取时间为yyyy-MM-day    00:00:00 000
         * */ 
        getTimeWithYear(year){
            let date = new Date();
            date.setFullYear(year);
            date.setMonth(0)
            date.setDate(1)
            date.setHours(0)
            date.setMinutes(0)
            date.setSeconds(0)
            date.setMilliseconds(0);
            return date.getTime();
        },
        getTimeWithMonth(month){
            let date = new Date();
            date.setFullYear(this.year);
            date.setMonth(month)
            date.setDate(1)
            date.setHours(0)
            date.setMinutes(0)
            date.setSeconds(0)
            date.setMilliseconds(0);
            return date.getTime();
        },
        getTimeWithDay(currentDate){
            let currentDateValue = new Date();
            currentDateValue.setHours(0)
            currentDateValue.setMinutes(0)
            currentDateValue.setSeconds(0)
            currentDateValue.setMilliseconds(0);
            currentDateValue.setDate(parseInt(currentDate.NUMBER))
            let currentTime = 0;
            if(currentDate.SYMBOL=="CURRENT"){
                currentDateValue.setFullYear(parseInt(this.year))
                currentDateValue.setMonth(parseInt(this.month)-1)
                currentTime = currentDateValue.getTime();
            }else if(currentDate.SYMBOL=="LAST"){
                if(parseInt(this.month)-2<0){
                    currentDateValue.setMonth(11)
                    currentDateValue.setFullYear(parseInt(this.year)-1)
                }else{
                    currentDateValue.setMonth(parseInt(this.month)-2)
                    currentDateValue.setFullYear(parseInt(this.year))
                }
                currentTime = currentDateValue.getTime();
            }else{
                if(parseInt(this.month)>11){
                    currentDateValue.setMonth(0)
                    currentDateValue.setFullYear(parseInt(this.year)+1)
                }else{
                    currentDateValue.setMonth(parseInt(this.month))
                    currentDateValue.setFullYear(parseInt(this.year))
                }
                currentTime = currentDateValue.getTime();
            }
            return currentTime;
        },

    },
};
</script>
<style lang="scss" scoped>
.iwork-calendar-wrap {
    position: relative;
    font-size: 14px;
    .iwork-calendar-input {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 1.5;
        text-indent: 5px;
        font-size: 14px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        cursor: text;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;
        outline: #57a3f3;
    }
    .iwork-calendar-input:focus,
    .iwork-calendar-input:hover {
        border-color: #57a3f3;
    }
    .iwork-calendar-span {
        position: absolute;
        display: block;
        right: 0;
        top: 0;
        height: 100%;
        width: 30px;
        cursor: pointer;
        .iwork-calendar-i {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url(../assets/calendar.png) no-repeat;
        background-position: center;
        }
    }
    .iwork-picker-panel-body-wrapper {
        position: absolute;
        margin-top: 5px;
        width: 216px;
        height: 248px;
        border: 1px #cccccc solid;
        border-radius: 3px;
        box-shadow: #bbbbbb 0px 0px 20px 2px;
        z-index: 999;
        background: white;
        .iwork-picker-panel-body {
        .picker-panel-header {
            display: block;
            position: relative;
            height: 32px;
            line-height: 32px;
            border-bottom: 1px solid #bbbbbb;
            .picker-btn {
            cursor: pointer;
            user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            .arrow-i {
                font-size: 14px;
                color: #999999;
            }
            .arrow-i:hover {
                color: #2d8cf0;
            }
            }
            .picker-prev-btn-arrow {
            position: absolute;
            left: 40px;
            }
            .picker-prev-btn-arrow-double {
            position: absolute;
            left: 10px;
            }
            .picker-header-label {
            text-align: center;
            cursor: default;
            user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            }
            .picker-header-label:hover {
            color: #2d8cf0;
            }
            .picker-next-btn-arrow-double {
            position: absolute;
            right: 10px;
            }
            .picker-next-btn-arrow {
            position: absolute;
            right: 40px;
            }
        }
        .picker-panel-content {
            .picker-cells {
            width: 196px;
            height: 196px;
            margin: 10px;
            .picker-cells-header {
                span {
                display: inline-block;
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                margin: 2px;
                user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                color: #c5c8ce;
                cursor: not-allowed;
                }
            }
            .picker-cells-normal {
                span {
                display: inline-block;
                text-align: center;
                font-style: normal;
                border-radius: 3px;
                transition: all 0.2s ease-in-out;
                cursor: pointer;
                user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                }
                span:hover {
                background: #e1f0fe;
                }
            }
            .picker-cells-days {
                span {
                position: relative;
                width: 24px;
                height: 24px;
                line-height: 24px;
                margin: 2px;
                .em-today:after {
                    content: "";
                    display: block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #2d8cf0;
                    position: absolute;
                    top: 1px;
                    right: 1px;
                }
                .my-birthday:after {
                    content: "";
                    display: block;
                    width: 20px;
                    height: 20px;
                    background: #2d8cf0;
                    position: absolute;
                    top: 0;
                    right: 2px;
                    z-index: -1;
                }
                }
                .span-not-allow {
                color: #c5c8ce;
                cursor: default;
                }
                .span-allow {
                color: #515a6e;
                cursor: pointer;
                }
                .span-today {
                color: red;
                }
            }
            .picker-cells-months {
                margin-top: 4px;
                span {
                width: 40px;
                height: 28px;
                line-height: 28px;
                margin: 10px 12px;
                }
            }
            .picker-cells-years {
                margin-top: 4px;
                text-align: left;
                span {
                width: 40px;
                height: 28px;
                line-height: 28px;
                margin: 10px 12px;
                }
            }
            }
            span[is-not-between=true]{
                color:#c5c8ce!important;
                cursor: not-allowed!important;
            }
            
        }
        }
    }
}
</style>
