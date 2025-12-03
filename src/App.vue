<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import BaseSearch from '@/components/BaseSearch.vue';
import MovieCard from '@/components/MovieCard.vue';

import type { Movie } from '@/types/movie';

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
const movies = ref<Movie[]>([]);

onMounted(async () => {
  const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  movies.value = data.results;
});

let timeout: ReturnType<typeof setTimeout> | null = null;
watch(search, (value: string) => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    console.log(value);
  }, 1000);
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
        <ul
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
