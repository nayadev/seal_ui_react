import type { Preview } from '@storybook/react-vite'
import { createRoot } from 'react-dom/client'

import '../src/index.css'
import { SealSonner, type SealSonnerPosition } from '../src/components/feedback/SealSonner'
import { ThemeProvider } from '../src/theme/ThemeProvider'
import type { ThemeMode, ThemeName } from '../src/theme/ThemeProvider'

// Mount ONE Toaster for the entire Storybook iframe.
// Sonner uses a global event bus — multiple Toaster instances all subscribe to it
// and all fire simultaneously. One singleton prevents that.
const toasterContainer = document.createElement('div')
toasterContainer.id = 'seal-storybook-toaster'
document.body.appendChild(toasterContainer)
const toasterRoot = createRoot(toasterContainer)

function mountToaster(position: SealSonnerPosition = 'bottom-right') {
  toasterRoot.render(<SealSonner position={position} />)
}

mountToaster()

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
      const theme = (context.globals['sealTheme'] as ThemeName | undefined) ?? 'nebula'
      const mode = (context.globals['sealMode'] as ThemeMode | undefined) ?? 'dark'

      // SealSonner stories use position args to demo placement.
      // Only update in 'story' (individual canvas) view — in 'docs' mode every
      // story's decorator runs simultaneously and the last one would win, which
      // is arbitrary. Keeping a stable bottom-right in docs is predictable.
      if (context.title === 'Feedback/SealSonner' && context.viewMode === 'story') {
        const pos = (context.args['position'] as SealSonnerPosition | undefined) ?? 'bottom-right'
        mountToaster(pos)
      } else {
        mountToaster()
      }

      // key forces remount when theme/mode change so ThemeProvider re-initializes its state
      return (
        <ThemeProvider key={`${theme}-${mode}`} theme={theme} mode={mode}>
          <div style={{ padding: '1rem' }}>
            <Story />
          </div>
        </ThemeProvider>
      )
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
}

export default preview
