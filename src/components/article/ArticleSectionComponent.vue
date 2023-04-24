/**
 * @author 三分
 * @description: 信息共享页面，文章展示组件
 * @create date 2023/04/21 13:08:41
 * @last date 2023/04/21 13:08:41
*/

<template>
  <section>
    <div class="section-info">
      <span class="nick-name">{{ data.nickName }}</span>
      <span>|</span>
      <span class="time">{{ data.publishTime }}</span>
    </div>
    <div class="section-body" @click="goToDetail(data.nanoid)">
      <div class="section-left">
        <h3 class="section-title">{{ data.title }}</h3>
        <div class="section-description">
          {{ data.description }}
        </div>
        <div class="section-action">
          <div class="action view">
            <preview-open theme="outline" size="22" fill="#333" :strokeWidth="2"/>
            <span>{{ data.view }}</span>
          </div>
          <div class="action like">
            <thumbs-up theme="outline" size="20" fill="#333" :strokeWidth="2"/>
            <span>{{ data.like }}</span>
          </div>
          <div class="action comment">
            <comment theme="outline" size="18" fill="#333" :strokeWidth="2"/>
            <span>{{ data.comment }}</span>
          </div>
        </div>
      </div>
      <div class="section-right" v-if="data.preview">
        <el-image :src="data.preview"></el-image>
      </div>
    </div>
    <el-divider/>
  </section>
</template>

<script  setup>
import {useRouter} from "vue-router";
import {ThumbsUp, PreviewOpen, Comment} from "@icon-park/vue-next";

defineProps({
  data: Object
})

const router = useRouter()

// 跳转文章详情
const goToDetail = (nanoid) => {
  let routeData = router.resolve({ name: 'detailInformation', query: { nanoid } });
  window.open(routeData.href, '_blank');
}
</script>

<style lang="less" scoped>
  section{
    padding: 10px 10px 0 10px;
    cursor: pointer;
    .section-info{
      max-width: 220px;
      font-size: 13px;
      line-height: 22px;
      color: #4e5969;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      span{
        margin: 0 5px;
        &.nick-name{
          cursor: pointer;
        }
        &.nick-name:hover{
          cursor: pointer;
          color: var(--el-color-primary);
        }
        &.time{
          color: #86909c;
        }
      }
    }
    .section-body{
      display: flex;
      justify-content: space-between;

      .section-left{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .section-title{
          margin: 10px 0;
        }
        .section-description{
          margin: 10px 0;
          font-weight: 400;
          font-size: 13px;
          line-height: 22px;
          color: #86909c;
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .section-action{
          margin: 10px 0;
          display: flex;
          align-items: center;
          .action{
            display: flex;
            align-items: center;
            margin: 0 10px;
            cursor: pointer;
            span{
              margin-left: 5px;
            }
            &:hover{
              color: #79bbff;
            }
          }
        }
      }
      .section-right{
        display: flex;
        align-items: center;
        justify-content: center;
        .el-image{
          margin-left: 24px;
          width: 120px;
          height: 80px;
        }
      }
    }
    .el-divider{
      margin: 0;
    }
  }
  section:hover{
    background-color: #fafafa;
  }
</style>