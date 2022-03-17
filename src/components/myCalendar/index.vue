<template>
  <div class="myCalendar">
    <div class="calendarNow">
      <div class="nowSolar">
        <div
          class="solarDate"
          @click.stop="isCurrentTime"
        >{{ flagTime.month }}月{{ flagTime.date }}日，星期{{ dayList[flagTime.day] }}</div>
        <n-button @click.stop="changeCalendarBoxStatus">
          <template #icon>
            <n-icon color="#3c3d3e">
              <!-- <KeyboardArrowDownRound /> -->
              <component :is="calendarBoxStatus ? KeyboardArrowDownRound : KeyboardArrowUpRound" />
            </n-icon>
          </template>
        </n-button>
      </div>
      <div class="nowLunar">{{ getLunar(flagTime.year, flagTime.month, flagTime.date).dateStr }}</div>
    </div>
    <div class="calendarListBox" ref="calendarBoxRef">
      <div class="boxHeader">
        <div
          class="headerDate"
          @click.stop="changeCalendar"
        >{{ calendarFlag === 2 ? `${year}年` : calendarFlag === 1 ? `${year}年${month}月` : `${integerTenYear.before}-${integerTenYear.after}` }}</div>
        <div>
          <n-button style="font-size: 30px;margin-right: 15px;" @click.stop="getCalendar(-1)">
            <n-icon color="#81868b">
              <ArrowDropUpRound />
            </n-icon>
          </n-button>
          <n-button style="font-size: 30px" @click.stop="getCalendar(1)">
            <n-icon color="#81868b">
              <ArrowDropDownRound />
            </n-icon>
          </n-button>
        </div>
      </div>
      <div class="boxWeek" v-show="calendarFlag === 1">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>
      <div
        :class="{ boxBody: true, bodyDate: calendarFlag === 1, bodyMonthYear: calendarFlag === 2 || calendarFlag === 3 }"
      >
        <div
          v-show="calendarFlag === 1"
          v-for="item in 42"
          :key="item + 'd'"
          :class="{ other: item <= monthFirstDay || item > monthAll + monthFirstDay, current: item - monthFirstDay === currentDate && flagTime.year === year && flagTime.month === month }"
        >
          <span>{{ dealTime(item) }}</span>
          <span>{{ dealTime(item, 'lunar') }}</span>
        </div>

        <div
          v-show="calendarFlag === 2"
          v-for="item in 16"
          :key="item + 'm'"
          :class="{ other: item > 12, current: item === flagTime.month && flagTime.year === year }"
          @click.stop="selectMonth(item)"
        >{{ item > 12 ? `${item - 12}月` : `${item}月` }}</div>

        <div
          v-show="calendarFlag === 3"
          v-for="item in 16"
          :key="item + 'm'"
          :class="{ other: item <= ((Math.floor(year / 10) * 10) - 1970) % 4 || item > ((Math.floor(year / 10) * 10) - 1970) % 4 + 11, current: integerTenYear.before - (integerTenYear.before - 1970) % 4 + item - 1 === flagTime.year }"
          @click.stop="selectYear(integerTenYear.before - (integerTenYear.before - 1970) % 4 + item - 1)"
        >{{ integerTenYear.before - (integerTenYear.before - 1970) % 4 + item - 1 }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, readonly, reactive } from 'vue'
import { KeyboardArrowDownRound, KeyboardArrowUpRound, ArrowDropDownRound, ArrowDropUpRound } from '@vicons/material'
import { NIcon, NButton } from 'naive-ui'
import { Rboolean, REle } from '@/type/basic'
import { timeObj, RintegerYear } from '@/type/index'
import { startOfMonth, endOfMonth, getDay, addMonths } from 'date-fns'
import { getLunar } from 'chinese-lunar-calendar'
// 控制箭头方向
//  -> true 向下 表示未隐藏
//  -> false 向上 表示已隐藏
const calendarBoxStatus: Rboolean = ref(true)
const calendarBoxRef: REle = ref(null)
function changeCalendarBoxStatus() {
  calendarBoxStatus.value = !calendarBoxStatus.value
  calendarBoxRef.value.style.height = calendarBoxStatus.value ? '354px' : '0'
}
/*
 * 1 日历
 * 2 月历
 * 3 年历
 */
const calendarFlag = ref(1)
function changeCalendar() {
  if (calendarFlag.value === 3) {
    calendarFlag.value = 1
  } else {
    calendarFlag.value += 1
  }
}
watchEffect(() => {
  if (calendarFlag.value === 3) {
    if (year.value % 10) {
      integerTenYear.before = Math.floor(year.value / 10) * 10
      integerTenYear.after = Math.ceil(year.value / 10) * 10
      return
    }
    integerTenYear.before = year.value
    integerTenYear.after = year.value + 10
  }
})
// 年历处理
//  整十年
const integerTenYear: RintegerYear = reactive({
  before: 1970,
  after: 1980
})

const selectYear = (val: number) => {
  year.value = val
  current.value.setFullYear(val)
  calendarFlag.value -= 1
}

// 月历处理
const selectMonth = (val: number) => {
  current.value = addMonths(current.value, val - month.value)
  calendarFlag.value -= 1
}

