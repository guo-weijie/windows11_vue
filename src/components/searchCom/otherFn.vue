<template>
  <div class="otherFnBox">
    <n-icon size="80" color="#7e848c" :component="iconName"></n-icon>
    <div class="bigTitle">搜索 {{props.title}}</div>
    <div class="smallTitle">开始键入以搜索 {{props.title}}</div>
  </div>
</template>

<script lang='ts' setup>
import { NIcon } from 'naive-ui'
import { GlobeSearch20Regular, Document20Regular, Mail20Regular, People20Regular, Settings20Regular, Video20Regular, Folder20Regular, MusicNote220Regular, Image20Regular } from '@vicons/fluent'
import { defineProps,watchEffect, shallowRef } from 'vue'
const props = defineProps({
  title: String
})

const iconName = shallowRef(GlobeSearch20Regular)

watchEffect(()=>{
  switch(props.title){
    case '文档':
      iconName.value = Document20Regular
      break
    case '网页':
      iconName.value = GlobeSearch20Regular
      break
    case '电子邮件':
      iconName.value = Mail20Regular
      break
    case '人员':
      iconName.value = People20Regular
      break
    case '设置':
      iconName.value = Settings20Regular
      break
    case '视频':
      iconName.value = Video20Regular
      break
    case '文件夹':
      iconName.value = Folder20Regular
      break
    case '音乐':
      iconName.value = MusicNote220Regular
      break
    default:
      iconName.value = Image20Regular
  }
})

</script>

<style lang='scss' scoped>
@import "@/style/public";
.otherFnBox {
  width: 100%;
  height: 100%;
  @include flex(center, center, column);
}
.n-icon {
  margin-bottom: 40px;
}
.bigTitle {
  font-size: 28px;
  font-weight: bold;
  color: #181a1b;
  margin-bottom: 20px;
}
.smallTitle {
  font-size: 12px;
  color: #181a1b;
}
</style>