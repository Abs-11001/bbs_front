<template>
  <div class="width90 main">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <el-skeleton :rows="6" animated :throttle="500" :loading="loading" >
          <PlateItem title="新鲜出炉(更多)"></PlateItem>
        </el-skeleton>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <el-skeleton :rows="6" animated :throttle="500"  :loading="loading" >
          <PlateItem title="人气热门(更多)"></PlateItem>
        </el-skeleton>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <el-skeleton :rows="6" animated :throttle="500"  :loading="loading" >
          <PlateItem title="疑似灌水(更多)"></PlateItem>
        </el-skeleton>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
        <el-skeleton :rows="6" animated :throttle="500"  :loading="loading" >
          <PlateItem title="疑似灌水(更多)"></PlateItem>
        </el-skeleton>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PlateItem from "@/pages/home/plate/PlateItem.vue";

const loading = ref(true)

onMounted(() => {
    setTimeout(()=>{loading.value = false}, 1000)
})

</script>

<style lang="less" scoped>
  .main{
    margin-top: 10px;
  }
</style>