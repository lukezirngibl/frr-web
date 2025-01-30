import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { CSSProperties } from './theme/configure.theme'
import { useComponentTheme, useInlineStyle } from './theme/theme.components'
import { createStyled } from './theme/util'
import { LocaleNamespace, Translate } from './translation'
import { renderHtml } from './utils/renderHtml'

export type OptionType<Value> = {
  CustomComponent?: ReactNode
  disabled?: boolean
  icon?: string
  isLabelTranslated?: boolean
  label?: string
  labelData?: Record<string, string | number>
  name?: string
  value: Value
}
export type Options<Value> = Array<OptionType<Value>>

export type LabelText = string | ((params: { translate: Translate }) => string | ReactNode)

type ElementProps = {
  className?: string
  children?: ReactNode
  cssStyles?: string
  data?: { [k: string]: string | number }
  dataTestId?: string
  dataThemeId?: string
  dataValue?: string | number
  disabled?: any
  Icon?: ReactNode
  isLabelTranslated?: boolean
  label?: LabelText
  localeNamespace?: LocaleNamespace
  readOnly?: boolean
  style?: CSSProperties
  tabIndex?: number
  value?: any
  onClick?: (e: React.MouseEvent) => void
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
  props: ElementProps & {
    element: 'button' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'option' | 'p' | 'a'
  },
) => {
  const {
    className,
    children,
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
    onClick,
  } = props
  const theme = useComponentTheme()
  const getStyle = useInlineStyle(theme, 'html')({})

  const elementStyle = getStyle(element)

  const { t: translate } = useTranslation(localeNamespace)

  let str: string | ReactNode = ''

  if (typeof props.label === 'function') {
    str = props.label({ translate: translate as Translate })
  } else if (!!props.label && !isLabelTranslated) {
    str = translate(props.label, data)
  } else {
    str = props.label
  }

  const htmlText = str
  const HtmlElement = HtmlElements[element]

  return (
    <HtmlElement
      className={className}
      cssStyles={cssStyles}
      data-value={dataValue !== undefined ? `${dataValue}` : undefined}
      dataTestId={dataTestId}
      dataThemeId={dataThemeId || elementStyle.dataThemeId}
      disabled={disabled}
      itemID={(typeof label === 'function' ? '<computed>' : label) as string}
      onClick={onClick}
      readOnly={readOnly}
      style={{ ...elementStyle.style, ...style }}
      tabIndex={props.tabIndex}
      value={value}
    >
      {renderHtml(htmlText)}
      {Icon}
      {children}
    </HtmlElement>
  )
}

export const A = (props: ElementProps) => <Element {...props} element={'a'} />
export const H1 = (props: ElementProps) => <Element {...props} element={'h1'} />
export const H2 = (props: ElementProps) => <Element {...props} element={'h2'} />
export const H3 = (props: ElementProps) => <Element {...props} element={'h3'} />
export const H4 = (props: ElementProps) => <Element {...props} element={'h4'} />
export const H5 = (props: ElementProps) => <Element {...props} element={'h5'} />
export const H6 = (props: ElementProps) => <Element {...props} element={'h6'} />
export const Li = (props: ElementProps) => <Element {...props} element={'li'} />
export const Option = (props: ElementProps) => <Element {...props} element={'option'} />
export const P = (props: ElementProps) => <Element {...props} element={'p'} />
export const button = (props: ElementProps) => <Element {...props} element={'button'} />

export const Span = createStyled('span')
export const Div = createStyled('div')
export const Img = createStyled('img')
