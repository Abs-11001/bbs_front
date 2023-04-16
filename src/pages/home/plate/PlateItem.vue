/**
 * @author 三分
 * @description: 显示板块信息的组件
 * @create date 2023/04/16 15:33:03
 * @last date 2023/04/16 15:33:03
*/

<template>
  <div class="plate">
    <div class="container">
      <div class="title-box">
        <h3 class="title">{{ title }}</h3>
      </div>
      <div class="content-box">
        <el-card shadow="hover" v-for="item in plateData"  :key="item.idx">
          <a :href="item.url" target="_blank">{{ item.title }}</a>
        </el-card>
        <div class="load-more">
          <el-link @click="loadMore">加载更多...</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
  // 板块标题
  defineProps({
    title: String
  })
  const plateData = reactive([
    {
      idx: 1,
      url: 'http://sxy.zjyc.edu.cn/info/1008/8312.htm',
      title: '商学院组织观看学校学习贯彻习近平新时代中国特色社会主义思想主题教育动员大会直播'
    },
    {
      idx: 2,
      url: 'http://www.zjyc.edu.cn/info/1026/16730.htm',
      title: '共话新时代枫桥经验 助推学院版“枫桥经验”建设'
    },
    {
      idx: 3,
      url: 'http://www.zjyc.edu.cn/info/1027/16732.htm',
      title: '生物环境学院食品科学与工程专业组织召开就业实习宣讲会'
    },
  ])

  // 板块显示内容相关配置
  // 用于记录加载第几页数据，虽然用的不是分页，但是原理跟分页差不多
  const pageSize = ref(1)
  function loadMore() {
    pageSize.value += 1
    for (let i = 0; i < 10; i++) {
      plateData.push({
        idx: 1,
        url: 'http://sxy.zjyc.edu.cn/info/1008/8312.htm',
        title: '共青团浙江农林大学暨阳学院委员会 关于开展团员民主教育评议和2022年度先进团支部、优秀团干部、优秀团员评比的通知'
      })
    }

  }
</script>

<style lang="less" scoped>
  .plate{
  //border: 1px solid red;
  .container{
    .title-box{
      //border: 1px solid blue;
      //cursor: pointer;
      .title{
        padding: 5px 0;
        text-align: center;
        background-color:#f2f2f2;
      }
    }
    .content-box{
      .el-card{
        margin: 10px 0;
      }
      .load-more{
        text-align: center;
      }
    }
    //.content-box{
    //  background-image: url(../img/list_bg.gif);
    //  background-repeat: no-repeat;
    //  padding-left: 20px;
    //  .content-item{
    //    margin-left: 5px;
    //    height: 22px;
    //    line-height: 22px;
    //    overflow: hidden;
    //    white-space:nowrap;
    //    text-overflow: ellipsis;
    //    border-bottom: 1px dashed #CDCDCD;
    //    a{
    //      text-decoration: none;
    //      color: black;
    //    }
    //  }
    //}
  }
}
</style>