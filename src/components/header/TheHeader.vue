<template>
    <header>
      <div class="container width90">
        <div id="header_left">
          <img src="./img/logo.png" alt="浙江农林大学暨阳学院logo">
        </div>
        <div id="header_right">
          <div id="header_img">
            <el-dropdown>
              <img src="./img/user_logo.jpg" alt="用户头像">
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>登录</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
@avatar-size: 40px;
  header{
    background-color: rgba(72, 78, 82, 0.78);
    .container{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;

      #header_right{
        #header_img{
          img{
            width: @avatar-size;
            height: @avatar-size;
            border-radius: 50%;
            outline: none;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>