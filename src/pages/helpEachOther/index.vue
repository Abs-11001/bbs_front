<template>
  <div class="container width90" >
    <div class="top">
      <el-button :icon="EditPen" color="#e8f5e9" @click="toEditor">写文章</el-button>
      <el-config-provider :locale="zhCn">
        <el-pagination
            background
            layout="prev, pager, next"
            v-model:current-page="query.page"
            :total="query.total"
            @current-change="loadList"
            @prev-click="loadList"
            @next-click="loadList"/>
      </el-config-provider>
    </div>
    <el-skeleton :rows="10" animated :throttle="500" :loading="loading" >
      <article-section-component v-for="item in latestData" :key="item.id" :data="item"></article-section-component>
    </el-skeleton>
    <el-config-provider :locale="zhCn">
      <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="query.page"
          :total="query.total"
          @current-change="loadList"
          @prev-click="loadList"
          @next-click="loadList"/>
    </el-config-provider>
  </div>
</template>

<script setup>
import {reactive, ref, onMounted} from "vue";
import {useRouter} from 'vue-router'
import { getArticleList } from "@/api/article"
import {ElConfigProvider, ElMessage} from "element-plus";
import ArticleSectionComponent from "@/components/article/ArticleSectionComponent.vue";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import {EditPen} from "@element-plus/icons-vue";

const router = useRouter()

// 加载状态控制
const loading = ref(true)
// 挂在完毕加载数据
onMounted(() => {
  loadList()
})

const activeName = ref('latest')

// 最新数据
const latestData = ref([])

// 查询条件
const query = reactive({
  category: '互帮互助',
  page: 1,
  limit: 10,
  total: 0
})

// 用来标识数据是否全部加载
let moreFlag = true

// 加载数据
function loadList() {
  getArticleList(query).then(res => {
    loading.value = false
    const { code, data } = res
    if(code === 200) {
      const showData = data['dataList'].filter(item => item.del === false)
      latestData.value = [...showData]
      query.total = data.total
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
}

function toEditor() {
  router.push({
    name: 'editor'
  })
}
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
.top{
    display: flex;
    justify-content: space-between;

}
.el-pagination{
    justify-content: right;
}
</style>