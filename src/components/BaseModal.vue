<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue';

interface Props {
  title?: string;
}

defineProps<Props>();

// v-model:open
const model = defineModel<boolean>('open');

const modalRef = ref<HTMLElement | null>(null);

// focus trap
const handleKeydown = (event: KeyboardEvent) => {
  if (!model.value) return;
};

watch(model, async (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeydown);

    await nextTick();

    modalRef.value?.focus();
  } else {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="model">
      <!-- BACKGROUND -->
      <div
        class="z-40 fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="model = false"
      />

      <!-- MODAL -->
      <div
        ref="modalRef"
        class="top-1/2 left-1/2 z-50 fixed bg-amber-200 p-4 rounded-lg w-72 -translate-x-1/2 -translate-y-1/2"
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-dialog-title"
        tabindex="-1"
      >
        <h2 id="movie-dialog-title">{{ title }}</h2>
        <slot />
        <button>Hello button</button>
        <button class="bg-red-200 px-3 py-4" @click="model = false">
          Close
        </button>
      </div>
    </div>
  </Teleport>
</template>
