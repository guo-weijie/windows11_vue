<template>
  <div class="controlCneterContainer">
    <!-- 功能菜单 -->
    <div class="containerItem">
      <div :class="{ itemBox: true, itemBoxEdit: editOperate }" v-for="item in fnShowItem" :key="item.name">
        <div :class="{ boxIcon: true, selectItem: item.select && !item.menu }" @click="selectFn(item)">
          <img :src="item.icon" :alt="item.name" />
          <n-icon v-if="item.menu" size="16" style="margin-left: 8px;">
            <KeyboardArrowRightRound />
          </n-icon>
        </div>
        <p>{{ item.name }}</p>
        <!-- 取消固定按钮 -->
        <n-button circle secondary v-show="editOperate" @click="item.show = false">
          <template #icon>
            <n-icon size="16px" color="#696969">
              <CloseRound />
            </n-icon>
          </template>
        </n-button>
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
    <div :class="{ containerSet: true, editSet: !editOperate, completeAdd: editOperate }">
      <div v-show="!editOperate">
        <img class="setEdit" :src="require('@/assets/icon/systemIcon/edit.png')" alt="操作中心编辑" @click="editOperate = true"/>
        <img class="setSettings" :src="require('@/assets/icon/systemIcon/settings.png')" alt="操作中心设置"/>
      </div>
      <div v-show="editOperate">
        <n-button secondary color="#18191a" @click="editOperate = false">
          <template #icon>
            <n-icon>
              <CheckRound />
            </n-icon>
          </template>
          完成
        </n-button>
        <n-popover placement="top" trigger="click" :show-arrow="false" class="myPopover">
          <template #trigger>
            <n-button secondary color="#18191a">
              <template #icon>
                <n-icon>
                  <AddRound />
                </n-icon>
              </template>
              添加
            </n-button>
          </template>
          <div class="large-text">
            <div v-for="item in fnAddItem" :key="item.name + 'a'" @click="item.show = true">
              <img :src="item.icon" :alt="item.name" />
              <span>{{ item.name }}</span>
            </div>
          </div>
        </n-popover>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, computed, ref } from 'vue'
import { fnItemType, fnItemTypeCom, fnItemListType } from '@/type/index'
import { Rnumber, Rboolean } from '@/type/basic'
import { KeyboardArrowRightRound, CloseRound, AddRound, CheckRound } from '@vicons/material'
import { NIcon, NSlider, NButton, NPopover } from 'naive-ui'
const audioValue: Rnumber = ref(50)
// 不显示的数据，即添加按钮的选项
const fnAddItem: fnItemTypeCom = computed(() => fnAllItem.filter(item => !item.show))
// 固定显示的数据
const fnShowItem: fnItemTypeCom = computed(() => fnAllItem.filter(item => item.show))
// 暂无图标，以后找到了再补上
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
  show: false,
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
  show: false,
  select: false,
  menu: false
},])
// 点击功能菜单
const selectFn = (item: fnItemListType) => {
  if (editOperate.value) return
  item.select = !item.select
}

// 编辑操作状态
const editOperate: Rboolean = ref(false)

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
    border-top: 1px solid #d4dde8;
    background-color: #e2ecf9;
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
    img {
      filter: invert(100%);
    }
    &:hover {
      background-color: #0067c0;
    }
  }
  p {
    font-size: 11px;
    color: #181a1a;
    margin: 0;
  }
}

.itemBoxEdit {
  position: relative;
  .boxIcon {
    background-color: #e9eef8;
    &:hover {
      background-color: #e9eef8;
    }
    img {
      filter: invert(60%);
    }
    .n-icon {
      color: #bcc1c5;
    }
  }
  p {
    color: #91969f;
  }
  .n-button {
    position: absolute;
    top: -4px;
    right: -6px;
    width: auto;
    height: auto;
    background-color: #fff;
    // border-radius: 50%;
    text-align: center;
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
.editSet {
  padding-right: 16px;
  @include flex(flex-end, center);
  .setEdit {
    width: 16px;
    margin-right: 22px;
  }
  .setSettings {
    width: 18px;
    filter: invert(80%);
  }
}
.completeAdd {
  @include flex(center, center);
}

.n-popover {
  .large-text {
    color: #1a1a1b !important;
    user-select: none;
    & > div {
      padding: 4px 0;
    }
    img {
      width: 16px;
      height: 12px;
      margin-right: 12px;
    }
  }
}
</style>