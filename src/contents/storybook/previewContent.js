export const createPreviewContent = () => `
import * as React from 'react'
import type { Decorator, StoryFn } from '@storybook/react'

const preview = {
  decorators: [
    ((Story: StoryFn) => <Story />) as Decorator,
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
`.trim();