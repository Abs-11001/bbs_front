/**
 * @author 三分
 * @description: 编写文章页面
 * @create date 2023/04/21 13:08:03 
 * @last date 2023/04/21 13:08:03
*/

<template>
  <div class="container">
    <div class="header">
      <input type="text" placeholder="请输入标题...">
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
<!--    <el-footer>-->
<!--     字数：{{ contentSize }}-->
<!--    </el-footer>-->
  </div>
  <el-drawer v-model="showDrawer">
    <template #header>
      <h4>发布文章</h4>
    </template>
    <template #default>
      <div>
        <el-form :model="form" :rules="formRules" ref="formRef">
          <el-form-item label="分类:" prop="category">
            <el-radio-group v-model="form.category">
              <el-radio-button label="信息共享">信息共享</el-radio-button>
              <el-radio-button label="跳蚤市场">跳蚤市场</el-radio-button>
              <el-radio-button label="暨阳树洞">暨阳树洞</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="文章封面">
            <el-upload
                class="upload-demo"
                drag
                :before-upload="beforeAvatarUpload"
                :limit="1">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="文章封面"/>
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              <template #tip>
                <div class="el-upload__tip">
                  jpg/png files with a size less than 500kb
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
            />
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="字数统计：">
            {{ contentSize }}
          </el-form-item>
          <el-form-item label="当前时间：">
            2023-04-22 01:02
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
import {Plus} from "@element-plus/icons-vue"; // 引入 css

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

// 设置 图片为base64存储
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 5 * 1024 * 1024, // 1M
      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,
      // 当图片小于 5M时，使用 base64 格式存储
      base64LimitSize: 5 * 1024 * 1024,
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
  category: null,
  previewImg: null,
  wordCount: null,
  description: null
})

// 监控内容字数
const contentSize = ref(0)
function textChange() {
  const text = editorRef.value.getText()
  contentSize.value = text.length
  form.description = text.substring(0, 100).trim()
}

const formRef = ref(null)
// 表单数据规则
const formRules = reactive({
  category: [
    { required: true, message: '请选择文章类别', trigger: 'change' },
  ],
  description: [
    {
      required: true,
      message: '请输入文章摘要',
      trigger: 'change',
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
// 提交数据
const confirm = async (formEl) => {
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      return false
    }
  })
}
// 文章封面上传前
const beforeAvatarUpload = (rawFile) => {
  console.log(rawFile.type)
  if (rawFile.type.toString().indexOf('image') === -1) {
    ElMessage.error('文章封面为图片,请上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文章封面最大支持 2MB!')
    return false
  }
  return true
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