/** Default theme settings */
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: 'light',
  themeColor: '#009688',
  otherColor: {
    info: '#2080f0',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
  },
  isInfoFollowPrimary: true,
  recommendColor: true,
}

/**
 * Override theme settings
 *
 * If publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {}
