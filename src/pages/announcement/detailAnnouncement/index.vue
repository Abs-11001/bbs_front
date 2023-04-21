<template>
  <div v-html="data" v-loading.fullscreen.lock="fullscreenLoading"></div>
  <the-comment></the-comment>
  <el-tooltip content="查看源链接" placement="top">
    <div id="source" class="fixed" @click="goToSource">
      <el-icon
          color="#409EFC">
        <Promotion />
      </el-icon>
    </div>
  </el-tooltip>
  <el-tooltip content="分享给好友" placement="top">
    <div id="share" class="fixed" @click="toShare">
      <el-icon
          color="#409EFC">
        <Share />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<script setup>
import { ref } from 'vue'
import {useRoute} from "vue-router";
import {getAnnouncementData, getAnnouncementWithUuid} from "@/api/announcement";
import {Promotion, Share} from '@element-plus/icons-vue'
import useClipboard from 'vue-clipboard3'
import TheComment from "@/components/comment/TheComment.vue";

// 加载状态控制
const fullscreenLoading = ref(true)

const route = useRoute()
const uuid = route.query.uuid
const data = ref(null)
const announcementInfo = ref({
  title: null,
  url: null,
  department: null,
  plate: null
})

// 通过uuid获取公告的相关信息，例如url,department
getAnnouncementWithUuid({uuid}).then(res => {
  const { title, url, department, plate } = res.data
  announcementInfo.value.title = title
  announcementInfo.value.url = url
  announcementInfo.value.department = department
  announcementInfo.value.plate = plate

  // 通过uuid来加载具体的公告信息
  getAnnouncementData({uuid}).then(res => {
    fullscreenLoading.value = false
    let content = res.data.data
    // 其实每个图片资源的src是可以共用一个，
    // 比如官网的开头是www.zjyc.edu.cn,商学院的开头是sxy.zjyc.edu.cn，
    // 在替换src的时候，哪怕商学院用官方的也是可以加载出来数据
    // 不过保险+规范化期间还是各用各的比较好,再次留下小记，以供后续研究
    if(department === '官网') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://www.zjyc.edu.cn')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://www.zjyc.edu.cn')
      // 去除浏览次数
      content = content.replace(/浏览：.*?<\/script>/g, '')
      // 删除上一条下一条内容
      content = content.replace(/<p align="right" style="font-size:9pt">.*<\/p>/gs, '')
    }
    else if(department === '学工部') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://xgb.zjyc.edu.cn/')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://xgb.zjyc.edu.cn/')
      // 去除浏览次数
      content = content.replace(/\(点击：.*?\)/g, '')
    }
    else if(department === '教务部') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://xgb.zjyc.edu.cn/')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://xgb.zjyc.edu.cn/')
      // 去除无用信息
      content = content.replace(/<span>来源.*?<\/span>/gs, '')
      content = content.replace(/<div class="shart_box">.*?<\/div>.<\/div>/gs, '')
      content = content.replace(/<section id="ar_fot">.*?<\/section>/gs, '')
      // 删除已下载x次
      content = content.replaceAll(/】已下载.*?次/gs, '】')
    }
    else if(department === '商学院') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://sxy.zjyc.edu.cn')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://sxy.zjyc.edu.cn')
      // 去除浏览次数
      content = content.replace(/作者.*?<\/script>/g, '')
      // 删除上一条下一条内容
      content = content.replace(/<div class="NewsPreNext">.<div class="News_sxy">.*?<\/div>.<div style="clear:both"><\/div>.<div.*?<\/div>.<\/div>/gs, '')
      // 删除已下载x次
      content = content.replaceAll(/】已下载.*?次/gs, '】')
    }
    else if(department === '人文学院') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://rwxy.zjyc.edu.cn/')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://rwxy.zjyc.edu.cn/')
      // 去除无用信息
      content = content.replace(/<span>作者：<\/span>/gs, '')
      content = content.replace(/<span>点击量.*?<\/span>/gs, '')
      content = content.replace(/<div class="dao">.*?<\/div>.<\/div>/gs, '')
    }
    else if(department === '晨晓艺术与设计学院') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://csad.zjyc.edu.cn/')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://csad.zjyc.edu.cn/')
      // 去除无用信息
      content = content.replace(/<i>.*?访问量.*?<\/i>/gs, '')
      content = content.replace(/作者 :/gs, '')
      content = content.replaceAll(/】已下载.*?次/gs, '】')
    }
    else if(department === '工程技术学院') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://gcjs.zjyc.edu.cn/')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://gcjs.zjyc.edu.cn/')
      // 去除无用信息
      content = content.replace(/来源：.*?时间/gs, '时间')
      content = content.replace(/浏览.*?<\/script>/gs, '')
      content = content.replaceAll(/】已下载.*?次/gs, '】')
    }
    else if(department === '园林学院') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://ylxy.zjyc.edu.cn/')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://ylxy.zjyc.edu.cn/')
      // 去除无用信息
      content = content.replace(/来源：.*?<span/gs, '<span')
      content = content.replace(/人气：.*?<\/span>/gs, '<\/span>')
    }
    else if(department === '生物环境学院') {
      // 给图片资源添加域名
      content = content.replaceAll('src=\"', 'src=\"http://swhj.zjyc.edu.cn/')
      // 给下载资源等添加域名
      content = content.replaceAll('href=\"', 'href=\"http://swhj.zjyc.edu.cn/')
      // 去除无用信息
      content = content.replace(/发布者.*?<\/script>/gs, '')
      content = content.replace(/<div class="shany">.*?<\/div>/gs, '')
    }
    data.value = content
  }, err => {
    console.log(err)
    fullscreenLoading.value = false
  })
}, err => {
  console.log(err)
  fullscreenLoading.value = false
})

