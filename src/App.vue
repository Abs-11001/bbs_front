<script setup>
  import TheHeader from "./components/header/TheHeader.vue";
  import TheNav from "./components/nav/TheNav.vue";
  import TheSearch from "@/components/search/TheSearch.vue";
  import TheFooter from "@/components/footer/TheFooter.vue";
</script>

<template>
    <the-header/>
    <the-nav/>
    <the-search/>
    <router-view></router-view>
    <the-footer/>
    <el-backtop :right="30" :bottom="50" />
</template>

<style>

</style>
