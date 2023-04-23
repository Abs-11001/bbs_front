<template>
  <div class="container">
    <div class="login-body">
      <div class="tab">
        <div class="login-tab tab-item" :class="{active: loginActive}" @click="switchTab('login')">账户登录</div>
        <span class="divide">|</span>
        <div class="register-tab tab-item" :class="{active: registerActive}" @click="switchTab('register')">账户注册</div>
        <div class="border" ref="tabBorder"></div>
      </div>
      <div class="login" v-show="loginActive">
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginRef">
          <el-form-item prop="loginUserName">
            <el-input
                v-model="loginForm.loginUserName"
                clearable
                :prefix-icon="User"
                placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="loginPassword">
            <el-input
                type="password"
                v-model="loginForm.loginPassword"
                clearable
                show-password
                :prefix-icon="Lock"
                placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginForm.loginRemember" label="记住我" size="large" />
          </el-form-item>
          <div class="btn">
            <el-button @click="login(loginRef)">登录</el-button>
          </div>
        </el-form>
      </div>
      <div class="register" v-show="registerActive">
        <el-form>
          <el-form-item prop="registerUserName">
            <el-input
                v-model="registerForm.registerUserName"
                clearable
                :prefix-icon="User"
                placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item prop="registerPassword">
            <el-input
                v-model="registerForm.registerPassword"
                clearable
                :prefix-icon="Lock"
                placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item prop="registerAgainPassword">
            <el-input
                v-model="registerForm.registerAgainPassword"
                clearable
                :prefix-icon="Lock"
                placeholder="请输入确认密码">
            </el-input>
          </el-form-item>
          <div class="btn">
            <el-button>注册</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {User, Lock} from "@element-plus/icons-vue";
import {userLogin} from "@/api/login/user";
import md5 from 'js-md5';
import {useRouter} from "vue-router";
import {useLoginStore} from "@/store/login";
import {useUserStore} from "@/store/user";

const router = useRouter()
// 实例化loginStore
const loginStore = useLoginStore()
// 实例化userStore
const userStore = useUserStore()

const loginActive = ref(true)
const registerActive = ref(false)

// 选项卡底边实例对象
const tabBorder = ref(null)

function switchTab(type) {
  if(type === 'login') {
    loginActive.value = true
    registerActive.value = false
    tabBorder.value.style.left = '60px';
  } else if(type === 'register') {
    loginActive.value = false
    registerActive.value = true
    tabBorder.value.style.left = '240px';
  }
}

const loginRef = ref(null)
// 登录用户名，密码，是否记住
const loginForm = reactive({
  loginUserName: null,
  loginPassword: null,
  loginRemember: true,
})

const loginFormRules = reactive({
  loginUserName: [
    { required: true, message: '请输入账号', trigger: 'blur' },
  ],
  loginPassword: [
    {
      required: true, message: '请输入密码', trigger: 'blur',
    }
  ]})

const login = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const data = {
        userName: loginForm.loginUserName,
        // 32位小写加密
        passwordMd5: md5(loginForm.loginPassword)
      }
      userLogin(data).then(res => {
        const { code, data } = res
        if(code === 200) {
          const {uuid, user_name, nick_name, avatar, token, expire_time } = data
          // 保存token
          localStorage.setItem('token', token)
          localStorage.setItem('expireTime', expire_time)
          // 保存token信息
          loginStore.token = token
          loginStore.expireTime = expire_time
          // 保存user信息
          userStore.uuid = uuid
          userStore.userName = user_name
          userStore.nickName = nick_name
          userStore.avatar = avatar
          // 判断用户是否勾选了记住我
          if(loginForm.loginRemember) {
            localStorage.setItem('user', loginForm.loginUserName)
            localStorage.setItem('password', loginForm.loginPassword)
          }else {
            localStorage.setItem('user', '')
            localStorage.setItem('password', '')
          }
          router.push({
            name: 'home'
          })
        }
      }, err => {
        console.log(err)
      })
    } else {
      return false
    }
  })
}


const registerRef = ref(null)
// 注册用户名，密码，确认密码
const registerForm = reactive({
  registerUserName: null,
  registerPassword: null,
  registerAgainPassword: null
})

onMounted(() => {
  // 读取用户信息，记住我选项保存后的内容
  const user = localStorage.getItem('user')
  const password = localStorage.getItem('password')
  loginForm.loginUserName = user
  loginForm.loginPassword = password
})
</script>

<style lang="less" scoped>
.container{
  display: flex;
  align-items: center;
  justify-content: end;
  height: 100vh;
  background: url('./img/login_bck.jpg') no-repeat;
  background-size: cover;
  .login-body{
    margin-right: 50px;
    width: 350px;
    height: 330px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    &:hover{
      box-shadow: 0 0 20px 0 rgba(0,0,0,0.5) ;
    }
    .tab{
      position: relative;
      display: flex;
      .tab-item{
        flex: 1 1 50%;
        margin: 10px 0;
        text-align: center;
        cursor: pointer;
      }
      .tab-item.active{
        color: var(--el-color-primary);
      }
      .divide{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #e6e8eb;
      }
      .border{
        position: absolute;
        bottom: 0;
        left: 60px;
        width: 50px;
        height: 2px;
        background-color: var(--el-color-primary);
        transition: 0.4s;
      }
      border-bottom: 1px solid #cecece;
    }
    .login, .register{
      height: 70%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 20px;
      .btn{
        display: flex;
        justify-content: center;
        .el-button{
          width: 50%;
        }
      }
    }
  }
}
</style>