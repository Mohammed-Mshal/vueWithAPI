<script setup>
import {  RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <div class="main-site">
    <HeaderComponent/>
    <RouterView  />
  </div>
</template>

<style scoped>

</style>
