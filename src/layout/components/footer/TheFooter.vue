<template>
  <footer>
    <div class="container width90">
      <div class="info">
        <el-image :src='bbs_logo'/>
        <p>一个专门为暨阳打造的校园论坛系统</p>
      </div>
      <div class="part">
        <div class="part-title">网站相关</div>
        <ul>
          <li>
            <el-link href="http://www.waheng.fun" target="_blank">常见问题</el-link>
          </li>
          <li>
            <el-link href="http://www.waheng.fun" target="_blank">规章制度</el-link>
          </li>
          <li>
            <el-link href="http://www.waheng.fun" target="_blank">免责申明</el-link>
          </li>
        </ul>
      </div>
      <div class="part">
        <div class="part-title">友情链接</div>
        <ul>
          <li>
            <el-link href="http://www.waheng.fun" target="_blank">浙江大学</el-link>
          </li>
          <li>
            <el-link href="http://www.waheng.fun" target="_blank">浙江农林大学</el-link>
          </li>
          <li>
            <el-link href="http://www.waheng.fun" target="_blank">浙江农林大学暨阳学院</el-link>
          </li>
        </ul>
      </div>
<!--      <div class="part">-->
<!--        <div class="part-title">网站相关</div>-->
<!--        <ul>-->
<!--          <li>-->
<!--            <el-link href="http://www.waheng.fun" target="_blank">常见问题</el-link>-->
<!--          </li>-->
<!--          <li>-->
<!--            <el-link href="http://www.waheng.fun" target="_blank">规章制度</el-link>-->
<!--          </li>-->
<!--          <li>-->
<!--            <el-link href="http://www.waheng.fun" target="_blank">免责申明</el-link>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
    </div>
  </footer>
</template>

<script setup>

  const bbs_logo = new URL('../../../assets/images/bbs_logo.png', import.meta.url).href

</script>

<style lang="less" scoped>
  footer{
    display: flex;
    align-items: center;
    height: 150px;
    margin-top: 20px;
    background-color: #e9e9e9;
    .container{
      display: flex;
      justify-content: space-around;
      .info{
        .el-image{
          width: 200px;
        }
        font-size: 0.9rem;
      }
      .part{
        ul{
          list-style: none;
        }
      }
    }
  }
</style>