<template>
  <div class="setupBox" :class="[myClass]" ref="setupBox">
    <!-- 标题栏 -->
    <div class="titleBar">
      <div class="barLeft">
        <n-icon size="16" color="#c3c3c3">
          <ArrowLeft20Regular />
        </n-icon>
        <span>设置</span>
      </div>
      <NavBarRight name="设置" @changeSize="changeSize" />
    </div>
    <!-- 主体 -->
    <div class="mainBox">
      <n-layout has-sider>
        <n-layout-sider>
          <div class="userAbout">
            <img :src="require('@/assets/icon/avatar.png')" alt="Ghosie" />
            <div class="aboutInfo">
              <div class="infoName">Ghosie</div>
              <a href="mailto:weijie.g@outlook.com" class="infoMail">weijie.g@outlook.com</a>
            </div>
          </div>
          <n-input placeholder="查找设置">
            <template #suffix>
              <n-icon>
                <svg
                  t="1648455446977"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="9170"
                  width="32"
                  height="32"
                >
                  <path
                    d="M599.703537 0C369.67788 0 182.54192 187.139189 182.54192 417.161616c0 109.944193 42.773473 210.070729 112.526937 284.666838L7.141304 989.756008l34.240731 34.24396 288.750803-288.750803c72.759133 61.756643 166.880789 99.074068 269.56747 99.074068 230.022428 0 417.158388-187.139189 417.158388-417.161616S829.725964 0 599.703537 0zM599.703537 785.896779c-203.32331 0-368.735163-165.411853-368.735163-368.735163S396.380227 48.426454 599.703537 48.426454c203.320081 0 368.731934 165.411853 368.731934 368.735163S803.020389 785.896779 599.703537 785.896779z"
                    p-id="9171"
                    fill="#3a3a3a"
                  />
                </svg>
              </n-icon>
            </template>
          </n-input>
          <!-- 菜单列表 -->
          <div class="menuList">
            <div class="listItem" :class="{listItemBgC: index === clickedIndex}" v-for="(item, index) in menuItemData" :key="item.name" @click="selectItem(item.name,index)">
              <img :src="item.url" :alt="item.name" />
              <div>{{ item.name }}</div>
            </div>
            <div class="listBar" ref="listBar"></div>
          </div>
        </n-layout-sider>
        <n-layout>
          <n-layout-content>
            <!-- 顶部面包屑 -->
            <n-breadcrumb>
              <n-breadcrumb-item v-for="item in breadData" :key="item">
                {{item}}
                <template #separator>
                  <n-icon size="14" color="#5c5c5c">
                    <ChevronRight20Regular/>
                  </n-icon>
                </template>
              </n-breadcrumb-item>
            </n-breadcrumb>
            <MenuItemList :menuItemListData="menuItemListData.data" @changeItem="selectItem" />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { NIcon, NLayout, NLayoutContent, NLayoutSider, NInput, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { ArrowLeft20Regular, ChevronRight20Regular } from '@vicons/fluent'
import NavBarRight from '@/components/navBarRight/index.vue'
import { reactive, ref, shallowReactive } from 'vue';
import MenuItemList from './components/menuItemList.vue'

const menuItemData = [{
  url: require('@/assets/icon/systemIcon/System.webp'),
  name: '系统',
  children: [{
    title: undefined,
    itemList: [{
      url: "",
      name: '显示',
      desc: '显示器、亮度、夜间模式、显示配置文件'
    },{
      url: "",
      name: '声音',
      desc: '音量级别、输出、声音设备'
    },{
      url: "",
      name: '通知',
      desc: '来自应用和系统的警报'
    },{
      url: "",
      name: '专注助手',
      desc: '通知、自动规则'
    },{
      url: "",
      name: '电源',
      desc: '睡眠、电池使用情况、节电模式'
    },{
      url: "",
      name: '存储',
      desc: '存储空间、驱动器、配置规则'
    },{
      url: "",
      name: '多任务处理',
      desc: '贴靠窗口、桌面、任务切换'
    },{
      url: "",
      name: '激活',
      desc: '激活状态、订阅、产品密钥'
    },{
      url: "",
      name: '疑难解答',
      desc: '建议的疑难解答、首选项和历史记录'
    },{
      url: "",
      name: '恢复',
      desc: '重置、高级启动、返回'
    },{
      url: "",
      name: '投影到此电脑',
      desc: '权限、配对PIN、可发现性'
    },{
      url: "",
      name: '远程桌面',
      desc: '远程桌面用户，连接权限'
    },{
      url: "",
      name: '剪贴板',
      desc: '剪切和复制历史记录、同步、清除'
    },{
      url: "",
      name: '关于',
      desc: '设备规格，重命名电脑、Windows 规格'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Bluetooth&devices.webp'),
  name: '蓝牙和其他设备',
  children: [{
    title: undefined,
    itemList: [{
      url: "",
      name: '设备',
      desc: '鼠标、键盘、触笔、音频、显示器和扩展坞、其他设备'
    },{
      url: "",
      name: '打印机和扫描仪',
      desc: '首选项、疑难解答'
    },{
      url: "",
      name: '你的手机',
      desc: '立即获取 Android 设备的照片、短信及其他'
    },{
      url: "",
      name: '照相机',
      desc: '连接的相机、默认图像设置'
    },{
      url: "",
      name: '鼠标',
      desc: '按钮、鼠标指针速度、滚动'
    },{
      url: "",
      name: '笔和 Windows Ink',
      desc: '右手或左手、笔按钮快捷方式、手写'
    },{
      url: "",
      name: '自动播放',
      desc: '可移动驱动器和内存的默认设置'
    },{
      url: "",
      name: 'USB',
      desc: '通知、USB 节电模式、移动设备首选项'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Network&internet.webp'),
  name: '网络和 Internet',
  children: [{
    title: '',
    itemList: [{
      url: "",
      name: '以太网',
      desc: '身份验证，IP 和 DNS 设置，按流量计费的网络'
    },{
      url: "",
      name: 'VPN',
      desc: '添加、连接、管理'
    },{
      url: "",
      name: '代理',
      desc: '用于 Wi-Fi 和以太网连接的代理服务器'
    },{
      url: "",
      name: '拨号',
      desc: '设置拨号 Internet 连接'
    },{
      url: "",
      name: '高级网络设置',
      desc: '查看所有网络适配器，网络重置'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Personalisation.webp'),
  name: '个性化',
  children: [{
    title: '',
    itemList: [{
      url: "",
      name: '背景',
      desc: '背景图像、颜色、幻灯片'
    },{
      url: "",
      name: '颜色',
      desc: '主题色、透明效果、颜色主题'
    },{
      url: "",
      name: '主题',
      desc: '安装、创建、管理'
    },{
      url: "",
      name: '锁屏界面',
      desc: '锁定屏幕图像、应用和动画'
    },{
      url: "",
      name: '触摸键盘',
      desc: '主题、大小'
    },{
      url: "",
      name: '开始',
      desc: '最近使用的应用和项目、文件夹'
    },{
      url: "",
      name: '任务栏',
      desc: '任务栏行为，系统固定项'
    },{
      url: "",
      name: '字体',
      desc: '安装、管理'
    },{
      url: "",
      name: '设备使用情况',
      desc: '选择你计划使用设备的所有方法，以在 Microsoft 体验中获取个性化的提示、广告和建议'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Apps.webp'),
  name: '应用',
  children: [{
    title: '',
    itemList: [{
      url: "",
      name: '应用和功能',
      desc: '已安装的应用，应用执行别名'
    },{
      url: "",
      name: '默认应用',
      desc: '根据文件和链接种类设置的默认应用，其他默认应用'
    },{
      url: "",
      name: '离线地图',
      desc: '下载、存储位置、地图更新'
    },{
      url: "",
      name: '可选功能',
      desc: '你的设备的额外功能'
    },{
      url: "",
      name: '可打开网站的应用',
      desc: '可在应用而不是浏览器中打开的网站'
    },{
      url: "",
      name: '视频播放',
      desc: '视频调整、HDR流式处理、电池选项'
    },{
      url: "",
      name: '启动',
      desc: '登录时自动启动的应用程序'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Accounts.webp'),
  name: '账户',
  children: [{
    title: '',
    itemList: [{
      url: "",
      name: '你的 Microsoft 账户',
      desc: '订阅、奖励等'
    },{
      url: "",
      name: '账户信息',
      desc: '电子邮件、日历和联系人使用的账户'
    },{
      url: "",
      name: '电子邮件和账户',
      desc: '电子邮件、日历和联系人使用的账户'
    },{
      url: "",
      name: '登录选项',
      desc: 'Windows Hello、安全密钥、密码、动态锁'
    },{
      url: "",
      name: '家庭和其他用户',
      desc: '设备访问权限、工作或学校用户、'
    },{
      url: "",
      name: 'Windows 备份',
      desc: '备份文件、应用和首选项，以便跨设备将其还原'
    },{
      url: "",
      name: '连接工作或学校账户',
      desc: '电子邮件、应用和网络等组织资源'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Time&language.webp'),
  name: '时间和语言',
  children: [{
    title: '',
    itemList: [{
      url: "",
      name: '日期和时间',
      desc: '时区、自动时钟设置、日历显示'
    },{
      url: "",
      name: '语言和区域',
      desc: '根据你所在的区域设置 Windows 和某些应用的日期和时间格式'
    },{
      url: "",
      name: '输入',
      desc: '触摸键盘、文本建议、首选项'
    },{
      url: "",
      name: '语音',
      desc: '语音语言、语音识别麦克风设置、声音'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Gaming.webp'),
  name: '游戏',
  children: [{
    title: '',
    itemList: [{
      url: "",
      name: 'Xbox Game Bar',
      desc: '控制器和键盘快捷方式'
    },{
      url: "",
      name: '摄像',
      desc: '保存位置，录制首选项'
    },{
      url: "",
      name: '游戏模式',
      desc: '优化电脑以便畅玩'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Accessibility.webp'),
  name: '辅助功能',
  children: [{
    title: '视觉',
    itemList: [{
      url: "",
      name: '文本大小',
      desc: '在整个 Windows 和应用中显示的文本大小'
    },{
      url: "",
      name: '视觉效果',
      desc: '滚动条、透明度、动画、通知超时'
    },{
      url: "",
      name: '鼠标指针和触控',
      desc: '鼠标指针颜色、大小'
    },{
      url: "",
      name: '文本光标',
      desc: '外观和粗细、文本光标指示器'
    },{
      url: "",
      name: '对比度主题',
      desc: '弱视彩色主题、光敏度'
    }]
  },{
    title: '影像',
    itemList: [{
      url: "",
      name: '放大镜',
      desc: '放大镜阅读、缩放增量'
    },{
      url: "",
      name: '颜色滤镜',
      desc: '色盲滤镜、灰度、反转'
    },{
      url: "",
      name: '讲述人',
      desc: '声音、详细信息、键盘、盲文'
    }]
  },{
    title: '听力',
    itemList: [{
      url: "",
      name: '音频',
      desc: '单声道音频、音频通知'
    }]
  },{
    title: '聆听',
    itemList: [{
      url: "",
      name: '字母',
      desc: '样式'
    }]
  },{
    title: '交互',
    itemList: [{
      url: "",
      name: '语音',
      desc: 'Windows 语音识别、语音输入'
    },{
      url: "",
      name: '键盘',
      desc: '粘滞键、筛选键和切换键，屏幕键盘'
    },{
      url: "",
      name: '鼠标',
      desc: '鼠标键、速度、加速'
    },{
      url: "",
      name: '目视控制',
      desc: '眼动追踪仪，文本到语音转换'
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Privacy&security.webp'),
  name: '隐私和安全性',
  children: [{
    title: '安全性',
    itemList: [{
      url: "",
      name: 'Windows 安全中心',
      desc: '适用于你的设备的防病毒、浏览器、防火墙和网络保护'
    },{
      url: "",
      name: '查找我的设备',
      desc: '如果认为设备已丢失，请跟踪设备'
    },{
      url: "",
      name: '开发者选项',
      desc: '这些设置仅供开发者使用'
    }]
  },{
    title: 'Windows 权限',
    itemList: [{
      url: "",
      name: '常规',
      desc: '广告ID，本地内容，应用启动，设置建议，生产力工具'
    },{
      url: "",
      name: '语音',
      desc: '英语听写和其他基于语言的交互的在线语音识别'
    },{
      url: "",
      name: '墨迹书写和键入个性化',
      desc: '个人词典，词典中的字词'
    },{
      url: "",
      name: '诊断和反馈',
      desc: '诊断数据，墨迹书写和键入数据，定制体验，反馈频率'
    },{
      url: "",
      name: '活动历史记录',
      desc: '从你的跨设备和账户的活动历史记录中获取更多搜索结果的选项'
    },{
      url: "",
      name: '搜索权限',
      desc: '安全搜索、云内容搜索、搜索历史记录'
    },{
      url: "",
      name: '搜索 Windows',
      desc: '可更快得到搜索结果的搜索索引、“查找我的文件”、从搜索中排除的文件夹'
    }]
  },{
    title: '应用权限',
    itemList: [{
      url: "",
      name: '位置',
      desc: undefined
    },{
      url: "",
      name: '相机',
      desc: undefined
    },{
      url: "",
      name: '麦克风',
      desc: undefined
    },{
      url: "",
      name: '语音激活',
      desc: undefined
    },{
      url: "",
      name: '通知',
      desc: undefined
    },{
      url: "",
      name: '账户信息',
      desc: undefined
    },{
      url: "",
      name: '联系人',
      desc: undefined
    },{
      url: "",
      name: '日历',
      desc: undefined
    },{
      url: "",
      name: '电话呼叫',
      desc: undefined
    },{
      url: "",
      name: '通话记录',
      desc: undefined
    },{
      url: "",
      name: '电子邮件',
      desc: undefined
    },{
      url: "",
      name: '任务',
      desc: undefined
    },{
      url: "",
      name: '消息',
      desc: undefined
    },{
      url: "",
      name: '无线收发器',
      desc: undefined
    },{
      url: "",
      name: '其他设备',
      desc: undefined
    },{
      url: "",
      name: '应用诊断',
      desc: undefined
    },{
      url: "",
      name: '自动文件下载',
      desc: undefined
    },{
      url: "",
      name: '文档',
      desc: undefined
    },{
      url: "",
      name: '下载文件夹',
      desc: undefined
    },{
      url: "",
      name: '音乐库',
      desc: undefined
    },{
      url: "",
      name: '图片',
      desc: undefined
    },{
      url: "",
      name: '视频',
      desc: undefined
    },{
      url: "",
      name: '文件系统',
      desc: undefined
    },{
      url: "",
      name: '屏幕截图边框',
      desc: undefined
    },{
      url: "",
      name: '屏幕截图和应用',
      desc: undefined
    }]
  }]
}, {
  url: require('@/assets/icon/systemIcon/Windows Update.webp'),
  name: 'Windows 更新',
  children: [{
    title: '更多选项',
    itemList: [{
      url: "",
      name: '暂停更新',
      desc: ''
    },{
      url: "",
      name: '更新历史记录',
      desc: ''
    },{
      url: "",
      name: '高级选项',
      desc: '传递优化、可选更新、活跃时间以及其他更新设置'
    },{
      url: "",
      name: 'Windows 预览体验计划',
      desc: '获取 Windows 的预览版本，以分享有关新功能和更新的反馈'
    }]
  }]
}]
// 面包屑导航数据
const breadData = reactive(['系统'])

// 菜单按钮对应的右侧列表数据
const menuItemListData = shallowReactive({
  data: menuItemData[0]
})

const listBar = ref()
const clickedIndex = ref(0)
// 点击菜单项
const selectItem = (name:string,num: number) => {
  listBar.value.style.top = 10 + 40 * num + 'px'
  clickedIndex.value = num
  breadData[0] = name
  breadData.splice(1)
  menuItemListData.data = menuItemData[num]
}

// 修改样式
const setupBox = ref()
const myClass = ref('')
const changeSize = (name: string) => {
  setupBox.value.style.left = ''
  setupBox.value.style.top = ''
  if (!name && !myClass.value) {
    myClass.value = 'centerCenter'
    return
  }
  myClass.value = name
}

</script>

<style lang='scss' scoped>
@import "@/style/public";
.setupBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  color: #353535;
  transition: all 200ms ease-in;
  .mainBox{
    height: calc(100% - 58px);
  }
}
.titleBar {
  @include flex(space-between, center);
  margin-bottom: 18px;
  .barLeft {
    @include flex(flex-start, center);
    .n-icon {
      margin-left: 18px;
      margin-right: 20px;
    }
    span {
      font-size: 12px;
      color: #373737;
    }
  }
}
.n-layout {
  height: 100%;
  background-color: transparent;
  .n-layout-sider {
    width: 268px !important;
    background-color: inherit;
    margin-right: 40px;
    :deep(.n-layout-sider-scroll-container) {
      min-width: auto !important;
      padding-left: 16px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 2px;
        height: 303px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #7c7e86;
        border-radius: 1px;
      }
    }
  }
  :deep(.n-layout-scroll-container){
    overflow-x: initial;
  }
  .n-breadcrumb{
    margin-bottom: 30px;
  }
}
.userAbout {
  @include flex(flex-start, center);
  margin-bottom: 24px;
  img {
    width: 60px;
    margin-right: 12px;
  }
  .infoName {
    font-size: 14px;
    font-weight: bold;
    color: #212121;
  }
  .infoMail {
    text-decoration: none;
    font-size: 12px;
    color: #444444;
  }
}
.n-input {
  border: 1px solid #e4e4e4;
  border-bottom: 2px solid #0067c0;
  background-color: #fff !important;
  margin-bottom: 22px;
  ::-webkit-input-placeholder {
    color: #616161;
  }
  :deep(.n-input__input-el) {
    color: #333;
    &:focus {
      background-color: #fff;
    }
  }
}
.menuList {
  position: relative;
  .listItem {
    height: 36px;
    border-radius: 3px;
    margin-bottom: 4px;
    @include flex(flex-start, center);
    transition: background-color 200ms ease-in;
    &:hover {
      background-color: #eaeaea;
    }
    img {
      width: 18px;
      margin-left: 12px;
      margin-right: 16px;
    }
    div {
      font-size: 14px;
      color: #191919;
    }
  }
  .listItemBgC{
    background-color: #eaeaea;
  }
  .listBar {
    width: 3px;
    height: 16px;
    border-radius: 1px;
    background-color: #0067c0;
    position: absolute;
    left: 0;
    top: 10px;
    transition: top 150ms ease-in;
  }
}
.n-breadcrumb{
  :deep(ul){
    @include flex(flex-start,center);
  }
  :deep(.n-breadcrumb-item){
    @include flex(space-around,center);
    span{
      color: #5c5c5c;
    }
    .n-breadcrumb-item__link{
      font-size: 26px;
    }
    &:last-child span{
      color: #1a1a1a;
    }
  }
}
</style>