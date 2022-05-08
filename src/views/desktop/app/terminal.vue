<template>
  <div class="terminal" :class="[myClass]" ref="terminalBox" @click.stop="terminalFn">
    <!-- 标题栏 -->
    <div class="edgeTitle">
      <div class="titleLeft">
        <div class="leftTagName">
          <img :src="require('@/assets/icon/appIcon/home.png')" alt="windows11" />
          Windows 11
        </div>
        <n-button size="tiny" :bordered="false">
          <template #icon>
            <n-icon color="#000000">
              <Dismiss20Filled />
            </n-icon>
          </template>
        </n-button>
      </div>
      <NavBarRight name="终端" @changeSize="changeSize" />
    </div>
    <!-- 主体 -->
    <div class="terminalContainer">
      <Terminal name="g-terminal" @execCmd="onExecCmd"></Terminal>
    </div>
  </div>
</template>

<script lang='ts' setup>
import NavBarRight from '@/components/navBarRight/index.vue'
import { NButton, NIcon } from 'naive-ui'
import { Dismiss20Filled } from '@vicons/fluent'
import { nextTick, onMounted, ref } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Terminal from 'vue-web-terminal'
import {Draggable} from '@/utils/draggable'
import {useStore} from 'vuex'
import bus from '@/utils/bus'

const store = useStore()
const terminalBox = ref()
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
const onExecCmd = (key: string, command: any, success: (arg0: { type: string; class?: string; content: any; tag?: string; }) => void, failed: (arg0: string) => void) => {
  if (key === 'fail') {
    failed('Something wrong!!!')
  } else if (key === 'json') {
    //  do something here
    success({
      type: 'json',
      class: 'success',
      content: {
        k1: 'welcome to vue-web-terminal',
        k2: 120,
        k3: ['h', 'e', 'l', 'l', 'o'],
        k4: { k41: 2, k42: '200' }
      }
    })
  } else if (key === 'code') {
    success({
      type: 'code',
      class: 'system',
      content: 'import Terminal from \'vue-web-terminal\'\n' +
        '\n' +
        'Vue.use(Terminal)'
    })
  } else if (key === 'table') {
    success({
      type: 'table',
      content: {
        head: ['title1', 'title2', 'title3', 'title4'],
        rows: [
          ['name1', 'hello world', 'this is a test1', 'xxxxxxxx'],
          ['name2', 'hello world', 'this is a test2 test2', 'xxxxxxxx']
        ]
      }
    })
  } else {
    let allClass = ['success', 'error', 'system', 'info', 'warning'];

    let clazz = allClass[Math.floor(Math.random() * allClass.length)];
    success({
      type: 'normal',
      class: clazz,
      tag: '成功',
      content: command
    })
  }
}

// 页面加载完成后绑定移动事件
onMounted(()=>{
  new Draggable(terminalBox.value)
})

// 点击窗口时显示在上层
const terminalFn = async () => {
  await nextTick()
  terminalBox.value.style.zIndex = store.state.zIndex
  store.dispatch('changeZIndex')
}
bus.on('终端',terminalFn)

</script>

<style lang='scss' scoped>
@import "@/style/public";

.terminal {
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

  .terminalContainer {
    width: 100%;
    height: calc(100% - 40px);
  }
}

:deep(.terminal-header){
  display: none;
}
:deep(.terminal-window){
  padding: 0;
}
</style>