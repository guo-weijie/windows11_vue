<template>
  <div class="appContainer" ref="snakeBox">
    <TitleBlock title="贪吃蛇"></TitleBlock>
    <div class="appBody game">
      <div class="gameBody" ref="gameBody">
        <div v-for="item in blockList.blocks" :key="(item as number)" :id="'s'+(item as number)"
          :style="{width: size + 'px',height: size + 'px' }" :class="{
            snakeBody: snakeSpace.snakeBody.indexOf(item as number) > -1,
            appleBlock: appCoor === item
          }">
        </div>
      </div>
      <div class="gameOpe">
        <!-- 分数 -->
        <div class="fraction">
          分数：<span>{{length-1}}</span>
        </div>
        <n-switch v-model:value="border" v-show="showBorder">
          <template #checked>
            有边界
          </template>
          <template #unchecked>
            无边界
          </template>
        </n-switch>
        <!-- 开始、结束、重置 -->
        <div class="gameStatus">
          <n-button v-show="statusFlag" text style="font-size: 24px" @click="gameStatus(true)">
            <n-icon text="开始游戏">
              <Play16Regular />
            </n-icon>
          </n-button>
          <n-button v-show="!statusFlag" text style="font-size: 24px" @click="gameStatus(false)">
            <n-icon text="暂停游戏">
              <Pause16Regular />
            </n-icon>
          </n-button>
          <n-button text style="font-size: 24px" @click="initGame">
            <n-icon text="重置游戏">
              <ArrowReset20Regular />
            </n-icon>
          </n-button>
        </div>
        <div class="keyBoardTips">
          <div></div>
          <div @click="changePosition('top')">
            <n-icon size="40" color="#0e7a0d">
              <ChevronUp16Regular />
            </n-icon>
          </div>
          <div></div>
          <div @click="changePosition('left')">
            <n-icon size="40" color="#0e7a0d">
              <ChevronLeft16Regular />
            </n-icon>
          </div>
          <div></div>
          <div @click="changePosition('right')">
            <n-icon size="40" color="#0e7a0d">
              <ChevronRight16Regular />
            </n-icon>
          </div>
          <div></div>
          <div @click="changePosition('bottom')">
            <n-icon size="40" color="#0e7a0d">
              <ChevronDown16Regular />
            </n-icon>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="提示" :content="content"
      positive-text="确定" @positive-click="showModal=false" />
  </div>
</template>

<script lang='ts' setup>
import TitleBlock from '@/components/titleBlock'
import { onMounted, reactive, ref, onUnmounted, nextTick, onBeforeUnmount } from 'vue';
import { NSwitch, NIcon, NButton, NModal } from 'naive-ui'
import { ChevronLeft16Regular, ChevronRight16Regular, ChevronDown16Regular, ChevronUp16Regular, Play16Regular, Pause16Regular, ArrowReset20Regular } from '@vicons/fluent'

// 提示相关
const showModal = ref(false)
const content = ref('游戏结束，分数：')

// 监听游戏窗口尺寸变化
const boxSizeChange = async () => {
  await nextTick()
  initGame()
}
const observe = new ResizeObserver(boxSizeChange)

// 应用关闭后清理定时器、移除键盘事件
onBeforeUnmount(() => {
  observe.unobserve(snakeBox.value)
})
onUnmounted(() => {
  clearInterval(timer)
  document.removeEventListener('keydown', kbdOpera)
})

const snakeBox = ref()
const gameBody = ref()

// 有无边界切换
const border = ref(false)

// 方向按钮点击事件
const changePosition = (position: string) =>{
  kbdOpera(position)
}

/**
 * 键盘事件
 */
const keyList = {
  ArrowDown: 'bottom',
  ArrowUp: 'top',
  ArrowRight: 'right',
  ArrowLeft: 'left'
}
const keyAry = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
const kbdOpera = (e: KeyboardEvent | void | string) => {
  if ((e as KeyboardEvent).code && keyAry.indexOf((e as KeyboardEvent).code) === -1) return
  let code = keyList[e.code] ?? e

  if ((code === 'left' || code === 'right') && (forwardDirection === 'left' || forwardDirection === 'right')) return
  if ((code === 'top' || code === 'bottom') && (forwardDirection === 'top' || forwardDirection === 'bottom')) return

  forwardDirection = code
}
// 添加键盘监听事件
document.addEventListener('keydown', kbdOpera)

/**
 * 让🐍动起来
 * forwardDirection 前进方向
 * time 每间隔多长时间蛇走一步
 */
let forwardDirection = 'right'
let time = 1000

// 游戏结束提示
const gameOver = () => {
  content.value = '游戏结束，分数：' + length.value
  showModal.value = true
  showBorder.value = true
  initGame()
}

