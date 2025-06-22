/** The global namespace for the app */
declare namespace App {
  /** Theme namespace */
  namespace Theme {
    type ColorPaletteNumber = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

    interface OtherColor {
      info: string
      success: string
      warning: string
      error: string
    }

    /** Theme setting */
    interface ThemeSetting {
      /** Theme scheme */
      themeScheme: UnionKey.ThemeScheme
      /** Theme color */
      themeColor: string
      /** Other color */
      otherColor: OtherColor
      /** Recommend color */
      isInfoFollowPrimary: boolean
      /** Whether to recommend color */
      recommendColor: boolean
    }

    interface ThemeColor extends OtherColor {
      primary: string
    }

    type ThemeColorKey = keyof ThemeColor

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string
    }

    interface ThemeSettingTokenColor {
      /** the progress bar color, if not set, will use the primary color */
      nprogress?: string
      container: string
      layout: string
      inverted: string
      'base-text': string
    }

    type ThemeTokenColor = ThemePaletteColor & ThemeSettingTokenColor

    /** Theme token CSS variables */
    type ThemeTokenCSSVars = {
      colors: ThemeTokenColor & { [key: string]: string }
    }
  }

  /** Global namespace */
  namespace Global {
    /** The global menu */
    namespace Menu {
      interface MenuOptions {
        path: string
        name: string
        component?: string | (() => Promise<unknown>)
        redirect?: string
        meta: MetaProps
        children?: MenuOptions[]
      }
      interface MetaProps {
        icon: string
        title: string
        activeMenu?: string
        isLink?: string
        isHide: boolean
        isFull: boolean
        isAffix: boolean
        isKeepAlive: boolean
      }
    }
  }

  /**
   * I18n namespace
   *
   * Locales type
   */
  namespace I18n {
    type LangType = 'en-US' | 'zh-CN'

    type LangOption = {
      label: string
      key: LangType
    }

    type Schema = {
      system: {
        title: 'XiaJI'
      }
    }

    type GetI18nKey<
      T extends Record<string, unknown>,
      K extends keyof T = keyof T,
    > = K extends string
      ? T[K] extends Record<string, unknown>
        ? `${K}.${GetI18nKey<T[K]>}`
        : K
      : never

    type I18nKey = GetI18nKey<Schema>

    type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>

    interface $T {
      (key: I18nKey): string
      (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string
      (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string
      (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string
      (key: I18nKey, list: unknown[], plural: number): string
      (key: I18nKey, list: unknown[], defaultMsg: string): string
      (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string
      (key: I18nKey, named: Record<string, unknown>, plural: number): string
      (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string
    }
  }

  /* Menu */
  namespace Menu {
    interface MenuOptions {
      path: string
      name: string
      component?: string | (() => Promise<unknown>)
      redirect?: string
      meta: MetaProps
      children?: MenuOptions[]
    }
    interface MetaProps {
      icon: string
      title: string
      activeMenu?: string
      isLink?: string
      isHide: boolean
      isFull: boolean
      isAffix: boolean
      isKeepAlive: boolean
    }
  }

  /** Service namespace */
  namespace Service {
    /** The backend service response data */
    type Response<T = unknown> = {
      /** The backend service response code */
      code: string
      /** The backend service response message */
      msg: string
      /** The backend service response data */
      data: T
    }
  }
}
