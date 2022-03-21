<template>
  <div class="taskbar">
    <div class="taskbarBox" @click.stop="taskbarEvent">
      <!-- 开始菜单 -->
      <div class="start">123</div>
      <!-- 任务栏右侧 -->
      <div class="task">
        <!-- 隐藏的图标 -->
        <div class="hideIcon" @click="changeHideIcon">
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

    <!-- 日历 -->
    <div class="calendarBox" ref="calendarBox">
      <MyCalendar />
    </div>
    <!-- 控制中心 -->
    <div class="controlCenterBox" ref="controlCenter">
      <ControlCenter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { timeType } from '@/type'
import { Rstring } from '@/type/basic'
import { PropType, ref, watchEffect, reactive } from 'vue';
import MyCalendar from '@/components/myCalendar/index.vue'
import ControlCenter from './components/controlCenter.vue'
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

}
// 隐藏图标相关
const hideIcon: Rstring = ref('up')
const changeHideIcon = () => hideIcon.value = hideIcon.value === 'up' ? 'down' : 'up'
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
  grid-area: center;
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
  // right: -500px;
  right: 12px;
}
</style>