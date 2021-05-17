import { FormTheme } from './theme'
import { getUseInlineStyle, getUseCSSStyles } from '../../theme/util'
import { CSSProperties } from 'styled-components'

export const useInlineStyle: <C extends keyof FormTheme>(
  theme: FormTheme,
  componentKey: C,
) => (override?: Partial<FormTheme[C]>) => <K extends keyof FormTheme[C]>(
  elementKeys: Array<K> | K,
  internalOverride?: CSSProperties,
  className?: string,
) => {
  style: FormTheme[C][K]
  dataThemeId: string
} = getUseInlineStyle<FormTheme>()

export const useCSSStyles: <C extends keyof FormTheme>(
  theme: FormTheme,
  componentKey: C,
) => (
  override?: Partial<FormTheme[C]>,
) => <K extends keyof FormTheme[C]>(
  elementKeys: Array<K> | K,
  internalOverride?: CSSProperties,
) => { cssStyles: string; dataThemeId: string } = getUseCSSStyles<FormTheme>()
