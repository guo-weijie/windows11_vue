<template>
  <div class="desktop" @click="claseTaskbarAll">
    <div class="desktopAppContainer">
      <div v-for="item in desktopApp" :key="item.name" class="desktopApp" @dblclick="openApp(item)">
        <img :src="item.url" :alt="item.name" />
        <p>{{ item.name }}</p>
      </div>
    </div>

    <!-- app -->
    <Edge v-if="edgeStatus.open" v-show="!edgeStatus.hidden" />
    <Setup v-if="setStatus.open" v-show="!setStatus.hidden" />
    <!-- <TerminalApp v-show="appIsOpen['终端']" /> -->
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Edge from './app/edge.vue'
import Setup from '@/views/setUp/index.vue'
// import TerminalApp from './app/terminal.vue'
import store from '@/store'
import bus from '@/utils/bus'

const desktopApp = computed(() => store.getters.app.filter(item => item.isDesktop))

/**
 * 如果应用为关闭状态 提交 open 为 true
 * 如果应用为最小化状态，此时 open 为 true，mini 为 true，提交 mini 为 fasle
 */
const openApp = value => {
  const obj = {
    name: value.name
  }
  if(value.mini){
    obj.key = 'mini'
    obj.value = false
  }else{
    obj.key = 'open'
    obj.value = true
  }
  store.dispatch('changeAppStatus',obj)
}

const edgeStatus = computed(()=>store.getters.app.filter(item => item.name === 'Edge')[0])
const setStatus = computed(()=>store.getters.app.filter(item => item.name === '设置')[0])

// 点击桌面时关闭所有任务栏打开的窗口
const claseTaskbarAll = () => {
  bus.emit('closeTaskbar')
}
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

.appContainer{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--set-bg-color);
  transition: all 100ms ease-in;
}

.dragStyle{
  width: 50%;
  height: 60%;
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