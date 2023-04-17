<template>
  <div class="container width90"
       v-loading.fullscreen.lock="fullscreenLoading">
    <el-collapse v-model="activeTitle">
      <el-collapse-item
        v-for="item in announcementKey"
        :name="item['department']"
        :key="item.idx">
        <template #title>
          <h2>{{ item['department'] }}</h2>
        </template>
        <el-collapse
            @change="change"
            v-for="item1 in item['plate']"
            :key="item1.idx">
          <el-collapse-item
            :name="item1['department'] + '-' + item1['name']">
            <template #title>
              <h3 class="subTitle">{{ item1.name }}</h3>
            </template>
            <el-card
                v-for="announcement in announcements[item.department][item1.name]"
                :key="announcement.idx"
                shadow="hover">
              <div class="announcement-item">
                <div class="title">
                  <el-link :href="announcement.url" target="_blank">{{ announcement.title }}</el-link>
                </div>
                <div class="date">
                  {{announcement.date}}
                </div>
              </div>
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {getAnnouncement, getAnnouncementKey} from "@/api/announcement";

// collapse 一级展开标题
const activeTitle = ref(['官网', '学工部'])
// collapse 二级展开标题
// const activeSubTitle = ref(['学院要闻', '综合新闻'])

// 通知公告数据集
const announcements = ref({})

// 部门板块数据集
const announcementKey = ref([])

// 加载状态控制,默认是加载状态
const fullscreenLoading = ref(true)
// 加载announcement数据
getAnnouncementKey().then(res => {
  const { code, data } = res
  if(code === 200) {
    announcementKey.value = data
    // 先创建出每个部门的对象，以便于模板遍历不会报错
    data.forEach(item => {
      announcements.value[item.department] = {}
    })
  }
  fullscreenLoading.value = false
}, err => {
  console.log(err)
  fullscreenLoading.value = false
})

// 子collapse折叠触发函数
function change(activeName) {
  if(activeName.length === 0) return
  const params = activeName[0].split('-')
  const department = params[0]
  const plate = params[1]
  // 节流防抖，已经加载过的数据就不再请求接口
  if(announcements.value[department] != undefined && announcements.value[department][plate] != undefined) return
  // 显示加载状态
  fullscreenLoading.value = true
  // 动态加载数据
  getAnnouncement({department, plate, page: 1, pageSize: 10}).then(res => {
    const {code ,data} = res
    if(code === 200) {
      // 先保存已经存在的数据
      announcements.value[department] = {...announcements.value[department]}
      // 再添加新数据
      announcements.value[department][plate] = data
    }
    // 关闭加载状态
    fullscreenLoading.value = false
  }, err => {
    console.log(err)
  })
}

</script>

<style lang="less" scoped>
  .el-card{
    margin: 5px 0;
  }
  .el-collapse ::v-deep  .el-collapse-item__content{
    padding-bottom: 0;
  }
  .subTitle{
    padding-left: 20px;
  }
</style>