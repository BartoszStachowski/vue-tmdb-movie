import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { expect, fn } from 'storybook/test';

import BaseButton from './BaseButton.vue';

const meta = {
  // 👇 The component you're working on
  component: BaseButton,
  title: 'Base/Button',
} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'lg',
    disabled: false,
    loading: false,
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /button/i });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const Danger: Story = {
  args: {
    label: 'Primary Button',
    variant: 'danger',
    size: 'lg',
    disabled: false,
    loading: false,
  },
};

export const Disable: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'lg',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: /button/i });

    await userEvent.click(button);

    await expect(button).toBeDisabled();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
