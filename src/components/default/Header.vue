<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav>
      <img class="logo" src="../../assets/images/image.png" alt="">
      <router-link class="link"  to="/">Home</router-link>
      <router-link class="link"  to="/filmes">Filmes</router-link>
      <router-link class="link"  to="/tv">Programas de TV</router-link>
    </nav>
  </div>
</template>

<style scoped>
@import "../../assets/Sass/default/_header.scss";

</style>
