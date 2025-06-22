import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import progress from 'vite-plugin-progress'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string) {
  const plugins: PluginOption = [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS(),
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
      resolvers: [NaiveUiResolver()],
    }),
    {
      name: 'html-plugin',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace('<head>', `<head>\n    <meta name="buildTime" content="${buildTime}">`)
      },
    },
  ]

  return plugins
}
