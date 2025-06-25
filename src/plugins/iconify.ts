import type { Env } from '@/typings/vite-env'
import { addAPIProvider } from '@iconify/vue'

/** Setup the iconify offline */
export function setupIconifyOffline() {
  const { VITE_ICONIFY_URL } = import.meta.env as Env.ImportMeta

  if (VITE_ICONIFY_URL) {
    addAPIProvider('', { resources: [VITE_ICONIFY_URL] })
  }
}
