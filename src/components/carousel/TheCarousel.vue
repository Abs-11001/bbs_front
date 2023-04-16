<template>
  <el-carousel class="width90" id="carousel" :height="carouselHeight">
    <el-carousel-item v-for="item in imgList" :key="item">
      <el-image :src="item.url" fit="scale-down" ref="myImage"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import {ref, reactive, onMounted, nextTick } from 'vue'

const imgList = reactive([
  {
    url: 'http://smart-campus-android.oss-cn-hangzhou.aliyuncs.com/1.jpg'
  },
  {
    url: 'http://smart-campus-android.oss-cn-hangzhou.aliyuncs.com/2.jpeg'
  },
  {
    url: 'http://smart-campus-android.oss-cn-hangzhou.aliyuncs.com/3.jpeg'
  },
])

// 指向image实例，方便通过dom元素获得图片的高度
const myImage = ref(null)
// carousel的高度
const carouselHeight = ref()
function loadHeight() {
  // console.log(myImage.value[0].$el.offsetHeight)
  // 根据图片的高度，从而设置carousel的高度
  carouselHeight.value = myImage.value[0].$el.offsetHeight + 'px'
}
onMounted(() => {
  // 页面首次加载时，动态加载carousel的高度
  nextTick(loadHeight)
  // 检测resize事件，动态改变 carousel 的高度
  window.addEventListener('resize', loadHeight);
})
</script>

<style lang="less" scoped>
  .el-carousel{
    margin-top: 10px;
  }
</style>