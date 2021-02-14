import React, { ReactNode } from 'react'
import { getThemeContext } from './theme/theme'
import { createGetStyle } from './theme/util'
import { getLanguageContext, getTranslation, Language } from './theme/language'
import { CSSProperties } from 'styled-components'

type Props = {
  label: string | ((params: { language: Language }) => ReactNode)
  style?: CSSProperties
}

export const Element = (props: Props & { element: 'p' | 'h1' }) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'html')({})

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  return React.createElement(
    'p',
    {
      itemID: (typeof props.label === 'function'
        ? '<computed>'
        : props.label) as string,

      style: {
        ...getStyle('p'),
        ...(props.style || {}),
      },
    },
    typeof props.label === 'function'
      ? props.label({ language })
      : translate(props.label),
  )
}

export const P = (props: Props) => <Element {...props} element="p" />
export const H1 = (props: Props) => <Element {...props} element="h1" />
