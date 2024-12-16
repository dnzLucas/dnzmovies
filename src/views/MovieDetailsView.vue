<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useMovieStore } from "@/stores/movie";
import api from "@/plugins/axios";

const movieStore = useMovieStore();

// Declaração da prop para o `movieId`
const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

// Variável reativa para armazenar os trailers
const trailers = ref([]);

// Função para buscar os trailers do filme
const fetchTrailers = async (movieId) => {
  const response = await api.get(`movie/${movieId}/videos`, {
    params: {
      language: "pt-BR",
    },
  });

  // Filtrar apenas os trailers do YouTube
  trailers.value = response.data.results.filter(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
};

// Carregar os detalhes do filme e os trailers quando o componente for montado
onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId);
  await fetchTrailers(props.movieId);
});
</script>

<template>
  <div class="main">
    <div class="content">
      <div class="basic-info">
        <h1 class="title">{{ movieStore.currentMovie.title }}</h1>

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
      </div>

      <!-- Exibição dos trailers incorporados -->
      <div class="trailers" v-if="trailers.length > 0">
        <h3>Trailers disponíveis:</h3>
        <div class="trailer-list">
          <div v-for="trailer in trailers" :key="trailer.id" class="trailer-item">
            <p>{{ trailer.name }}</p>
            <iframe
              :src="`https://www.youtube.com/embed/${trailer.key}`"
              width="560"
              height="315"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      <p v-else>Nenhum trailer disponível para este filme.</p>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/Sass/movie/_movieDetails.scss";

.trailers {
  margin-top: 2rem;
}

.trailer-list {
  display: flex;
  flex-direction: column;
}

.trailer-item {
  margin-bottom: 1rem;
}

iframe {
  width: 100%;
  max-width: 560px;
  height: 315px;
}
</style>
