<template>
  <transition name="goingHome" @animationend="toHome">
    <div class="screenBg" v-show="isShow">
      <div class="screenContent" @click="isShow = false">
        <div class="content">
          <div class="headPic"></div>
          <div class="userName">
            {{  userName  }}
          </div>
          <div :class="{ 'login': status === '登录', 'welcome': status === '欢迎' }">{{  status  }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue'
import { userStore } from '@/store/user'

const store = userStore()
const route = useRoute()
const router = useRouter()
const status: string = route.query.status ? '登录' : '欢迎'
const userName = store.getUserName
function toHome() {
  router.push('/home')
}
document.onkeydown = function (e) {
  if (e.key === 'Enter') {
    isShow.value = false
  }
}
const isShow = ref(true)
</script>

<style lang="scss" scoped>
@import "@/style/public";

@mixin size {
  width: 100%;
  height: 100%;
}

.screenBg {
  @include size();
  background: url("@/assets/wallpaper/login.jpg") no-repeat center/cover;
}

.screenContent {
  @include size();
  @include flex(center, flex-start);
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
}

.content {
  margin-top: 268px;
}

.headPic {
  width: 0;
  height: 0;
  padding-left: 165px;
  padding-top: 165px;
  border-radius: 50%;
  background: url("~@/assets/icon/avatar.png") no-repeat center/cover;
  margin-bottom: 16px;
}

.userName {
  font-size: 24px;
  color: #f6f7fc;
  margin-bottom: 39px;
}

.login {
  font-size: 12px;
  color: #b9c0ea;
  cursor: pointer;
}

.welcome {
  font-size: 20px;
  color: #ffffff;
}

.goingHome-leave-active {
  animation: leave 150ms ease;
}

@keyframes leave {
  0% {
    transform: translateY(-8%);
    opacity: 1;
  }

  20% {
    transform: translateY(-16%);
    opacity: .8;
  }

  40% {
    transform: translateY(-24%);
    opacity: .6;
  }

  60% {
    transform: translateY(-32%);
    opacity: .4;
  }

  80% {
    transform: translateY(-40%);
    opacity: .2;
  }

  100% {
    transform: translateY(-48%);
    opacity: 0;
  }
}
</style>