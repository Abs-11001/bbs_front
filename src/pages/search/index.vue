<template>
  <div class="container width90">
    <h2 class="title">关于<span class="key">{{key}}</span>相关搜索结果</h2>
    <p class="total">共有{{ total }}条</p>
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
    <el-config-provider :locale="zhCn">
      <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="page"
          :total="total"
          @current-change="getData"
          @prev-click="getData"
          @next-click="getData"/>
    </el-config-provider>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {searchAll} from "@/api/search";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import {ElConfigProvider} from "element-plus";
const route = useRoute()
const router = useRouter()

onMounted(() => {
  getData()
})
const dataList = ref()
const page = ref(1)
const total = ref(0)
const key = route.query.key
function getData() {
  const query = {
    key,
    page: page.value
  }
  searchAll(query).then(res => {
    const { code, data } = res
    if(code === 200) {
      dataList.value = data.dataList
      total.value = data.total
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
  .title{
    font-size: 20px;
    color: #606266;
    .key{
      font-size: 2rem;
      color: black;
    }
  }
  .total{
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
  }
  .el-descriptions{
    margin-bottom: 15px;
  }
</style>