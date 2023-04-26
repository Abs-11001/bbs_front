<template>
  <div class="filter">
    <el-form :model="form" :inline="true">
      <el-form-item label="标题">
        <el-input type="text" v-model="form.title" placeholder="请输入标题" @keyup.enter="getData"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select
            v-model="form.department"
            clearable
            placeholder="请选择部门">
          <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="板块">
        <el-select
            v-model="form.plate"
            clearable
            placeholder="请选择板块">
          <el-option
              v-for="item in plateOption"
              :key="item.name"
              :label="item.name"
              :value="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-config-provider :locale="zhCn">
          <el-date-picker
              v-model="form.date"
              type="daterange"
              value-format="YYYY-MM-DD"
              range-separator="-"
              start-placeholder="Start date"
              end-placeholder="End date"/>
        </el-config-provider>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">检索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="main"
       v-loading.fullscreen.lock="fullscreenLoading">
    <el-table :data="announcementData" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="60" />
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="date" label="发布日期" align="center" width="180"/>
      <el-table-column prop="department" label="机构" align="center"  width="180"/>
      <el-table-column prop="plate" label="板块" align="center"  width="180"/>
      <el-table-column label="操作" align="center" width="180">
        <template #default="scope">
          <el-link @click="goToDetail(scope.row.uuid)"><el-icon><View /></el-icon>查看</el-link>
          <el-link @click="toShare(scope.row)"><el-icon><Share /></el-icon>分享</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-config-provider :locale="zhCn">
      <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          v-model:page-size="pageSize"
          v-model:current-page="currentPage"
          :page-sizes="[20, 30, 50]"
          :total="total"
          @size-change="getData"
          @current-change="getData"
          @prev-click="getData"
          @next-click="getData"/>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {View, Share} from "@element-plus/icons-vue";
import { getAnnouncementKey, getAnnouncement } from '@/api/announcement/index.js'
import {useRouter} from "vue-router";
import useClipboard from "vue-clipboard3";
import {ElMessage} from "element-plus";
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

// 加载状态控制
const fullscreenLoading = ref<boolean>(true)

const departmentOptions = ref<object[]>([])
const plateOptions = ref<object[]>([])
// 检索表单
const form = ref<Object>({
  title: null,
  department: null,
  plate: null,
  date: null
})

// 加载部门筛选项
getAnnouncementKey().then(res => {
  const { data } = res
   data.forEach(item => {
    departmentOptions.value.push({
      value: item.department,
      label: item.department
    })
    plateOptions.value.push({
      [item.department]: item.plate
    })
  })
}, err => {
  console.log(err)
})
// 动态计算部门下面的板块数据项
const plateOption = computed(() => {
  const {department} = form.value
  // 如果选择了部门才回去找相应的数据项
  if(department) {
    // 过滤出来部门对应的板块数据
    let res = plateOptions.value.filter(item => {
      if(item.hasOwnProperty(department)) return item
    })
    return res[0][department]
  }
  // 没有就返回空
  return []
})

const announcementData = ref<string[]>([])
const pageSize = ref<number>(20)
const currentPage = ref<number>(1)
const total = ref<number>(0)
// 加载通告数据
getData()
function getData() {
  fullscreenLoading.value = true

  let beginDate = null
  let endDate = null
  // 日期选择了才赋值，不然没有下标
  if(form.value.date) {
    beginDate = form.value.date[0]
    endDate = form.value.date[1]
  }

  // 构建查询参数
  const query = {
    title: form.value.title,
    department: form.value.department,
    plate: form.value.plate,
    beginDate,
    endDate,
    // 实际查询是从0页开始查，因此要把当前页码 - 1
    page: currentPage.value - 1,
    pageSize: pageSize.value,
  }
  getAnnouncement(query).then(res => {
    fullscreenLoading.value = false
    const { data: {total: tota, announcements} } = res
    total.value = tota
    announcementData.value = announcements.filter(item => item.del === false)
  }, err => {
    console.log(err)
    fullscreenLoading.value = false
  })
}

// 查看公告
const router = useRouter()
function goToDetail(uuid:string) {
  let routeData = router.resolve({ name: 'detailAnnouncement', query: { uuid } });
  window.open(routeData.href, '_blank');
}

// 复制相关信息到剪贴板
const toShare = async (scope) => {
  const { toClipboard } = useClipboard()
  try {
    await toClipboard(`${scope.title}\n${scope.url}\n${scope.department}-${scope.plate}`)
    ElMessage({
      message: '成功复制相关信息',
      type: 'success',
    })
  } catch (e) {
    console.error(e)
  }
}

</script>

<style lang="less" scoped>
  .el-link{
    color: var(--el-color-primary);
  }
  .el-icon{
    margin: 0 5px;
  }
  .el-pagination{
    justify-content: end;
  }
</style>