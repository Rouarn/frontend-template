import { setDayjsLocale } from '../locales/dayjs'
import { extend } from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

export function setupDayjs() {
  extend(localeData)

  setDayjsLocale()
}
