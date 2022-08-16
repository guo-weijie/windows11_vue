const state = {
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
  }],
  zIndex: 2,
  alwaysTaskBar: ['文件资源管理器', 'Edge', 'Microsoft Store']
}
const mutations = {
  /**
   * statueObj
   *  - name 修改状态的 app name
   *  - key 修改状态的 key
   *  - value 修改的状态
   */
  CHANGE_APP_STATUS(state, statusObj) {
    const { name, key, value } = statusObj
    state.app.forEach(item => {
      // if (item.name === name) {
      //   item[key] = value
      //   if(key==='open'){
      //     item.isTop = value
      //   }
      //   if(state.alwaysTaskBar.indexOf(name)===-1){
      //     if(key==='open'){
      //       item.isTaskBar = value
      //     }
      //   }
      // }else if(key==='open' && item.open){
      //   item.isTop = !value
      // }
      if(item.name===name){
        item[key] = value
        if(key==='open'){
          item.isTop = value
          if(state.alwaysTaskBar.indexOf(name)===-1){
            item.isTaskBar = value
          }
          item.mini = false
          item.hidden = false
        }else{
          item.isTop = !item.mini && !item.hidden
        }
      }else{
        if(item.open && key==='open' && value){
          item.mini = true
          item.isTop = !item.mini && !item.hidden
        }
      }
    })
  },
  CHANGE_ZINDEX(state) {
    state.zIndex++
  },
}
const actions = {
  changeZIndex({ commit }) {
    commit('CHANGE_ZINDEX')
  },
  changeAppStatus({ commit }, statusObj) {
    commit('CHANGE_APP_STATUS', statusObj)
  }
}

export default {
  state,
  mutations,
  actions
}