<template>
  <div class="width90 main">
    <el-row :gutter="10">
      <el-col :xs="screenOfXs" :sm="screenOfSm" :md="screenOfMd" :lg="screenOfLg" :xl="screenOfXl">
        <el-skeleton :rows="6" animated :throttle="500" :loading="loading" >
          <PlateItem title="新鲜出炉(更多)"></PlateItem>
        </el-skeleton>
      </el-col>

      <el-col :xs="screenOfXs" :sm="screenOfSm" :md="screenOfMd" :lg="screenOfLg" :xl="screenOfXl">
        <el-skeleton :rows="6" animated :throttle="500"  :loading="loading" >
          <PlateItem title="人气热门(更多)"></PlateItem>
        </el-skeleton>
      </el-col>

      <el-col :xs="screenOfXs" :sm="screenOfSm" :md="screenOfMd" :lg="screenOfLg" :xl="screenOfXl">
        <el-skeleton :rows="6" animated :throttle="500"  :loading="loading" >
          <PlateItem title="疑似灌水(更多)"></PlateItem>
        </el-skeleton>
      </el-col>

      <el-col :xs="screenOfXs" :sm="screenOfSm" :md="screenOfMd" :lg="screenOfLg" :xl="screenOfXl">
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
/** <768px 响应式栅格数或者栅格属性对象 */
const screenOfXs = ref(24)
/** ≥768px 响应式栅格数或者栅格属性对象 */
const screenOfSm = ref(12)
/** ≥992px 响应式栅格数或者栅格属性对象 */
const screenOfMd = ref(6)
/** ≥1200px 响应式栅格数或者栅格属性对象 */
const screenOfLg = ref(6)
/** ≥1920px 响应式栅格数或者栅格属性对象 */
const screenOfXl = ref(6)

onMounted(() => {
    setTimeout(()=>{loading.value = false}, 1000)
})


</script>

<style lang="less" scoped>
  .main{
    margin-top: 10px;
  }
</style>