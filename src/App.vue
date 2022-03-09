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
}
</style>
