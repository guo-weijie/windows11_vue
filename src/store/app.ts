import { defineStore } from 'pinia'

interface appItem {
  name: string,
  url: string,
  isDesktop: boolean,
  isPinned: boolean,
  isTaskBar: boolean,
  open: boolean,
  mini: boolean,
  hidden: boolean,
  isTop: boolean
}

type appList = appItem[]

interface appState {
  app: appList,
  zIndex: number,
  alwaysTaskBar: string[]
}
interface statusObjType {
  name: string,
  key: string,
  value: boolean
}

type appKey = keyof appItem

/**
   * 应用程序
   * {
   *   name 程序名称
   *   url  图标路径
   *   isDesktop  是否在桌面显示
   *   isPinned 是否固定在开始菜单
   *   isTaskBar 是否固定在任务栏
   *   open 是否为打开状态 -> 组件是否加载(v-if) 是否显示任务栏图标长下划线
   *   mini 是否显示任务栏图标短下划线
   *   hidden 是否隐藏(v-show) 应用最小化在任务栏的状态
   *   isTop 应用是否在最顶层显示，用来处理打开多个应用时任务栏图标下划线显示不正确且应用层级问题
   * }
   */

const appStore = defineStore({
  id: 'app-store',
  state: (): appState => {
    return {
      app: [{
        name: '文件资源管理器',
        url: require('@/assets/icon/appIcon/explorer.png'),
        isDesktop: false,
        isPinned: true,
        isTaskBar: true,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: 'Edge',
        url: require('@/assets/icon/appIcon/edge.png'),
        isDesktop: true,
        isPinned: true,
        isTaskBar: true,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: 'Microsoft Store',
        url: require('@/assets/icon/appIcon/store.png'),
        isDesktop: false,
        isPinned: true,
        isTaskBar: true,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: '照片',
        url: require('@/assets/icon/appIcon/photos.png'),
        isDesktop: false,
        isPinned: true,
        isTaskBar: false,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: '设置',
        url: require('@/assets/icon/appIcon/settings.png'),
        isDesktop: false,
        isPinned: true,
        isTaskBar: false,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: '时钟',
        url: require('@/assets/icon/appIcon/alarm.png'),
        isDesktop: false,
        isPinned: true,
        isTaskBar: false,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: '回收站',
        url: require('@/assets/icon/appIcon/bin1.png'),
        isDesktop: true,
        isPinned: false,
        isTaskBar: false,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: 'cortana',
        url: require('@/assets/icon/appIcon/cortana.png'),
        isDesktop: false,
        isPinned: false,
        isTaskBar: false,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: 'Visual Studio Code',
        url: require('@/assets/icon/appIcon/code.png'),
        isDesktop: true,
        isPinned: false,
        isTaskBar: false,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: '终端',
        url: require('@/assets/icon/appIcon/terminal.png'),
        isDesktop: false,
        isPinned: false,
        isTaskBar: false,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }, {
        name: '贪吃蛇',
        url: require('@/assets/icon/appIcon/snake.jpg'),
        isDesktop: true,
        isPinned: true,
        isTaskBar: false,
        open: false,
        mini: false,
        hidden: false,
        isTop: false
      }],
      zIndex: 2,
      alwaysTaskBar: ['文件资源管理器', 'Edge', 'Microsoft Store']
    }
  },
  getters: {
    getApp(): appList {
      return this.app
    },
    getTypeApp() {
      return (appType: appKey) => this.app.filter((item) => item[appType])
    },
    getMyApp() {
      return (appName: string) => this.app.filter(item => item.name === appName)[0]
    },
    getZIndex(): number {
      return this.zIndex
    }
  },
  actions: {
    changeZIndex() {
      this.zIndex++
    },
    /**
     * statueObj
     *  - name 修改状态的 app name
     *  - key 修改状态的 key
     *  - value 修改的状态
     */
    changeAppStatus(statusObj: statusObjType) {
      const { name, key, value } = statusObj
      this.app.forEach((item: appItem) => {
        if (item.name === name) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item[key] = value
          if (key === 'open') {
            item.isTop = value
            if (this.alwaysTaskBar.indexOf(name) === -1) {
              item.isTaskBar = value
            }
            item.mini = false
            item.hidden = false
          } else {
            item.isTop = !item.mini && !item.hidden
          }
        } else {
          if (item.open && key === 'open' && value) {
            item.mini = true
            item.isTop = !item.mini && !item.hidden
          }
        }
      })
    }
  }
})

export {
  appItem,
  appList,
  appStore
}