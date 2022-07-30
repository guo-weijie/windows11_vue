<template>
  <Desktop />
  <Taskbar :currentTime="currentTime" />
</template>

<script lang="ts" setup>
import Desktop from "./desktop/index.vue";
import Taskbar from './taskbar/index.vue'
import { reactive, ref, watchEffect } from "vue";
import { timeType } from '@/type'

// 右下角时间 和 小组件时间
const timeNumber = ref(new Date().getTime())
const currentTime: timeType = reactive({
  year: 1,
  month: 1,
  day: 1,
  hour: 1,
  minute: 1,
  second: 1
})
function dealTime(params: number): Date {
  return new Date(params)
}
watchEffect(() => {
  let temp: Date | null = dealTime(timeNumber.value)
  currentTime.year = temp.getFullYear()
  currentTime.month = temp.getMonth() + 1
  currentTime.day = temp.getDate()
  currentTime.hour = temp.getHours()
  currentTime.minute = temp.getMinutes() > 10 ? temp.getMinutes() : '0' + temp.getMinutes()
  currentTime.second = temp.getSeconds() > 10 ? temp.getSeconds() : '0' + temp.getSeconds()
  temp = null
})

setInterval(() => timeNumber.value += 1000, 1000)

</script>

<style lang="scss" scoped>
.desktop {
  width: 100%;
  height: calc(100% - 48px);
}
.taskbar {
  width: 100%;
  border-top: 1px solid #e5e5e5;
  height: 47px;
  line-height: 47px;
  background-color: rgba(228, 239, 250, 0.9);
}
</style>