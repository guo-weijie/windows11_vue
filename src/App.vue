<template>
  <NConfigProvider :theme="theme" :date-locale="dateZhCN" :locale="zhCN">
    <div class="app" ref="app" :style="{backgroundImage: 'url(' + require('@/assets/wallpaper'+ store.state.backgroundImgUrl) + ')'}">
      <router-view></router-view>
    </div>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { NConfigProvider, darkTheme, dateZhCN, zhCN } from 'naive-ui'
import { ref } from 'vue'
import { useStore } from 'vuex';

const app = ref()

// 桌面背景图片
const store = useStore()

// 主题
//  亮 null    暗：darkTheme
const theme = ref(darkTheme)
</script>

<style lang="scss" scoped>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;
  // 此处方便以后切换桌面图片使用，勿简写
  background:{
    // image: url('@/assets/wallpaper/default/img0.jpg');
    repeat: no-repeat;
    position: center center;
    size: cover;
  }
}
</style>
