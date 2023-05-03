<template>
  <div class="width90 main" v-loading.fullscreen.lock="fullscreenLoading">
    <the-carousel/>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-skeleton :rows="10" animated :throttle="500" :loading="loading" >
          <div class="plate">
            <div class="container">
              <div class="title-box">
                <h3 class="title">新鲜出炉</h3>
              </div>
              <div class="content-box">
                <el-card shadow="hover" v-for="item in data.latest" @click="goToDetail(item.nanoid)" :key="item.idx">
                  <div class="left">
                    <div class="content-title">{{ item.title }}</div>
                    <div class="content-view">
                      <el-icon><View /></el-icon>{{ item.view }}
                    </div>
                  </div>
                  <div class="right">
                    <div class="content-publish-time">{{ item.publishTime }}</div>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-skeleton>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-skeleton :rows="10" animated :throttle="500"  :loading="loading" >
          <div class="plate">
            <div class="container">
              <div class="title-box">
                <h3 class="title">人气热门</h3>
              </div>
              <div class="content-box">
                <el-card shadow="hover" v-for="item in data.hottest" @click="goToDetail(item.nanoid)" :key="item.idx">
                  <div class="left">
                    <div class="content-title">{{ item.title }}</div>
                    <div class="content-view">
                      <el-icon><View /></el-icon>{{ item.view }}
                    </div>
                  </div>
                  <div class="right">
                    <div class="content-publish-time">{{ item.publishTime }}</div>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-skeleton>
      </el-col>
    </el-row>
    <div class="load-more">
      <el-link :disabled="notMore" @click="loadMore">{{ tips }}</el-link>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue'
import { useRouter } from "vue-router";
import TheCarousel from "@/layout/components/carousel/TheCarousel.vue";
import {getHomeArticle} from "@/api/article";
import {View} from "@element-plus/icons-vue";

// 骨架屏加载控制
const loading = ref(true)
// 全局加载控制
const fullscreenLoading = ref(false)

// 是否还有更多数据加载
const notMore = ref(false)
const tips = ref("加载更多...")

onMounted(() => {
    getData()
})

const data = reactive({
  latest: [],
  hottest: []
})

// 查询参数
const query = reactive({
  page: 1,
  limit: 5
})

function getData() {
  // 首次不显示全局load，之后加载才会有全局loading
  if(loading.value === false) fullscreenLoading.value = true
  getHomeArticle(query).then(res => {
    loading.value = false
    fullscreenLoading.value = false
    const { data: {latestList, hottestList} } = res
    if(latestList.length === 0 && hottestList.length === 0) {
      notMore.value = true
      tips.value = '没有更多数据了...'
    }
    data.latest.push(...latestList)
    data.hottest.push(...hottestList)
  })
}
function loadMore() {
  query.page += 1
  getData()
}

const router = useRouter()
// 跳转文章详情
const goToDetail = (nanoid) => {
  let routeData = router.resolve({ name: 'detailInformation', query: { nanoid } });
  window.open(routeData.href, '_blank');
}
</script>

<style lang="less" scoped>
  .main{
    margin-top: 10px;
    min-height: calc(100vh - 325px);
  }
  .plate {
    .container {
      .title-box {
        .title {
          padding: 5px 0;
          text-align: center;
          background-color: #f2f2f2;
        }
      }
      .content-box {
        .el-card {
          margin: 10px 0;
          ::v-deep .el-card__body{
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
            .right{
              display: flex;
              align-items: center;
            }
          }
          .content-view{
            display: flex;
            align-items: center;
            .el-icon{
              margin-right: 5px;
            }
          }
          .content-publish-time{
            color: #8a919f;
            font-size: 10px;
          }
        }
      }
    }
  }
  .load-more {
    text-align: center;
  }
</style>
