<template>
  <u-comment :config="config" page @submit="submit" @like="like">
    <!-- <template #info>用户信息卡槽</template> -->
<!--     <template #card>用户信息卡片卡槽</template>-->
    <u-comment-nav v-model="latest" @sorted="sorted"></u-comment-nav>
  </u-comment>
</template>

<script setup lang="ts">
import emoji from './emoji.js'
import {reactive, ref} from 'vue'
import { UComment, UCommentNav, CommentApi, ConfigApi, SubmitParamApi, UToast, createObjectURL } from 'undraw-ui'
import {useLoginStore} from "@/store/login";
import {useUserStore} from "@/store/user";
import {currentTime} from "@/utils/customTime";
import { nanoid } from 'nanoid'
import  {useRoute} from "vue-router";
import {addArticleComment, getArticleComment} from '@/api/articleComment'

// 实例化loginStore
const loginStore = useLoginStore()
// 实例化userStore
const userStore = useUserStore()

const route = useRoute()
// uuid是通知公告的  nanoid 是文章的
const article_id = route.query.uuid || route.query.nanoid

//排序
const latest = ref(true)
const sorted = (latest: boolean) => {
  console.log(latest)
}

const config = reactive<ConfigApi>({
  user: {
    // 评论的用户uuid
    id: userStore.uuid,
    // 评论的用户的昵称
    username: userStore.nickName,
    // avatar: avatar.value,
    avatar: userStore.avatar,
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    // 当前用户对该页面的评论的点赞的评论的id
    likeIds: [1, 2, 3, 4, 5]
  },
  emoji: emoji,
  comments: [],
  total: 10
})

let temp_id = 100
// 提交评论事件
const submit = ({ content, parentId, files, finish }: SubmitParamApi) => {
  console.log('提交评论: ' + content, parentId, files, finish)

  /**
   * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
   */
  // let contentImg = files.map(e => createObjectURL(e)).join('||')

  const nano_id = nanoid()
  const data = {
      nanoid: nano_id,
      parent_id: parentId,
      article_nanoid: article_id,
      user_uuid: config.user.id,
      content: content
  }
  addArticleComment(data).then(res => {
    const { code } = res
    if(code === 200) {
      UToast({ message: '评论成功!', type: 'info' })
    }
  }, err => {
    console.log(err)
  })

  const comment: CommentApi = {
    id: nano_id,
    parentId: parentId,
    uid: config.user.id,
    address: '',
    content: content,
    likes: 0,
    createTime: currentTime(),
    contentImg: '',
    user: {
      username: config.user.username,
      avatar: config.user.avatar,
      level: 1,
      homeLink: `/${(temp_id += 1)}`
    },
    reply: null
  }
  setTimeout(() => {
    finish(comment)
    UToast({ message: '评论成功!', type: 'info' })
  }, 200)
}

// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id: string, finish: () => void) => {
  console.log('点赞: ' + id)
  setTimeout(() => {
    finish()
  }, 200)
}

config.comments = [
  // {
  //   id: '1',
  //   parentId: null,
  //   uid: '1',
  //   address: '来自上海',
  //   content:
  //       '缘生缘灭，缘起缘落，我在看别人的故事，别人何尝不是在看我的故事?别人在演绎人生，我又何尝不是在这场戏里?谁的眼神沧桑了谁?我的眼神，只是沧桑了自己[喝酒]',
  //   likes: 2,
  //   // contentImg: 'https://gitee.com/undraw/undraw-ui/raw/master/public/docs/normal.webp',
  //   createTime: '1分钟前',
  //   user: {
  //     username: '落🤍尘',
  //     avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
  //     level: 6,
  //     homeLink: '/1'
  //   }
  // }
]

getArticleComment({id: article_id}).then(res => {
  const {code, data} = res
  config.comments = data
}, err => {
  console.log(err)
})
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

