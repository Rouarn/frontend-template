import { overrideThemeSettings, themeSettings } from '@/theme/settings'
import { defu } from 'defu'
import type { GlobalThemeOverrides } from 'naive-ui'
import { addColorAlpha, getPaletteColorByNumber } from '@sa/color'

/** Init theme settings */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD

  // if it is development mode, the theme settings will not be cached, by update `themeSettings` in `src/theme/settings.ts` to update theme settings
  if (!isProd) return themeSettings

  // if it is production mode, the theme settings will be cached in localStorage
  // if want to update theme settings when publish new version, please update `overrideThemeSettings` in `src/theme/settings.ts`

  const localSettings = window.localStorage.getItem('themeSettings')

  let settings = defu(localSettings, themeSettings)

  const isOverride = window.localStorage.getItem('overrideThemeFlag') === BUILD_TIME

  if (!isOverride) {
    settings = defu(overrideThemeSettings, settings)

    window.localStorage.getItem('overrideThemeFlag')
  }

  return settings
}

type NaiveColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type NaiveColorKey = `${App.Theme.ThemeColorKey}Color${NaiveColorScene}`
type NaiveThemeColor = Partial<Record<NaiveColorKey, string>>
interface NaiveColorAction {
  scene: NaiveColorScene
  handler: (color: string) => string
}

/**
 * Get naive theme colors
 *
 * @param colors Theme colors
 * @param [recommended=false] Use recommended color. Default is `false`
 */
function getNaiveThemeColors(colors: App.Theme.ThemeColor, recommended = false) {
  const colorActions: NaiveColorAction[] = [
    { scene: '', handler: (color) => color },
    { scene: 'Suppl', handler: (color) => color },
    { scene: 'Hover', handler: (color) => getPaletteColorByNumber(color, 500, recommended) },
    { scene: 'Pressed', handler: (color) => getPaletteColorByNumber(color, 700, recommended) },
    { scene: 'Active', handler: (color) => addColorAlpha(color, 0.1) },
  ]

  const themeColors: NaiveThemeColor = {}

  const colorEntries = Object.entries(colors) as [App.Theme.ThemeColorKey, string][]

  colorEntries.forEach((color) => {
    colorActions.forEach((action) => {
      const [colorType, colorValue] = color
      const colorKey: NaiveColorKey = `${colorType}Color${action.scene}`
      themeColors[colorKey] = action.handler(colorValue)
    })
  })

  return themeColors
}

/**
 * Get naive theme
 *
 * @param colors Theme colors
 * @param [recommended=false] Use recommended color. Default is `false`
 */
export function getNaiveTheme(colors: App.Theme.ThemeColor) {
  const { primary: colorLoading } = colors

  const theme: GlobalThemeOverrides = {
    common: {
      ...getNaiveThemeColors(colors),
      borderRadius: '6px',
    },
    LoadingBar: {
      colorLoading,
    },
    Tag: {
      borderRadius: '6px',
    },
  }

  return theme
}
