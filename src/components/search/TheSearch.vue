<template>
  <div class="search-content quick-news width90">
    <div class="left">
      <div class="search-input">
        <el-input
            v-model.trim="search"
            class="w-50 m-2"
            clearable
            placeholder="请输入要搜索的内容">
          <template #append>
            <el-button :icon="Search"/>
          </template>
        </el-input>
      </div>
      <div class="hot-words">
        <span>热搜：</span>
        <a href="http://www.waheng.fun" target="_blank" title="暨阳1212121212致用啊">{{ hotWordsFilter('暨阳1212121212致用啊') }}</a>
        <a href="http://www.waheng.fun" target="_blank" title="听">{{ hotWordsFilter('听') }}</a>
        <a href="http://www.waheng.fun" target="_blank" title="暨阳致用">{{ hotWordsFilter('暨阳致用') }}</a>
        <a href="http://www.waheng.fun" target="_blank" title="校园">{{ hotWordsFilter('校园') }}</a>
      </div>
    </div>
    <div class="right">
      <div class="news">
        <el-carousel height="30px" direction="vertical" :autoplay="true" interval="2500">
          <el-carousel-item v-for="n in news" :key="n.idx">
<!--            <h3 text="2xl" justify="center">{{ n.title }}</h3>-->
            <a :href="n.url" :title="n.title">{{ n.title }}({{ n.time }})</a>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, reactive } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  const search = ref('')
  const news = reactive([
    {
      idx: 1,
      title: '人文学院、马克思主义学院赴诸暨市文化广电旅游局开展访企拓岗促就业专项行动',
      url: 'http://www.waheng.fun',
      time: '2023-03-12'
    },
    {
      idx: 2,
      title: '关于2023届省级优秀毕业生及院级优秀毕业生推荐名单的公示',
      url: 'http://www.waheng.fun',
        time: '2023-03-12'
    },
    {
      idx: 3,
      title: '商学院2023届绍兴市优秀毕业生 评比结果公示',
      url: 'http://www.waheng.fun',
        time: '2023-03-12'
    },
  ])

  function hotWordsFilter(hotWord: String) {
    // 截取热搜的前四位关键字
    let suffix = ''
    if(hotWord.length > 4) suffix = '...'
    return hotWord.substring(0, 4) + suffix
  }
</script>

<style lang="less" scoped>
  .search-content{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
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
            font-size: 0.9rem;
            &:hover{
              color:  #95d475;
            }
          }
          ::v-deep .el-carousel__item{
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
          }
        }
      }
    }
  }
</style>