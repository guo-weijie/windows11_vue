<template>
  <div class="myCalendar">
    <div class="calendarNow">
      <div class="nowSolar">
        <div class="solarDate" @click="current = new Date()">3月10日，星期四</div>
        <n-button @click="changeCalendarBoxStatus">
          <template #icon>
            <n-icon color="#3c3d3e">
              <!-- <KeyboardArrowDownRound /> -->
              <component :is="calendarBoxStatus ? KeyboardArrowDownRound : KeyboardArrowUpRound" />
            </n-icon>
          </template>
        </n-button>
      </div>
      <div class="nowLunar">二月初八</div>
    </div>
    <div class="calendarListBox" ref="calendarBoxRef">
      <div class="boxHeader">
        <div class="headerDate">{{ year }}年{{ month }}月</div>
        <div>
          <n-button style="font-size: 30px;margin-right: 15px;" @click="getCalendar(-1)">
            <n-icon color="#81868b">
              <ArrowDropUpRound />
            </n-icon>
          </n-button>
          <n-button style="font-size: 30px" @click="getCalendar(1)">
            <n-icon color="#81868b">
              <ArrowDropDownRound />
            </n-icon>
          </n-button>
        </div>
      </div>
      <div class="boxWeek">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>
      <div class="boxBody">
        <div
          v-for="item in 42"
          :key="item"
          :class="{ other: item <= monthFirstDay || item > monthAll + monthFirstDay, current: item - monthFirstDay === currentDate && flagTime.year === year && flagTime.month === month }"
        >{{ item > monthFirstDay ? item <= monthAll + monthFirstDay ? item - monthFirstDay : item - monthFirstDay - monthAll : lastMonth - monthFirstDay + item }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect, readonly } from 'vue'
import { KeyboardArrowDownRound, KeyboardArrowUpRound, ArrowDropDownRound, ArrowDropUpRound } from '@vicons/material'
import { NIcon, NButton } from 'naive-ui'
import { Rboolean, REle } from '@/type/basic'
import { startOfMonth, endOfMonth, getDay, addMonths } from 'date-fns'
// 控制箭头方向
//  -> true 向下 表示未隐藏
//  -> false 向上 表示已隐藏
const calendarBoxStatus: Rboolean = ref(true)
const calendarBoxRef: REle = ref(null)
function changeCalendarBoxStatus() {
  calendarBoxStatus.value = !calendarBoxStatus.value
  calendarBoxRef.value.style.height = calendarBoxStatus.value ? '354px' : '0'
}

// 日历处理
let current = ref()
current.value = new Date()
// flag 用于处理当前日期的背景颜色问题 -> 非当前日期无背景颜色
const flagTime = readonly({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1
})
// 日历上方的日期
const year = ref()
const month = ref()
// -1 获取当月1号是星期几
const monthFirstDay = ref()
// -2 获取当月一共有多少天
const monthAll = ref()
// -3 获取上个月一共有多少天
//  -3.1 获取上个月的日期
const lastMonth = ref()
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
  const lastDate = addMonths(current.value, -1)
  lastMonth.value = endOfMonth(lastDate).getDate()
  currentDate.value = current.value.getDate()
})
function getCalendar(month = 0) {
  current.value = addMonths(current.value, month)
}
</script>

<style lang="scss" scoped>
@import "@/style/public";
.myCalendar {
  width: 334px;
  // height: 423px;
  line-height: normal;
  border-radius: 6px;
  box-shadow: 1px 1px 5px #79848e;
  overflow: hidden;
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
    height: 262px;
    font-size: 10px;
    @include grid(7, 6);
    div {
      width: 100%;
      height: 100%;
      display: grid;
      justify-content: center;
      align-content: center;
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
</style>