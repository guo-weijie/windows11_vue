<template>
  <NConfigProvider :theme="theme">
    <div class="app">
      <router-view></router-view>
    </div>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { NConfigProvider, darkTheme } from 'naive-ui'
import { ref } from 'vue'
// 主题
//  亮 null    暗：darkTheme
const theme = ref(darkTheme)
</script>

<style lang="scss" scoped>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  user-select: none;
  // 此处方便以后切换桌面图片使用，勿简写
  background-image: url("~@/assets/wallpaper/default/img0.jpg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
