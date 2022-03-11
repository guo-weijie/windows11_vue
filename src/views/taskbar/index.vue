<template>
  <div class="taskbar">
    <!-- 开始菜单 -->
    <div class="start">123</div>
    <!-- 任务栏 -->
    <div class="task">
      <div class="time_noti">
        <div>{{ upTime }}</div>
        <div>{{ btmTime }}</div>
      </div>
    </div>

    <!-- 日历弹框 -->
    <div class="calendarBox">
      <NCalendar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { timeType } from '@/type'
import { Rstring } from '@/type/basic'
import { PropType, ref, watchEffect, onMounted } from 'vue';
import { NCalendar } from 'naive-ui';
// eslint-disable-next-line no-undef
const props = defineProps({
  currentTime: Object as PropType<timeType>
})
// 时间相关
const upTime: Rstring = ref('')
const btmTime: Rstring = ref('')
watchEffect(() => {
  upTime.value = `${props.currentTime?.hour}：${props.currentTime?.minute}`
  btmTime.value = `${props.currentTime?.year}/${props.currentTime?.month}/${props.currentTime?.day}`
})
// 把默认的 2022 三月 转换为 win -> 2022年3月
onMounted(()=>{
  const calendarTitle: Element|null = document.querySelector('.n-calendar-header__title')
  console.log(calendarTitle);
})

</script>

<style lang="scss" scoped>
@import "@/style/public";
.taskbar {
  // overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-areas: "left center right";
  align-items: center;
  position: relative;
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
  @include mini_font(11);
  .time_noti {
    padding: 7px 3px 7px 6px;
    &:hover {
      background-color: #f1f7fc;
      border-radius: 3px;
    }
  }
}

.calendarBox{
  position: absolute;
  right: 12px;
  top: -435px;
  width: 334px;
  height: 423px;
  background-color: #79848e;
  border-radius: 6px;
  box-shadow: 1px 1px 1px #79848e;
  .n-calendar{
    height: auto;
    :deep(.n-calendar-cell){
      border: none;
      border-radius: 50%;
      &:hover{
        background-color: rgba(45, 45, 48, .5);
        border-radius: 50%;
      }
      .n-calendar-date{
        justify-content: center;
        &__date{
          background-color: transparent;
        }
        &__day{
          display: none;
        }
      }
    }
  }
}
</style>