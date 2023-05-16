/**
 * @author 三分
 * @description: 学校通知板块下的最新通知页面,即展示部分通知公告
 * @create date 2023/04/18 09:44:24 
 * @last date 2023/04/18 09:44:24
*/

<template>
  <el-collapse v-model="activeTitle"
               v-loading.fullscreen.lock="fullscreenLoading">
    <el-collapse-item name="未读">
      <template #title>
        <el-badge v-model:value="noReadTotal">
          <h2 style="color: #fa4227">未读公告</h2>
        </el-badge>
      </template>
      <el-table :data="noReadList">
        <el-table-column prop="title" label="标题">
          <template #default="scope">
            <el-link @click="goToDetail(scope.row)">{{ scope.row.title }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="department" width="160" align="center" label="部门">
          <template #default="scope">
            <el-tag>{{ scope.row.department }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="plate" width="150" align="center" label="板块">
          <template #default="scope">
            <el-tag type="success">{{ scope.row.plate }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" width="150" align="center" label="发布时间"></el-table-column>
      </el-table>
    </el-collapse-item>
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
              @click="goToDetail(announcement)"
              shadow="hover">
            <div class="announcement-item">
              <div class="title">
                <el-link>{{ announcement.title }}</el-link>
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
</template>

<script setup>
import { ref } from 'vue'
import {getAnnouncement, getAnnouncementKey, getNoReadAnnouncement, recordRead} from "@/api/announcement";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/user";

const userStore = useUserStore()

// collapse 一级展开标题
const activeTitle = ref(['未读', '官网'])
// collapse 二级展开标题
// const activeSubTitle = ref(['学院要闻', '综合新闻'])

// 通知公告数据集
const announcements = ref({})

// 部门板块数据集
const announcementKey = ref([])

// 加载状态标识,默认是加载状态
const fullscreenLoading = ref(true)
// 加载announcementKey数据
getAnnouncementKey().then(res => {
  const { code, data } = res
  if(code === 200) {
    const showData = []
    data.forEach(item => {
      let dep = {
        idx: item.idx,
        department: item.department,
        // 过滤掉show = false的数据，因为show=false是不显示的数据
        plate: item['plate'].filter(plate => plate.show === true)
      }
      showData.push(dep)
    })
    announcementKey.value = showData
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

// 子collapse折叠触发函数,加载对应的announcement
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
  getAnnouncement({department, plate, page: 0, pageSize: 10}).then(res => {
    const {code ,data} = res
    if(code === 200) {
      // 先保存已经存在的数据
      announcements.value[department] = {...announcements.value[department]}
      // 再添加新数据
      announcements.value[department][plate] = data.announcements.filter(item => item.del === false)
    }
    // 关闭加载状态
    fullscreenLoading.value = false
  }, err => {
    console.log(err)
  })
}

const router = useRouter()
function goToDetail(announcement) {
  // 记录该条通知已经被当前用户查阅过了
  const data = {
    announcement_uuid: announcement.uuid,
    user_uuid: userStore.uuid
  }
  recordRead(data)
  // 重新加载数据列表
  getNoReadList()

  // 打开链接
  let routeData = router.resolve({ name: 'detailAnnouncement', query: { uuid: announcement.uuid } });
  window.open(routeData.href, '_blank');
}

// tabs相关
const noReadList = ref([])
const noReadTotal = ref(0)

// 获取当前用户未读公告
getNoReadList()
function getNoReadList() {
  if(userStore.uuid === undefined || userStore.uuid === null) return
  const query = {
    user_uuid: userStore.uuid
  }
  getNoReadAnnouncement(query).then(res => {
    const { data: { total, dataList }} = res
    noReadList.value = dataList
    noReadTotal.value = total
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