<template>
  <div class="container width90" >
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="最新" name="latest" v-infinite-scroll="loadLatest">
        <el-skeleton :rows="5" animated :throttle="500" :loading="loading" >
          <artical-section-component v-for="item in latestData" :key="item.id" :data="item"></artical-section-component>
        </el-skeleton>
      </el-tab-pane>
      <el-tab-pane label="最热" name="hottest">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref, onMounted} from "vue";
import ArticalSectionComponent from "@/pages/informationSharing/artical/ArticalSectionComponent.vue";

// 加载状态控制
const loading = ref<boolean>(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

const activeName = ref('latest')

const latestData = reactive([
  {
    id: 1,
    nickName: '小猪',
    time: '2023-04-21',
    title: '来\'特斯拉官网\'3D看车、设计一个安全的对外接口｜掘金一周 4.19',
    description: '【掘金一周】本期亮点：来\'特斯拉官网\'3D看车吧（Vue3+Pinia+Koa+Three.js 入门全栈实战项目）；如何设计一个安全的对外接口？',
    view: 2826,
    like: 95,
    comment: 90,
    previous: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f5dfde2369345058262f726acab39bd~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?'
  }
])

function loadLatest() {
  latestData.push({
    id: 1,
    nickName: '小猪',
    time: '2023-04-21',
    title: '来\'特斯拉官网\'3D看车、设计一个安全的对外接口｜掘金一周 4.19',
    description: '【掘金一周】本期亮点：来\'特斯拉官网\'3D看车吧（Vue3+Pinia+Koa+Three.js 入门全栈实战项目）；如何设计一个安全的对外接口？',
    view: 2826,
    like: 95,
    comment: 90,
    previous: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f5dfde2369345058262f726acab39bd~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?'
  })
}
</script>

<style scoped>

</style>