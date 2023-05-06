<template>
  <div class="containter width90">
    <h2>搜索结果</h2>
    <el-descriptions
        v-for="(item, index) in dataList"
        direction="vertical"
        border
        :key="index"
        :column="4">
      <el-descriptions-item label="标题"><el-link type="primary" @click="goToDetail(item)">{{item.title}}</el-link></el-descriptions-item>
      <el-descriptions-item label="类别" width="100px" align="center">
        <el-tag size="small" v-if="item.nanoid" type="warning" >文章</el-tag>
        <el-tag size="small" v-else type="success" >通知公告</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="所属板块" width="200px" align="center">{{ item.category }}</el-descriptions-item>
      <el-descriptions-item label="发布时间" width="200px" align="center">{{ item.addTime }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {searchAll} from "@/api/search";
const route = useRoute()
const router = useRouter()

onMounted(() => {
  getData()
})
const dataList = ref()
function getData() {
  const key = route.query.key
  const page = route.query.page
  const limit = route.query.limit
  const query = {
    key,
    page,
    limit
  }
  searchAll(query).then(res => {
    const { code, data } = res
    if(code === 200) {
      dataList.value = data
    }
  })
}

function goToDetail(item) {
  // 如果nanoid存在的话说明是一篇文章
  // uuid说明十一篇通知公告
  if(item.nanoid) {
    let routeData = router.resolve({ name: 'detailInformation', query: { nanoid: item.nanoid } });
    window.open(routeData.href, '_blank');
  } else if(item.uuid) {
    let routeData = router.resolve({ name: 'detailAnnouncement', query: { uuid: item.uuid } });
    window.open(routeData.href, '_blank');
  }
}

</script>

<style lang="less" scoped>
  .el-descriptions{
    margin-bottom: 15px;
  }
</style>