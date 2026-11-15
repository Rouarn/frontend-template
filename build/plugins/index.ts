import { setupAutoImportPlugin } from './autoImport.ts'
import { setupComponentsPlugin } from './components.ts'
import { setupHtmlPlugin } from './htmlPlugin.ts'
import { setupIconsPlugin } from './icons.ts'
import { setupProgressPlugin } from './progress.ts'
import { setupPWAPlugin } from './pwa.ts'
import { setupElegantRouterPlugin } from './router.ts'
import { setupSvgIconsPlugin } from './svgIcons.ts'
import { setupUnocssPlugin } from './unocss.ts'
import { setupVuePlugin } from './vue.ts'
import { setupVueDevToolsPlugin } from './vueDevTools.ts'
import { setupVueJsxPlugin } from './vueJsx.ts'
import path from 'path'
import type { PluginOption } from 'vite'

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string): PluginOption[] {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX, VITE_DEVTOOLS_LAUNCH_EDITOR } = viteEnv

  /** 本地图标目录的路径 */
  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon')

  /** 本地图标集合的名称 */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')

  const plugins: PluginOption[] = [
    setupVuePlugin(),
    setupElegantRouterPlugin(),
    setupVueJsxPlugin(),
    setupVueDevToolsPlugin(VITE_DEVTOOLS_LAUNCH_EDITOR),
    setupUnocssPlugin(VITE_ICON_PREFIX, localIconPath, collectionName),
    setupProgressPlugin(),
    setupAutoImportPlugin(),
    setupComponentsPlugin(VITE_ICON_PREFIX, collectionName),
    setupHtmlPlugin(buildTime),
    setupIconsPlugin(localIconPath, collectionName),
    setupSvgIconsPlugin(localIconPath, VITE_ICON_LOCAL_PREFIX),
    setupPWAPlugin(),
  ]

  return plugins
}
