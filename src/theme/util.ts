import { AppTheme } from './theme'

export const createGetStyle = <C extends keyof AppTheme>(
  theme: AppTheme,
  componentKey: C,
) => (override?: Partial<AppTheme[C]>) => <K extends keyof AppTheme[C]>(
  elementKey: K,
): AppTheme[C][K] => {
  return {
    ...theme[componentKey][elementKey],
    ...(override && override[elementKey] ? override[elementKey] : {}),
  }
}
