<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";

const programs = ref([]);
const listPrograms = async (genreId) => {
  const response = await api.get("discover/tv", {
    params: {
      with_genres: genreId,
      language: "pt-BR",
    },
  });
  programs.value = response.data.results;
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
  </div>

  <div class="program-list">
    <div v-for="program in programs" :key="program.id">
      <img
      :src="`https://image.tmdb.org/t/p/w500${program.poster_path}`"
      :alt="program.title"
    />
    <div class="program-details">
      <p class="program-title">{{ program.title }}</p>
      <p class="program-release-date">{{ program.release_date }}</p>
      <p class="program-genres">{{ program.genre_ids }}</p>
    </div>
    
    </div>
  </div>
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.program-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  gap: 1rem;
}

.program-card{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  padding: 1rem;
  border-radius: 0.8rem;
  box-shadow: 0 0 0.3rem #ccc;
  min-height: 400px;
}

.program-card img{
  width: 100%;
  border-radius: 1rem;
}

</style>
