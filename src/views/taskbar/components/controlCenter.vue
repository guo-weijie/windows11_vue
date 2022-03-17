<template>
  <div class="controlCneterContainer">
    <!-- 功能菜单 -->
    <div class="containerItem">
      <div class="itemBox" v-for="item in fnShowItem" :key="item.name">
        <div :class="{ boxIcon: true, selectItem: item.select && !item.menu }" @click="selectFn(item)">
          <img :src="item.icon" :alt="item.name" />
          <n-icon v-if="item.menu" size="16" style="margin-left: 8px;">
            <KeyboardArrowRightRound />
          </n-icon>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <!-- 音量调节 -->
    <div class="audioControl">
      <img :src="require('@/assets/icon/systemIcon/audio.png')" alt="音量" />
      <div class="controlSlider">
        <n-slider v-model:value="audioValue" />
      </div>
      <n-icon size="26">
        <KeyboardArrowRightRound />
      </n-icon>
    </div>
    <div class="containerSet">
      <img class="setEdit" :src="require('@/assets/icon/systemIcon/edit.png')" alt="操作中心编辑" />
      <img class="setSettings" :src="require('@/assets/icon/systemIcon/settings.png')" alt="操作中心设置" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, computed, ref } from 'vue'
import { fnItemType, fnItemTypeCom, fnItemListType } from '@/type/index'
import { Rnumber } from '@/type/basic'
import { KeyboardArrowRightRound } from '@vicons/material'
import { NIcon, NSlider } from 'naive-ui'
const audioValue: Rnumber = ref(50)
const fnShowItem: fnItemTypeCom = computed(() => fnAllItem.filter(item => item.show))
const fnAllItem: fnItemType = reactive([{
  name: '夜间模式',
  icon: require('@/assets/icon/systemIcon/nightlight.png'),
  show: true,
  select: false,
  menu: false
}, {
  name: '专注助手',
  icon: require('@/assets/icon/systemIcon/moon.png'),
  show: true,
  select: false,
  menu: false
}, {
  name: '辅助功能',
  icon: require('@/assets/icon/systemIcon/nightlight.png'),
  show: true,
  select: false,
  menu: true
}, {
  name: '投放',
  icon: require('@/assets/icon/systemIcon/nightlight.png'),
  show: true,
  select: false,
  menu: false
}, {
  name: '键盘布局',
  icon: require('@/assets/icon/systemIcon/keyboard.png'),
  show: true,
  select: false,
  menu: true
}, {
  name: '投影',
  icon: require('@/assets/icon/systemIcon/nightlight.png'),
  show: true,
  select: false,
  menu: false
},])
// 点击功能菜单
const selectFn = (item: fnItemListType) => {
  item.select = !item.select
}

</script>

<style lang='scss' scoped>
@import "@/style/public";
.controlCneterContainer {
  width: 358px;
  @include box_border;

  .containerItem {
    box-sizing: border-box;
    padding: 22px 24px;
    background-color: #e9f2fa;
    @include flex(flex-start, flex-start);
    flex-wrap: wrap;
    align-content: flex-start;
    div:nth-child(3n-1) {
      margin: 0 14px;
      .boxIcon {
        box-shadow: 0 0 2px #ced1d4;
      }
    }
  }
  .audioControl {
    box-sizing: border-box;
    padding: 0 24px 22px 24px;
    background-color: #e9f2fa;
  }
  .containerSet {
    box-sizing: border-box;
    height: 47px;
    padding-right: 16px;
    border-top: 1px solid #d4dde8;
    background-color: #e2ecf9;
    @include flex(flex-end, center);
  }
}
.itemBox {
  margin-bottom: 26px;
  text-align: center;
  .boxIcon {
    width: 94px;
    height: 46px;
    background-color: #f6f9fd;
    border-radius: 4px;
    box-shadow: 1px 1px 2px #ced1d4;
    overflow: hidden;
    margin-bottom: 12px;
    @include flex(center, center);
    &:hover {
      background-color: #f1f5fa;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  .selectItem {
    background-color: #0067c0;
    img{
      filter: invert(100%);
    }
    &:hover{
      background-color: #0067c0;
    }
  }
  p {
    font-size: 11px;
    color: #181a1a;
    margin: 0;
  }
}
.audioControl {
  @include flex(space-between, center);
  img {
    height: 20px;
  }
  .controlSlider {
    width: 260px;
    margin-left: 10px;
    margin-right: 4px;
  }
  :deep(.n-slider-rail) {
    background-color: #81868a;
    .n-slider-handle {
      background: {
        image: url("@/assets/icon/systemIcon/point.png");
        repeat: no-repeat;
        position: center;
        size: 100%;
      }
    }
    .n-slider-rail__fill {
      background-color: #0067c0 !important;
    }
  }
}
.containerSet {
  .setEdit {
    width: 16px;
    margin-right: 22px;
  }
  .setSettings {
    width: 18px;
    filter: invert(80%);
  }
}
</style>