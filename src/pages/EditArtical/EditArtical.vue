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
      <el-button type="primary">发布</el-button>
    </div>
    <div class="content">
      <div class="edit half">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
        />
      </div>
<!--      <div class="preview half">-->
<!--        <div class="preview-edit" v-html="valueHtml"></div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, shallowRef } from 'vue'

// md 扩展选项
// import { Boot } from '@wangeditor/editor'
// import markdownModule from '@wangeditor/plugin-md'
// md扩展选项
// Boot.registerModule(markdownModule)
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')


const toolbarConfig = {
  excludeKeys: [
      'fullScreen',
      'group-video'
  ]
}


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


</script>

<style lang="less" scoped>
.header{
  display: flex;
  align-items: center;
  margin: 5px 0;
  input{
    flex: 1;
    padding: 0 2rem;
    border: none;
    outline: none;
    font-size: 2rem;
    &:focus-visible{
      border: none;
    }
  }
  .el-button{
    width: 100px;
  }
}
.content{
  display: flex;
  .half{
    flex: 1 1 50%;
    border-top: 1px solid red;
    height: 99vh;
  }
}
</style>