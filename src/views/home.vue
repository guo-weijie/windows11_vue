<template>
  <Desktop />
  <Taskbar />
</template>

<script lang="ts" setup>
import Desktop from "./desktop/index.vue";
import Taskbar from './taskbar/index.vue'

// 应用程序
// {
//   name, 程序名称
//   img,  图标路径
//   isShow, 是否在桌面显示
// }
</script>

<style lang="scss" scoped>
.desktop{
  width: 100%;
  height: calc(100% - 48px);
  background-image: url('~@/assets/wallpaper/default/img0.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.taskbar{
  width: 100%;
  border-top: 1px solid #e5e5e5;
  height: 47px;
  line-height: 47px;
  background-color: #f3f3f3;
}
</style>