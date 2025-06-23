/**
 * Namespace Env
 *
 * It is used to declare the type of the import.meta object
 */
declare namespace Env {
  /** The router history mode */
  type RouterHistoryMode = 'hash' | 'history' | 'memory'

  /** Interface for import.meta */

  interface ImportMeta extends ImportMetaEnv {
    /** The base url of the application */
    readonly VITE_BASE_URL: string
    /** The title of the application */
    readonly VITE_APP_TITLE: string
    /** The port of the application */
    readonly VITE_PORT: number
    /** Whether to open the application in the browser */
    readonly VITE_OPEN: string
    /** Whether to use https */
    readonly VITE_PROXY: string
    /** The mode of the application */
    readonly VITE_ROUTER_MODE: 'history' | 'hash'
    /** The public path of the application */
    readonly VITE_PUBLIC_PATH: string
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta
  glob: (arg: string) => Record<string, unknown>
}
