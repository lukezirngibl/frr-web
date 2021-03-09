import React, { ReactNode } from 'react'
import { getLanguageContext, getTranslation } from './theme/language'
import { CSSProperties, getThemeContext } from './theme/theme'
import { createStyled, useInlineStyle } from './theme/util'
import { keys, Language } from './util'

type Props = {
  cssStyles?: string
  data?: { [k: string]: string }
  disabled?: any
  label:
    | string
    | ((params: {
        language: Language
        translate: (k: string) => string
      }) => ReactNode)
  readOnly?: boolean
  style?: CSSProperties
  translationKey?: string
  value?: any
}

const Elements = {
  button: createStyled('button'),
  h1: createStyled('h1'),
  h2: createStyled('h2'),
  h3: createStyled('h3'),
  h4: createStyled('h4'),
  h5: createStyled('h5'),
  h6: createStyled('h6'),
  li: createStyled('li'),
  option: createStyled('option'),
  p: createStyled('p'),
}

export const Element = (
  props: Props & {
    element:
      | 'button'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'li'
      | 'option'
      | 'p'
  },
) => {
  const {
    cssStyles,
    data,
    disabled,
    element,
    label,
    readOnly,
    style = {},
    translationKey,
    value,
  } = props
  const theme = React.useContext(getThemeContext())
  const getStyle = useInlineStyle(theme, 'html')({})

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const str =
    (typeof props.label === 'function' &&
      props.label({ language, translate })) ||
    (!translationKey && translate(props.label)) ||
    props.label

  const injected = keys(props.data || {}).reduce(
    (s, k) => s.replace(`{{${k}}}`, translate(props.data[k])),
    str,
  )

  const Element = Elements[element]

  return (
    <Element
      cssStyles={cssStyles}
      dangerouslySetInnerHTML={{
        __html: injected,
      }}
      data={data}
      disabled={disabled}
      itemID={
        (typeof label === 'function'
          ? '<computed>'
          : translationKey || label) as string
      }
      readOnly={readOnly}
      style={{
        ...getStyle(element),
        ...style,
      }}
      value={value}
    />
  )
}

export const H1 = (props: Props) => <Element {...props} element={'h1'} />
export const H2 = (props: Props) => <Element {...props} element={'h2'} />
export const H3 = (props: Props) => <Element {...props} element={'h3'} />
export const H4 = (props: Props) => <Element {...props} element={'h4'} />
export const H5 = (props: Props) => <Element {...props} element={'h5'} />
export const H6 = (props: Props) => <Element {...props} element={'h6'} />
export const Li = (props: Props) => <Element {...props} element={'li'} />
export const Option = (props: Props) => (
  <Element {...props} element={'option'} />
)
export const P = (props: Props) => <Element {...props} element={'p'} />
export const button = (props: Props) => (
  <Element {...props} element={'button'} />
)
