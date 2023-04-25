/**
 * @author 三分
 * @description: 编写文章页面
 * @create date 2023/04/21 13:08:03 
 * @last date 2023/04/21 13:08:03
*/

<template>
  <div class="container">
    <div class="header">
      <input type="text" v-model="form.title" placeholder="请输入标题...">
      <el-button @click="submit" type="primary">发布</el-button>
    </div>
    <div class="content">
      <div class="edit">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default"
        />
        <Editor
            style="height: calc(100vh - 130px);"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
            @onChange="textChange"
        />
      </div>
    </div>
  </div>
  <el-drawer v-model="showDrawer">
    <template #header>
      <h4>发布文章</h4>
    </template>
    <template #default>
      <div>
        <el-form :model="form" :rules="formRules" ref="formRef">
          <el-form-item label="标题:" prop="title">
            <el-input
                v-model="form.title"
                maxlength="30"
                placeholder="请输入标题"
                show-word-limit
                type="text"
            />
          </el-form-item>
          <el-form-item label="分类:" prop="category">
            <el-radio-group v-model="form.category">
              <el-radio-button label="信息共享">信息共享</el-radio-button>
              <el-radio-button label="互帮互助">互帮互助</el-radio-button>
              <el-radio-button label="暨阳树洞">暨阳树洞</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章封面">
            <el-upload
                drag
                list-type="picture-card"
                :before-upload="beforeAvatarUpload"
                :on-success="handleSuccess"
                :data="meta"
                action="http://file.upload.waheng.fun/articleCover/index.php"
                :limit="1">
              <el-icon  class="avatar-uploader-icon"><Plus /></el-icon>
              <div class="el-upload__text">
                拖拽 or <em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  仅支持一张2MB格式为jpg,jpeg,gif,png的图片
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="文章摘要" prop="description">
            <el-input
                v-model="form.description"
                :rows="10"
                type="textarea"
                placeholder="请输入文章摘要"
                maxlength="100"
                show-word-limit
            />
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="字数统计：">
            {{ contentSize }}
          </el-form-item>
          <el-form-item label="当前时间：">
            {{currentTime()}}
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm(formRef)">确定并发布</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {onBeforeUnmount, reactive, ref, shallowRef} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import {Plus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus"; // 引入 css
import { nanoid } from 'nanoid'
import {publishArticle} from "@/api/article";
import {useRouter} from "vue-router";
import {currentTime} from "@/utils/customTime";
import {useLoginStore} from "@/store/login";
import {useUserStore} from "@/store/user";

const router = useRouter()
const loginStore = useLoginStore()
const userStore = useUserStore()

// 生成用于标识该文章的唯一标识符
const nano_id = nanoid()
// 上传图片时携带的额外参数
const meta = {
  // 将token和nanoid同时传过去
  token: loginStore.token || localStorage.getItem('token'),
  // 文章的唯一标识
  nanoid: nano_id
}

// 设置文本编辑器的状态，default表示所有功能,simple表示简单版本
const mode = ref('default')
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
// 去除不用的功能
const toolbarConfig = {
  excludeKeys: [
      'fullScreen',
      'group-video'
  ]
}
// 设置 图片上传服务
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: 'http://file.upload.waheng.fun/articleImg/index.php',
      // 单个文件的最大体积限制，默认为 5M
      maxFileSize: 5 * 1024 * 1024, // 5M
      allowedFileTypes: ['image/*'],
      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      meta: meta,
      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,
    }
  }}
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
// 组件创建时的回调
const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}


// 抽屉控制标识
const showDrawer = ref(false)

const form = reactive({
  title: null,
  category: null,
  previewImg: null,
  wordCount: null,
  description: null
})

// 监控内容字数
const contentSize = ref(0)
// 内容改变时，同步更新文章概要内容，默认取文章前100字
function textChange() {
  const text = editorRef.value.getText()
  contentSize.value = text.length
  form.description = text.substring(0, 100).trim()
}

const formRef = ref(null)
// 表单数据规则
const formRules = reactive({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '请选择文章类别', trigger: 'blur' },
  ],
  description: [
    {
      required: true,
      message: '请输入文章摘要',
      trigger: 'blur',
    },
  ],
})
// 控制抽屉显示
function submit() {
  showDrawer.value = true
}
// 关闭抽屉
function cancel() {
  showDrawer.value = false
}
// 文章封面上传前回调函数
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type.toString().indexOf('image') === -1) {
    ElMessage.error('文章封面为图片,请上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文章封面最大支持 2MB!')
    return false
  }
  return true
}
const imageUrl = ref(null)
function handleSuccess(uploadFile) {
  if(uploadFile.data) imageUrl.value = `http://file.upload.waheng.fun/` + uploadFile.data
}

// 提交数据
const confirm = async (formEl) => {
  await formEl.validate((valid, fields) => {
    if (valid) {
      const t = valueHtml.value.replaceAll('<p><br></p>', '')
      if(valueHtml.value.length <= 7 || t.length === 0) {
        // wangEditor 默认带有<p><br></p> html内容
        ElMessage.error("请输入文章内容")
        return
      }
      const html = editorRef.value.getHtml();
      const data = {
        user_uuid: userStore.uuid || localStorage.getItem('uuid'),
        nanoid: nano_id,
        title: form.title,
        category: form.category,
        content: html,
        words_nubmer: contentSize.value,
        description: form.description,
      }
      publishArticle(data).then(res => {
        if(res.code === 200) {
          ElMessage({
            showClose: true,
            message: '发布成功',
            type: 'success',
          })
          router.push({
            name: 'home'
          })
        }else{
          ElMessage({
            showClose: true,
            message: '发布失败，请稍后重试',
            type: 'warning',
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


</script>

<style lang="less" scoped>
.container{
  min-width: 1280px;
}
.header{
  display: flex;
  align-items: center;
  margin: 5px 0;
  input{
    flex: 1;
    padding: 10px 2rem;
    border: none;
    outline: none;
    font-size: 2rem;
    &:focus-visible{
      border: none;
    }
  }
  .el-button{
    width: 100px;
    margin-right: 20px;
  }
}
.content{
  display: flex;
  .edit{
    flex: 1;
    border-top: 1px solid red;
  }
}
.el-footer{
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  background-color: #f8f9fa;
}
.el-drawer{
  .el-button{
    width: 100px;
  }
}
</style>