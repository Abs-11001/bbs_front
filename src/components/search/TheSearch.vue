<template>
  <div class="search-content width90">
    <div class="search-box">
      <div class="search-input">
        <el-input
            v-model.trim="search"
            class="w-50 m-2"
            clearable
            placeholder="请输入要查询的内容">
          <template #append>
            <el-button :icon="Search"/>
          </template>
        </el-input>
      </div>
      <div class="hot-words">
        <span>热搜：</span>
        <el-link type="primary" target="_blank">我是校园</el-link>
        <el-link type="primary" target="_blank">暨阳致用</el-link>
        <el-link type="primary" target="_blank">我是校园</el-link>
        <el-link type="primary" target="_blank">暨阳致用</el-link>
        <el-link type="primary" target="_blank">我是校园</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  const search = ref('')
</script>

<style lang="less" scoped>
  .search-content{
    margin-top: 5px;
    .search-box{
      display: flex;
      .search-input{
        width: 30%;
      }
      .hot-words{
        display: flex;
        align-items: center;
        margin-left: 15px;
        span{
          font-weight: 700;
        }
        .el-link{
          margin: 0 5px;
        }
      }
      @media screen and (max-width: 480px){
        .hot-words{
          display: none;
        }
        .search-input{
          width: 60%;
        }
      }
    }
  }
</style>