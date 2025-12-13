<script setup lang="ts">
import { ref } from 'vue';
import type { MovieDetails } from '@/types/movie';
import BaseSpinner from '@/components/base/BaseSpinner.vue';

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
    console.log(movieDetails.value);
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
  <div
    v-else-if="movieDetails"
    class="bg-neutral-950 rounded-2xl ring-1 ring-white/10 w-full max-w-4xl overflow-hidden text-neutral-100"
  >
    <div class="relative">
      <!-- background -->
      <div class="w-full h-44 sm:h-56 md:h-64">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`"
          :alt="movieDetails.title"
          class="opacity-90 w-full h-full object-cover"
        />
      </div>
      <div
        class="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent"
      ></div>

      <!-- poster + title -->
    </div>
  </div>
  <p v-else class="text-red-500">{{ errorMessage }}</p>
</template>
