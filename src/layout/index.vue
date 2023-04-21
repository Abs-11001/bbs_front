<template>
  <the-header/>
  <the-nav/>
  <the-search/>
  <router-view></router-view>
  <the-footer/>
  <el-backtop :right="30" :bottom="50" />
</template>

<script setup>
import TheHeader from "@/layout/components/header/TheHeader.vue";
import TheNav from "@/layout/components/nav/TheNav.vue";
import TheSearch from "@/layout/components/search/TheSearch.vue";
import TheFooter from "@/layout/components/footer/TheFooter.vue";
</script>

<style scoped>

</style>