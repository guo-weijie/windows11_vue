<template>
  <div class="desktop" @click="claseTaskbarAll">
    <div class="desktopAppContainer">
      <div
        v-for="item in desktopList"
        :key="item.name"
        class="desktopApp"
        @dblclick="openApp(item)"
      >
        <img :src="item.url" :alt="item.name" />
        <p>{{ item.name }}</p>
      </div>
    </div>

    <!-- app -->
    <Edge v-if="appIsOpen.edge" />
    <Setup v-if="appIsOpen['设置']" />
    <!-- 等 vue-web-terminal vue3 版本发布再做 -->
    <!-- <Terminal /> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, reactive } from 'vue';
import { allAppType, allAppItem } from '@/type'
import bus from '@/utils/bus'
import Edge from './app/edge.vue'
import Setup from '@/views/setUp/index.vue'
// import Terminal from './app/terminal.vue'

// 关闭/打开 应用
bus.on('appStatus', data => {
  for(const key in appIsOpen){
    if(key.toLowerCase()===data.name.toLowerCase()){
      if(data.flag==='open'){
        appIsOpen[key] = true
        bus.emit(key)
        return
      }
      appIsOpen[key] = false
    }
  }
})

const props = defineProps({
  appList: Array as PropType<allAppType>
})
const desktopList = computed(() => props.appList?.filter(item => item.isDesktop))

const claseTaskbarAll = () => {
  bus.emit('claseTaskbarAll')
}
// 点击应用图标
const openApp = (data:allAppItem) => {
  const obj = {
    ...data,
    flag: 'open'
  }
  bus.emit('appStatus',obj)
  bus.emit('changeOpenStatus',obj)
}
// 应用打开/关闭状态
const appIsOpen = reactive({
  edge: false,
  '设置': false
})
</script>

<style lang="scss" scoped>
@import "@/style/public";
.desktop {
  position: relative;
}
.desktopAppContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  @include flex(flex-start, flex-start, column);
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
}

// 应用窗口样式
.halfOnLeft {
  width: 50%;
}
.halfOnRight {
  width: 50%;
  left: 50%;
}
.moreOnLeft {
  width: 60%;
}
.moreOnRight {
  width: 40%;
  left: 60%;
}
.thirdOnLeft {
  width: 33%;
}
.thirdOnCenter {
  width: 33%;
  left: 33%;
}
.thirdOnRight {
  width: 33%;
  left: calc(100% - 33%);
}
.thirdOnTop {
  width: 50%;
  height: 50%;
  left: 50%;
}
.thirdOnBottom {
  width: 50%;
  height: 50%;
  left: 50%;
  top: 50%;
}
.quarterOnLeftTop {
  width: 50%;
  height: 50%;
}
.quarterOnLeftBottom {
  width: 50%;
  height: 50%;
  top: 50%;
}
.moreThirdLeft {
  width: 25%;
}
.moreThirdCenter {
  width: 50%;
  left: 25%;
}
.moreThirdRight {
  width: 25%;
  left: 75%;
}
.centerCenter {
  width: 50%;
  height: 60%;
  left: 25%;
  top: 20%;
}
</style>