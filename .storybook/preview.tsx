import {
  DocsContainer as BaseDocsContainer,
  type DocsContainerProps,
} from '@storybook/addon-docs/blocks'
import type { Preview } from '@storybook/react-vite'
import { useEffect, useState, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { addons } from 'storybook/preview-api'

import '../src/index.css'
import './docs-theme.css'
import { SealSonner, type SealSonnerPosition } from '../src/components/feedback/SealSonner'
import { ThemeProvider } from '../src/theme/ThemeProvider'
import type { ThemeMode, ThemeName } from '../src/theme/ThemeProvider'

import { sealDefaultDocsTheme, sealDocsThemes } from './themes/sealTheme'

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

// Cache globals at module level so SealDocsContainer reads the correct initial
// state even when setGlobals fires before the component mounts.
const cachedGlobals = { sealTheme: 'nebula', sealMode: 'dark' }
try {
  const ch = addons.getChannel()
  const syncGlobals = (payload: { globals: Record<string, unknown> }) => {
    if (typeof payload.globals['sealTheme'] === 'string')
      cachedGlobals.sealTheme = payload.globals['sealTheme']
    if (typeof payload.globals['sealMode'] === 'string')
      cachedGlobals.sealMode = payload.globals['sealMode']
  }
  ch.on('globalsUpdated', syncGlobals)
  ch.on('setGlobals', syncGlobals)
} catch {
  // channel unavailable outside Storybook preview context
}

// Reads the Storybook channel for globals updates and applies the matching Seal
// docs theme. useGlobals from storybook/preview-api is not available in
// parameters.docs.container — we use standard React hooks + addons.getChannel().
// BaseDocsContainer applies its theme prop once at initialization and does NOT
// re-apply when the prop changes, so key={theme-mode} forces a remount on switch.
function SealDocsContainer(props: DocsContainerProps & { children?: ReactNode }) {
  const [sealTheme, setSealTheme] = useState(cachedGlobals.sealTheme)
  const [sealMode, setSealMode] = useState(cachedGlobals.sealMode)

  useEffect(() => {
    const channel = addons.getChannel()

    const handler = (payload: { globals: Record<string, unknown> }) => {
      const { globals } = payload
      if (typeof globals['sealTheme'] === 'string') setSealTheme(globals['sealTheme'])
      if (typeof globals['sealMode'] === 'string') setSealMode(globals['sealMode'])
    }

    // globalsUpdated — fired when toolbar changes a global
    // setGlobals — fired during initialization with persisted/URL globals
    channel.on('globalsUpdated', handler)
    channel.on('setGlobals', handler)

    return () => {
      channel.off('globalsUpdated', handler)
      channel.off('setGlobals', handler)
    }
  }, [])

  const docsTheme = sealDocsThemes[`${sealTheme}-${sealMode}`] ?? sealDefaultDocsTheme

  return <BaseDocsContainer key={`${sealTheme}-${sealMode}`} {...props} theme={docsTheme} />
}

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
    docs: {
      container: SealDocsContainer,
    },
  },
}

export default preview
