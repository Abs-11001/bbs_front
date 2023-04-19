<template>
  <div class="filter">
    <el-select
        v-model="value"
        multiple
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="请选择机构">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
    </el-select>
    <el-input></el-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string[]>([])
const options = [
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
]
</script>

<style lang="less" scoped>

</style>