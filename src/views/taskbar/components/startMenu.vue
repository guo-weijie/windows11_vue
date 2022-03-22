<template>
  <div class="menuSearch">
    <!-- 搜索框：点击跳转搜索 -->
    <div class="searchBox">
      <img :src="require('@/assets/icon/systemIcon/search.png')" alt="搜索" />
      在此键入以搜索
    </div>
  </div>
  <!-- 开始菜单主体 -->
  <div class="menuBody">
    <div class="bodyTitle">
      <div class="titleLeft">{{ isAllApps ? '所有应用' : '已固定' }}</div>
      <div class="titleRight" @click="isAllApps = !isAllApps">
        <n-icon v-show="isAllApps">
          <ChevronLeft16Regular />
        </n-icon>
        <span>{{ isAllApps ? '返回' : '所有应用' }}</span>
        <n-icon v-show="!isAllApps">
          <ChevronRight16Regular />
        </n-icon>
      </div>
    </div>
    <div class="bodyContainer">
      <div class="containerPinned" ref="containerPinned">
        <div class="pinnedAppBox">
          <div class="pinnedList" v-for="item in pinnedList" :key="item.name">
            <img :src="item.url" :alt="item.name" />
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="pinnedRecommend">推荐的项目</div>
        <div class="recommendList">
          <div class="listItem">
            <img :src="require('@/assets/icon/appIcon/snip.png')" alt="截图工具" />
            <div class="itemDesc">
              <div>截图工具</div>
              <span>最近添加</span>
            </div>
          </div>
          <div class="listItem">
            <img :src="require('@/assets/icon/appIcon/getstarted.png')" alt="欢迎使用 Windows" />
            <div class="itemDesc">
              <div>入门</div>
              <span>欢迎使用 Windows</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 底部用户头像和电源按钮 -->
  <div class="menuFooter">
    <div class="footerUser">
      <img :src="require('@/assets/icon/avatar.png')" alt="ghosie的头像" />
      <span :title="store.state.userName">{{ store.state.userName }}</span>
    </div>
    <div class="footerBattery">
      <div class="batterySet" title="设置">
        <n-icon size="19px">
          <Settings20Regular />
        </n-icon>
      </div>
      <n-popover trigger="click" :show-arrow="false" class="myPopover">
        <template #trigger>
          <n-icon size="19px" title="电源">
            <Power24Regular />
          </n-icon>
        </template>
        <div class="poperBody">
          <div @click="powerEvent('睡眠')">
            <n-icon size="20px">
              <WeatherMoon48Regular />
            </n-icon>
            <span>睡眠</span>
          </div>
          <div @click="powerEvent('关机')">
            <n-icon size="20px">
              <Power24Regular />
            </n-icon>
            <span>关机</span>
          </div>
          <div @click="powerEvent('重启')">
            <n-icon size="20px">
              <ArrowCounterclockwise28Regular />
            </n-icon>
            <span>重启</span>
          </div>
        </div>
      </n-popover>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, useAttrs, computed } from 'vue'
import { NPopover, NIcon } from 'naive-ui'
import { Settings20Regular, Power24Regular, WeatherMoon48Regular, ArrowCounterclockwise28Regular, ChevronRight16Regular, ChevronLeft16Regular } from '@vicons/fluent'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { allAppType, allAppItem } from '@/type'
const store = useStore()
const router = useRouter()
const powerEvent = (val: string) => {
  if (val === '关机') {
    console.log('会加的，再等等')
    return
  }
  if (val === '睡眠') {
    router.push('login')
    return
  }
  if (val === '重启') {
    console.log('会加的，再等等')
    return
  }
}
const isAllApps = ref(false)
// 所有应用和已固定处理
const containerPinned = ref()
// 获取固定应用列表
const attrs = useAttrs()
const pinnedList = computed((): allAppType => attrs.allAppList.filter((item: allAppItem) => item.isPinned))
</script>

<style lang='scss' scoped>
@import "@/style/public";
$bg: #e0e7fa;
$color: #18191b;
@mixin bgHover {
  border-radius: 5px;
  background-color: inherit;
  transition: background-color 300ms;
  &:hover {
    background-color: #f6fbfe;
  }
}
.menuSearch {
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  padding: 32px 32px 0;
  background-color: $bg;
  .searchBox {
    height: 100%;
    background-color: #ffffff;
    box-shadow: inset 0 -4px 0 -2px #0067c0;
    border-radius: 4px;
    font-size: 12px;
    color: #616161;
    @include flex(flex-start, center);
    img {
      height: 14px;
      margin-left: 16px;
      margin-right: 13px;
    }
  }
}
.menuBody {
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 70px - 64px);
  padding: 20px 32px 0;
  background-color: $bg;
  .bodyTitle {
    width: 100%;
    height: 48px;
    @include flex(space-between, center);
    .titleLeft {
      width: 96px;
      font-size: 13px;
      text-align: center;
      color: $color;
      font-weight: bold;
    }
    .titleRight {
      padding: 5px 8px 6px 7px;
      background-color: #f6f8fe;
      border: 1px solid #bec5d3;
      border-radius: 5px;
      margin-right: 32px;
      @include flex(center, center);
      span {
        margin: 0 13px;
        @include mini_font(11);
      }
    }
  }
  .bodyContainer {
    width: 100%;
    height: calc(100% - 48px);
    position: relative;
  }
}
.menuFooter {
  box-sizing: border-box;
  width: 100%;
  height: 63px;
  padding: 0 52px;
  background-color: #d7e3fa;
  border-top: 1px solid #afb8c5;
  @include flex(space-between, center);
  .footerUser {
    height: 40px;
    line-height: 40px;
    color: $color;
    padding-left: 12px;
    padding-right: 12px;
    @include bgHover;
    img {
      width: 32px;
      vertical-align: middle;
      border-radius: 50%;
      margin-right: 12px;
    }
    span {
      font-size: 12px;
    }
  }
  .footerBattery {
    @include flex(flex-end, center);
    .batterySet {
      width: 40px;
      height: 40px;
      @include flex(center, center);
      @include bgHover;
    }
    .n-icon {
      @extend .batterySet;
    }
  }
}
@at-root .poperBody {
  color: $color;
  > div {
    @include flex(center, center);
    user-select: none;
    &:nth-of-type(2) {
      margin: 14px 0;
    }
  }
  span {
    font-size: 12px;
    margin-left: 12px;
    margin-right: 12px;
  }
}

// 开始菜单主体
.containerPinned {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .pinnedAppBox {
    width: 100%;
    height: 84px;
    @include grid(6, 1);
    margin-bottom: 200px;
  }
  .pinnedList {
    width: 100%;
    height: 100%;
    @include flex(center, center, column);
    @include bgHover;
    img {
      width: 32px;
      margin-bottom: 9px;
    }
    span {
      font-size: 12px;
      color: $color;
    }
  }
  .pinnedRecommend {
    font-size: 13px;
    color: $color;
    font-weight: bold;
    padding-left: 32px;
    margin-bottom: 20px;
  }
  .recommendList {
    height: 56px;
    padding-left: 32px;
    @include grid(2, 1);
    justify-items: left;
    .listItem {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 18px 0;
      @include flex(flex-start, center);
      @include bgHover;
      img {
        height: 30px;
        margin-right: 12px;
      }
      .itemDesc {
        font-size: 12px;
        div {
          color: $color;
          margin-bottom: 3px;
        }
        span {
          color: #717171;
          font-size: 12px;
        }
      }
    }
  }
}
</style>