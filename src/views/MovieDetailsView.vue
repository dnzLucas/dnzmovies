<script setup>
import { defineProps, onMounted } from "vue";
import { useMovieStore } from "@/stores/movie";
const movieStore = useMovieStore();

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId);
});
</script>

<template>
  <div class="main">
    <div class="content">
      <div class="basic-info">
        <h1 class="title">{{ movieStore.currentMovie.title }}</h1>

        <div class="pelicula"></div>
        <img
          :src="`https://image.tmdb.org/t/p/original${movieStore.currentMovie.backdrop_path}`"
          :alt="movieStore.currentMovie.title"
          class="movie-backdrop"
        />

        <img
          :src="`https://image.tmdb.org/t/p/original${movieStore.currentMovie.poster_path}`"
          :alt="movieStore.currentMovie.title"
          class="movie-poster"
        />
      </div>
      <div class="details">
        <div class="first-side">
          <h3 class="overview-title">Sinopse</h3>
          <p class="movie-overview">{{ movieStore.currentMovie.overview }}</p>
          <p v-if="movieStore.currentMovie.budget > 0">
            Orçamento: ${{ movieStore.currentMovie.budget }}
          </p>
          <p>Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
        </div>
        <div class="second-side">
          <p>Data de lançamento: {{ movieStore.currentMovie.release_date }}</p>
          <p>Duração: {{ movieStore.currentMovie.runtime }} minutos</p>
          <p>Idioma original: {{ movieStore.currentMovie.original_language }}</p>
          <p>Popularidade: {{ movieStore.currentMovie.popularity }}</p>
          <p>Receita: ${{ movieStore.currentMovie.revenue }}</p>
        </div>
        <!-- <p>Produtoras</p>
      <div class="companies">
        <template
          v-for="company in movieStore.currentMovie.production_companies"
          :key="company.id"
        >
          <img
            v-if="company.logo_path"
            :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
            :alt="company.logo_path"
            @click="openMovie(movie.id)"
          />
          <p v-else>{{ company.name }}</p>
        </template>
      </div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/Sass/movie/_movieDetails.scss";
</style>
