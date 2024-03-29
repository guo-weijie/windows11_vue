<template>
  <div class="appContainer" ref="setupBox" @click.stop="setupFn">
    <!-- 标题栏 -->
    <TitleBlock title="设置"></TitleBlock>
    <!-- 主体 -->
    <div class="mainBox">
      <n-layout has-sider>
        <n-layout-sider>
          <div class="userAbout">
            <img :src="require('@/assets' + userAvatar)" :alt="userName" />
            <div class="aboutInfo">
              <div class="infoName">{{  userName  }}</div>
              <div class="infoMail">Administrator</div>
            </div>
          </div>
          <n-input placeholder="查找设置">
            <template #suffix>
              <n-icon>
                <svg t="1648455446977" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="9170" width="32" height="32">
                  <path
                    d="M599.703537 0C369.67788 0 182.54192 187.139189 182.54192 417.161616c0 109.944193 42.773473 210.070729 112.526937 284.666838L7.141304 989.756008l34.240731 34.24396 288.750803-288.750803c72.759133 61.756643 166.880789 99.074068 269.56747 99.074068 230.022428 0 417.158388-187.139189 417.158388-417.161616S829.725964 0 599.703537 0zM599.703537 785.896779c-203.32331 0-368.735163-165.411853-368.735163-368.735163S396.380227 48.426454 599.703537 48.426454c203.320081 0 368.731934 165.411853 368.731934 368.735163S803.020389 785.896779 599.703537 785.896779z"
                    p-id="9171" fill="#3a3a3a" />
                </svg>
              </n-icon>
            </template>
          </n-input>
          <!-- 菜单列表 -->
          <div class="menuList">
            <div class="listItem" :class="{ listItemBgC: index === clickedIndex }" v-for="(item, index) in menuItemData"
              :key="item.name" @click="selectItem(item.name, index)">
              <img :src="item.url" :alt="item.name" />
              <div>{{  item.name  }}</div>
            </div>
            <div class="listBar" ref="listBar"></div>
          </div>
        </n-layout-sider>
        <n-layout>
          <n-layout-content>
            <!-- 顶部面包屑 -->
            <n-breadcrumb>
              <n-breadcrumb-item v-for="item in breadData" :key="item">
                {{  item  }}
                <template #separator>
                  <n-icon size="14" color="#5c5c5c">
                    <ChevronRight20Regular />
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
import { ChevronRight20Regular } from '@vicons/fluent'
// import NavBarRight from '@/components/navBarRight/index.vue'
import { reactive, ref, shallowReactive, nextTick, onMounted } from 'vue';
import MenuItemList from './components/menuItemList.vue'
import bus from '@/utils/bus'
import { userStore } from '@/store/user'
import { appStore } from '@/store/app'
import TitleBlock from '@/components/titleBlock'

const uStore = userStore()
const aStore = appStore()
const userAvatar = uStore.getUserAvatar
const userName = uStore.getUserName

