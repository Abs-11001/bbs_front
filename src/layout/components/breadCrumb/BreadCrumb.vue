<template>
  <div class="bread-crumb width90">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }"></el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/public">promotion management</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>


<script setup>

</script>

<style lang="less" scoped>
  .bread-crumb{
    margin-top: 5px;
  }
</style>