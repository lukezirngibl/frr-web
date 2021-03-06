import React, { ReactNode } from 'react'
import { getThemeContext } from './theme/theme'
import { useInlineStyle } from './theme/util'
import { getLanguageContext, getTranslation } from './theme/language'
import { CSSProperties } from './theme/theme'
import { createStyled } from './theme/util'
import { Language, keys } from './util'

type Props = {
  label:
    | string
    | ((params: {
        language: Language
        translate: (k: string) => string
      }) => ReactNode)
  style?: CSSProperties
  styleCSS?: CSSProperties
  value?: any
  disabled?: any
  readOnly?: boolean
  translationKey?: string
  data?: { [k: string]: string }
}

const Elements = {
  p: createStyled('p'),
  h1: createStyled('h1'),
  h2: createStyled('h2'),
  h3: createStyled('h3'),
  h4: createStyled('h4'),
  h5: createStyled('h5'),
  h6: createStyled('h6'),
  button: createStyled('button'),
  li: createStyled('li'),
  option: createStyled('option'),
}

export const Element = (
  props: Props & {
    element:
      | 'p'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'button'
      | 'li'
      | 'option'
  },
) => {
  const {
    label,
    style = {},
    readOnly,
    element,
    translationKey,
    ...otherProps
  } = props
  const theme = React.useContext(getThemeContext())
  const getStyle = useInlineStyle(theme, 'html')({})

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const str =
    typeof props.label === 'function'
      ? props.label({ language, translate })
      : !translationKey
      ? translate(props.label)
      : props.label

  const injected = keys(props.data || {}).reduce(
    (s, k) => s.replace(`{{${k}}}`, translate(props.data[k])),
    str,
  )

  const Element = Elements[element]

  return (
    <Element
      itemID={
        (typeof label === 'function'
          ? '<computed>'
          : translationKey || label) as string
      }
      style={{
        ...getStyle(element),
        ...style,
      }}
      read-only={readOnly}
      dangerouslySetInnerHTML={{
        __html: injected,
      }}
      {...otherProps}
    />
  )
}

export const Option = (props: Props) => (
  <Element {...props} element={'option'} />
)
export const P = (props: Props) => <Element {...props} element={'p'} />
export const H1 = (props: Props) => <Element {...props} element={'h1'} />
export const H2 = (props: Props) => <Element {...props} element={'h2'} />
export const H3 = (props: Props) => <Element {...props} element={'h3'} />
export const H4 = (props: Props) => <Element {...props} element={'h4'} />
export const H5 = (props: Props) => <Element {...props} element={'h5'} />
export const H6 = (props: Props) => <Element {...props} element={'h6'} />
export const Li = (props: Props) => <Element {...props} element={'li'} />
export const button = (props: Props) => (
  <Element {...props} element={'button'} />
)
