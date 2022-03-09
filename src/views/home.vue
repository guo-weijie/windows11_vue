<template>
  <Desktop :appList="allApp" />
  <Taskbar />
</template>

<script lang="ts" setup>
import Desktop from "./desktop/index.vue";
import Taskbar from './taskbar/index.vue'
import { reactive } from "vue";
import { allAppType } from '@/type'

// 应用程序
// {
//   name, 程序名称
//   url,  图标路径
//   isDesktop, 是否在桌面显示
//   isPinned, 是否固定
// }
const allApp: allAppType = reactive([{
  name: '回收站',
  url: require('@/assets/icon/bin1.png'),
  isDesktop: true,
  isPinned: true
}, {
  name: 'cortana',
  url: require('@/assets/icon/cortana.png'),
  isDesktop: false,
  isPinned: true
}, {
  name: 'Visual Studio Code',
  url: require('@/assets/icon/code.png'),
  isDesktop: true,
  isPinned: true
}])
</script>

<style lang="scss" scoped>
.desktop {
  width: 100%;
  height: calc(100% - 48px);
  background-image: url("~@/assets/wallpaper/default/img0.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.taskbar {
  width: 100%;
  border-top: 1px solid #e5e5e5;
  height: 47px;
  line-height: 47px;
  background-color: #f3f3f3;
}
</style>