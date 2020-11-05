<template>
  <div class="syx-calendar-wrap">
    <input
      type="text"
      class="syx-calendar-input"
      @click="calendarClick"
      @blur="calendarBlur"
      v-model="date"
      ref="syxCalendarInput"
    />
    <span class="syx-calendar-span" @click="openCalendar">
      <i class="syx-calendar-i"></i>
    </span>
    <div
      class="syx-picker-panel-body-wrapper"
      @mousedown="preventFocus($event)"
      v-show="openCalendarFlg"
    >
      <div class="syx-picker-panel-body">
        <div class="picker-panel-header">
          <span
            class="picker-btn picker-prev-btn-arrow-double"
            @click="preYear()"
          >
            <i class="arrow-i">&lt;&lt;</i>
          </span>
          <span
            class="picker-btn picker-prev-btn-arrow"
            v-show="currentLevel == 3"
            @click="preMonth()"
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
              v-show="currentLevel > 1"
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
            v-show="currentLevel == 3"
            @click="nextMonth()"
          >
            <i class="arrow-i">&gt;</i>
          </span>
        </div>
        <div class="picker-panel-content">
          <!-- 年 -->
          <div class="picker-cells" v-show="currentLevel == 1">
            <div class="picker-cells-years picker-cells-normal">
              <span
                v-for="(year, index) in years"
                :key="index"
                @click="chooseYear(year)"
                >{{ year }}</span
              >
            </div>
          </div>
          <!-- 月 -->
          <div class="picker-cells" v-show="currentLevel == 2">
            <div class="picker-cells-months picker-cells-normal">
              <span
                v-for="(month, index) in months"
                :key="index"
                @click="chooseMonth(month)"
                >{{ month }}月</span
              >
            </div>
          </div>
          <!-- 日 -->
          <div class="picker-cells" v-show="currentLevel == 3">
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
                :class="[
                  dayObj.SYMBOL == 'CURRENT' ? 'span-allow' : 'span-not-allow',
                ]"
                @click="chooseDay($event, dayObj)"
                ><em
                  :class="[
                    isToday(dayObj) ? 'em-today' : '',
                    isBirthDay(dayObj) ? 'my-birthday' : '',
                  ]"
                  >{{ dayObj.NUMBER }}</em
                ></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["syx-data"],
  data() {
    return {
      openCalendarFlg: false,
      months: 12,
      weekDay: ["日", "一", "二", "三", "四", "五", "六"],
      currentLevel: 3, //1 表示年 2 表示月 3 表示日
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
  },
  computed: {
    days: function () {
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
    years: function () {
      let startYear = parseInt(this.year / 10) * 10;
      let endYear = startYear + 9;
      let year = [];
      for (let i = startYear; i <= endYear; i++) {
        year.push(i);
      }
      return year;
    },
    date: function () {
      return this.year + "-" + this.month + "-" + this.day;
    },
  },
  watch: {
    date(n, o) {
      this.$parent[this.syxData] = n;
    },
  },
  created() {
    this.$parent[this.syxData] = this.date;
  },
  methods: {
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
      this.closeCalendar();
    },
    // 打开日历方法
    openCalendar() {
      this.openCalendarFlg = true;
      this.$refs.syxCalendarInput.focus();
    },
    // 关闭日历方法
    closeCalendar() {
      this.openCalendarFlg = false;
      // 关闭后打开重置为第三等级(日)
      this.currentLevel = 3;
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
    chooseMonth(month) {
      this.month = month;
      this.currentLevel = 3;
    },
    // 选择年
    chooseYear(year) {
      this.year = year;
      this.currentLevel = 2;
    },
    // 选择日
    chooseDay(e, dayObj) {
      e.stopPropagation();
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
    },
    // 上一年,根据currentLevel判断
    preYear() {
      if (this.currentLevel == 1) {
        this.year = this.year - 10;
      } else {
        this.year = this.year - 1;
      }
    },
    // 下一年,根据currentLevel判断
    nextYear() {
      if (this.currentLevel == 1) {
        this.year = this.year + 10;
      } else {
        this.year = this.year + 1;
      }
    },
    // 上一月
    preMonth() {
      if (this.month > 1) {
        this.month = this.month - 1;
      } else {
        this.month = 12;
        this.year = this.year - 1;
      }
    },
    // 下一月
    nextMonth() {
      if (this.month < 12) {
        this.month = this.month + 1;
      } else {
        this.month = 1;
        this.year = this.year + 1;
      }
    },
    // 今天判断
    isToday(dayObj) {
      let currentYear = new Date().getFullYear();
      let currentMonth = new Date().getMonth() + 1;
      let currentDay = new Date().getDate();
      if (dayObj.SYMBOL != "CURRENT") {
        return false;
      }
      if (
        currentYear == this.year &&
        currentMonth == this.month &&
        currentDay == dayObj.NUMBER
      ) {
        return true;
      } else {
        return false;
      }
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
  },
};
</script>
<style lang="scss" scoped>
.syx-calendar-wrap {
  position: relative;
  font-size: 14px;
  .syx-calendar-input {
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
    outline:  #57a3f3;
  }
  .syx-calendar-input:focus,.syx-calendar-input:hover{
    border-color: #57a3f3;
  }
  .syx-calendar-span {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
    height: 100%;
    width: 30px;
    cursor: pointer;
    .syx-calendar-i {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(../assets/calendar.png) no-repeat;
      background-position: center;
    }
  }
  .syx-picker-panel-body-wrapper {
    position: absolute;
    margin-top: 5px;
    width: 216px;
    height: 248px;
    border: 1px #cccccc solid;
    border-radius: 3px;
    box-shadow: #bbbbbb 0px 0px 20px 2px;
    z-index: 999;
    background: white;
    .syx-picker-panel-body {
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
              cursor: not-allowed;
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
      }
    }
  }
}
</style>
