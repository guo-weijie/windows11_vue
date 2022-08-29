import { h, defineComponent, onMounted, resolveDirective, withDirectives, Directive } from 'vue'
import { appStore } from '@/store/app'
import './style.scss'
import { Subtract16Regular, Dismiss20Regular, SquareMultiple16Regular } from '@vicons/fluent'
import { NButton, NIcon, NPopover } from 'naive-ui'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    bgColor: String
  },
  setup(props, { slots }) {
    const store = appStore()
    /**
     * 获取父实例
     */
    let parentInstance: HTMLElement
    onMounted(() => {
      parentInstance = (document.querySelector('.titleBlock') as HTMLElement).parentElement as HTMLElement
    })
    /**
     * 生成标题栏右侧
     */
    interface children {
      id: string,
      class?: string
    }
    interface windowSizeItem {
      class: string,
      children: children[]
    }

    const windowSizeObj: windowSizeItem[] = [
      {
        class: 'item1',
        children: [
          { id: 'halfOnLeft' }, { id: 'halfOnRight' }
        ]
      }, {
        class: 'item2',
        children: [
          { id: 'moreOnLeft' }, { id: 'moreOnRight' }
        ]
      }, {
        class: 'item3',
        children: [
          { id: 'thirdOnLeft' }, { id: 'thirdOnCenter' }, { id: 'thirdOnRight' }
        ]
      }, {
        class: 'item4',
        children: [
          { id: 'halfOnLeft', class: 'item4A' }, { id: 'thirdOnTop' }, { id: 'thirdOnBottom' }
        ]
      }, {
        class: 'item5',
        children: [
          { id: 'quarterOnLeftTop' }, { id: 'thirdOnTop' }, { id: 'quarterOnLeftBottom' }, { id: 'thirdOnBottom' }
        ]
      }, {
        class: 'item6',
        children: [
          { id: 'moreThirdLeft' }, { id: 'moreThirdCenter' }, { id: 'moreThirdRight' }
        ]
      },
    ]

    // 右侧按钮点击事件
    const rightBtn = (value?: string) => {
      if (value === 'mini') {
        store.changeAppStatus({
          name: props.title,
          key: 'hidden',
          value: true
        })
        store.changeAppStatus({
          name: props.title,
          key: 'mini',
          value: true
        })
      } else if (value === 'close') {
        store.changeAppStatus({
          name: props.title,
          key: 'open',
          value: false
        })
      } else {
        parentInstance.style.left = ''
        parentInstance.style.top = ''
        if (parentInstance.className === 'appContainer') {
          parentInstance.className = 'appContainer centerCenter'
        } else {
          parentInstance.className = 'appContainer'
        }
      }
    }

    // 窗口点击事件
    const changeWinSize = (className: string) => {
      parentInstance.className = `appContainer ${className}`
    }
    /**
     * 创建调整窗口尺寸的节点
     */
    // 二级
    function createSecondStepSize(data: children[]) {
      return data.map(item => {
        return h('div', {
          class: item.class ? item.class : '',
          id: item.id,
          onClick: () => changeWinSize(item.id)
        })
      })
    }
    // 一级
    function createWinSize() {
      return windowSizeObj.map(item => {
        return h('div', {
          class: item.class
        }, createSecondStepSize(item.children))
      })
    }
    /**
     * 创建右侧三个按钮 即最小化、窗口、关闭
     */
    function createRight() {
      const ary = [{
        type: 'mini',
        icon: Subtract16Regular,
        title: '最小化'
      }, {
        type: 'win',
        icon: SquareMultiple16Regular,
        title: '向下还原'
      }, {
        type: 'close',
        icon: Dismiss20Regular,
        title: '关闭'
      }]
      const btn = ary.map(item => {
        const btn = h(NButton, {
          style: {
            width: '40px',
            height: '40px',
            fontSize: '18px'
          },
          class: {
            closeBtn: item.type === 'close',
            otherBtn: item.type !== 'close'
          },
          size: 'tiny',
          title: item.title,
          bordered: false,
          onClick: event => {
            event.stopPropagation()
            rightBtn(item.type)
          },
          text: true
        }, () => h(NIcon, null, () => h(item.icon)))

        if (item.type === 'win') {
          return h(NPopover, {
            trigger: 'hover',
            class: 'myPopover',
            style: {
              padding: '8px'
            },
            'show-arrow': false
          }, {
            trigger: () => btn,
            default: () => h('div', {
              class: 'winBox'
            }, createWinSize())
          })
        }
        return btn
      })
      return h('div', {
        class: 'btnBox'
      }, btn)
    }

    /**
     * 创建左侧标题
     */
    function createLeft() {
      if (slots.default) {
        return slots.default()
      }
      // 没有插槽的节点
      return h('div', {
        class: 'titleBlockLeft'
      }, props.title)
    }

    return () => {
      const dragable = resolveDirective('drag')
      return withDirectives(h('div', {
        style: {
          backgroundColor: props.bgColor ? props.bgColor : '--global-bg-color'
        },
        class: 'titleBlock',
        onDblclick: () => rightBtn()
      }, [
        createLeft(),
        createRight()
      ]
      ), [[dragable as Directive]])
    }
  }
})