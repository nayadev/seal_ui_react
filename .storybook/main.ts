import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
    '@storybook/addon-mcp'
  ],
  framework: '@storybook/react-vite',
  docs: {},
  features: {
    componentsManifest: true,
  },
};

export default config;
