<template>
  <div class="carousel">
    <button @click="prevSlide" class="control prev">❮</button>
    <div class="carousel-wrapper">
      <div class="carousel-track" :style="trackStyle">
        <div v-for="movie in movies" :key="movie.id" class="carousel-item">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"
            :alt="movie.title"
          />
          <div class="pelicula"></div>
          <div class="movie-info">
            <p class="movie-title">{{ movie.title }}</p>
            <p class="overview">{{ movie.overview }}</p>

          </div>

        </div>
      </div>
    </div>
    <button @click="nextSlide" class="control next">❯</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import api from "@/plugins/axios";

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
  currentIndex.value =
    (currentIndex.value + 1) % movies.value.length; // Vai para o próximo slide
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + movies.value.length) % movies.value.length; // Vai para o slide anterior
};

onMounted(() => {
  getPopularMovies();
});
</script>

<style scoped>
.carousel {
  position: relative;
  width: 80%;
  margin: auto;
  overflow: hidden;
}

.carousel-wrapper {
  width: 100%;
}

.carousel-track {
  display: flex;
  width: 100%;
}

.carousel-item {
  min-width: 100%;
  text-align: center;
  position: relative;
}

.movie-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  text-align: start;
}

.carousel-item p{
  bottom: 90px;
  font-size: 3em;
  font-weight: 600;
}

.carousel-item .overview{
  bottom: 50px;
  font-size: 1.1em;
  width: 50vw;
  font-weight: 400;
  color: white;
  padding: 5px;
  text-align: start;
}

.carousel-item .movie-release-date{
  bottom: 0;
  right: 0;
  font-size: 1.5em;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
}

.control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  font-size: 1.5rem;
  z-index: 10;
}

.control.prev {
  left: 0;
}

.control.next {
  right: 0;
}

.movie-title {
  margin-top: 10px;
  font-size: 1.2rem;
}

img{
  width: 70vw;
  height: 60vh;
  object-fit: cover;
}
.pelicula {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;  /* Alinha verticalmente no meio */
  left: 50%;  /* Alinha horizontalmente no meio */
  transform: translate(-50%, -50%); /* Centraliza perfeitamente */
  background: rgba(0, 0, 0, 0.5); /* Cor semitransparente */
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  color: #000; /* Cor do texto */
  font-weight: bold;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* Sombra para destacar a película */
}

</style>
