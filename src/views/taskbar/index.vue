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
  </div>
</template>

<script lang="ts" setup>
import { timeType } from '@/type'
import { Rstring } from '@/type/basic'
import { PropType, ref, watchEffect } from 'vue';
// eslint-disable-next-line no-undef
const props = defineProps({
  currentTime: Object as PropType<timeType>
})
const upTime: Rstring = ref('')
const btmTime: Rstring = ref('')
watchEffect(() => {
  upTime.value = `${props.currentTime?.hour}：${props.currentTime?.minute}`
  btmTime.value = `${props.currentTime?.year}/${props.currentTime?.month}/${props.currentTime?.day}`
})
</script>

<style lang="scss" scoped>
@import "@/style/public";
.taskbar {
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-areas: "left center right";
  align-items: center;
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
</style>