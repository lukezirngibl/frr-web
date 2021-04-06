import React, { ReactNode } from 'react'
import { Language, useLanguage, useTranslate } from './theme/language'
import { CSSProperties, useAppTheme } from './theme/theme'
import { createStyled, useInlineStyle } from './theme/util'
import { renderHtml } from './utils/renderHtml'

type Label =
  | string
  | ((params: {
      language: Language
      translate: (k: string) => string
    }) => string | ReactNode)

type Props = {
  cssStyles?: string
  data?: { [k: string]: string }
  dataThemeId?: string
  disabled?: any
  Icon?: ReactNode
  label?: Label
  readOnly?: boolean
  style?: CSSProperties
  translationKey?: string
  value?: any
}

const HtmlElements = {
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
  a: createStyled('a'),
}

export const injectDataIntoText = (
  str: any,
  data: Record<string, string>,
  // translate: (str: string) => string,
): string =>
  str > ''
    ? Object.keys(data || {}).reduce(
        (s, k) => s.replace(`{{${k}}}`, data[k]),
        str,
      )
    : Object.keys(data || {})
        .map((key) => `${data[key]}`)
        .join(', ')

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
      | 'a'
  },
) => {
  const {
    cssStyles,
    data,
    dataThemeId,
    disabled,
    element,
    Icon,
    label,
    readOnly,
    style = {},
    translationKey,
    value,
  } = props
  const theme = useAppTheme()
  const getStyle = useInlineStyle(theme, 'html')({})
  const elementStyle = getStyle(element)

  const language = useLanguage()
  const translate = useTranslate(language)

  let str: string | ReactNode = ''

  if (typeof props.label === 'function') {
    str = props.label({ language, translate })
  } else if (!!props.label && !translationKey) {
    str = translate(props.label)
  } else {
    str = props.label
  }

  // const htmlText = injectDataIntoText(str, data, translate)
  const htmlText = injectDataIntoText(str, data)

  const HtmlElement = HtmlElements[element]

  return (
    <HtmlElement
      cssStyles={cssStyles}
      disabled={disabled}
      dataThemeId={elementStyle.dataThemeId}
      dataTestId={dataThemeId}
      itemID={
        (typeof label === 'function'
          ? '<computed>'
          : translationKey || label) as string
      }
      readOnly={readOnly}
      style={{
        ...elementStyle.style,
        ...style,
      }}
      value={value}
    >
      {renderHtml(htmlText)}
      {Icon}
    </HtmlElement>
  )
}

export const A = (props: Props) => <Element {...props} element={'a'} />
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
