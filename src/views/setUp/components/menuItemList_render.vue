
<script lang='ts' setup>
import { NIcon, NButton } from 'naive-ui'
import { ChevronRight20Regular, ChatBubblesQuestion20Filled, Info20Regular, DataPie20Regular, Globe20Regular, TvUsb20Regular } from '@vicons/fluent'
import { useStore } from 'vuex';
import { reactive, h } from 'vue'

// 处理系统右侧顶栏左侧图片问题 -> 需要与桌面背景图片保持一致
const store = useStore()

const props = defineProps({
  menuItemListData: Object
})
const emit = defineEmits(['changeItem'])

const toItem = (name:string,num: number) => {
  emit('changeItem', name,num)
}

const imgListData = reactive([{
  url: '/default/img0.jpg',
  select: true
},{
  url: '/ThemeC/img0.jpg',
  select: false
},{
  url: '/ThemeA/img0.jpg',
  select: false
},{
  url: '/default/img1.jpg',
  select: false
},{
  url: '/ThemeB/img0.jpg',
  select: false
},{
  url: '/ThemeD/img0.jpg',
  select: false
}])

const changeBgImg = (num:number) => {
  imgListData.forEach((item,index)=>{
    if(index===num){
      item.select = true
      store.dispatch('changeBackgroundImgUrl',item['url'])
    }else{
      item.select = false
    }
  })
}

h('div',{
  class: 'menuItemList'
})

// 创建图片
const createImg = (url: string,alt:string) => {
  return h('img',{
    src: url,
    alt: alt
  })
}

// 创建系统部分
const createSystem = () => {
  // 创建 系统左
  // const leftImg = h('img',{
  //   src: require('@/assets/wallpaper'+store.state.backgroundImgUrl),
  //   alt: "windows11 背景图片"
  // })
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const leftImg = createImg(require('@/assets/wallpaper'+store.state.backgroundImgUrl),"windows11 背景图片")
  const leftDiv = h('div',[h('div',{
    class: 'first'
  },'Windows 11'),h('div',{
    class: 'second'
  },'My PC'),h('div',{
    class: 'rename'
  },'重命名')])
  const systemLeft = h('div',{
    class: 'systemLeft'
  },[leftImg,leftDiv])

  // 创建系统右
   // eslint-disable-next-line @typescript-eslint/no-var-requires
  const RightImg = createImg(require('@/assets/icon/systemIcon/Windows Update.webp'),"windows 更新")
  const rightDiv = h('div',[h('div',{
    class: 'updated'
  },'Windows 更新'),h('div',{
    class: 'lastTimeUpdate'
  },'上次检查时间：2 小时前')])
  const systemRight = h('div',{
    class: 'systemRight',
    onClick: toItem('Windows 更新', 10)
  },[RightImg,rightDiv])

  return h('div',{
    class: 'system'
  },[systemLeft,systemRight])
}


</script>

<style lang='scss' scoped>
@import "@/style/public";

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
  width: 20px;
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
    .updated{
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

.network{
  max-width: 1000px;
  @include flex(space-between,center);
  margin-bottom: 20px;
  &Left{
    @include flex(flex-start,center);
    &>.n-icon{
      margin-right: 24px;
    }
  }
  &Center{
    padding: 11px 8px;
    border-radius: 5px;
    @include flex(flex-start,center);
    &>.n-icon{
      margin-right: 12px;
    }
  }
  &Right{
    width: 192px;
    height: 56px;
    border-radius: 5px;
    @include flex(space-around,center);
  }
  &Title{
    font-size: 14px;
    color: #191a1a;
    font-weight: bold;
  }
  &Desc{
    @include flex(flex-start,center);
    font-size: 12px;
    color: #5b5d5f;
    .n-icon{
      margin-right: 6px;
    }
  }
  .hoverStyle:hover {
    background-color: #e7ebf0;
  }
}

.account{
  max-width: 1000px;
  height: 92px;
  margin-bottom: 30px;
  @include flex(flex-start,center);
  img{
    height: 100%;
    margin-right: 16px;
  }
  .userName{
    font-size: 14px;
    font-weight: bold;
    color: #000000;
  }
  &Type{
    font-size: 12px;
    color: #5f6264;
  }
  &Auth{
    font-size: 12px;
    color: #5f6264;
  }
}

.personalize{
  @include flex(flex-start,center);
  max-width: 1000px;
  margin-bottom: 20px;
  .viewBox{
    width: 335px;
    height: 188px;
    border-radius: 5px;
    margin-right: 48px;
  }
  .selectBox{
    font-size: 14px;
    color: #191a1a;
    font-weight: bold;
    .boxTitle{
      margin-bottom: 16px;
    }
    .bgImgBox{
      width: 352px;
      height: 190px;
      @include grid(3,2);
      grid-gap: 8px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
      .selected {
        box-sizing: border-box;
        padding: 1px;
        border: 2px solid #0067c0;
      }
    }
  }
}

.update{
  max-width: 1000px;
  @include flex(space-between,center);
  margin-bottom: 26px;
  &Less{
    @include flex(flex-start,center);
    color: #003e92;
    font-size: 12px;
    .n-icon{
      margin-right: 14px;
    }
  }
  &Left{
    @include flex(flex-start,center);
    img{
      width: 84px;
      margin-left: 12px;
      margin-right: 18px;
    }
    .lastedVer{
      font-size: 17px;
      font-weight: bold;
      color: #191a1a;
    }
    .lastCheck{
      font-size: 12px;
      color: #5f6264;
    }
  }
}
</style>