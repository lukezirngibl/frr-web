import styled from 'styled-components'
import React, { ReactNode } from 'react'
import { Theme, getThemeContext } from '../../theme/theme'
import { createGetStyle } from '../../theme/util'
import { TranslationGeneric } from '../../util'
import { getLanguageContext, getTranslation } from '../../theme/language'

export const LabelWrapper = styled.p``

export const Label = <TM extends TranslationGeneric>(props: {
  style?: Partial<Theme['form']>
  label: keyof TM
}) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'form')(props.style)

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  return (
    <LabelWrapper style={getStyle('label')}>
      {translate(props.label)}
    </LabelWrapper>
  )
}
