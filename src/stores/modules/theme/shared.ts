import { overrideThemeSettings, themeSettings } from '@/theme/settings'
import { addColorAlpha, getPaletteColorByNumber } from '@sa/color'
import { defu } from 'defu'
import type { GlobalThemeOverrides } from 'naive-ui'

/** Init theme settings */
export function initThemeSettings() {
  const isProd = import.meta.env.PROD

  //如果是开发模式，主题设置将不会被缓存，通过更新‘ src/theme/settings ’中的‘ themessettings ’。这是更新主题设置
  if (!isProd) return themeSettings

  //如果是生产模式，主题设置将缓存在localStorage中
  //如果想在发布新版本时更新主题设置，请更新src/theme/settings.ts中的overridethemessettings

  const localSettings = window.localStorage.getItem('themeSettings')

  let settings = defu(localSettings, themeSettings)

  const isOverride = window.localStorage.getItem('overrideThemeFlag') === BUILD_TIME

  if (!isOverride) {
    settings = defu(overrideThemeSettings, settings)

    window.localStorage.setItem('overrideThemeFlag', BUILD_TIME)
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
