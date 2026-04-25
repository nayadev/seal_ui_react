import { addons } from 'storybook/manager-api'
import { sealTheme } from './themes/sealTheme'

addons.setConfig({
  theme: sealTheme,
})
