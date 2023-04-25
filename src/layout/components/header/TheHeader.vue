<template>
    <header>
      <div class="container width90">
        <div id="header_left">
          <img src="./img/logo.png" alt="浙江农林大学暨阳学院logo">
        </div>
        <div id="header_right">
          <div id="header_img">
            <el-dropdown>
              <img :src="getAvatar" alt="用户头像">
              <template #dropdown>
                <el-dropdown-menu v-if="token">
                  <el-dropdown-item @click="handleIndividual">个人空间</el-dropdown-item>
                  <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-else>
                  <el-dropdown-item @click="handleLogin">登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>
</template>

<script setup>
import {ref, onMounted, computed} from "vue";
import { useRouter, useRoute } from "vue-router";
import {userLogout} from "@/api/user";
import {ElMessage} from "element-plus";
import {useLoginStore} from "@/store/login";
import {useUserStore} from "@/store/user";

// 实例化loginStore
const loginStore = useLoginStore()
// 实例化userStore
const userStore = useUserStore()

const token = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(() => {
  token.value = loginStore.token || localStorage.getItem('token')
})

const getAvatar = computed(() => {
  if(token.value === null || token.value === '') {
    return 'http://file.upload.waheng.fun/avatar/image/default.jpg'
  } else {
    return userStore.avatar
  }
})

// 处理登录
function handleLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: route.name
    }
  })
}
// 处理退出
function handleLogout() {
  const uuid = localStorage.getItem('uuid')
  userLogout({uuid}).then(res => {
    const {code, msg} = res
    if(code === 200) {
      // 退出成功清除无用数据
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('expireTime')
      localStorage.removeItem('uuid')
      loginStore.$reset()
      userStore.$reset()
      ElMessage({
        message: msg,
        type: 'success',
      })
      window.location.assign("/home")
    }else {
      ElMessage.error(msg)
    }
  }, err => {
    console.log(err)
  })

}
// 个人中心
function handleIndividual() {
  router.push({
    name: 'individualCenter',
  })
}

</script>

<style lang="less" scoped>
@avatar-size: 40px;
  header{
    //background-color: rgba(72, 78, 82, 0.78);
    //background-color: var(--el-color-success-dark-2);
    background-color: #529b2e;
    .container{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 120px;
      #header_left{
        img{
          width: 320px;
          height: 60px;
        }
      }
      #header_right{
        display: flex;
        align-items: center;
        .el-button{
          //color: white;
        }
        #header_img{
          margin-left: 10px;
          img{
            width: @avatar-size;
            height: @avatar-size;
            border-radius: 50%;
            outline: none;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>