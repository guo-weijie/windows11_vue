<template>
  <div class="taskbar">
    <div class="taskbarBox" @click.stop="taskbarEvent">
      <!-- 任务栏左侧 -->
      <div class="taskBarLeft">
        <!-- 无下划线应用 -->
        <div v-for="item in noUnderLineApp" :key="item.name" @click.stop="taskBarLeftNoLine(item,'clear')">
          <img :src="item.url" alt="item.name" v-click-animal />
        </div>
        <!-- 有下划线应用 -->
        <div v-for="item in underLineApp" :key="item.name" @click.stop="taskBarLeftHaveLine(item)">
          <img :src="item.url" alt="item.name" v-click-animal />
          <i class="underLine" :class="{ fullLine: item.open, shortLine: item.mini }"></i>
        </div>
      </div>
      <!-- 任务栏右侧 -->
      <div class="taskRight">
        <!-- 隐藏的图标 -->
        <div class="hideIcon" @click.stop="taskBarRight('hideIcon','clear')">
          <n-icon size="22">
            <KeyboardArrowUpTwotone v-show="hideIcon === 'up'" />
            <KeyboardArrowDownTwotone v-show="hideIcon === 'down'" />
          </n-icon>
        </div>
        <!-- 语言 -->
        <div class="language" @click.stop="taskBarRight('language','clear')">{{ lang }}</div>
        <!-- 控制中心 -->
        <div class="controlCenter" @click.stop="taskBarRight('controlCenter','clear')">
          <img class="centerWifi" :src="controlCenterIcon.wifi" alt="网络连接" />
          <img class="centerAudio" :src="controlCenterIcon.audio" alt="音量" />
        </div>
        <!-- 时间 -->
        <div class="time_noti" @click.stop="taskBarRight('calendar','clear')">
          <div>{{ upTime }}</div>
          <div>{{ btmTime }}</div>
        </div>
      </div>
    </div>

    <!-- 开始菜单 -->
    <div class="startMenu center" :class="{startMenuHeight:openStart}">
      <StartMenu @pleaseOpenSearch = "taskBarLeftNoLine({name:'search', open:flase})" />
    </div>
    <!-- 搜索 -->
    <div class="search center" :class="{searchHeight:openSearch}">
      <Search />
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
import { PropType, ref, watchEffect, reactive, computed } from 'vue';
import MyCalendar from '@/components/myCalendar/index.vue'
import ControlCenter from './components/controlCenter.vue'
import StartMenu from './components/startMenu.vue'
import Search from './components/search.vue'
import { KeyboardArrowUpTwotone, KeyboardArrowDownTwotone } from '@vicons/material'
import { NIcon } from 'naive-ui'
import store from '@/store'
import bus from '@/utils/bus'
import { String } from 'lodash';

const props = defineProps({
  currentTime: Object as PropType<timeType>
})

/**
 * 抛出一个事件：关闭所有任务栏的弹框
 */
// 任务栏点击事件
//  -> 每一个具体的功能按钮都阻止事件冒泡传播，所以能触发事件的点击动作都是点击任务栏其余部分，此时直接执行弹窗关闭操作即可
const taskbarEvent = () => {
  taskBarLeftNoLine()
  taskBarRight()
}
bus.on('closeTaskbar', ()=>{
  taskbarEvent()
})

/**
 * 任务栏左侧
 */
// 无下划线应用 -> 开始按钮，搜索按钮，小组件
const noUnderLineApp = reactive([{
  name: 'start',
  url: require('@/assets/icon/appIcon/home.png'),
  open: false
}, {
  name: 'search',
  url: require('@/assets/icon/appIcon/search.png'),
  open: false
}, {
  name: 'widget',
  url: require('@/assets/icon/appIcon/widget.png'),
  open: false
}])

const openStart = computed(()=>noUnderLineApp[0].open)
const openSearch = computed(()=>noUnderLineApp[1].open)

