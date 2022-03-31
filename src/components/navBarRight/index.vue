<template>
  <div class="btn beforeClose" @click.stop="changeAppStatus('hide')">
    <img :src="require('@/assets/icon/systemIcon/minimize.png')" alt="windows11" />
  </div>
  <div class="btn beforeClose maximize" @click.stop="emit('changeSize','')">
    <img :src="require('@/assets/icon/systemIcon/maximize.png')" alt="windows11" />
    <div class="winBox" @click.stop="changeWindowSize">
      <div class="item1">
        <div id="halfOnLeft"></div>
        <div id="halfOnRight"></div>
      </div>
      <div class="item2">
        <div id="moreOnLeft"></div>
        <div id="moreOnRight"></div>
      </div>
      <div class="item3">
        <div id="thirdOnLeft"></div>
        <div id="thirdOnCenter"></div>
        <div id="thirdOnRight"></div>
      </div>
      <div class="item4">
        <div id="halfOnLeft" class="item4A"></div>
        <div id="thirdOnTop"></div>
        <div id="thirdOnBottom"></div>
      </div>
      <div class="item5">
        <div id="quarterOnLeftTop"></div>
        <div id="thirdOnTop"></div>
        <div id="quarterOnLeftBottom"></div>
        <div id="thirdOnBottom"></div>
      </div>
      <div class="item6">
        <div id="moreThirdLeft"></div>
        <div id="moreThirdCenter"></div>
        <div id="moreThirdRight"></div>
      </div>
    </div>
  </div>
  <div class="btn close" @click.stop="changeAppStatus('close')">
    <img :src="require('@/assets/icon/systemIcon/close.png')" alt="windows11" />
  </div>
</template>

<script lang='ts' setup>
import bus from '@/utils/bus'

// eslint-disable-next-line no-undef
const props = defineProps({
  name: String
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['changeSize'])

const changeWindowSize = (e: MouseEvent) => {
  if(!(e.target as HTMLInputElement).id) return
  emit('changeSize',(e.target as HTMLInputElement).id)
}

// 隐藏/关闭应用
const changeAppStatus = (val:string) => {
    bus.emit('appStatus',{name: props.name,flag: val})
    bus.emit('changeOpenStatus', {name: props.name,flag: val})
    bus.emit('claseTaskbarAll')
}
</script>

<style lang='scss' scoped>
.btn {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  padding: 15px;
  img {
    width: 100%;
    filter: invert(100%);
    vertical-align: top;
  }
}
.beforeClose:hover {
  background-color: lightgray;
}
.close:hover {
  background-color: #f00;
}

.maximize {
  position: relative;
  &:hover{
    .winBox{
      display: grid;
    }
  }
  .winBox {
    position: absolute;
    top: 34px;
    right: -30px;
    width: 342px;
    height: 164px;
    display: none;
    z-index: 99;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(2, 5fr);
    grid-gap: 12px;
    background-color: #f5f3f5;
    border-radius: 5px;
    padding: 8px;
    & > div {
      border-radius: 5px;
      overflow: hidden;
      display: grid;
      grid-gap: 4px;
      div {
        background: #d5d2d7;
        border: 1px solid #827f83;
        &:hover {
          background: #0067c0;
        }
      }
    }
  }
  .item1 {
    grid-template-columns: repeat(2, 5fr);
  }
  .item2 {
    grid-template-columns: 6fr 4fr;
  }
  .item3 {
    grid-template-columns: repeat(3, 3.3fr);
  }
  .item4 {
    grid-template-columns: repeat(2, 5fr);
    grid-template-rows: repeat(2, 5fr);
    grid-template-areas:
      "header left"
      "header right";
    .item4A {
      grid-area: header;
    }
  }
  .item5 {
    grid-template-columns: repeat(2, 5fr);
    grid-template-rows: repeat(2, 5fr);
    grid-template-areas:
      "header left"
      "header right";
  }
  .item6 {
    grid-template-columns: 2.5fr 5fr 2.5fr;
  }
}
</style>