// 日历处理
const dayList = ['日', '一', '二', '三', '四', '五', '六']
let current = ref()
current.value = new Date()
// flag 用于处理当前日期的背景颜色问题 -> 非当前日期无背景颜色
const flagTime = readonly({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  day: new Date().getDay()
})
// 日历上方的日期
const year = ref()
const month = ref()
// -1 获取当月1号是星期几
const monthFirstDay = ref()
// -2 获取当月一共有多少天
const monthAll = ref()
// -3 获取上个月的相关信息
//  -3.1 获取上个月的日期
const lastYear = ref()
const lastMonth = ref()
const lastMonthAll = ref()
//  -3.2 获取上个月有多少天
//  enfOfMonth -> 获取月份最后一天的结束时间 -> Mon Feb 28 2022 23:59:59 GMT+0800 (中国标准时间)
//  lastOfMonth -> 获取月份最后一天的开始时间 -> Mon Feb 28 2022 00:00:00 GMT+0800 (中国标准时间)
// ->4 获取当前日期
const currentDate = ref()
watchEffect(() => {
  year.value = current.value.getFullYear()
  month.value = current.value.getMonth() + 1
  monthFirstDay.value = getDay(startOfMonth(current.value))
  monthAll.value = endOfMonth(current.value).getDate()
  const lastTime = addMonths(current.value, -1)
  lastYear.value = lastTime.getFullYear()
  lastMonth.value = lastTime.getMonth() + 1
  lastMonthAll.value = endOfMonth(lastTime).getDate()
  currentDate.value = current.value.getDate()
})
function getCalendar(month = 0) {
  if (calendarFlag.value === 2) {
    year.value += month
    return
  }
  if (calendarFlag.value === 3) {
    year.value += month * 10
    return
  }
  current.value = addMonths(current.value, month)
}
const isCurrentTime = () => {
  current.value = new Date()
  calendarFlag.value = 1
}
// 获取日历上的精确日期
// item 循环格子的项
// flag 
//  -> solar 阳历
//  -> lunar 阴历
function dealTime(item: number, flag = 'solar') {
  if (flag === 'solar') {
    return item > monthFirstDay.value ? item <= monthAll.value + monthFirstDay.value ? item - monthFirstDay.value : item - monthFirstDay.value - monthAll.value : lastMonthAll.value - monthFirstDay.value + item
  }
  let obj: timeObj = {
    year: year.value,
    month: month.value,
    date: undefined
  }
  if (item <= monthFirstDay.value) {
    obj.year = lastYear.value
    obj.month = lastMonth.value
    obj.date = lastMonthAll.value - monthFirstDay.value + item
    // return getLunar(lastYear.value, lastMonth.value, lastMonthAll.value - monthFirstDay.value + item).lunarDate
  } else if (item <= monthAll.value + monthFirstDay.value) {
    obj.date = item - monthFirstDay.value
    // return getLunar(year.value, month.value, item - monthFirstDay.value).lunarDate
  } else if (month.value == 12) {
    obj.year = year.value + 1
    obj.month = 1
    obj.date = item - monthFirstDay.value - monthAll.value
    // return getLunar(year.value + 1, 1, item - monthFirstDay.value - monthAll.value).lunarDate
  } else {
    obj.month = month.value + 1
    obj.date = item - monthFirstDay.value - monthAll.value
    // return getLunar(year.value, month.value + 1, item - monthFirstDay.value - monthAll.value).lunarDate
  }
  const lunarObj = getLunar(obj.year, obj.month, obj.date)
  if (lunarObj.solarTerm) return lunarObj.solarTerm
  if (lunarObj.dateStr.indexOf('初一') > -1) return lunarObj.dateStr.slice(0, 2)
  return lunarObj.dateStr.slice(2)

}
</script>

<style lang="scss" scoped>
@import "@/style/public";
.myCalendar {
  width: 334px;
  // height: 423px;
  @include box_border;
}
.calendarNow {
  box-sizing: border-box;
  width: 100%;
  height: 68px;
  font-size: 12px;
  padding: 13px 17px 15px;
  background-color: #e1eef9;
  border-bottom: 1px solid #d3dfe9;
  .nowSolar {
    height: 22px;
    @include flex(space-between, center);
    margin-bottom: 6px;
    .n-button {
      width: 22px;
      height: 22px;
      background-color: #f6f9fd;
      box-shadow: 0 1px 1px #ced2d4;
    }
  }
  .nowLunar {
    height: 12px;
  }
}
.calendarListBox {
  height: 354px;
  background-color: #e7f1f9;
  transition: height 0.3s ease;
  .boxHeader {
    box-sizing: border-box;
    padding: 20px 10px 0 16px;
    @include flex(space-between, center);
    font-size: 14px;
    font-weight: bold;
    .headerDate:active {
      color: #666;
    }
    .n-button {
      height: auto;
    }
  }
  .boxWeek {
    height: 38px;
    font-size: 10px;
    @include grid(7, 1);
    div {
      text-align: center;
    }
  }
  .boxBody {
    div {
      display: grid;
      justify-content: center;
      align-content: center;
      text-align: center;
      &:hover {
        border-radius: 50%;
        background-color: #e0e8f0;
      }
    }
    .other {
      color: #a5abb1;
    }
    .current {
      color: #ffffff;
      background-color: #0067c0 !important;
      border-radius: 50%;
    }
  }
}
.n-button {
  padding: 0;
}

// 日历样式
.bodyDate {
  height: 262px;
  font-size: 10px;
  @include grid(7, 6);
  div {
    width: 100%;
    height: 100%;
  }
}
// 月历样式
.bodyMonthYear {
  height: 300px;
  @include grid(4, 4);
  div {
    width: 80%;
    height: 80%;
  }
}
</style>