<template>
  <div class="width90 main">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-skeleton :rows="6" animated :throttle="500" :loading="loading" >
          <div class="plate new_thread">
            <div class="container">
              <div class="title_box">
                <h5 class="title">新鲜出炉(更多)</h5>
              </div>
              <div class="content_box">
                <template v-for="index of 10"  :key="index">
                  <div class="thread_line">
                    <a href="http://www.waheng.fun">三分导航三分导航三分导航i love you s</a>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </el-skeleton>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-skeleton :rows="6" animated :throttle="500"  :loading="loading" >
          <div class="plate hot_thread">
            <div class="container">
              <div class="title_box">
                <h5 class="title">人气热门(更多)</h5>
              </div>
            </div>
          </div>
        </el-skeleton>
      </el-col>

      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-skeleton :rows="6" animated :throttle="500"  :loading="loading" >
          <div class="plate evil_thread">
            <div class="container">
              <div class="title_box">
                <h5 class="title">灌水嫌疑(更多)</h5>
              </div>
            </div>
          </div>
        </el-skeleton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TheHome',
  data(){
    return {
      loading: true
    }
  },
  mounted(){
    setTimeout(()=>{this.loading = false}, 1000)
  }
}
</script>

<style lang="less" scoped>
  .main{
    .plate{
      //border: 1px solid red;
      .container{
        .title_box{
          //border: 1px solid blue;
          .title{
            padding: 5px 0;
            text-align: center;
            background-color:#f2f2f2;
          }
        }
        .content_box{
          background-image: url(./img/list_bg.gif);
          background-repeat: no-repeat;
          padding-left: 20px;
          .thread_line{
            margin-left: 5px;
            height: 22px;
            line-height: 22px;
            overflow: hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
            border-bottom: 1px dashed #CDCDCD;
            a{
              text-decoration: none;
              color: black;
            }
          }
        }
      }
    }
  }
</style>