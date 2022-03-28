<template>
  <div class="taskbar">
    <div class="taskbarBox" @click.stop="taskbarEvent">
      <!-- 开始菜单 -->
      <div class="start">
        <div
          v-for="item in startupAppList"
          :key="item.name"
          @click.stop="clickTaskbarIcon(item)"
        >
          <img :src="item.url" alt="item.name" v-click-animal />
          <i :class="{ underLine: true, fullLine: item.open && !item.mini, shortLine: item.open && item.mini }"></i>
        </div>
      </div>
      <!-- 任务栏右侧 -->
      <div class="task">
        <!-- 隐藏的图标 -->
        <div class="hideIcon" @click.stop="changeBoxStatus('hideIcon')">
          <n-icon size="22">
            <KeyboardArrowUpTwotone v-show="hideIcon === 'up'" />
            <KeyboardArrowDownTwotone v-show="hideIcon === 'down'" />
          </n-icon>
        </div>
        <!-- 语言 -->
        <div class="language" @click="changeLanguage">{{ lang }}</div>
        <!-- 控制中心 -->
        <div
          id="controlCenter"
          class="controlCenter"
          @click.stop="changeBoxStatus('controlCneter')"
        >
          <img class="centerWifi" :src="controlCenterIcon.wifi" alt="网络连接" />
          <img class="centerAudio" :src="controlCenterIcon.audio" alt="音量" />
        </div>
        <!-- 时间 -->
        <div class="time_noti" id="time_noti" @click.stop="changeBoxStatus('calendar')">
          <div>{{ upTime }}</div>
          <div>{{ btmTime }}</div>
        </div>
      </div>
    </div>

    <!-- 开始菜单 -->
    <div class="startMenu center" ref="startMenuR">
      <StartMenu v-bind="$attrs" />
    </div>
    <!-- 日历 -->
    <div class="calendarBox" ref="calendarBox">
      <MyCalendar />
    </div>
    <!-- 控制中心 -->
    <div class="controlCenterBox" ref="controlCenter">
      <ControlCenter />
    </div>
    <!-- 隐藏的图标 -->
    <div class="hideIconBox" ref="hideIconBox">
      <div class="iconBoxItem">
        <img
          :src="require('@/assets/icon/appIcon/security.png')"
          alt="microsoft defender"
          title="Windows 安全中心 - 不需要执行操作"
        />
      </div>
      <div class="iconBoxItem">
        <img
          :src="require('@/assets/icon/appIcon/oneDrive.png')"
          alt="microsoft oneDrive"
          title="oneDrive 最新"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { timeType } from '@/type'
import { Rstring } from '@/type/basic'
import { PropType, ref, watchEffect, reactive } from 'vue';
import MyCalendar from '@/components/myCalendar/index.vue'
import ControlCenter from './components/controlCenter.vue'
import StartMenu from './components/startMenu.vue'
import { KeyboardArrowUpTwotone, KeyboardArrowDownTwotone } from '@vicons/material'
import { NIcon } from 'naive-ui'
import bus from '@/utils/bus'
// eslint-disable-next-line no-undef
const props = defineProps({
  currentTime: Object as PropType<timeType>
})
// 任务栏点击事件
//  -> 每一个具体的功能按钮都阻止事件冒泡传播，所以能触发事件的点击动作都是点击任务栏其余部分，此时直接执行弹窗关闭操作即可
const taskbarEvent = () => {
  bus.emit('claseTaskbarAll')
}
// 关闭所有任务栏弹窗
bus.on('claseTaskbarAll', () => {
  // 关闭事件弹窗
  calendarBox.value.style.right = '-500px'
  controlCenter.value.style.right = '-500px'
  hideIcon.value = 'up'
  hideIconBox.value.style.height = '0'
  startMenuR.value.style.height = '0'
})
// 任务栏弹窗状态更改
//  -> 此处如果把 DOM 放在一个对象里遍历的话代码耦合度会降低，但是如何将 DOM 放在一个对象里？
const changeBoxStatus = (val: string) => {
  let boxDom
  if (val === 'calendar') {
    boxDom = calendarBox.value.style
    if (parseInt(boxDom.right) > 0) {
      boxDom.right = '-500px'
    } else {
      boxDom.right = '12px'
    }
  } else {
    calendarBox.value.style.right = '-500px'
  }
  if (val === 'controlCneter') {
    boxDom = controlCenter.value.style
    if (parseInt(boxDom.right) > 0) {
      boxDom.right = '-500px'
    } else {
      boxDom.right = '12px'
    }
  } else {
    controlCenter.value.style.right = '-500px'
  }
  if (val === 'hideIcon') {
    boxDom = hideIconBox.value.style
    if (boxDom.height === 'auto') {
      hideIcon.value = 'up'
      boxDom.height = '0px'
    } else {
      boxDom.height = 'auto'
      hideIcon.value = 'down'
    }
  } else {
    hideIconBox.value.style.height = '0px'
  }
}
// 开始菜单---------------------------------
interface appListType {
  name: string,
  url: string,
  open?:boolean,
  mini?:boolean
}
// 相关DOM
const startMenuR = ref()
// 任务栏图标列表
const startupAppList:appListType[] = reactive([{
  name: 'startMenuR',
  url: require('@/assets/icon/appIcon/home.png')
}, {
  name: 'search',
  url: require('@/assets/icon/appIcon/search.png')
}, {
  name: 'widget',
  url: require('@/assets/icon/appIcon/widget.png')
}, {
  name: 'explorer',
  url: require('@/assets/icon/appIcon/explorer.png'),
  open: false, // 应用打开状态 打开 长线/关闭 无线
  mini: false // 应用窗口状态 是否 最小化 -> 短线
}, {
  name: 'edge',
  url: require('@/assets/icon/appIcon/edge.png'),
  open: false,
  underLine: false,
  mini: false
}, {
  name: 'store',
  url: require('@/assets/icon/appIcon/store.png'),
  open: false,
  underLine: false,
  mini: false
}])
// 图标点击动画
const vClickAnimal = {
  mounted(el: Element) {
    el.addEventListener('mousedown', () => {
      el.className = ' narrow'
    })
    el.addEventListener('click', () => {
      el.className = ' clickAniamtion'
    })
  }
}