// 无下划线应用点击事件
const taskBarLeftNoLine=(value?: { name: string; } | undefined,clear?:string)=>{
  if(clear){
    taskBarRight()
  }
  noUnderLineApp.forEach(item=>{
    if(item.name===value?.name){
      item.open = !item.open
    }else{
      item.open = false
    }
  })
}
// 有下划线应用 -> 包括常驻和打开时驻留的
const underLineApp = computed(()=>store.getters.app.filter((item: { isTaskBar: any; })=>item.isTaskBar))
// 有下划线应用点击事件
const taskBarLeftHaveLine = (value: { name: string; }) => {
  taskbarEvent()
  /**
   * 应用为打开状态时，若
   *  mini: true, hidden: true -> 应用为最小化状态，应处理为：
   *  mini: false, hidden: false；若
   *  mini: 
   * 
   * 
   */
  underLineApp.value.forEach((item: { name: string; open: boolean; mini: boolean; hidden: boolean; isTop: boolean; })=>{
    if(item.name===value?.name){
      if(item.open){
        if(item.isTop){
          store.dispatch('changeAppStatus',{
            name: item.name,
            key: 'hidden',
            value: true
          })
          store.dispatch('changeAppStatus',{
            name: item.name,
            key: 'mini',
            value: true
          })
        }else{
          if(!item.hidden){
            store.dispatch('changeAppStatus',{
              name: item.name,
              key: 'mini',
              value: false
            })
            bus.emit(value.name)
          }else{
            store.dispatch('changeAppStatus',{
              name: item.name,
              key: 'hidden',
              value: false
            })
            store.dispatch('changeAppStatus',{
              name: item.name,
              key: 'mini',
              value: false
            })
            bus.emit(value.name)
          }
        }
      }else{
        store.dispatch('changeAppStatus',{
          name: item.name,
          key: 'open',
          value: true
        })
        bus.emit(value.name)
      }

      // if(item.open){

      //   if(!item.mini&&!item.hidden){
      //     if(item.isTop){
      //       store.dispatch('changeAppStatus',{
      //         name: item.name,
      //         key: 'hidden',
      //         value: true
      //       })
      //       store.dispatch('changeAppStatus',{
      //         name: item.name,
      //         key: 'mini',
      //         value: true
      //       })
      //     }
      //   }else{
      //     if(item.isTop){
      //       store.dispatch('changeAppStatus',{
      //         name: item.name,
      //         key: 'hidden',
      //         value: false
      //       })
      //       store.dispatch('changeAppStatus',{
      //         name: item.name,
      //         key: 'mini',
      //         value: false
      //       })
      //     }
      //   }
      // }else{
      //   store.dispatch('changeAppStatus',{
      //     name: item.name,
      //     key: 'open',
      //     value: true
      //   })
      // }
    }else{
      if(item.open && !item.mini){
        store.dispatch('changeAppStatus',{
          name: item.name,
          key: 'mini',
          value: true
        })
      }
    }
  })
}
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

/**
 * 任务栏右侧
 */
// 任务栏右侧弹窗DOM & 值
const calendarBox = ref()
const controlCenter = ref()
const hideIconBox = ref()
const hideIcon: Rstring = ref('up')
const lang: Rstring = ref('中')
// 任务栏弹窗状态更改
const taskBarRight = (id?:string,clear?:string) => {
  if(clear){
    taskBarLeftNoLine()
  }
  let boxDom
  if (id === 'calendar') {
    boxDom = calendarBox.value.style
    if (parseInt(boxDom.right) > 0) {
      boxDom.right = '-500px'
    } else {
      boxDom.right = '12px'
    }
  } else {
    calendarBox.value.style.right = '-500px'
  }
  if (id === 'controlCenter') {
    boxDom = controlCenter.value.style
    if (parseInt(boxDom.right) > 0) {
      boxDom.right = '-500px'
    } else {
      boxDom.right = '12px'
    }
  } else {
    controlCenter.value.style.right = '-500px'
  }
  if (id === 'hideIcon') {
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
  if(id==='language'){
    lang.value = lang.value === '中' ? '英' : '中'
  }
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
  z-index: 9999;
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
.taskBarLeft {
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
.taskRight {
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
  height: 0;
  transition: height 150ms ease-in;
}
.startMenuHeight {
  height: 725px;
}
.search{
  @include icon;
  @include box_border;
  width: 774px;
  height: 0;
  transition: height 150ms ease-in;
}
.searchHeight{
  height: 724px;
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