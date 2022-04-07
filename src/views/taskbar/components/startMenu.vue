<template>
  <div class="menuSearch">
    <!-- 搜索框：点击跳转搜索 -->
    <div class="searchBox" @click.stop="openSearch">
      <img :src="require('@/assets/icon/systemIcon/search.png')" alt="搜索" />
      在此键入以搜索
    </div>
  </div>
  <!-- 开始菜单主体 -->
  <div class="menuBody">
    <div class="bodyTitle">
      <div class="titleLeft">{{ isAllApps ? '所有应用' : '已固定' }}</div>
      <div class="titleRight" @click.stop="changeMenuBodyStatus">
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
          <div
            class="pinnedList"
            v-for="item in pinnedList"
            :key="item.name"
            @click.stop="pinnedOpenApp(item)"
          >
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
      <!-- 所有应用 -->
      <div class="containerAllApp" ref="containerAllApp">
        <!-- 列表 -->
        <transition name="fade">
          <div v-show="!selectLetter" class="appItemBody" ref="appItemBody">
            <div v-for="item in allAppList_sorted" :key="item.id" :id="item.id">
              <div
                class="itemBodyPublic itemBodyIndex"
                @click.stop="selectLetter = true"
              >{{ item.id.toUpperCase() }}</div>
              <div
                v-for="appList in item.list"
                :key="appList.name"
                class="itemBodyPublic itemBodyBox"
                @click.stop="pinnedOpenApp(appList)"
              >
                <img :src="appList.url" alt="appList.name" />
                <span>{{ appList.name }}</span>
              </div>
            </div>
          </div>
        </transition>
        <!-- 首字母选择 -->
        <transition name="fade">
          <div v-show="selectLetter" class="appItemLetter">
            <div class="itemLetterBox">
              <div
                v-for="item in letterData"
                :key="item.id + 'l'"
                :class="{ isFlag: item.flag }"
                @click="selectThisLetter(item.id, item.flag)"
              >{{ item.id.toUpperCase() }}</div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <!-- 底部用户头像和电源按钮 -->
  <div class="menuFooter">
    <div class="footerUser">
      <img :src="require('@/assets'+store.state.userAvatar)" :alt="store.state.userName" />
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
import { ref, useAttrs, computed, toRaw, nextTick, onMounted } from 'vue'
import { NPopover, NIcon } from 'naive-ui'
import { Settings20Regular, Power24Regular, WeatherMoon48Regular, ArrowCounterclockwise28Regular, ChevronRight16Regular, ChevronLeft16Regular } from '@vicons/fluent'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { allAppType, allAppItem, allAppListBySort } from '@/type'
import bus from '@/utils/bus'
import { getSpell } from 'jian-pinyin'
const store = useStore()
const router = useRouter()
const attrs = useAttrs()
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
// eslint-disable-next-line no-undef
const emits = defineEmits(['pleaseOpenSearch'])
// 跳转搜索框
const openSearch = () => {
  emits('pleaseOpenSearch')
}
const isAllApps = ref(false)
// 应用列表 ---------------------------------
// [{
//   id: #,
//   list: [{}]
// }]
interface letterType {
  id: string,
  flag: boolean
}
const selectThisLetter = async (id: string, flag: boolean) => {
  if (!flag) return
  selectLetter.value = false
  await nextTick()
  const ele: HTMLElement | null = document.querySelector(`#${id}`)
  containerAllApp.value.scrollTop = (ele as HTMLElement).offsetTop > maxScroll ? maxScroll : (ele as HTMLElement).offsetTop
}
const strIndex = '#abcdefghijklmnopqrstuvwxyz'
const letterData: letterType[] = []
let allAppList_sorted: allAppListBySort = []
// DOM加载完成后获取 appItemBody 的高度
onMounted(() => {
  maxScroll = appItemBody.value.scrollHeight - 523
})
for (const value of strIndex) {
  allAppList_sorted.push({
    id: value,
    list: []
  })
  letterData.push({
    id: value,
    flag: false
  })
}
const dataDeal = () => {
  // 应用列表是固定的，所有取消代理
  // const noProxyData = toRaw(attrs.allAppList)
  // 应用名称统一转为拼音
  // const transData:allAppType = noProxyData.map((item: allAppItem)=>{
  //   item.name = 
  //   return item
  // })
  // 数据归类
  allAppList_sorted.forEach((item, index) => {
    toRaw(attrs.allAppList).forEach(iten => {
      if (item.id === getSpell(iten.name, (charactor: string, spell: string) => spell[1], '').slice(0, 1).toLowerCase()) {
        item.list.push(iten)
        letterData[index].flag = true
      }
    })
  })
  // 过滤 & 排序
  allAppList_sorted = allAppList_sorted.filter(item => item.list.length > 0).map(item => {
    item.list.sort((a, b) => a.name.localeCompare(b.name))
    return item
  })
}
dataDeal()
// 所有应用和已固定处理 --------------------------
const containerPinned = ref()
const containerAllApp = ref()
const appItemBody = ref()
let maxScroll = 0
const changeMenuBodyStatus = () => {
  if (isAllApps.value) {
    isAllApps.value = false
    containerPinned.value.style.left = 0
    containerAllApp.value.style.left = '110%'
    selectLetter.value = false
    return
  }
  isAllApps.value = true
  containerPinned.value.style.left = '-110%'
  containerAllApp.value.style.left = 0
}
const selectLetter = ref(false)
const pinnedOpenApp = (data: allAppItem) => {
  bus.emit('appStatus', { ...data, flag: 'open' })
  bus.emit('changeOpenStatus', { ...data, flag: 'open' })
  bus.emit('claseTaskbarAll')
}
// 获取固定应用列表 -----------------------
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
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: left 300ms;
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
      padding: 18px 0 18px 32px;
      margin-left: -32px;
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
.containerAllApp {
  box-sizing: border-box;
  width: calc(100% + 28px);
  height: 100%;
  padding-left: 30px;
  padding-bottom: 20px;
  position: absolute;
  top: 0;
  left: 110%;
  transition: left 300ms;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 2px;
    height: 246px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7c7e86;
    border-radius: 1px;
  }
  .itemBodyPublic {
    width: 90%;
    height: 40px;
    font-size: 12px;
    color: $color;
    padding-left: 20px;
    margin-left: -20px;
    @include bgHover;
  }
  .itemBodyIndex {
    text-indent: 0.8em;
    line-height: 40px;
    font-weight: bold;
  }
  .itemBodyBox {
    @include flex(flex-start, center);
    img {
      width: 24px;
      margin-right: 20px;
    }
  }
  .appItemBody {
    width: 100%;
  }
}
.appItemLetter {
  box-sizing: border-box;
  width: calc(100% - 28px);
  height: 100%;
  padding-right: 30px;
  @include flex(center, center);
  .itemLetterBox {
    display: grid;
    grid-template-columns: repeat(4, 48px);
    grid-template-rows: repeat(7, 48px);
    div {
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 14px;
      color: #9699a1;
      font-weight: bold;
    }
    .isFlag {
      color: #29292a;
      @include bgHover;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>