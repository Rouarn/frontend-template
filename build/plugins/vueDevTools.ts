import type { PluginOption } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export function setupVueDevToolsPlugin(launchEditor?: string): PluginOption {
  // 未配置时不传该字段，交回插件默认值（code）；
  // 不能传空串或字符串 "undefined"，否则「打开组件源码」会去找一个同名的可执行文件而失败
  return vueDevTools(launchEditor ? { launchEditor } : {})
}
