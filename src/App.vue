<template>
  <div class="app" :data-theme="theme" ref="app" :style="{ backgroundImage: 'url(' + require('@/assets/wallpaper' + store.state.backgroundImgUrl) + ')' }">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex';

const app = ref()
const store = useStore()
const theme = computed(()=>store.state.theme)

// 桌面背景图片

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