// 跳转到源页面
function goToSource() {
  window.open(announcementInfo.value.url, '_blank');
}

// 复制相关信息到剪贴板
const toShare = async () => {
  const { toClipboard } = useClipboard()
  try {
    await toClipboard(`${announcementInfo.value.title}\n${announcementInfo.value.url}\n${announcementInfo.value.department}-${announcementInfo.value.plate}`)
    ElMessage({
      message: '成功复制相关信息',
      type: 'success',
    })
  } catch (e) {
    console.error(e)
  }
}

</script>

<style lang="less">
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

  // 商学院部分样式
  .ArticleTitle{
    line-height: 28px;
    padding-bottom: 8px;
    font-size: 21px;
    color: #4470b7;
    font-weight: normal;
    text-align: center;
  }
  .ArticleMessage {
    border-left: none;
    border-right: none;
    color: #999;
    height: 26px;
    line-height: 26px;
    text-align: center;
    margin-bottom: 20px;
  }
  // 学工部部分样式
  .titlestyle44769 {
    font-size: 12pt;
    font-weight: bold;
    color: #222222;
  }
  // 人文部分样式
  .page-con .page-title {
    border-bottom: 1px dashed #d3d3d3;
    padding-bottom: 20px;
    text-align: center;
  }
  .page-con .page-title h1 {
    font-size: 23px;
    font-weight: bold;
    color: #0D5BA6;
    line-height: 45px;
  }
  .page-con .page-title h2 {
    font-size: 17px;
    color: #333333;
    line-height: 50px;
  }
  .page-con .page-title .date {
    font-size: 12px;
    color: #999999;
    line-height: 35px;
  }
  .page-con .page-title .date span {
    padding: 0 10px;
  }
  // 晨晓部分样式
  .wenzhang .frw {
    text-align: center;
    font-size: 20px;
    color: cornflowerblue;
  }
  .wenzhang p {
    line-height: 40px;
  }
  // 工程部分样式
  .layui-col-md12.title {
    padding: 0.3em 5% 0.3em 5%;
    font-size: 2em;
    line-height: 1.5em;
    color: #000000;
    text-align: center;
  }
  .layui-col-md12.source {
    padding: 0.5em 5% 2em 5%;
    line-height: 1.5em;
    color: #888888;
    text-align: center;
  }
  #vsb_content_4 .vsbcontent_img {
    text-align: center;
    text-indent: 0;
  }
  // 园林学院部分样式
  .news-title {
    padding: 0.6em 0;
    text-align: center;
    font-size: 1.6em;
    font-weight: bold;
  }
  .news-source {
    padding-bottom: 2em;
    text-align: center;
    font-size: 0.95em;
    color: #888;
  }
  // 生物环境部分样式
  .cotit {
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    padding-bottom: 15px;
  }
  .sjkk {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed #ccc;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: center;
  }
</style>