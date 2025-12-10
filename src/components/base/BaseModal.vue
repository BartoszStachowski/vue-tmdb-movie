<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useScrollLock } from '@/composables/useScrollLock';

interface Props {
  title?: string;
}

defineProps<Props>();

// v-model:open
const model = defineModel<boolean>('open');

const modalRef = ref<HTMLElement | null>(null);
const previouslyFocusedElement = ref<HTMLElement | null>(null);

const FOCUSABLE_SELECTOR =
  'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

const getFocusableElements = (): HTMLElement[] => {
  if (!modalRef.value) return [];
  return Array.from(
    modalRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
};

useScrollLock();

// focus trap and escape key handling
const handleKeydown = (event: KeyboardEvent) => {
  if (!model.value) return;

  const elements = getFocusableElements();
  const firstElement = elements[0];
  const lastElement = elements[elements.length - 1];

  if (event.key === 'Escape') {
    model.value = false;
    return;
  }

  if (event.key === 'Tab') {
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }
};

onMounted(async () => {
  // save previously focused element
  previouslyFocusedElement.value =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  modalRef.value?.focus();

  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);

  // restore focus
  previouslyFocusedElement.value?.focus();
});
</script>

<template>
  <Teleport to="body">
    <div>
      <!-- BACKGROUND -->
      <div
        class="z-40 fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="model = false"
      />

      <Transition name="modal" appear>
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
      </Transition>
    </div>
  </Teleport>
</template>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
