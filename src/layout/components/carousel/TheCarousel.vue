<template>
  <el-carousel id="carousel" :height="carouselHeight">
    <el-carousel-item v-for="item in imgList" :key="item">
      <el-image :src="item" fit="scale-down" ref="myImage"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import {ref, onMounted, nextTick } from 'vue'
import {getImageCarousel} from "@/api/carousel";

const imgList = ref([])

// 指向image实例，方便通过dom元素获得图片的高度
const myImage = ref(null)
// carousel的高度
const carouselHeight = ref('500px')
function loadHeight() {
  // console.log(myImage.value[0].$el.offsetHeight)
  // 根据图片的高度，从而设置carousel的高度
  carouselHeight.value = myImage.value[0].$el.offsetHeight + 'px'
}
function getData() {
  getImageCarousel().then(res =>{
    const {data} = res
    const showList = data.filter(item => {
      return !item.del
    })
    imgList.value = showList.map(item => {
      if(!item.del) return 'http://file.upload.waheng.fun/' + item.img
    })
  })
}
onMounted(() => {
  // 页面首次加载时，动态加载carousel的高度
  nextTick(loadHeight)
  getData()
  // 检测resize事件，动态改变 carousel 的高度
  // window.addEventListener('resize', loadHeight);
})
</script>

<style lang="less" scoped>
  .el-carousel{
    margin: 10px 0;
  }
</style>
