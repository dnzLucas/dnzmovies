<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/default/Header.vue'
import Footer from '@/components/default/Footer.vue'

</script>

<template>
  <div>
    <Header />
    <router-view />
    <Footer/>
  </div>
</template>

<style scoped>

</style>
