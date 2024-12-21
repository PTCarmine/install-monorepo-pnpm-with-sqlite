export const createButtonStoriesContent = () => `
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    size: 'medium',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    variant: 'primary',
    children: 'Small Button',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    variant: 'primary',
    children: 'Large Button',
    size: 'large',
  },
}
`.trim();