<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from "vue-loading-overlay";
import { useGenreStore } from "@/stores/genre";
const genreStore = useGenreStore();
const isLoading = ref(false);

// function getGenreName(id){
//   const genero = genres.value.find((genre) => genre.id === id);
//   return genero.name;
// }

const movies = ref([]);
const listMovies = async (genreId) => {
  isLoading.value = true;
  const response = await api.get("discover/movie", {
    params: {
      with_genres: genreId,
      language: "pt-BR",
    },
  });
  movies.value = response.data.results;
  isLoading.value = false;
};

const genres = ref([]);

onMounted(async () => {
  // const response = await api.get('genre/movie/list?language=pt-BR');
  // genres.value = response.data.genres;
  isLoading.value = true;
  await genreStore.getAllGenres("movie");
  isLoading.value = false;
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
      <h1>Gêneros de filmes</h1>
      <ul class="genre-list">
        <li
          v-for="genre in genreStore.genres"
          :key="genre.id"
          @click="listMovies(genre.id)"
          class="genre-item"
        >
          {{ genre.name }}
        </li>
      </ul>
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
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
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
