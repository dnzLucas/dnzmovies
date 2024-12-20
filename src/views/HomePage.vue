<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/plugins/axios";
import {useRouter } from 'vue-router';
import cards from "@/components/homepage/card.vue";

const movies = ref([]);
const currentIndex = ref(0);

const getPopularMovies = async () => {
  const response = await api.get("movie/popular", {
    params: { language: "pt-BR" },
  });
  movies.value = response.data.results;
};

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
  transition: "transform 0.5s ease",
}));

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % movies.value.length; // Vai para o próximo slide
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + movies.value.length) % movies.value.length; // Vai para o slide anterior
};

onMounted((async) => {
  getPopularMovies();
});
</script>
<template>
  <h1>DNZMOVIES</h1>
  <div class="carousel">
    <button @click="prevSlide" class="control prev">❮</button>
    <div class="carousel-wrapper">
      <div class="carousel-track" :style="trackStyle">
        <div v-for="movie in movies" :key="movie.id" class="carousel-item">
          <img
            :src="`http://image.tmdb.org/t/p/original/${movie.backdrop_path}`"
            :alt="movie.title"
          />
          <!-- <div class="pelicula"></div> -->
          <div class="movie-info">
            <p class="movie-title">{{ movie.title }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
        </div>
      </div>
    </div>
    <button @click="nextSlide" class="control next">❯</button>
  </div>

  <div class="text-area">
    <h2>Navegue por categoria</h2>
    <cards/>
  </div>

        
</template>

<style scoped>

@import "../assets/Sass/_homepage.scss";


</style>
