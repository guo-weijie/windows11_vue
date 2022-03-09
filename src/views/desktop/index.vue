<template>
  <div class="desktop" @click="toLogin">我是桌面</div>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'
const router=useRouter()
  function toLogin(){
    router.push('/login?status=logout')
  }
</script>

<style lang="scss" scoped></style>