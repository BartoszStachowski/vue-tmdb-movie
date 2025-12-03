<script setup lang="ts"></script>

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
        <BaseSearch />
      </header>

      <!-- ALL MOVIES SECTION -->
      <section class="space-y-9">
        <h2>All Movies</h2>
        <ul
          class="gap-5 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <li v-for="i in 10" :key="i">
            <MovieCard />
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
