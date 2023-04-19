<template>
  <div id="nav">
    <div class="nav-content width90">
      <el-menu mode="horizontal" :default-active="activeMenu" class="nav-box" router>
          <el-menu-item index="/home" >首页</el-menu-item>
<!--          <el-menu-item index="/announcement/newAnnouncement">校内通知</el-menu-item>-->
          <el-sub-menu index="/announcement">
            <template #title>校内通知</template>
            <el-menu-item index="/announcement/newAnnouncement">最新通知</el-menu-item>
            <el-menu-item index="/announcement/allAnnouncement">全部通知</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/3">信息共享</el-menu-item>
          <el-menu-item index="4">跳蚤市场</el-menu-item>
          <el-menu-item index="6">互帮互助</el-menu-item>
          <el-menu-item index="5">暨阳树洞</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {useRoute} from "vue-router";

const route = useRoute()
const activeMenu = ref('/')

onMounted(() => {
  setTimeout(() => {
    // 将route的获取放到宏任务中才能正常获取到path，不然就是一直获取到 "/"
    // const path = route.path
    const path = window.location.href
    console.log(path)
    if(path === '/') activeMenu.value = '/home'
    if(path.indexOf('home') !== -1) activeMenu.value = '/home'
    if(path.indexOf('announcement') !== -1) activeMenu.value = '/announcement/newAnnouncement'
  }, 0)
})
</script>

<style lang="less" scoped>
  .nav-content{
    .nav-box {
      .el-menu-item {
        width: 100px;
      }
    }
  }
</style>