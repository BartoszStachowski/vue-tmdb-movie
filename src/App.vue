<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import BaseSearch from '@/components/BaseSearch.vue';
import MovieCard from '@/components/MovieCard.vue';

import type { Movie, MovieResponse } from '@/types/movie';
import BaseSpinner from './components/BaseSpinner.vue';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const search = ref('');
const errorMessage = ref('');
const movies = ref<Movie[]>([]);

const isLoading = ref(false);

const fetchMovies = async (query: string = ''): Promise<void> => {
  isLoading.value = true;

  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }

    const data: MovieResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      errorMessage.value = 'No movies found.';
      movies.value = [];
      return;
    }

    movies.value = data.results || [];
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
      return;
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  fetchMovies();
});

let timeout: ReturnType<typeof setTimeout> | null = null;

watch(search, (value: string) => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    fetchMovies(value);
  }, 1000);
});

onMounted(() => {
  if (timeout) clearTimeout(timeout);
});
</script>

<template>
  <main>
    <div class="pattern" />
    <div class="wrapper">
      <header>
        <img src="/hero-logo.png" alt="Hero Banner" class="mb-12" />
        <h1>
          Find <span class="text-gradient">Movies</span> You'll Enjoy Without
          the Hassle
        </h1>
        <BaseSearch v-model="search" />
      </header>

      <!-- ALL MOVIES SECTION -->
      <section class="space-y-9">
        <h2>All Movies</h2>

        <BaseSpinner v-if="isLoading" />
        <p v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <ul
          v-else
          class="gap-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <li v-for="movie in movies" :key="movie.id">
            <MovieCard :movie />
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
