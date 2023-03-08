<template>
  <div id="nav">
    <div class="nav-content width90">
      <el-menu mode="horizontal" default-active="1" class="nav-box">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">校内通知</el-menu-item>
          <el-menu-item index="3">信息共享</el-menu-item>
          <el-menu-item index="4">跳蚤市场</el-menu-item>
          <el-menu-item index="6">互帮互助</el-menu-item>
          <el-menu-item index="5">暨阳树洞</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
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