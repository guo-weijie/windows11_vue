<template>
  <div class="menuItemList">
    <!-- 系统 -->
    <div class="system" v-show="(props.menuItemListData as Record<string, any>).name==='系统'">
      <div class="systemLeft">
        <img :src="require('@/assets/wallpaper'+store.state.backgroundImgUrl)" alt="windows11 背景图片">
        <div>
          <div class="first">Windows 11</div>
          <div class="second">My PC</div>
          <div class="rename">重命名</div>
        </div>
      </div>
      <div class="systemRight" @click="toItem('Windows 更新', 10)">
        <img :src="require('@/assets/icon/systemIcon/Windows Update.webp')" alt="windows 更新">
        <div>
          <div class="update">Windows 更新</div>
          <div class="lastTimeUpdate">上次检查时间：2 小时前</div>
        </div>
      </div>
    </div>

    <!-- 网络和 Internet -->
    <div class="network">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- 个性化 -->
    <div class="personalize">
      <div></div>
      <div>
        <div></div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <!-- 账户 -->
    <div>
      <img src="" alt="">
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

    <!-- windows 更新 -->
    <div class="update">
      <div>
        <div></div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div></div>
    </div>

    <div v-for="(item, index) in (props.menuItemListData as Record<string, any>).children" :key="item + index" class="listContainer">
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

    <!-- windows 更新 -->
    <div>
      获取帮助
    </div>
  </div>
</template>

<script lang='ts' setup>
import { NIcon } from 'naive-ui'
import { ChevronRight20Regular } from '@vicons/fluent'
import { useStore } from 'vuex';

// 处理系统右侧顶栏左侧图片问题 -> 需要与桌面背景图片保持一致
const store = useStore()

const props = defineProps({
  menuItemListData: Object
})
const emit = defineEmits(['changeItem'])

const toItem = (name:string,num: number) => {
  emit('changeItem', name,num)
}

</script>

<style lang='scss' scoped>
@import "@/style/public";
@font-face {
  font-family: SettingsIcons;
  src: url("@/assets/SettingsIcons.woff2") format("woff2");
}
.menuItemList {
  width: calc(100% - 4px);
  // height: 100%;
  height: calc(100% - 70px);
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

.system{
  max-width: 1000px;
  height: 68px;
  margin-bottom: 26px;
  @include flex(space-between,center);
  .systemLeft{
    @include flex(flex-start,flex-end);
    img{
      width: 112px;
      height: 60px;
      border: 4px solid #000000;
      border-radius: 5px;
      margin-right: 16px;
    }
    .first{
      color: #1a1a1a;
      font-weight: bold;
      font-size: 12px;
    }
    .second{
      color: #565656;
      font-size: 13px;
    }
    .rename{
      color: #003e92;
      font-size: 14px;
    }
  }
  .systemRight{
    @include flex(flex-end,center);
    img{
      width: 20px;
      height: 20px;
      margin-right: 16px;
    }
    .update{
      font-weight: bold;
      font-size: 14px;
      color: #101010;
    }
    .lastTimeUpdate{
      font-size: 12px;
      color: #616161;
    }
  }
}
</style>