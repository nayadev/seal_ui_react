import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import type { ThemeMode, ThemeName } from '../src/theme/ThemeProvider';

const preview: Preview = {
  globalTypes: {
    sealTheme: {
      description: 'SealUI theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'nebula', title: 'Nebula' },
          { value: 'arctic', title: 'Arctic' },
          { value: 'deep_ocean', title: 'Deep Ocean' },
          { value: 'terminal', title: 'Terminal' },
        ],
        dynamicTitle: true,
      },
    },
    sealMode: {
      description: 'Color mode',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    sealTheme: 'nebula',
    sealMode: 'dark',
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals['sealTheme'] as ThemeName | undefined) ?? 'nebula';
      const mode = (context.globals['sealMode'] as ThemeMode | undefined) ?? 'dark';
      // key forces remount when theme/mode change so ThemeProvider re-initializes its state
      return (
        <ThemeProvider key={`${theme}-${mode}`} theme={theme} mode={mode}>
          <div style={{ padding: '1rem' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