// 任务栏右侧--------------------------------
// 隐藏图标相关
const hideIcon: Rstring = ref('up')
const hideIconBox = ref()
// 语言栏相关
const lang: Rstring = ref('中')
const changeLanguage = () => {
  lang.value = lang.value === '中' ? '英' : '中'
}
// 控制中心相关
const controlCenterIcon = reactive({
  wifi: require('@/assets/icon/systemIcon/wifi.png'),
  audio: require('@/assets/icon/systemIcon/audio.png')
})

// 右下角时间相关
const upTime: Rstring = ref('')
const btmTime: Rstring = ref('')
watchEffect(() => {
  upTime.value = `${props.currentTime?.hour}：${props.currentTime?.minute}`
  btmTime.value = `${props.currentTime?.year}/${props.currentTime?.month}/${props.currentTime?.day}`
})
// 获取任务栏弹窗DOM
const calendarBox = ref()
const controlCenter = ref()

// 图标下划线处理逻辑 ---------------------------------------------
// 点击任务栏图标
const clickTaskbarIcon = (data:appListType) => {
  startupAppList.forEach(item=>{
    if(item.name==='startMenuR'){
      if(item.name.toLowerCase()===data.name.toLowerCase()){
        startMenuR.value.style.height = parseInt(startMenuR.value.style.height)? '0' :'725px'
      }else{
        startMenuR.value.style.height = '0px'
      }
    }else{
      if(item.name.toLowerCase()===data.name.toLowerCase()){
        if(!item.open){ // open false 说明应用处于关闭状态
          const obj = {
            ...data,
            flag: 'open'
          }
          bus.emit('appStatus',obj)
          bus.emit('changeOpenStatus',obj)
        }else{
          if(item.mini){
            bus.emit('appStatus',{...data,flag:'open'})
            item.mini = false
          }else{
            bus.emit('appStatus',{...data,flag:'hide'})
            item.mini = true
          }
          // item.mini = !item.mini
        }
      }else{
        item.mini = true
      }
    }
  })
}
// 发布一个修改 open 的事件
bus.on('changeOpenStatus',data=>{
  startupAppList.forEach(item=>{
    if(item.name.toLowerCase()===data.name.toLowerCase()){
      if(data.flag==='open'){
        item.open = true
        item.mini = false
      }else if(data.flag ==='hide'){
        item.open = true
        item.mini = true
      }else{
        item.open = false
      }
      // item.open = data.flag==='close'?false:true
      // if(item.open){
      //   item.mini = false
      // }
    }
  })
})

</script>

<style lang="scss" scoped>
@import "@/style/public";

@mixin taskbarFnStyle {
  height: 80%;
  box-sizing: border-box;
  padding: 6px 6px 7px;
  &:hover {
    background-color: #f1f7fc;
    border-radius: 3px;
  }
}
.taskbar {
  // overflow: hidden;
  position: relative;
  &Box {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-areas: "left center right";
    align-items: center;
    position: absolute;
  }
}
.start {
  height: 100%;
  line-height: normal;
  grid-area: center;
  @include flex(center, center);
  div {
    position: relative;
    margin-right: 6px;
    @include taskbarFnStyle;
    transition: all 0.5s;
    &:hover {
      background: #fff;
    }
  }
  .underLine {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 0;
    height: 3px;
    border-radius: 1px;
  }
  .fullLine {
    width: 16px;
    background-color: #0078d4;
  }
  .shortLine {
    width: 6px;
    background-color: #7e848a;
  }
  img {
    height: 24px;
    vertical-align: middle;
  }
}
.task {
  height: 100%;
  grid-area: right;
  justify-self: end;
  padding-right: 1px;
  line-height: normal;
  text-align: right;
  @include flex(flex-end, center);
  .hideIcon {
    @include taskbarFnStyle;
    @include flex(center, center);
  }
  .language {
    @extend .hideIcon;
    font-size: 14px;
  }
  .controlCenter {
    @include taskbarFnStyle;
    @include flex(flex-end, center);
    .centerWifi {
      height: 16px;
      margin-right: 6px;
    }
    .centerAudio {
      height: 19px;
    }
  }
  .time_noti {
    @include taskbarFnStyle;
    @include flex(center, flex-end, column);
    @include mini_font(11.5);
  }
}

.calendarBox {
  @include icon;
  right: -500px;
}
.controlCenterBox {
  @include icon;
  right: -500px;
}
.hideIconBox {
  @include icon;
  @include box_border;
  max-width: 120px;
  height: 0px;
  right: 130px;
  background-color: #e3eef9;
  @include flex(flex-start, center);
  flex-wrap: wrap;
  .iconBoxItem {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    img {
      height: 16px;
      vertical-align: middle;
    }
  }
}

.startMenu {
  @include icon;
  @include box_border;
  width: 640px;
  height: 0px;
  transition: height 150ms ease-in;
}
.center {
  left: 50%;
  transform: translateX(-50%);
}
.left {
  left: 12px;
}

// 开始菜单按钮点击动画
.narrow {
  transition: all 200ms;
  transform: scale(0.8);
}
.clickAniamtion {
  animation: clickAniamtion 500ms ease-in-out;
}
@keyframes clickAniamtion {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
}
</style>