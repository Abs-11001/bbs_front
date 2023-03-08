<script setup>
  import TheHeader from "./components/header/TheHeader.vue";
  import TheNav from "./components/nav/TheNav.vue";
  import TheSearch from "@/components/search/TheSearch.vue";

</script>

<template>
    <the-header/>
    <the-nav/>
    <the-search/>
    <router-view></router-view>
</template>

<style>

</style>
