<template>
  <div class="container width90" >
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="最新" name="latest" v-infinite-scroll="loadLatest">
        <el-skeleton :rows="5" animated :throttle="500" :loading="loading" >
          <article-section-component v-for="item in latestData" :key="item.id" :data="item"></article-section-component>
        </el-skeleton>
      </el-tab-pane>
      <el-tab-pane label="最热" name="hottest">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, onMounted} from "vue";
import { getArticleList } from "@/api/article"
import {ElMessage} from "element-plus";
import ArticleSectionComponent from "@/components/article/ArticleSectionComponent.vue";

// 加载状态控制
const loading = ref<boolean>(true)
// 挂在完毕加载数据
onMounted(() => {
  loadList()
})

const activeName = ref('latest')

// 最新数据
const latestData = ref([])

// 查询条件
const query = reactive({
  category: '暨阳树洞',
  page: 1,
  limit: 10
})

// 用来标识数据是否全部加载
let moreFlag = true

// 加载数据
const loadList = () => getArticleList(query).then(res => {
  loading.value = false
  const { code, data } = res
  if(code === 200) {
    const showData = data['dataList'].filter(item => item.del === false)
    latestData.value = [...latestData.value, ...showData]
  }
  else {
    // 如果code不是200 就设数据加载完成了
    moreFlag = false
    ElMessage({
      message: '加载失败...',
      type: 'error',
    })
  }
}, err => {
  moreFlag = false
  console.log(err)
  loading.value = false
})
const loadLatest = () => {
  console.log(moreFlag)
  if(moreFlag) {
    query.page += 1
    loadList()
  } else {
    ElMessage({
      message: '已经到底啦...',
      type: 'warning',
    })
  }
}
</script>

<style scoped>

</style>