const snakeMove = () => {
  const oneStep = {
    left: -1,
    right: 1,
    top: ~columnLength + 1,
    bottom: columnLength
  }

  let currentCoorNumber = snakeSpace.snakeBody[snakeSpace.snakeBody.length - 1] + oneStep[forwardDirection]

  let flag = true
  if (currentCoorNumber < 0 && forwardDirection === 'left') {
    currentCoorNumber = columnLength - 1
    flag = false
  }

  const leftRightFlag = snakeSpace.snakeBody[snakeSpace.snakeBody.length - 1] % columnLength > currentCoorNumber % columnLength

  if (forwardDirection === 'bottom' && currentCoorNumber >= allGrid) {
    if (border.value) {
      gameOver()
      return
    }
    currentCoorNumber = currentCoorNumber - allGrid
  } else if (forwardDirection === 'top' && currentCoorNumber < 0) {
    if (border.value) {
      gameOver()
      return
    }
    currentCoorNumber = allGrid + currentCoorNumber
  } else if (forwardDirection === 'right' && leftRightFlag) {
    if (border.value) {
      gameOver()
      return
    }
    currentCoorNumber = currentCoorNumber - columnLength
  } else if (forwardDirection === 'left' && !leftRightFlag) {
    if (border.value) {
      gameOver()
      return
    }
    if (flag) {
      currentCoorNumber = currentCoorNumber + columnLength
    }
  }
  snakeSpace.snakeBody[snakeSpace.snakeBody.length] = currentCoorNumber
  if (snakeSpace.snakeBody.filter(item => item === currentCoorNumber).length > 1) {
    gameOver()
    return
  }

  if (snakeSpace.snakeBody.length >= allGrid) {
    content.value = '恭喜通关，分数：' + length.value
    showModal.value = true
    initGame()
    return
  }

  if (snakeSpace.snakeBody.indexOf(appCoor.value) > -1) {
    snakeSpace.snakeBody.unshift(appCoor.value)
    appCoor.value = undefined
    length.value++

    if (time >= 200 && length.value % 5 === 0) {
      time = time - length.value / 5 * 2
    }

    createApple()
  }
  snakeSpace.snakeBody.splice(0, 1)
}

let timer: number | undefined = undefined

/**
 * 生成🍎
 *  1、根据网格的长度随机获取一个坐标
 *  2、如果蛇在该坐标上的话，重新生成坐标
 */
const appCoor = ref()
const createApple = async () => {
  const coordinate = Math.floor(Math.random() * allGrid)
  if (snakeSpace.snakeBody.indexOf(coordinate) === -1) {
    appCoor.value = coordinate
    return
  }
  createApple()
}

/**
 * 生成🐍
 *  初始化在 0 点
 *  length 蛇的长度，初始为 1 
 */
let length = ref(1);
const snakeSpace = reactive({
  snakeBody: [0]
})

/**
 * 创建游戏⚽
 * blockList 方格 id 列表
 * size 每个格子的大小
 * allGrid 格子总数
 * columnLength 每行的个数 -> 控制蛇移动会用到
 * rowLength 每列的个数 -> 控制蛇移动会用到
 */
interface blockListType {
  blocks: (number | null)[]
}

const blockList: blockListType = reactive({
  blocks: []
})
let size = ref(20)
let allGrid = 0
let columnLength = 0, rowLength = 0;
const createGrid = () => {
  // 获取应用窗口的宽高
  const width = gameBody.value.clientWidth
  const height = gameBody.value.clientHeight

  /**
   * 窗口 < 500 -> 20 默认
   * > 500 < 1000 -> 25
   * > 1000 -> 30
   */
  if (width < 500) {
    size.value = 20
  } else if (width > 1000) {
    size.value = 30
  } else {
    size.value = 25
  }

  // 计算可容纳多少方格
  columnLength = Math.floor(width / size.value)
  rowLength = Math.floor(height / size.value)
  allGrid = columnLength * rowLength
  const tempAry = []
  for (let i = 0; i < allGrid; i++) {
    tempAry.push(i)
  }
  blockList.blocks = tempAry
}

/**
 * 边界选择状态
 * 如果游戏已经开始，隐藏切换功能
 */
const showBorder = ref(true)

// 开始/暂停游戏
const statusFlag = ref(true)
const gameStatus = (flag: boolean) => {
  statusFlag.value = !flag
  if (flag) {
    showBorder.value = false
    timer = setInterval(() => {
      snakeMove()
    }, time)
  } else {
    clearInterval(timer)
    timer = undefined
  }
}

// 初始化/重置游戏
const initGame = () => {
  statusFlag.value = true
  clearInterval(timer)
  timer = undefined
  length.value = 1
  forwardDirection = 'right'
  time = 1000
  snakeSpace.snakeBody = [0]
  showBorder.value = true
  createGrid()
  createApple()
}

onMounted(() => {
  createGrid()
  createApple()
  observe.observe(snakeBox.value)
})
</script>

<style lang='scss' scoped>
@import "@/style/public";

.game {
  display: grid;
  grid-template-columns: 7.5fr 2.5fr;
  overflow: hidden;
}

.gameBody {
  background-color: #2fd;
  width: 100%;
  height: 100%;
  overflow: hidden;

  div {
    background-color: #666;
  }

  @include flex(center, flex-start, row, wrap);
  align-content: center;

  .snakeBody {
    background-color: aliceblue;
  }

  .appleBlock {
    background-color: lightsalmon;
  }
}

.gameOpe {
  background-color: #fff;
  @include flex(center, center, column);

  .fraction {
    font-size: 20px;
    margin-bottom: 40px;

    span {
      font-weight: bold;
    }
  }

  .n-switch {
    margin-bottom: 40px;
  }

  .keyBoardTips {
    box-sizing: border-box;
    width: 240px;
    height: 240px;
    padding: 10px;
    @include grid(3, 3);
    align-content: center;

    div {
      width: 100%;
      height: 100%;
      display: grid;
      justify-content: center;
      align-content: center;

      &:nth-child(even) {
        border-radius: 50%;
        box-shadow: #ccc 0 0 10px;
        cursor: pointer;
        transition: all 200ms;

        &:active {
          background-color: #ccc;
          box-shadow: #ddd 0 0 10px;

          i {
            color: #fff;
          }
        }
      }
    }
  }

  .gameStatus {
    margin-bottom: 40px;

    .n-button {
      font-size: 50px !important;
      margin-right: 20px;
    }
  }
}
</style>