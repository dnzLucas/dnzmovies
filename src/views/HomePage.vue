<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";

const isLoading = ref(false);
const movies = ref([]);

// Função para buscar filmes populares
const getPopularMovies = async () => {
  isLoading.value = true;
  const response = await api.get("movie/popular", {
    params: {
      language: "pt-BR",
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};

onMounted(() => {
  // Chama a função para buscar os filmes populares assim que o componente for montado
  getPopularMovies();
});

const formatDate = (date) => {
  return new Date(date)
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(".", "");
};
</script>

<template>
  <div class="container">
    <div>
      <h1>Filmes Populares</h1>
      <loading
        v-model:active="isLoading"
        is-full-page
        loader="dots"
        color="white"
        background-color="black"
      />
    </div>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
          :alt="movie.title"
        />

        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/Sass/_movies.scss";
</style>
