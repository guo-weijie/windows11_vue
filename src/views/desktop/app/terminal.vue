<template>
  <div class="appContainer centerCenter" ref="terminalBox" @click.stop="terminalFn">
    <!-- 标题栏 -->
    <TitleBlock title="终端" bgColor="#cdcdcd">
      <div class="titleLeft">
        <div class="leftTagName">
          <img :src="require('@/assets/icon/appIcon/powershell.jpg')" alt="windows11" />
          Windows PowerShell
        </div>
        <n-button size="tiny" :bordered="false">
          <template #icon>
            <n-icon color="#000000">
              <Dismiss20Filled />
            </n-icon>
          </template>
        </n-button>
      </div>
    </TitleBlock>
    <!-- 主体 -->
    <div class="appBody">
      <Terminal name="gTerminal" @execCmd="onExecCmd" context="ghosie" :initLog="initData"></Terminal>
    </div>
  </div>
</template>

<script lang='ts' setup>
import TitleBlock from '@/components/titleBlock'
import { Dismiss20Filled } from '@vicons/fluent'
import { nextTick, ref, onMounted } from 'vue'
import Terminal from 'vue-web-terminal'
import { appStore } from '@/store/app'
import bus from '@/utils/bus'
import { NIcon, NButton } from 'naive-ui'

const store = appStore()
const terminalBox = ref()
const onExecCmd = (key: string, command: unknown, success: any, failed: (arg0: string) => void) => {
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

// 初始化时消息日志
const initData = [{
  "type": "normal",
  "content": "Windows PowerShell"
}, {
  "type": "normal",
  "content": "版权所有 (C) Microsoft Corporation。保留所有权利。"
}, {
  "type": "normal",
  "content": "尝试新的跨平台 PowerShell <a href='https://aka.ms/pscore6'>https://aka.ms/pscore6</a>"
}]

// 点击窗口时显示在上层
const terminalFn = async () => {
  await nextTick()
  terminalBox.value.style.zIndex = store.zIndex
  store.changeZIndex()
}
bus.on('终端', terminalFn)

onMounted(() => {
  terminalFn()
})

</script>

<style lang='scss' scoped>
@import "@/style/public";

.titleLeft {
  box-sizing: border-box;
  height: 32px;
  padding: 0 12px;
  margin-left: 8px;
  background-color: #f7f7f7;
  border-radius: 4px 4px 0 0;
  margin-top: 6px;
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

:deep(.terminal-header) {
  display: none;
}

:deep(.terminal-window) {
  padding: 0;
}
</style>