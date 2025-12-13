import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../base/BaseButton/BaseButton.vue';

describe('BaseButton Component', () => {
  const wrapper = mount(BaseButton, {
    props: {
      label: 'Primary Button',
      variant: 'primary',
      size: 'lg',
    },
  });

  const button = wrapper.get('button');

  it('renders with correct label', () => {
    expect(button.text()).toBe('Primary Button');
  });

  it('applies correct classes for primary variant and large size', () => {
    expect(button.classes()).toContain('bg-indigo-600');
    expect(button.classes()).toContain('h-12');
    expect(button.classes()).toContain('px-6');
  });
});
