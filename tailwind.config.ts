import type { Config } from 'tailwindcss'
import { sealTokensTailwind } from '@sealui/tokens/tailwind'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: sealTokensTailwind.colors,
      spacing: sealTokensTailwind.spacing,
      borderRadius: sealTokensTailwind.borderRadius,
      fontFamily: sealTokensTailwind.fontFamily,
      fontSize: sealTokensTailwind.fontSize,
      fontWeight: sealTokensTailwind.fontWeight,
    },
  },
} satisfies Config
