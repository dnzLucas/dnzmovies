<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from 'vue-loading-overlay';

const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name

function getGenreName(id) {
    const genero = genres.value.find((genre) => genre.id === id);
    return genero.name;
  }


const isLoading = ref(false);
const programs = ref([]);
const listPrograms = async (genreId) => {
  isLoading.value = true;
  const response = await api.get("discover/tv", {
    params: {
      with_genres: genreId,
      language: "pt-BR",
    },
  });
  programs.value = response.data.results;
  isLoading.value = false;

};

const genres = ref([]);

onMounted(async () => {
  const response = await api.get("genre/tv/list?language=pt-BR");
  genres.value = response.data.genres;
});
</script>

<template>
  <div>
    <h1>Gêneros de programas de TV</h1>
    <ul class="genre-list">
      <li
        v-for="genre in genres"
        :key="genre.id"
        @click="listPrograms(genre.id)"
      >
        {{ genre.name }}
      </li>
    </ul>
    <loading v-model:active="isLoading" is-full-page loader="dots" color="white" background-color="black" />

  </div>

  <div class="program-list">
    <div v-for="program in programs" :key="program.id" class="program-card" >
      <img class="program-img"
      :src="`https://image.tmdb.org/t/p/w500${program.poster_path}`"
      :alt="program.title"
    />
    <div class="program-details">
      <p class="program-title">{{ program.name }}</p>
      <p class="program-release-date">{{ program.release_date }}</p>
      <p class="movie-genres">
  <span
    v-for="genre_id in programs.genre_ids"
    :key="genre_id"
    @click="listPrograms(genre_id)"
  >
    {{ getGenreName(genre_id) }} 
  </span>
</p>
    </div>
    
    </div>
  </div>
</template>

<style scoped>
@import "../assets/Sass/_tv.scss";

</style>
