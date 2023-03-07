<template>
  <div class="plate">
    <div class="container">
      <div class="title-box">
        <h5 class="title">{{ title }}</h5>
      </div>
      <div class="content-box">
        <template v-for="index of 10"  :key="index">
          <div class="content-item">
            <a href="http://www.waheng.fun">三分导航三分导航三分导航i love you s</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: String
  })
</script>

<style lang="less" scoped>
  .plate{
  //border: 1px solid red;
  .container{
    .title-box{
      //border: 1px solid blue;
      .title{
        padding: 5px 0;
        text-align: center;
        background-color:#f2f2f2;
      }
    }
    .content-box{
      background-image: url(../img/list_bg.gif);
      background-repeat: no-repeat;
      padding-left: 20px;
      .content-item{
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
</style>