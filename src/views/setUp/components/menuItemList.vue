<template>
  <div class="menuItemList">
    <div v-for="(item, index) in props.menuItemListData" :key="item + index" class="listContainer">
      <div class="listTitle" v-if="item.title">{{ item.title }}</div>
      <div class="listContent" v-for="iten in item.itemList" :key="iten.name">
        <div class="contentList">
          <span class="fontIcon">{{ iten.url }}</span>
          <div>
            <div class="contentTitle">{{ iten.name }}</div>
            <div class="contentDesc">{{ iten.desc }}</div>
          </div>
        </div>
        <n-icon color="#484848">
          <ChevronRight20Regular />
        </n-icon>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { NIcon } from 'naive-ui'
import { ChevronRight20Regular } from '@vicons/fluent'

// eslint-disable-next-line no-undef
const props = defineProps({
  menuItemListData: Array
})

</script>

<style lang='scss' scoped>
@import "@/style/public";
@font-face {
  font-family: SettingsIcons;
  src: url("@/assets/SettingsIcons.woff2") format("woff2");
}
.menuItemList {
  width: calc(100% - 4px);
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 2px;
    height: 303px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7c7e86;
    border-radius: 1px;
  }
  .listContainer{
    padding-bottom: 40px;
    .listTitle{
      font-size: 14px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 10px;
    }
  }
  .listContent {
    max-width: 1000px;
    height: 67px;
    background-color: #fafcfd;
    margin-bottom: 3px;
    border: 1px solid #e0e6ea;
    border-radius: 5px;
    @include flex(space-between, center);
    &:hover {
      background-color: #f4f7f9;
    }
    .n-icon{
      margin-right: 20px;
    }
    .contentList{
      @include flex(flex-start, center);
    }
    .contentTitle{
      font-size: 12px;
      color: #1b1b1b;
      font-weight: bold;
    }
    .contentDesc{
      font-size: 12px;
      color: #757575;
    }
  }
}
.fontIcon {
  font-family: SettingsIcons;
  font-size: 20px;
  color: #1b1b1b;
  margin-left: 18px;
  margin-right: 20px;
}
</style>