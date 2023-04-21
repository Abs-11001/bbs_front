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
      <span class="time">{{ data.time }}</span>
    </div>
    <div class="section-body">
      <div class="section-left">
        <h3 class="section-title">{{ data.title }}</h3>
        <div class="section-description">
          {{ data.description }}
        </div>
        <div class="section-action">
          <div class="view">
            <preview-open theme="outline" size="26" fill="#333" :strokeWidth="2"/>
            {{ data.view }}
          </div>
          <div class="like">
            <thumbs-up theme="outline" size="22" fill="#333" :strokeWidth="2"/>
            {{ data.like }}
          </div>
          <div class="comment">
            <comment theme="outline" size="22" fill="#333" :strokeWidth="2"/>
            {{ data.comment }}
          </div>
        </div>
      </div>
      <div class="section-right">
        <el-image :src="data.preview"></el-image>
      </div>
    </div>
    <el-divider/>
  </section>
</template>

<script  setup>
import {ThumbsUp, PreviewOpen, Comment} from "@icon-park/vue-next";
defineProps({
  data: Object
})
</script>

<style lang="less" scoped>
  section{
    padding: 10px 10px 0 10px;
    cursor: pointer;
    .section-info{
      max-width: 162px;
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
          div{
            margin: 0 10px;
            cursor: pointer;
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