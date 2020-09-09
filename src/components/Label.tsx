import styled from 'styled-components'
import React, { ReactNode } from 'react'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { TranslationGeneric } from '../util'
import { getLanguageContext, getTranslation } from '../theme/language'

export const LabelWrapper = styled.p``

export const Label = <TM extends TranslationGeneric>(props: {
  style?: Partial<AppTheme['label']>
  label: keyof TM
}) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'label')(props.style)

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  return (
    <LabelWrapper style={getStyle('wrapper')}>
      {translate(props.label)}
    </LabelWrapper>
  )
}
