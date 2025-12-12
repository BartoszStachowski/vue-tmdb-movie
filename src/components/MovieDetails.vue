<script setup lang="ts">
import { ref } from 'vue';
import type { MovieDetails } from '@/types/movie';
import type BaseSpinner from './base/BaseSpinner.vue';

interface Props {
  id: number;
}

const props = defineProps<Props>();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const isLoading = ref(false);
const movieDetails = ref<MovieDetails | null>(null);
const errorMessage = ref('');

const fetchDetails = async (id: number) => {
  isLoading.value = true;

  try {
    const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movie details.');
    }

    const data: MovieDetails = await response.json();
    movieDetails.value = data;
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
      return;
    }
  } finally {
    isLoading.value = false;
  }
};

fetchDetails(props.id);
</script>
<template>
  <BaseSpinner v-if="isLoading" />
  <div v-else-if="movieDetails">
    {{ movieDetails.title }}
  </div>
  <p v-else class="text-red-500">{{ errorMessage }}</p>
</template>
