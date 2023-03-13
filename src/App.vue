<script setup>
  import TheHeader from "./components/header/TheHeader.vue";
  import TheNav from "./components/nav/TheNav.vue";
  import TheSearch from "@/components/search/TheSearch.vue";
  import BreadCrumb from "@/components/breadCrumb/BreadCrumb.vue";
</script>

<template>
    <the-header/>
    <the-nav/>
    <the-search/>
    <bread-crumb/>
    <router-view></router-view>
</template>

<style>

</style>
