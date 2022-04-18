<template>
  <div class="app" ref="app" :style="{ backgroundImage: 'url(' + require('@/assets/wallpaper' + store.state.backgroundImgUrl) + ')' }">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from 'vuex';

const app = ref()



// 桌面背景图片
const store = useStore()

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
