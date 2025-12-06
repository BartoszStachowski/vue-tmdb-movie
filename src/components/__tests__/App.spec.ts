import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';

vi.mock('@/services/movie', () => ({
  getTrendingMovies: vi.fn().mockResolvedValue([]),
  updateSearchCounter: vi.fn(),
}));

describe('App - spinner', () => {
  it('shows spinner when isLoading is true', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          BaseSearch: { template: '<div />' },
          MovieCard: { template: '<div />' },
          BaseSpinner: { template: '<div id="spinner" />' },
        },
      },
    });

    const vm = wrapper.vm as unknown as { isLoading: boolean };

    // set state
    vm.isLoading = true;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('#spinner').exists()).toBe(true);
  });

  it('does not show spinner when isLoading is false', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          BaseSearch: { template: '<div />' },
          MovieCard: { template: '<div />' },
          BaseSpinner: { template: '<div id="spinner" />' },
        },
      },
    });

    const vm = wrapper.vm as unknown as { isLoading: boolean };

    // set state
    vm.isLoading = false;
    await wrapper.vm.$nextTick();

    expect(wrapper.find('#spinner').exists()).toBe(false);
  });
});
