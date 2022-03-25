<template>
  <div class="edge">
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
              <CloseSharp />
            </n-icon>
          </template>
        </n-button>
      </div>
      <div class="titleRight">
        <div class="beforeClose">
          <img :src="require('@/assets/icon/systemIcon/minimize.png')" alt="windows11" />
        </div>
        <div class="beforeClose">
          <img :src="require('@/assets/icon/systemIcon/maximize.png')" alt="windows11" />
        </div>
        <div class="close" @click.stop="closeApp">
          <img :src="require('@/assets/icon/systemIcon/close.png')" alt="windows11" />
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <div class="edgeNav">
      <n-button @click="naviBtn(-1)">
        <template #icon>
          <n-icon :color="leftGray">
            <ArrowLeft24Regular />
          </n-icon>
        </template>
      </n-button>
      <n-button @click="naviBtn(1)">
        <template #icon>
          <n-icon :color="rightGray">
            <ArrowRight24Regular />
          </n-icon>
        </template>
      </n-button>
      <n-button @click="naviBtn(0)">
        <template #icon>
          <n-icon color="#000000">
            <ArrowClockwise48Regular />
          </n-icon>
        </template>
      </n-button>
      <n-input
        v-model:value="inputValue"
        type="text"
        autofocus
        maxlength="8182"
        @input="onInput"
        @keydown.enter="inputComplete"
      >
        <template #prefix>
          <n-icon color="#000" :component="inputBarIcon"></n-icon>
        </template>
      </n-input>
    </div>
    <!-- 主体窗口 -->
    <div class="edgeBody">
      <iframe :src="edgeUrl"></iframe>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { CloseSharp } from '@vicons/material'
import { ArrowLeft24Regular, ArrowRight24Regular, ArrowClockwise48Regular, LockClosed20Regular, Search20Regular } from '@vicons/fluent'
import { NIcon, NButton, NInput } from 'naive-ui'
import { ref, shallowRef, watch } from 'vue'
import bus from '@/utils/bus';
// 记录浏览器历史记录
const historyData = ['https://www.bing.com']
// 当前所在的历史记录的位置
let step = ref(0)
// 输入框前图标
let inputBarIcon = shallowRef(Search20Regular)
// iframe 值
const edgeUrl = ref('https://bing.com')
// 用户输入的值
const inputValue = ref('https://bing.com')
// 输入完成按回车键触发事件
const inputComplete = () => {
  if (inputValue.value) {
    inputBarIcon.value = LockClosed20Regular
  }
  if (inputValue.value.indexOf('http://') > -1 || inputValue.value.indexOf('https://') > -1) {
    historyData.push(inputValue.value)
    step.value++
    edgeUrl.value = inputValue.value
    return
  }
  if (inputValue.value.indexOf('www.') > -1 || inputValue.value.indexOf('.co') > -1) {
    edgeUrl.value = inputValue.value = `https://${inputValue.value}`
    historyData.push(inputValue.value)
    step.value++
    return
  }
  edgeUrl.value = inputValue.value = `https://cn.bing.com/search?q=${inputValue.value}`
  historyData.push(inputValue.value)
  step.value++
}
// 前进 / 后退 到底时按钮变灰
const leftGray = ref('#cccccc')
const rightGray = ref('#cccccc')
// 后退、前进、刷新按钮
const naviBtn = (flag: number) => {
  if (flag === -1 && step.value === 0)return

  if (flag === 1 && step.value > historyData.length - 1)return
  step.value += flag
  edgeUrl.value = historyData[step.value]
  inputValue.value = historyData[step.value]
}
// 监听 step 以控制箭头的颜色
watch(step,()=> {
  if(step.value===0){
    leftGray.value = '#cccccc'
    rightGray.value = '#000'
  }
  if(step.value ===historyData.length - 1 ){
    leftGray.value = '#000'
    rightGray.value = '#ccc'
  }
})
// 输入框正在输入时
const onInput = () => {
  inputBarIcon.value = Search20Regular
}
// 关闭应用
const closeApp = () => {
  bus.emit('appStatus',{name: 'Edge',show: false})
}
</script>

<style lang='scss' scoped>
@import "@/style/public";
.edge {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  .edgeTitle {
    width: 100%;
    height: 41px;
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
        font-size: 12px;
        color: #a24d4d;
        @include flex(flex-start, center);
        img {
          width: 16px;
          margin-right: 10px;
        }
      }
    }
    .titleRight {
      @include flex(flex-end, center);
      div {
        box-sizing: border-box;
        width: 41px;
        height: 41px;
        padding: 15px;
        img {
          width: 100%;
          filter: invert(100%);
          vertical-align: top;
        }
      }
      .beforeClose:hover {
        background-color: lightgray;
      }
      .close:hover {
        background-color: #f00;
      }
    }
  }
  .edgeNav {
    width: 100%;
    height: 38px;
    border-bottom: 1px solid #bfbfbf;
    @include flex(flex-start, center);
    .n-input {
      width: 80%;
      height: 80%;
      background-color: #ffffff;
      :deep(.n-input__input-el) {
        color: #000000;
        height: 100%;
        font-size: 12px;
      }
    }
  }
  .edgeBody {
    width: 100%;
    height: calc(100% - 41px - 39px);
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>