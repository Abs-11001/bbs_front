/**
 * @author 三分
 * @description: 详细文章页面
 * @create date 2023/04/21 13:05:37
 * @last date 2023/04/21 13:05:37
*/

<template>
<div>dsfsdf</div>
</template>

<script setup>
import {onMounted} from "vue";

import {useRoute} from "vue-router";

const route = useRoute()

onMounted( () => {
  // 从路由上取出文章nanoid
  const nanoid = route.query && route.query.nanoid
})


</script>

<style scoped>

</style>