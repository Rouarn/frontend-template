/**
 * .vue 单文件组件模块声明
 *
 * Oxlint 的类型检查器（tsgolint）不像 vue-tsc 那样原生解析 .vue 文件，
 * 因此在 .ts 文件中导入 .vue 时需要该 ambient 声明兜底。
 * .vue 文件内部的 .vue 导入仍由 Oxlint 的 vue 解析器精确解析，不受影响。
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

/**
 * Env 命名空间
 *
 * 用于声明 import.meta 对象的类型
 */
declare namespace Env {
  /** 路由历史模式 */
  type RouterHistoryMode = 'hash' | 'history' | 'memory'

  /** import.meta 接口 */
  interface ImportMeta extends ImportMetaEnv {
    /** 应用基础路径 */
    /** 应用的公共路径 */
    readonly VITE_BASE_URL: string
    /** 应用标题 */
    readonly VITE_APP_TITLE: string
    /** 应用端口 */
    readonly VITE_PORT: number
    /** 是否在浏览器中自动打开应用 */
    readonly VITE_OPEN: CommonType.YesOrNo
    /**
     * 开发代理映射表，JSON 数组，每项为 [匹配前缀, 目标地址]
     *
     * 仅开发服务器（vp dev）读取；构建产物中不包含任何代理规则
     */
    readonly VITE_PROXY?: string
    /** 是否启用 HTTP 代理 */
    readonly VITE_HTTP_PROXY: CommonType.YesOrNo
    /** 是否启用代理日志 */
    readonly VITE_PROXY_LOG: CommonType.YesOrNo
    /** 应用的路由模式 */
    readonly VITE_ROUTER_MODE: RouterHistoryMode
    /** 是否开启 source map */
    readonly VITE_SOURCE_MAP: CommonType.YesOrNo
    /** 存储键前缀 */
    readonly VITE_STORAGE_PREFIX: string
    /** Node 运行环境 */
    readonly VITE_USER_NODE_ENV: 'development' | 'production'
    /** 是否启用 Vue DevTools */
    readonly VITE_DEVTOOLS_LAUNCH_EDITOR: import('vite-plugin-vue-devtools').VitePluginVueDevToolsOptions['launchEditor']
    /** 是否自动检测更新 */
    readonly VITE_AUTOMATICALLY_DETECT_UPDATE: CommonType.YesOrNo
    /** Iconify 图标前缀 */
    readonly VITE_ICON_PREFIX: 'icon'
    /**
     * 本地图标前缀
     *
     * 该前缀以图标前缀开头
     */
    readonly VITE_ICON_LOCAL_PREFIX: 'icon-local'
    /**
     * 菜单项缺省图标（Iconify 图标名）
     *
     * 路由 meta 未配置 icon / localIcon 时兜底渲染；未设置则菜单项不渲染图标
     */
    readonly VITE_MENU_ICON?: string
    /**
     * Iconify API 提供者地址
     *
     * 如果项目部署在内网，可以将 API 提供者地址设置为本地 Iconify 服务器
     *
     * @link https://docs.iconify.design/api/providers.html
     */
    readonly VITE_ICONIFY_URL?: string
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta
  glob: import('vite').ImportGlobFunction
}
