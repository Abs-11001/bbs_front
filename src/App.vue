<script setup>
  import TheHeader from "./components/header/TheHeader.vue";
  import TheNav from "./components/nav/TheNav.vue";
  import TheCarousel from "@/components/carousel/TheCarousel.vue";
  import TheSearch from "@/components/search/TheSearch.vue";
  import TheFooter from "@/components/footer/TheFooter.vue";
</script>

<template>
    <the-header/>
    <the-nav/>
    <the-search/>
    <the-carousel/>
    <router-view></router-view>
    <the-footer/>
    <el-backtop :right="100" :bottom="100" />
</template>

<style>

</style>
