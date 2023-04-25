<template>
  <div class="container width90">
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="menu">
          <el-menu default-active="1">
            <el-menu-item index="1">
              <el-icon><User /></el-icon>
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><setting /></el-icon>
              <span>账号设置</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><Document /></el-icon>
              <span>我的帖子</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="body">
          <div class="individual">
            <div class="left">
              <h3>个人资料</h3>
              <el-form :model="individualForm" label-position="left" label-width="80">
                <el-form-item label="用户名">
                  <el-input
                      disabled
                      v-model="individualForm.user_name"
                      maxlength="15"
                      :show-word-limit="true"
                      clearable ></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input
                      v-model="individualForm.nick_name"
                      maxlength="10"
                      :show-word-limit="true"
                      clearable ></el-input>
                </el-form-item>
                <el-form-item label="单位">
                  <el-input
                      v-model="individualForm._class"
                      maxlength="10"
                      :show-word-limit="true"
                      clearable ></el-input>
                </el-form-item>
                <el-form-item label="个人介绍">
                  <el-input
                      v-model="individualForm.introduce"
                      maxlength="100"
                      :rows="5"
                      type="textarea"
                      :show-word-limit="true"
                      clearable ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button :disabled="disabled" type="primary" @click="handleUpdate">保存修改</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="right">
              <el-upload
                  class="avatar-uploader"
                  action="http://file.upload.waheng.fun/avatar/index.php"
                  :data="{uuid: userStore.uuid}"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <div class="block">
                  <el-avatar :size="100" :src="individualForm.avatar" />
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    支持 jpg、png、jpeg 格式大小 2M 以内的图片
                  </div>
                </template>
              </el-upload>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {useUserStore} from "@/store/user";
import {ElMessage} from "element-plus";
import {reactive, computed} from "vue";
import {getUserInformation, updateUserInformation} from "@/api/user";
import {User,Document, Setting} from "@element-plus/icons-vue";


const userStore = useUserStore()
const uuid = userStore.uuid || localStorage.getItem("uuid")

const individualForm = reactive({
  user_name: null,
  nick_name: null,
  _class: null,
  introduce: null,
  avatar: userStore.avatar
})

let record = {}

getUserInformation({uuid}).then(res => {
  const {code, data} = res
  if(code === 200) {
    if(data.uuid === userStore.uuid) {
      individualForm.user_name = data.user_name
      individualForm.nick_name = data.nick_name
      individualForm._class = data._class
      individualForm.introduce = data.introduce
      // 保存最原始的数据
      record = {...data}
    } else {
      ElMessage.error("发生未知错误!")
    }

  }
}, err => {
  console.log(err)
})

const handleUpdate = () => {
  const data = {
    uuid,
    nick_name: individualForm.nick_name,
    _class: individualForm._class,
    introduce: individualForm.introduce,
  }
  updateUserInformation(data).then(res => {
    const {code} = res
    if(code === 200) {
      ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success',
      })
    }else {
      ElMessage({
        showClose: true,
        message: '修改失败!',
        type: 'error',
      })
    }
  }, err => {
    console.log(err)
  })
}

const disabled = computed(() => {
  if(record.user_name === individualForm.user_name &&
      record.nick_name === individualForm.nick_name &&
      record._class === individualForm._class &&
      record.introduce === individualForm.introduce) return true
  else return false
})

const beforeAvatarUpload = (rawFile) => {
  console.log(rawFile.type)
  const imageType = ['image/jpeg', 'image/jpg', 'image/png']
  if (!imageType.includes(rawFile.type)) {
    ElMessage.error('仅支持 jpg、png、jpeg 格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小最大为 2MB!')
    return false
  }
  return true
}
const handleAvatarSuccess = (uploadFile) => {
  individualForm.avatar = "http://file.upload.waheng.fun/" + uploadFile.data
  userStore.avatar = "http://file.upload.waheng.fun/" + uploadFile.data
}
</script>

<style lang="less" scoped>
  .container{
    min-height: calc(100vh - 325px);
  }
  .el-form ::v-deep .el-form-item{
    padding: 20px 20px 0 20px;
    border-top: 1px solid #e3e3e3;
  }
  .individual{
    display: flex;
    .left{
      flex: 1 1 70%;
    }
    .right{
      flex: 1  1 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar-uploader{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
</style>