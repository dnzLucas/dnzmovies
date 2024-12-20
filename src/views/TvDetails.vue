<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useTvStore } from "@/stores/tv";
import api from "@/plugins/axios";

const tvStore = useTvStore();

// Declaração da prop para o `tvId`
const props = defineProps({
  tvId: {
    type: Number,
    required: true,
  },
});

// Variável reativa para armazenar os trailers
const trailers = ref([]);

// Função para buscar os trailers do filme
const fetchTrailers = async (tvId) => {
  const response = await api.get(`tv/${tvId}/videos`, {
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
  await tvStore.getTvDetail(props.tvId);
  await fetchTrailers(props.tvId); // Chama a função para buscar trailers
});
</script>

<template>
  <div class="main">
    <div class="content">
      <div class="basic-info">
        <h1 class="title">{{ tvStore.currentTv.name }}</h1>

        <img
          :src="`https://image.tmdb.org/t/p/original${tvStore.currentTv.backdrop_path}`"
          :alt="tvStore.currentTv.title"
          class="movie-backdrop"
        />

        <img
          :src="`https://image.tmdb.org/t/p/original${tvStore.currentTv.poster_path}`"
          :alt="tvStore.currentTv.title"
          class="movie-poster"
        />
      </div>

      <div class="details">
        <div class="first-side">
          <h3 class="details-text">Sinopse</h3>
          <p class="movie-overview">{{ tvStore.currentTv.overview }}</p>
        </div>
        <div class="second-side">
          <h3 class="details-text">Detalhes</h3>
          <p>
            Data de lançamento:
            <span> {{ tvStore.currentTv.first_air_date }}</span>
          </p>
          <p>
            Duração:
            {{ tvStore.currentTv.episode_run_time?.[0] || "N/A" }} minutos
          </p>
          <p>Idioma original: {{ tvStore.currentTv.original_language }}</p>
          <p>Popularidade: {{ tvStore.currentTv.popularity }}</p>
          <p>Receita: ${{ tvStore.currentTv.revenue }}</p>
          <p entMovie.budget>Orçamento: ${{ tvStore.currentTv.budget }}</p>
          <p>Avaliação: {{ tvStore.currentTv.vote_average }}</p>
        </div>
      </div>

      <!-- Exibição dos trailers incorporados -->
      <div class="trailers" v-if="trailers.length > 0">
        <h3>Trailers disponíveis:</h3>
        <div class="trailer-list">
          <div
            v-for="trailer in trailers"
            :key="trailer.id"
            class="trailer-item"
          >
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
  text-align: center;
}

.trailer-list {
  display: flex;
  gap: 10px;
  justify-content: space-around;
  flex-wrap: wrap;
}

.trailer-item {
  margin-bottom: 1rem;
  width: 500px;
}

iframe {
  width: 100%;
  max-width: 560px;
  height: 315px;
}
</style>
