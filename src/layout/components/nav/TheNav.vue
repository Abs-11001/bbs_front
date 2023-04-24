<template>
  <div id="nav">
    <div class="nav-content width90">
      <el-menu mode="horizontal" :default-active="activeMenu" class="nav-box" router>
          <el-menu-item index="/home" >首页</el-menu-item>
          <!--          <el-menu-item index="/announcement/newAnnouncement">校内通知</el-menu-item>-->
          <el-sub-menu index="/announcement">
            <template #title>校内通知</template>
            <el-menu-item index="/announcement/newAnnouncement">最新公告</el-menu-item>
            <el-menu-item index="/announcement/allAnnouncement">全部公告</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/informationSharing">信息共享</el-menu-item>
          <el-menu-item index="4">跳蚤市场</el-menu-item>
          <el-menu-item index="6">互帮互助</el-menu-item>
          <el-menu-item index="5">暨阳树洞</el-menu-item>
      </el-menu>
      <el-button :icon="EditPen" color="#e8f5e9" @click="toEditor">写文章</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {useRoute, useRouter} from "vue-router";
import {EditPen} from "@element-plus/icons-vue";

const route = useRoute()
const router = useRouter()
const activeMenu = ref('/')

onMounted(() => {
  setTimeout(() => {
    // 将route的获取放到宏任务中才能正常获取到path，不然就是一直获取到 "/"
    // const path = route.path
    const path = window.location.href
    if(path === '/') activeMenu.value = '/home'
    if(path.indexOf('home') !== -1) activeMenu.value = '/home'
    if(path.indexOf('announcement') !== -1) activeMenu.value = '/announcement/newAnnouncement'
    if(path.indexOf('informationSharing') !== -1) activeMenu.value = '/informationSharing'
  }, 0)
})

function toEditor() {
  router.push({
    name: 'editor'
  })
}
</script>

<style lang="less" scoped>
  .nav-content{
    position: relative;
    .nav-box {
      .el-menu-item {
        width: 100px;
      }
    }
    .el-button{
      position: absolute;
      top: 10px;
      right: 0;
    }
  }
</style>