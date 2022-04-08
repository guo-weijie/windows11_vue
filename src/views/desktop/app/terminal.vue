<template>
  <div class="terminal" :class="[myClass]" ref="terminalBox">
    <!-- 标题栏 -->
    <div class="edgeTitle">
      <div class="titleLeft">
        <div class="leftTagName">
          <img :src="require('@/assets/icon/appIcon/home.png')" alt="windows11" />
          Windows 11
        </div>
        <n-button size="tiny">
          <template #icon>
            <n-icon color="#000000">
              <Dismiss20Filled />
            </n-icon>
          </template>
        </n-button>
      </div>
      <NavBarRight name="edge" @changeSize="changeSize" />
    </div>
    <!-- 主体 -->
    <div class="terminalContainer" ref="terminalContainer"></div>
  </div>
</template>

<script lang='ts' setup>
import NavBarRight from '@/components/navBarRight/index.vue'
import {NButton, NIcon} from 'naive-ui'
import { Dismiss20Filled } from '@vicons/fluent'
import { ref } from 'vue'

const terminalBox = ref()
const terminalContainer = ref()
const myClass = ref('')
const changeSize = (name: string) => {
  terminalBox.value.style.left = ''
  terminalBox.value.style.top = ''
  if (!name && !myClass.value) {
    myClass.value = 'centerCenter'
    return
  }
  myClass.value = name
}

</script>

<style lang='scss' scoped>

@import "@/style/public";
.terminal{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  transition: all 200ms ease-in;
  .edgeTitle {
    width: 100%;
    height: 40px;
    background-color: #d7ae46;
    @include flex(space-between, flex-end);
    .titleLeft {
      box-sizing: border-box;
      width: 12.5%;
      height: 32px;
      padding: 0 12px;
      margin-left: 8px;
      background-color: #f7f7f7;
      border-radius: 4px 4px 0 0;
      @include flex(space-between, center);
      .leftTagName {
        width: calc(100% - 26px);
        white-space: nowrap;
        overflow: hidden;
        font-size: 12px;
        color: #a24d4d;
        @include flex(flex-start, center);
        img {
          width: 16px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>