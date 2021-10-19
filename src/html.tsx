import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CSSProperties } from './theme/configure.theme'
import { useComponentTheme, useInlineStyle } from './theme/theme.components'
import { createStyled } from './theme/util'
import { LocaleNamespace, Translate } from './translation'
import { renderHtml } from './utils/renderHtml'

export type Options<Value> = Array<{
  label?: string
  name?: string
  value: Value
  disabled?: boolean
  isLabelTranslated?: boolean
}>

export type LabelText = string | ((params: { translate: Translate }) => string | ReactNode)

type Props = {
  cssStyles?: string
  data?: { [k: string]: string }
  dataTestId?: string
  dataValue?: string | number
  dataThemeId?: string
  disabled?: any
  Icon?: ReactNode
  label?: LabelText
  localeNamespace?: LocaleNamespace
  readOnly?: boolean
  style?: CSSProperties
  isLabelTranslated?: boolean
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

export const injectDataIntoText = (str: any, data: Record<string, string>): string =>
  str > ''
    ? Object.keys(data || {}).reduce((s, k) => s.replace(`{{${k}}}`, data[k]), str)
    : Object.keys(data || {})
        .map((key) => `${data[key]}`)
        .join(', ')

export const Element = (
  props: Props & {
    element: 'button' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'option' | 'p' | 'a'
  },
) => {
  const {
    cssStyles,
    data,
    dataTestId,
    dataValue,
    dataThemeId,
    disabled,
    element,
    Icon,
    isLabelTranslated,
    label,
    localeNamespace,
    readOnly,
    style = {},
    value,
  } = props
  const theme = useComponentTheme()
  const getStyle = useInlineStyle(theme, 'html')({})

  const elementStyle = getStyle(element)

  const { t: translate } = useTranslation(localeNamespace)

  let str: string | ReactNode = ''

  if (typeof props.label === 'function') {
    str = props.label({ translate })
  } else if (!!props.label && !isLabelTranslated) {
    str = translate(props.label, data)
  } else {
    str = props.label
  }

  const htmlText = str
  const HtmlElement = HtmlElements[element]

  return (
    <HtmlElement
      cssStyles={cssStyles}
      disabled={disabled}
      dataThemeId={dataThemeId || elementStyle.dataThemeId}
      data-test-id={dataTestId}
      data-value={dataValue !== undefined ? `${dataValue}` : undefined}
      itemID={(typeof label === 'function' ? '<computed>' : label) as string}
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
export const Option = (props: Props) => <Element {...props} element={'option'} />
export const P = (props: Props) => <Element {...props} element={'p'} />
export const button = (props: Props) => <Element {...props} element={'button'} />
