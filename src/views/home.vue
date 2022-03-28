<template>
  <Desktop :appList="allApp" />
  <Taskbar :currentTime="currentTime" v-bind:allAppList="allApp" />
</template>

<script lang="ts" setup>
import Desktop from "./desktop/index.vue";
import Taskbar from './taskbar/index.vue'
import { reactive, ref, watchEffect } from "vue";
import { allAppType, timeType } from '@/type'

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

// 应用程序
// {
//   name, 程序名称
//   url,  图标路径
//   isDesktop, 是否在桌面显示。从桌面打开的应用图标放到任务栏上，关闭应用时处理任务栏图标以此字段为标识
//   isPinned, 是否固定
// }
const allApp: allAppType = reactive([{
  name: 'Edge',
  url: require('@/assets/icon/appIcon/edge.png'),
  isDesktop: true,
  isPinned: true
},{
  name: 'Microsoft Store',
  url: require('@/assets/icon/appIcon/store.png'),
  isDesktop: false,
  isPinned: true
},{
  name: '照片',
  url: require('@/assets/icon/appIcon/photos.png'),
  isDesktop: false,
  isPinned: true
},{
  name: '设置',
  url: require('@/assets/icon/appIcon/settings.png'),
  isDesktop: false,
  isPinned: true
},{
  name: '时钟',
  url: require('@/assets/icon/appIcon/alarm.png'),
  isDesktop: false,
  isPinned: true
},{
  name: '文件资源管理器',
  url: require('@/assets/icon/appIcon/explorer.png'),
  isDesktop: false,
  isPinned: true
},{
  name: '回收站',
  url: require('@/assets/icon/appIcon/bin1.png'),
  isDesktop: true,
  isPinned: false
}, {
  name: 'cortana',
  url: require('@/assets/icon/appIcon/cortana.png'),
  isDesktop: false,
  isPinned: false
}, {
  name: 'Visual Studio Code',
  url: require('@/assets/icon/appIcon/code.png'),
  isDesktop: true,
  isPinned: false
}])
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