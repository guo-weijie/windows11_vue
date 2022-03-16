<template>
  <div class="taskbar">
    <div class="taskbarBox" @click.stop="taskbarEvent">
      <!-- 开始菜单 -->
      <div class="start">123</div>
      <!-- 任务栏右侧 -->
      <div class="task">
        <div class="time_noti" id="time_noti" @click.stop="changeCalendarBoxStatus">
          <div>{{ upTime }}</div>
          <div>{{ btmTime }}</div>
        </div>
      </div>
    </div>

    <!-- 日历弹框 -->
    <div class="calendarBox" ref="calendarBox">
      <MyCalendar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { timeType } from '@/type'
import { Rstring } from '@/type/basic'
import { PropType, ref, watchEffect } from 'vue';
import MyCalendar from '@/components/myCalendar/index.vue'
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
})
// 右下角时间相关
const upTime: Rstring = ref('')
const btmTime: Rstring = ref('')
watchEffect(() => {
  upTime.value = `${props.currentTime?.hour}：${props.currentTime?.minute}`
  btmTime.value = `${props.currentTime?.year}/${props.currentTime?.month}/${props.currentTime?.day}`
})
// 日历弹框相关
const calendarBox = ref()
const changeCalendarBoxStatus = () => {
  const calendarBoxDom = calendarBox.value.style
  if (parseInt(calendarBoxDom.right) > 0) {
    calendarBoxDom.right = '-500px'
  } else {
    calendarBoxDom.right = '12px'
  }
}

</script>

<style lang="scss" scoped>
@import "@/style/public";
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
  grid-area: right;
  justify-self: end;
  padding-right: 12px;
  line-height: normal;
  text-align: right;
  @include mini_font(11.5);
  .time_noti {
    padding: 7px 3px 7px 6px;
    &:hover {
      background-color: #f1f7fc;
      border-radius: 3px;
    }
  }
}

.calendarBox {
  position: absolute;
  right: -500px;
  bottom: 60px;
  transition: right 0.3s ease;
}
</style>