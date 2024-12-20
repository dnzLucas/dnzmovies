<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";
import Loading from 'vue-loading-overlay';
import { useRouter } from 'vue-router';

const router = useRouter();


// function getGenreName(id) {
//     const genero = genres.value.find((genre) => genre.id === id);
//     return genero.name;
//   }


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

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}


onMounted(async () => {
  const response = await api.get("genre/tv/list?language=pt-BR");
  genres.value = response.data.genres;
});
</script>

<template>
  <div class="container">
    <div>
      <h1>Gêneros de programas de TV</h1>
    <select class="genre-list">
      <option value="" selected disabled hidden>Escolha o gênero</option>
      <option
        v-for="genre in genres"
        :key="genre.id"
        @click="listPrograms(genre.id)"
      >
        {{ genre.name }}
      </option>
    </select>
    <loading v-model:active="isLoading" is-full-page loader="dots" color="white" background-color="black" />
    </div>


  <div class="program-list">
    <div @click="openTv(program.id)" v-for="program in programs" :key="program.id" class="program-card" >
      <img class="program-img"
      :src="`https://image.tmdb.org/t/p/w500${program.poster_path}`"
      :alt="program.title"
    />
    <div class="program-details">
      <p class="program-title">{{ program.name }}</p>
      <p class="program-release-date">{{ program.release_date }}</p>
      <!-- <p class="movie-genres">
  <span
    v-for="genre_id in programs.genre_ids"
    :key="genre_id"
    @click="listPrograms(genre_id)"
  >
    {{ getGenreName(genre_id) }} 
  </span>
</p> -->
    </div>
    
    </div>
  </div>
</div>

</template>

<style scoped>
@import "../assets/Sass/_tv.scss";

</style>
