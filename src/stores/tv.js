import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import api from "../plugins/axios";

export const useTvStore = defineStore("tv", () => {
  const state = reactive({
    currentTv: {},
  });

  const currentTv = computed(() => state.currentTv);

  const getTvDetail = async (tvId) => {
    const response = await api.get(`/tv/${tvId}?language=pt-BR`);
    state.currentTv = response.data;
  };

  return { currentTv, getTvDetail };
});
