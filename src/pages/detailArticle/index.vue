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
          <el-avatar :size="50" src="http://www.waheng.fun/asset/ico/github.png" />
        </div>
      </div>
      <div class="right">
        <div class="userName">{{ data.nickName }}</div>
        <div class="article-info"><span class="publishTime">{{ data.publishTime }}</span> · <span class="view">阅读 {{ data.view }}</span></div>
      </div>
    </div>
    <div class="content" v-html="data.content"></div>
    <el-tooltip content="点赞" placement="top">
      <div id="source" class="fixed" @click="goToSource">
        <thumbs-up theme="outline" size="24" fill="#409EFC"/>
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
import {getDetailArticle, addArticleView} from "@/api/article";
import {ThumbsUp, ShareOne} from "@icon-park/vue-next";


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


// 从路由上取出文章nanoid
const nanoid = route.query && route.query.nanoid
getDetailArticle({nanoid}).then(res => {
  fullscreenLoading.value = false
  const { code, data: d} = res
  if(code === 200) {
    data.idx = d.idx
    data.nanoid = d.nanoid
    data.user_uuid = d.user_uuid
    data.nickName = d.nickName
    data.avatar = d.avatar
    data.title = d.title
    data.content = d.content
    data.like = d.like
    data.view = d.view
    data.publishTime = d.publishTime
  }
}, err => {
  console.log(err)
  fullscreenLoading.value = false
})

addArticleView({article_nanoid: nanoid, view_user_uuid: localStorage.getItem('uuid')}).then(res => {

}, err => {})


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
        font-size: 25px;
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
  #source{
    bottom: 150px;
  }
  #share{
    bottom: 100px;
  }
</style>