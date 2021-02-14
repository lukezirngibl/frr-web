import React, { ReactNode } from 'react'
import { getThemeContext } from './theme/theme'
import { createGetStyle } from './theme/util'
import { getLanguageContext, getTranslation } from './theme/language'
import { CSSProperties } from 'styled-components'
import { Language } from './util'

type Props = {
  label:
    | string
    | ((params: {
        language: Language
        translate: (k: string) => string
      }) => ReactNode)
  style?: CSSProperties
}

export const Element = (
  props: Props & {
    element: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'button' | 'li'
  },
) => {
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
      ? props.label({ language, translate })
      : translate(props.label),
  )
}

export const P = (props: Props) => <Element {...props} element="p" />
export const H1 = (props: Props) => <Element {...props} element="h1" />
export const H2 = (props: Props) => <Element {...props} element="h2" />
export const H3 = (props: Props) => <Element {...props} element="h3" />
export const H4 = (props: Props) => <Element {...props} element="h4" />
export const H5 = (props: Props) => <Element {...props} element="h5" />
export const H6 = (props: Props) => <Element {...props} element="h6" />
export const Li = (props: Props) => <Element {...props} element="li" />
export const button = (props: Props) => <Element {...props} element="button" />
