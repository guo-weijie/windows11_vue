<template>
  <div class="desktop">
    <div v-for="item in desktopList" :key="item.name" class="desktopApp">
      <img :src="item.url" :alt="item.name" />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { allAppType } from '@/type'

// eslint-disable-next-line no-undef
const props = defineProps({
  appList: Array as PropType<allAppType>
})
const desktopList = computed(() => props.appList?.filter(item => item.isDesktop))

</script>

<style lang="scss" scoped>
@import "@/style/public";
.desktop {
  @include flex(flex-start, flex-start, column);
}
.desktopApp {
  text-align: center;
  padding: 3px;
  margin: 6px 0 22px 1px;
  &:active {
    border-top-right-radius: 2px;
    border-bottom-left-radius: 2px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  img {
    height: 50px;
  }
  p {
    width: 80px;
    line-height: 16px;
    padding: 0;
    margin: 0;
    font-size: 12px;
    color: #ffffff;
  }
}
</style>