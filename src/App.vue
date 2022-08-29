<template>
  <div class="app" :data-theme="theme" ref="app"
    :style="{ backgroundImage: 'url(' + require('@/assets/wallpaper' + backgroundImgUrl) + ')' }">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { userStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const store = userStore()
const app = ref()
const { backgroundImgUrl, theme } = storeToRefs(store)
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  user-select: none;

  background: {
    repeat: no-repeat;
    position: center center;
    size: cover;
  }
}
</style>
