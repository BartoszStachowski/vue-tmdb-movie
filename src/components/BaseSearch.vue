<script setup lang="ts"></script>
<template>
  <div
    class="bg-primary-2/40 mx-auto mt-10 px-4 py-3 border border-white rounded-md w-full max-w-3xl"
  >
    <div class="relative flex items-center">
      <img
        src="/search.svg"
        alt="Search icon"
        class="left-2 absolute w-5 h-5"
      />
      <label for="search" class="hidden">
        Search throught thousands of movies
      </label>
      <input
        id="search"
        name="search"
        type="text"
        class="bg-transparent py-2 sm:pr-10 pl-10 outline-hidden w-full text-gray-200 text-base"
        placeholder="Search throught thousands of movies"
      />
    </div>
  </div>
</template>
