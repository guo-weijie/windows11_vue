import { h } from 'vue'
import store from '@/store'
import './style.scss'
import { Subtract16Regular, Dismiss20Regular, SquareMultiple16Regular } from '@vicons/fluent'
import { NButton, NIcon } from 'naive-ui'

export default {
  props: {
    name: {
      type: String
    }
  },
  setup(props, { slots, attrs, emit }) {
    let zIndex = 2
    const navBarClick = () => {
      zIndex = store.getters.zIndex
      store.dispatch('changeZIndex')
    }
    /**
     * 生成标题栏右侧
     */
    const windowSizeObj=[
      {
        class: 'item1',
        children: [
          {id: 'halfOnLeft'},{id: 'halfOnRight'}
        ]
      },{
        class: 'item2',
        children: [
          {id: 'moreOnLeft'},{id: 'moreOnRight'}
        ]
      },{
        class: 'item3',
        children: [
          {id: 'thirdOnLeft'},{id: 'thirdOnCenter'},{id: 'thirdOnRight'}
        ]
      },{
        class: 'item4',
        children: [
          {id: 'halfOnLeft', class: 'item4A'},{id: 'thirdOnTop'},{id: 'thirdOnBottom'}
        ]
      },{
        class: 'item5',
        children: [
          {id: 'quarterOnLeftTop'},{id: 'thirdOnTop'},{id: 'quarterOnLeftBottom'},{id: 'thirdOnBottom'}
        ]
      },{
        class: 'item6',
        children: [
          {id: 'moreThirdLeft'},{id: 'moreThirdCenter'},{id: 'moreThirdRight'}
        ]
      },
    ]
    // 窗口点击事件
    const changeWinSize = id => {
      console.log(id);
    }
    /**
     * 创建调整窗口尺寸的节点
     */
    // 二级
    function createSecondStepSize(data){
      return data.map(item=>{
        return h('div',{
          class: item.class?item.class:'',
          id: item.id,
          onClick: changeWinSize(item.id)
        })
      })
    }
    // 一级
    function createWinSize(){
      windowSizeObj.map(item=>{
        h('div',{
          class: item.class
        },createSecondStepSize(item.children))
      })
    }
    /**
     * 创建右侧三个按钮 即最小化、窗口、关闭
     */
    function createRight(){
      const ary = [{
        type: 'mini',
        icon: Subtract16Regular,
        title: '最小化'
      },{
        type: 'win',
        icon: SquareMultiple16Regular,
        title: '向下还原'
      },{
        type: 'close',
        icon: Dismiss20Regular,
        title: '关闭'
      }]
      const btn =  ary.map(item=>{
        return h(NButton,{
          style: {
            width: '40px',
            height: '40px',
            fontSize: '18px'
          },
          class: {
            closeBtn: item.type==='close',
            otherBtn: item.type !== 'close'
          },
          size: 'tiny',
          title: item.title,
          bordered: false,
          text: true
        },()=>h(NIcon,null,()=>h(item.icon)))
      })
      return h('div',{
        class: 'btnBox'
      },btn)
    }

    /**
     * 创建左侧标题
     */
    function createLeft(){
      // 没有插槽的节点
      return h('div',{
        class: 'titleBlockLeft'
      },props.name)
    }

    return () =>
      h('div',{
          style: {
            backgroundColor: props.bgColor?props.bgColor:'--global-bg-color',
            zIndex
          },
          class: 'titleBlock',
          onClick: navBarClick
        },[
          createLeft(),
          createRight()
        ]
      )
  }
}