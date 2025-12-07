<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import BaseSearch from '@/components/BaseSearch.vue';
import MovieCard from '@/components/MovieCard.vue';

import type { Movie, MovieResponse, TrendingRow } from '@/types/movie';
import BaseSpinner from '@/components/BaseSpinner.vue';
import { getTrendingMovies, updateSearchCount } from '@/services/movie';

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
const trendingMovies = ref<TrendingRow[]>([]);
const moviesSectionRef = ref<HTMLElement | null>(null);

const isLoading = ref(false);

const fetchMovies = async (query: string = ''): Promise<void> => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }

    const data: MovieResponse = await response.json();
    const results = data.results ?? [];

    if (results.length === 0) {
      errorMessage.value = 'No movies found.';
      movies.value = [];
      return;
    }

    movies.value = results;

    const firstMovie = data.results[0];

    if (query && firstMovie) {
      await updateSearchCount(query, firstMovie);
    }
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
      return;
    }
  } finally {
    isLoading.value = false;
    await nextTick();

    alert('query: ' + query);
    alert('moviesSectionRef.value: ' + moviesSectionRef.value);

    if (query && moviesSectionRef.value) {
      setTimeout(() => {
        alert('Movie search completed!');
        alert(moviesSectionRef.value);
        moviesSectionRef.value?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'start',
        });
      }, 10);
    }
  }
};

const loadTrendingMovies = async () => {
  try {
    trendingMovies.value = await getTrendingMovies();
  } catch (error) {
    console.error(`Error fetching trending movies: ${error}`);
  }
};

onMounted(async () => {
  fetchMovies();
  loadTrendingMovies();
});

let timeout: ReturnType<typeof setTimeout> | null = null;

watch(search, (value: string) => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    fetchMovies(value);
    loadTrendingMovies();
  }, 1000);
});

onUnmounted(() => {
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

      <section class="mt-20">
        <h2>Trending Movies</h2>

        <ul
          class="flex flex-row gap-5 -mt-10 w-full overflow-y-auto hide-scrollbar"
        >
          <li
            v-for="(movie, index) in trendingMovies"
            :key="movie.$id"
            class="flex flex-row items-center min-w-[230px]"
          >
            <p class="mt-5 text-nowrap fancy-text">
              {{ index + 1 }}
            </p>
            <img
              :src="movie.poster_url"
              alt="Movie Poster"
              class="-ml-3.5 rounded-lg w-[127px] h-[163px] object-cover"
            />
          </li>
        </ul>
      </section>

      <!-- ALL MOVIES SECTION -->
      <section ref="moviesSectionRef" class="space-y-9">
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
