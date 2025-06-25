import { addAPIProvider } from '@iconify/vue'
import type { Env } from '@/typings/vite-env'

/** Setup the iconify offline */
export function setupIconifyOffline() {
  const { VITE_ICONIFY_URL } = import.meta.env as Env.ImportMeta

  if (VITE_ICONIFY_URL) {
    addAPIProvider('', { resources: [VITE_ICONIFY_URL] })
  }
}
