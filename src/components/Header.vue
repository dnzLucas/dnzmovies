<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>
  </div>
</template>

<style scoped>
  nav {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
    column-gap: 2rem;
    background-color: rgb(23, 41, 22);
    height: 100px;
    padding: 0 20px;
  }

    nav a {
        color: white;
        text-decoration: none;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
    }

</style>
