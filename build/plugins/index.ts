import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import type { Env } from '@/typings/vite-env'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { presetIcons } from 'unocss'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import type { PluginOption } from 'vite'
import progress from 'vite-plugin-progress'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX, VITE_DEVTOOLS_LAUNCH_EDITOR } = viteEnv

  /** The path of the local icon directory */
  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon')

  /** The name of the local icon collection */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')

  const plugins: PluginOption = [
    vue(),
    vueJsx(),
    vueDevTools({ launchEditor: VITE_DEVTOOLS_LAUNCH_EDITOR }),
    UnoCSS({
      presets: [
        presetIcons({
          prefix: `${VITE_ICON_PREFIX}-`,
          scale: 1,
          extraProperties: {
            display: 'inline-block',
          },
          collections: {
            [collectionName]: FileSystemIconLoader(localIconPath, (svg) => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')),
          },
          warn: true,
        }),
      ],
    }),
    progress(),
    AutoImport({
      dts: 'src/typings/auto-imports.d.ts',
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [NaiveUiResolver(), IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })],
    }),
    {
      name: 'html-plugin',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace('<head>', `<head>\n    <meta name="buildTime" content="${buildTime}">`)
      },
    },
    Icons({
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, (svg) => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')),
      },
      scale: 1,
      defaultClass: 'inline-block',
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [NaiveUiResolver(), IconsResolver({ customCollections: [collectionName], componentPrefix: VITE_ICON_PREFIX })],
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__',
    }),
  ]

  return plugins
}
