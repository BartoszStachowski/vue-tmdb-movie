<script setup lang="ts">
import { computed } from 'vue';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props {
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
});

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();

const baseClasses =
  'inline-flex items-center justify-center rounded-xl font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500';
    default:
      return 'bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 px-3 text-sm';
    case 'lg':
      return 'h-12 px-6 text-base';
    default:
      return 'h-10 px-4 text-sm';
  }
});

const classes = computed(() => [
  baseClasses,
  variantClasses.value,
  sizeClasses.value,
]);

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit('click', e);
};
</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="mr-2 w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>

    <slot>{{ label }}</slot>
  </button>
</template>
