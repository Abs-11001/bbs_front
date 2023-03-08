<template>
  <div class="width90">
    <div class="search-box">
      <el-input
          v-model="search"
          class="w-50 m-2"
          placeholder="请输入要查询的内容"
          :suffix-icon="Search"/>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  const search = ref('')
</script>

<style lang="less" scoped>
  .search-box{
    width: 300px;
  }
</style>