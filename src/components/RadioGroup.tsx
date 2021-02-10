import React from 'react'
import { LabelProps } from './Label'
import { TranslationGeneric } from '../util'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation } from '../theme/language'

export type Props<T> = {
  onChange: (value: string) => void
  value: string
  label?: LabelProps<T>
  options: Array<{ label: string; value: string }>
  style?: Partial<AppTheme['radioGroup']>
  required?: boolean
  error?: boolean
}

export const RadioGroup = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'radioGroup')(props.style)

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  return <div />
}
