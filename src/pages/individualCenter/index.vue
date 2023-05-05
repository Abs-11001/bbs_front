<template>
  <div class="container width90">
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="menu">
          <el-menu default-active="1">
            <el-menu-item index="1" @click="show('individual')">
              <el-icon><User /></el-icon>
              <span>个人资料</span>
            </el-menu-item>
            <el-menu-item index="2" @click="show('account-setting')">
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
          <div v-show="pageShow.individual" class="individual">
            <div class="left">
              <h3>个人资料</h3>
              <el-form :model="individualForm" label-position="left" label-width="80">
                <el-form-item label="用户名">
                  <el-input
                      disabled
                      :value="user_name"
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
                  <el-button type="primary" @click="handleUpdate">保存修改</el-button>
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
          <div v-show="pageShow.account"  class="account-setting">
            <h3>密码修改</h3>
            <el-form :model="accountForm" label-position="left" label-width="80" :rules="accountRules">
              <el-form-item label="用户名">
                <el-input
                    disabled
                    :value="user_name"
                    maxlength="15"
                    clearable ></el-input>
              </el-form-item>
              <el-form-item label="旧密码" prop="oldPassword">
                <el-input
                    v-model="accountForm.oldPassword"
                    show-password
                    autocomplete="off"
                    clearable ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input
                    v-model="accountForm.newPassword"
                    show-password
                    clearable ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                    v-model="accountForm.confirmPassword"
                    show-password
                    clearable ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button :disabled="updatePasswordBtn" type="primary" @click="handleAccountUpdate">确认修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {useUserStore} from "@/store/user";
import {ElMessage} from "element-plus";
import {reactive, computed, ref} from "vue";
import {getUserInformation, updateUserInformation, updateUserPassword} from "@/api/user";
import {User,Document, Setting} from "@element-plus/icons-vue";
import md5 from 'js-md5';

const pageShow = reactive({
  individual: true,
  account: false,
})

function show(tab) {
  pageShow.individual = false
  pageShow.account = false
  if(tab === 'individual') {
    pageShow.individual = true
  } else if(tab === 'account-setting') {
    pageShow.account = true
  }
}

const userStore = useUserStore()
const uuid = userStore.uuid || localStorage.getItem("uuid")
const user_name = ref()
// 个人资料
const individualForm = reactive({
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
      user_name.value = data.user_name
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


// 账号设置
const updatePasswordBtn = ref(true)
const validatePass = (rule, value, callback) => {
  updatePasswordBtn.value = true
  if (value === '') {
    callback(new Error('请输入确认密码'))
  } else if (value !== accountForm.newPassword) {
    callback(new Error("两次密码不一致!"))
  } else {
    updatePasswordBtn.value = false
    callback()
  }
}
const accountRules = reactive({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmPassword: [{ validator: validatePass, trigger: 'blur' }],
})
const accountForm = reactive({
  oldPassword: null,
  newPassword: null,
  confirmPassword: null
})

function handleAccountUpdate() {
  if(accountForm.oldPassword === '' || accountForm.oldPassword === null || accountForm.oldPassword === undefined) {
    ElMessage({
      showClose: true,
      message: '请输入原密码!',
      type: 'error',
    })
  } else if(accountForm.newPassword === '' || accountForm.newPassword === null || accountForm.newPassword === undefined ) {
    ElMessage({
      showClose: true,
      message: '请输入新密码!',
      type: 'error',
    })
  } else if(accountForm.newPassword !== accountForm.confirmPassword) {
    ElMessage({
      showClose: true,
      message: '两次密码不一致!',
      type: 'error',
    })
  }
  const data = {
    uuid: uuid,
    oldPassword: md5(accountForm.oldPassword),
    newPassword: md5(accountForm.newPassword),
    confirmPassword: md5(accountForm.confirmPassword),
  }
  updateUserPassword(data).then(res => {
    const {code, msg} = res
    if(code === 200) {
      ElMessage({
        showClose: true,
        message: msg,
        type: 'success',
      })
    }
  })
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