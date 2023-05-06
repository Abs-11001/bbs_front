/**
 * @author 三分
 * @description: 详细文章页面
 * @create date 2023/04/21 13:05:37
 * @last date 2023/04/21 13:05:37
*/

<template>
  <div class="container width90" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="title">
      <h1>{{ data.title }}</h1>
    </div>
    <div class="user">
      <div class="left">
        <div class="block">
          <el-avatar :size="50" :src="data.avatar" />
        </div>
      </div>
      <div class="right">
        <div class="userName">{{ data.nickName }}</div>
        <div class="article-info"><span class="publishTime">{{ data.publishTime }}</span> · <span class="view">阅读 {{ data.view }}</span></div>
      </div>
    </div>
    <div class="content" v-html="data.content"></div>
    <the-comment></the-comment>
    <el-tooltip content="点赞" placement="top">
      <div id="like" class="fixed"  @click="recordLike(data.nanoid)">
        <thumbs-up v-if="isCancel" theme="filled" size="24" fill="#409EFC"/>
        <thumbs-up v-else theme="outline" size="24" fill="#409EFC"/>
      </div>
    </el-tooltip>
    <el-tooltip content="分享给好友" placement="top">
      <div id="share" class="fixed" @click="toShare">
        <share-one theme="outline" size="22" fill="#409EFC"/>
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {useRoute} from "vue-router";
import TheComment from "@/components/comment/TheComment.vue";
import {getDetailArticle, addArticleView} from "@/api/article";
import {ThumbsUp, ShareOne} from "@icon-park/vue-next";
import {useUserStore} from "@/store/user";
import { recordUserLike, getCurUserLike } from "@/api/articleLike";
import useClipboard from 'vue-clipboard3'
import {ElMessage} from "element-plus";


const route = useRoute()
const fullscreenLoading = ref(true)
const data = reactive({
  idx: null,
  nanoid: null,
  user_uuid: null,
  nickName: null,
  avatar: null,
  title: null,
  content: null,
  like: 0,
  view: 0,
  publishTime: null
})

const userStore = useUserStore()


// 从路由上取出文章nanoid
const nanoid = route.query && route.query.nanoid
getDetailArticle({nanoid}).then(res => {
  fullscreenLoading.value = false
  const { code, data: d} = res
  if(code === 200) {
    data.idx = d.idx
    data.nanoid = d.nanoid
    data.user_uuid = d.user_uuid || '匿名'
    data.nickName = d.nickName || '匿名'
    data.avatar = d.avatar || 'http://file.upload.waheng.fun/avatar/image/anonymous.jpeg'
    data.title = d.title
    data.content = d.content
    data.like = d.like
    data.view = d.view
    data.publishTime = d.publishTime
  }
}, err => {
  fullscreenLoading.value = false
})

// 增加文章浏览量
addArticleView({article_nanoid: nanoid, view_user_uuid: userStore.uuid || localStorage.getItem('uuid')})

const isCancel = ref(false)
// 获取当前用户是否点赞过当前文章
getCurUserLike({article_nanoid: nanoid, like_user_uuid: userStore.uuid || localStorage.getItem('uuid')}).then(res => {
  const { data } = res
  if(data === null || data === undefined) return
  isCancel.value = !data.cancel
})

// 点赞
function recordLike(nanoid) {
  const data = {
    article_nanoid: nanoid,
    like_user_uuid: userStore.uuid || localStorage.getItem('uuid'),
    isCancel: isCancel.value
  }
  if(data.article_nanoid === null || data.article_nanoid === undefined || data.article_nanoid === '') {
    ElMessage({
      message: '请合理使用服务',
      type: 'error',
    })
    return
  }
  if(data.like_user_uuid === null || data.like_user_uuid === undefined || data.like_user_uuid === '') {
    ElMessage({
      message: '请登录账号再进行操作',
      type: 'error',
    })
    return
  }

  recordUserLike(data).then(res => {
    isCancel.value = !isCancel.value
  })
}

// 复制相关信息到剪贴板
const toShare = async () => {
  const { toClipboard } = useClipboard()
  try {
    await toClipboard(`标题:${data.title}\n发布人:${data.nickName}\n发布时间:${data.publishTime}\n链接:${location.href}`)
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
  .container{
    padding: 20px;
  }
  .title{
    margin-bottom: 20px;
  }
  .user{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .right{
      margin-left: 20px;
      .userName{
      }
      .article-info{
        color: #8a919f;
        letter-spacing: 1px;
      }
    }
  }
  .fixed{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    right: 30px;
    box-shadow: var(--el-box-shadow-lighter);
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #f2f6fc;
    }
  }
  #like{
    bottom: 150px;
  }
  #share{
    bottom: 100px;
  }
</style>