const menuItemData = [{
  url: require('@/assets/icon/systemIcon/System.webp'),
  name: '系统',
  children: [{
    title: undefined,
    itemList: [{
      url: require('@/assets/icon/setUp/system/view.png'),
      name: '显示',
      desc: '显示器、亮度、夜间模式、显示配置文件'
    }, {
      url: require('@/assets/icon/setUp/system/sound.png'),
      name: '声音',
      desc: '音量级别、输出、声音设备'
    }, {
      url: require('@/assets/icon/setUp/system/notice.png'),
      name: '通知',
      desc: '来自应用和系统的警报'
    }, {
      url: require('@/assets/icon/setUp/system/focusAssist.png'),
      name: '专注助手',
      desc: '通知、自动规则'
    }, {
      url: require('@/assets/icon/setUp/system/Power&battery.png'),
      name: '电源',
      desc: '睡眠、电池使用情况、节电模式'
    }, {
      url: require('@/assets/icon/setUp/system/storage.png'),
      name: '存储',
      desc: '存储空间、驱动器、配置规则'
    }, {
      url: require('@/assets/icon/setUp/system/multiTasking.png'),
      name: '多任务处理',
      desc: '贴靠窗口、桌面、任务切换'
    }, {
      url: require('@/assets/icon/setUp/system/activation.png'),
      name: '激活',
      desc: '激活状态、订阅、产品密钥'
    }, {
      url: require('@/assets/icon/setUp/system/troubleshoot.png'),
      name: '疑难解答',
      desc: '建议的疑难解答、首选项和历史记录'
    }, {
      url: require('@/assets/icon/setUp/system/recovery.png'),
      name: '恢复',
      desc: '重置、高级启动、返回'
    }, {
      url: require('@/assets/icon/setUp/system/projectingToThisPC.png'),
      name: '投影到此电脑',
      desc: '权限、配对PIN、可发现性'
    }, {
      url: require('@/assets/icon/setUp/system/remoteDesktop.png'),
      name: '远程桌面',
      desc: '远程桌面用户，连接权限'
    }, {
      url: require('@/assets/icon/setUp/system/clipboard.png'),
      name: '剪贴板',
      desc: '剪切和复制历史记录、同步、清除'
    }, {
      url: require('@/assets/icon/setUp/system/about.png'),
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
      url: require('@/assets/icon/setUp/bluetooth/devices.png'),
      name: '设备',
      desc: '鼠标、键盘、触笔、音频、显示器和扩展坞、其他设备'
    }, {
      url: require('@/assets/icon/setUp/bluetooth/printersScanners.png'),
      name: '打印机和扫描仪',
      desc: '首选项、疑难解答'
    }, {
      url: require('@/assets/icon/setUp/bluetooth/yourPhone.png'),
      name: '你的手机',
      desc: '立即获取 Android 设备的照片、短信及其他'
    }, {
      url: require('@/assets/icon/setUp/bluetooth/cameras.png'),
      name: '照相机',
      desc: '连接的相机、默认图像设置'
    }, {
      url: require('@/assets/icon/setUp/bluetooth/mouse.png'),
      name: '鼠标',
      desc: '按钮、鼠标指针速度、滚动'
    }, {
      url: require('@/assets/icon/setUp/bluetooth/penWindowsInk.png'),
      name: '笔和 Windows Ink',
      desc: '右手或左手、笔按钮快捷方式、手写'
    }, {
      url: require('@/assets/icon/setUp/bluetooth/autoPlay.png'),
      name: '自动播放',
      desc: '可移动驱动器和内存的默认设置'
    }, {
      url: require('@/assets/icon/setUp/bluetooth/usb.png'),
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
      url: require('@/assets/icon/setUp/network/ethernet.png'),
      name: '以太网',
      desc: '身份验证，IP 和 DNS 设置，按流量计费的网络'
    }, {
      url: require('@/assets/icon/setUp/network/VPN.png'),
      name: 'VPN',
      desc: '添加、连接、管理'
    }, {
      url: require('@/assets/icon/setUp/network/proxy.png'),
      name: '代理',
      desc: '用于 Wi-Fi 和以太网连接的代理服务器'
    }, {
      url: require('@/assets/icon/setUp/network/dial-up.png'),
      name: '拨号',
      desc: '设置拨号 Internet 连接'
    }, {
      url: require('@/assets/icon/setUp/network/advancedNetworkSettings.png'),
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
      url: require('@/assets/icon/setUp/individualization/background.png'),
      name: '背景',
      desc: '背景图像、颜色、幻灯片'
    }, {
      url: require('@/assets/icon/setUp/individualization/colours.png'),
      name: '颜色',
      desc: '主题色、透明效果、颜色主题'
    }, {
      url: require('@/assets/icon/setUp/individualization/theme.png'),
      name: '主题',
      desc: '安装、创建、管理'
    }, {
      url: require('@/assets/icon/setUp/individualization/lockScreen.png'),
      name: '锁屏界面',
      desc: '锁定屏幕图像、应用和动画'
    }, {
      url: require('@/assets/icon/setUp/individualization/touchKeyboard.png'),
      name: '触摸键盘',
      desc: '主题、大小'
    }, {
      url: require('@/assets/icon/setUp/individualization/start.png'),
      name: '开始',
      desc: '最近使用的应用和项目、文件夹'
    }, {
      url: require('@/assets/icon/setUp/individualization/taskbar.png'),
      name: '任务栏',
      desc: '任务栏行为，系统固定项'
    }, {
      url: require('@/assets/icon/setUp/individualization/fonts.png'),
      name: '字体',
      desc: '安装、管理'
    }, {
      url: require('@/assets/icon/setUp/individualization/deviceUsage.png'),
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
      url: require('@/assets/icon/setUp/app/appsFeatures.png'),
      name: '应用和功能',
      desc: '已安装的应用，应用执行别名'
    }, {
      url: require('@/assets/icon/setUp/app/defaultApps.png'),
      name: '默认应用',
      desc: '根据文件和链接种类设置的默认应用，其他默认应用'
    }, {
      url: require('@/assets/icon/setUp/app/offlineMaps.png'),
      name: '离线地图',
      desc: '下载、存储位置、地图更新'
    }, {
      url: require('@/assets/icon/setUp/app/optionalFeatures.png'),
      name: '可选功能',
      desc: '你的设备的额外功能'
    }, {
      url: require('@/assets/icon/setUp/app/appsForWesites.png'),
      name: '可打开网站的应用',
      desc: '可在应用而不是浏览器中打开的网站'
    }, {
      url: require('@/assets/icon/setUp/app/videoPlayback.png'),
      name: '视频播放',
      desc: '视频调整、HDR流式处理、电池选项'
    }, {
      url: require('@/assets/icon/setUp/app/startup.png'),
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
      url: require('@/assets/icon/setUp/account/yourMicrosoftAccount.png'),
      name: '你的 Microsoft 账户',
      desc: '订阅、奖励等'
    }, {
      url: require('@/assets/icon/setUp/account/yourInfo.png'),
      name: '账户信息',
      desc: '电子邮件、日历和联系人使用的账户'
    }, {
      url: require('@/assets/icon/setUp/account/emailAccounts.png'),
      name: '电子邮件和账户',
      desc: '电子邮件、日历和联系人使用的账户'
    }, {
      url: require('@/assets/icon/setUp/account/sign-inOptions.png'),
      name: '登录选项',
      desc: 'Windows Hello、安全密钥、密码、动态锁'
    }, {
      url: require('@/assets/icon/setUp/account/familyOtherUsers.png'),
      name: '家庭和其他用户',
      desc: '设备访问权限、工作或学校用户、'
    }, {
      url: require('@/assets/icon/setUp/account/windowsBackup.png'),
      name: 'Windows 备份',
      desc: '备份文件、应用和首选项，以便跨设备将其还原'
    }, {
      url: require('@/assets/icon/setUp/account/accessWorkOrSchool.png'),
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
      url: require('@/assets/icon/setUp/time&lang/dateTime.png'),
      name: '日期和时间',
      desc: '时区、自动时钟设置、日历显示'
    }, {
      url: require('@/assets/icon/setUp/time&lang/languageRegion.png'),
      name: '语言和区域',
      desc: '根据你所在的区域设置 Windows 和某些应用的日期和时间格式'
    }, {
      url: require('@/assets/icon/setUp/time&lang/typing.png'),
      name: '输入',
      desc: '触摸键盘、文本建议、首选项'
    }, {
      url: require('@/assets/icon/setUp/time&lang/speech.png'),
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
      url: require('@/assets/icon/setUp/game/xboxGameBar.png'),
      name: 'Xbox Game Bar',
      desc: '控制器和键盘快捷方式'
    }, {
      url: require('@/assets/icon/setUp/game/captures.png'),
      name: '摄像',
      desc: '保存位置，录制首选项'
    }, {
      url: require('@/assets/icon/setUp/game/gameMode.png'),
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
      url: require('@/assets/icon/setUp/auxiliaryFunction/textSize.png'),
      name: '文本大小',
      desc: '在整个 Windows 和应用中显示的文本大小'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/visualEffects.png'),
      name: '视觉效果',
      desc: '滚动条、透明度、动画、通知超时'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/mousePointerAndTouch.png'),
      name: '鼠标指针和触控',
      desc: '鼠标指针颜色、大小'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/textCursor.png'),
      name: '文本光标',
      desc: '外观和粗细、文本光标指示器'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/contrastThemes.png'),
      name: '对比度主题',
      desc: '弱视彩色主题、光敏度'
    }]
  }, {
    title: '影像',
    itemList: [{
      url: require('@/assets/icon/setUp/auxiliaryFunction/magnifier.png'),
      name: '放大镜',
      desc: '放大镜阅读、缩放增量'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/colourFilters.png'),
      name: '颜色滤镜',
      desc: '色盲滤镜、灰度、反转'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/narrator.png'),
      name: '讲述人',
      desc: '声音、详细信息、键盘、盲文'
    }]
  }, {
    title: '听力',
    itemList: [{
      url: require('@/assets/icon/setUp/auxiliaryFunction/audio.png'),
      name: '音频',
      desc: '单声道音频、音频通知'
    }]
  }, {
    title: '聆听',
    itemList: [{
      url: require('@/assets/icon/setUp/auxiliaryFunction/captions.png'),
      name: '字幕',
      desc: '样式'
    }]
  }, {
    title: '交互',
    itemList: [{
      url: require('@/assets/icon/setUp/auxiliaryFunction/speech.png'),
      name: '语音',
      desc: 'Windows 语音识别、语音输入'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/keyboard.png'),
      name: '键盘',
      desc: '粘滞键、筛选键和切换键，屏幕键盘'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/mouse.png'),
      name: '鼠标',
      desc: '鼠标键、速度、加速'
    }, {
      url: require('@/assets/icon/setUp/auxiliaryFunction/eyeControl.png'),
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
      url: require('@/assets/icon/setUp/privacy&security/windowsSecurity.png'),
      name: 'Windows 安全中心',
      desc: '适用于你的设备的防病毒、浏览器、防火墙和网络保护'
    }, {
      url: require('@/assets/icon/setUp/privacy&security/findMyDevice.png'),
      name: '查找我的设备',
      desc: '如果认为设备已丢失，请跟踪设备'
    }, {
      url: require('@/assets/icon/setUp/privacy&security/forDevelopers.png'),
      name: '开发者选项',
      desc: '这些设置仅供开发者使用'
    }]
  }, {
    title: 'Windows 权限',
    itemList: [{
      url: require('@/assets/icon/setUp/privacy&security/general.png'),
      name: '常规',
      desc: '广告ID，本地内容，应用启动，设置建议，生产力工具'
    }, {
      url: require('@/assets/icon/setUp/privacy&security/speech.png'),
      name: '语音',
      desc: '英语听写和其他基于语言的交互的在线语音识别'
    }, {
      url: require('@/assets/icon/setUp/privacy&security/inkingTypingPersonalisation.png'),
      name: '墨迹书写和键入个性化',
      desc: '个人词典，词典中的字词'
    }, {
      url: require('@/assets/icon/setUp/privacy&security/diagnosticAmpFeedback.png'),
      name: '诊断和反馈',
      desc: '诊断数据，墨迹书写和键入数据，定制体验，反馈频率'
    }, {
      url: require('@/assets/icon/setUp/privacy&security/activityHistory.png'),
      name: '活动历史记录',
      desc: '从你的跨设备和账户的活动历史记录中获取更多搜索结果的选项'
    }, {
      url: require('@/assets/icon/setUp/privacy&security/searchPermissions.png'),
      name: '搜索权限',
      desc: '安全搜索、云内容搜索、搜索历史记录'
    }, {
      url: require('@/assets/icon/setUp/privacy&security/searchingWindows.png'),
      name: '搜索 Windows',
      desc: '可更快得到搜索结果的搜索索引、“查找我的文件”、从搜索中排除的文件夹'
    }]
  }, {
    title: '应用权限',
    itemList: [{
      url: require('@/assets/icon/setUp/privacy&security/location.png'),
      name: '位置',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/camera.png'),
      name: '相机',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/microphone.png'),
      name: '麦克风',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/voiceActivation.png'),
      name: '语音激活',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/notification.png'),
      name: '通知',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/accountInfo.png'),
      name: '账户信息',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/contact.png'),
      name: '联系人',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/calendar.png'),
      name: '日历',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/phoneCalls.png'),
      name: '电话呼叫',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/callHistory.png'),
      name: '通话记录',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/email.png'),
      name: '电子邮件',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/tasks.png'),
      name: '任务',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/messaging.png'),
      name: '消息',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/radios.png'),
      name: '无线收发器',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/otherDevices.png'),
      name: '其他设备',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/appDiagnostics.png'),
      name: '应用诊断',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/automaticFileDownloads.png'),
      name: '自动文件下载',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/documents.png'),
      name: '文档',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/downloadsFolder.png'),
      name: '下载文件夹',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/musicLibrary.png'),
      name: '音乐库',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/pictures.png'),
      name: '图片',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/videos.png'),
      name: '视频',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/fileSystem.png'),
      name: '文件系统',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/pictures.png'),
      name: '屏幕截图边框',
      desc: undefined
    }, {
      url: require('@/assets/icon/setUp/privacy&security/screenshotAndApps.png'),
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
      url: require('@/assets/icon/setUp/update/pauseUpdates.png'),
      name: '暂停更新',
      desc: ''
    }, {
      url: require('@/assets/icon/setUp/update/updateHistory.png'),
      name: '更新历史记录',
      desc: ''
    }, {
      url: require('@/assets/icon/setUp/update/advancedOptions.png'),
      name: '高级选项',
      desc: '传递优化、可选更新、活跃时间以及其他更新设置'
    }, {
      url: require('@/assets/icon/setUp/update/windowsInsiderProgramme.png'),
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
const selectItem = (name: string, num: number) => {
  listBar.value.style.top = 10 + 40 * num + 'px'
  clickedIndex.value = num
  breadData[0] = name
  breadData.splice(1)
  menuItemListData.data = menuItemData[num]
}

// 修改样式
const setupBox = ref()

const setupFn = async () => {
  await nextTick()
  setupBox.value.style.zIndex = aStore.zIndex
  aStore.changeZIndex()
}

onMounted(() => {
  setupFn()
})

bus.on('设置', setupFn)



</script>

<style lang='scss' scoped>
@import "@/style/public";

.mainBox {
  height: calc(100% - 58px);
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
        background-color: var(--global-scrollbar-color);
        border-radius: 1px;
      }
    }
  }

  :deep(.n-layout-scroll-container) {
    overflow-x: initial;
  }

  .n-breadcrumb {
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
    color: var(--set-second-top-font-color);
  }

  .infoMail {
    text-decoration: none;
    font-size: 12px;
    color: var(--set-second-desc-font-color);
  }
}

.n-input {
  border: 1px solid var(--global-searchbox-border);
  border-bottom: 2px solid var(--global-theme-color);
  background-color: var(--global-background-color) !important;
  margin-bottom: 22px;

  ::-webkit-input-placeholder {
    color: var(--global-placeholder-font-color);
  }

  :deep(.n-input__input-el) {
    &:focus {
      background-color: var(--global-background-color);
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
      background-color: var(--set-first-select-bg-color);
    }

    img {
      width: 18px;
      margin-left: 12px;
      margin-right: 16px;
    }

    div {
      font-size: 14px;
    }
  }

  .listItemBgC {
    background-color: var(--set-first-select-bg-color);
  }

  .listBar {
    width: 3px;
    height: 16px;
    border-radius: 1px;
    background-color: var(--global-theme-color);
    position: absolute;
    left: 0;
    top: 10px;
    transition: top 150ms ease-in;
  }
}

.n-breadcrumb {
  :deep(ul) {
    @include flex(flex-start, center);
  }

  :deep(.n-breadcrumb-item) {
    @include flex(space-around, center);

    .n-breadcrumb-item__link {
      font-size: 26px;
    }
  }
}
</style>