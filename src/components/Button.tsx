import React from 'react'
import styled, { CSSProperties } from 'styled-components'
import { getThemeContext, Theme } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation } from '../theme/language'
import { TranslationGeneric } from '../util'

const ButtonWrapper = styled.button``

export enum ButtonType {
  Secondary = 'Secondary',
  Chromeless = 'Chromeless',
  Primary = 'Primary',
}

const mapTypeToStyleKey: {
  [k in ButtonType]: keyof Partial<Theme['button']>
} = {
  [ButtonType.Chromeless]: 'chromeless',
  [ButtonType.Primary]: 'primary',
  [ButtonType.Secondary]: 'secondary',
}

export type Props<T> = {
  label: keyof T
  onClick?: () => void
  disabled?: boolean
  style?: Partial<Theme['button']>
  override?: CSSProperties
  type?: ButtonType
}

export const Button = <T extends TranslationGeneric>(props: Props<T>) => {
  const { disabled } = props
  const type = props.type || ButtonType.Secondary
  const theme = React.useContext(getThemeContext())
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const getStyle = createGetStyle(theme, 'button')(props.style)

  return (
    <ButtonWrapper
      onClick={disabled ? undefined : props.onClick}
      style={{
        ...getStyle('common'),
        ...getStyle(mapTypeToStyleKey[type]),
        ...(disabled ? { opacity: 0.4, pointerEvents: 'none' } : {}),
        ...(props.override || {}),
      }}
    >
      {translate(props.label)}
    </ButtonWrapper>
  )
}
