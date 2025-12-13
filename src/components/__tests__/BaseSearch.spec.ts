import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseSearch from '../base/BaseSearch.vue';

describe('BaseSearch Component', () => {
  const wrapper = mount(BaseSearch, {
    props: {
      modelValue: 'Harry Potter',
    },
  });

  const input = wrapper.get('input');

  it('renders', () => {
    expect(input.attributes('placeholder')).toBe(
      'Search throught thousands of movies',
    );
  });

  it('displays the correct initial value', () => {
    expect((input.element as HTMLInputElement).value).toBe('Harry Potter');
  });

  it('emits update:modelValue on input', async () => {
    await input.setValue('Lord of the Rings');

    // check emitted event
    const emits = wrapper.emitted('update:modelValue');
    expect(emits).toBeTruthy();
    expect(emits?.length).toBe(1);
    expect(emits?.[0]).toEqual(['Lord of the Rings']);
  });

  it('has label for accessibility', () => {
    const label = wrapper.get('label');

    const value = 'search';

    expect(label.attributes('for')).toBe(value);
    expect(input.attributes('id')).toBe(value);
  });
});
