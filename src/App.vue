<template>
  <div class="app" :data-theme="theme" ref="app" :style="{ backgroundImage: 'url(' + require('@/assets/wallpaper' + bgurl) + ')' }">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import store from '@/store'

const app = ref()
const bgurl = computed(()=>store.getters.backgroundImgUrl)
const theme = computed(()=>store.getters.theme)

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
