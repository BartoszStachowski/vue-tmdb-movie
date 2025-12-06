<script setup lang="ts">
import type { Movie } from '@/types/movie';

const props = defineProps<{
  movie: Movie;
}>();

const poster = props.movie.poster_path
  ? `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
  : '/no-poster.png';
</script>
<template>
  <div class="bg-primary-1 shadow-inner shadow-primary-2 p-5 rounded-2xl">
    <img
      :src="poster"
      :alt="`Poster of ${movie.title}`"
      class="rounded-lg w-full h-full"
    />
    <div class="mt-4">
      <h3>{{ movie.title }}</h3>
      <div class="flex flex-row flex-wrap items-center gap-2 mt-2">
        <div class="flex flex-row items-center gap-1">
          <img src="/star.svg" alt="Star Icon" class="size-4 object-contain" />
          <p class="font-bold text-white text-base">
            {{ movie.vote_average.toFixed(1) }}
          </p>
        </div>

        <span class="text-gray-100 text-sm">•</span>
        <p class="font-medium text-white text-base capitalize">
          {{ movie.original_language }}
        </p>
        <span class="text-gray-100 text-sm">•</span>
        <p class="font-medium text-gray-100 text-base">
          {{ movie.release_date ? movie.release_date.split('-')[0] : 'N/A' }}
        </p>
      </div>
    </div>
  </div>
</template>
