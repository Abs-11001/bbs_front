<template>
  <div class="search-content quick-news width90">
    <div class="left">
      <div class="search-input">
        <u-search :config="config" @submit="submit"></u-search>
      </div>
    </div>
    <div class="right">
      <div class="news">
        <el-carousel height="30px" direction="vertical" :autoplay="true" :interval="2500">
          <el-carousel-item v-for="n in news" :key="n.idx">
            <a :title="n.title" @click="openDialog(n)">
              <span class="news-item-content">{{ n.title }}</span>
              <span class="news-item-time">({{ n.addTime }})</span>
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
  <el-dialog
      class="text-carousel-dialog"
      v-model="dialog.visible"
      :title="dialog.title">
    <div v-html="dialog.content"></div>
    <div class="publish-time">
      发布时间：{{ dialog.publishTime }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialog.visible = false">看完了</el-button>
      </span>
    </template>
  </el-dialog>
<!--  <el-divider class="width90"></el-divider>-->
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import {USearch} from "undraw-ui";
  import {getTextCarousel} from '@/api/carousel/index.js'

  const dialog = reactive({
    visible: false,
    title: null,
    content: null,
    publishTime: null
  })
  const news = reactive([])

  getTextCarousel().then(res => {
    const { code, data } = res
    if(code === 200) {
      data.forEach(item => {
        // 过滤被禁用的
        if(!item.del) news.push(item)
      })
    }
  })

  function openDialog(data) {
    dialog.title = data.title
    dialog.content = data.content
    dialog.publishTime = data.addTime
    dialog.visible = true
  }

  const search = ref('')
  function hotWordsFilter(hotWord) {
    // 截取热搜的前四位关键字
    let suffix = ''
    if(hotWord.length > 4) suffix = '...'
    return hotWord.substring(0, 4) + suffix
  }

  const config = ref({
    keywords: ['斗罗大陆', '斗破苍穹', '吞噬星空', '凡人修仙传', '一念永恒'], // 搜索框关键字滚动
    hotSearchList: [
      '斗罗大陆',
      '斗破苍穹',
      '吞噬星空',
      '凡人修仙传',
      '一念永恒',
      '完美世界',
      '鬼灭之刃',
      '间谍过家家',
      '武动乾坤',
      '神印王座'
    ] // top10 热门搜索 最多显示10条数据
  })

  const submit = (val) => {
    console.log(val)
    window.open('/all?keyword=' + val)
  }
</script>

<style lang="less" scoped>
  .search-content{
    display: flex;
    justify-content: space-between;
    margin: 5px auto;
    // 在media_max_width_820px.less中，实现了媒体查询功能，修改时注意代码适配
    .left{
      flex: 0 1 40%;
      display: flex;
      .search-input{
        flex: 1 1 50%;
      }
      .hot-words{
        flex: 1 1 40%;
        margin-left: 15px;
        overflow: hidden;
        white-space: nowrap;
        font-size: 0.8rem;
        span{
          line-height: 32px;
          font-weight: 700;
        }
        a{
          margin: 0 5px;
          overflow: hidden;
          white-space: nowrap;
          text-align: center;
          &:hover{
            color: #79bbff;
            border-bottom: 2px solid #79bbff;
          }
        }
      }
    }
    .right{
      flex: 0 1 40%;
      .news{
        .el-carousel{
          a{
            display: flex;
            line-height: 30px;
            font-size: 0.9rem;
            &:hover{
              color:  #95d475;
            }
            .news-item-content{
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          //::v-deep .el-carousel__item{
          //  display: flex;
          //  flex-direction: row-reverse;
          //  align-items: center;
          //}
        }
      }
    }
  }
  .publish-time{
    text-align: right;
    font-size: 13px;
  }
  .el-divider{
    margin: 5px auto;
  }
</style>