import { createGlobalStyle } from 'styled-components'

export type StyleConfig = {
  colorBackgroundAccent: string
  colorBackgroundHover: string
  colorBackgroundPrimary: string
  colorBackgroundSecondary: string

  colorAccent: string
  colorDisabled: string
  colorError: string
  colorHover: string
  colorInput: string
  colorPrimary: string
  colorSecondary: string

  fontFamilyNormalUrl: string | null
  fontFamilyNormalFormat: string | null
  fontFamilyMediumUrl: string | null
  fontFamilyMediumFormat: string | null
  fontFamilyBoldUrl: string | null
  fontFamilyBoldFormat: string | null

  fontBaseSize: string
  fontSizeP: string
  fontSizeInput: string
  fontSizeLabel: string
  fontSizeSublabel: string
  fontSizeTitle: string

  headerHeight: number
  headerHeightMobile: number
  headerLogoWidth: number
  headerTitleColor: string
  headerTitleFontSize: string

  buttonFontSize: string
  buttonBorderRadius: number
  buttonWidth: number
  buttonHeight: number
  buttonStyle: string

  formPaddingVertical: number
  formPaddingVerticalMobile: number
  formPaddingHorizontal: number
  formPaddingHorizontalMobile: number

  formRowHeight: number
  formRowBottomBorder: string
  formFieldHeight: number
  formFieldBorderRadius: string
  formFieldPaddingHorizontal: number
  formFieldStyle: string
}

const ColorKeys = [
  'colorBackgroundPrimary',
  'colorBackgroundSecondary',
  'colorBackgroundHover',
  'colorBackgroundAccent',

  'colorError',
  'colorPrimary',
  'colorSecondary',
  'colorInput',
  'colorDisabled',
  'colorAccent',
  'colorHover',

  'colorButtonPrimary',

  'headerTitleColor',
]

const setStyleConfigInBaseStyle = (params: {
  brandBaseStyle: string
  isStyleConfigActive: boolean
  styleConfig: StyleConfig
}) => {
  let mappedBaseStyle = params.brandBaseStyle

  if (params.isStyleConfigActive) {
    mappedBaseStyle = mappedBaseStyle.replace(
      '<headerBackgroundColor>',
      `rgba(${params.styleConfig.colorBackgroundAccent})`,
    )
    const styleConfig = { ...params.styleConfig }
    if (params.styleConfig.colorBackgroundAccent === params.styleConfig.colorBackgroundPrimary) {
      styleConfig.colorBackgroundAccent = params.styleConfig.headerTitleColor
    }

    mappedBaseStyle = Object.keys(styleConfig).reduce<string>((baseStyle, styleKey) => {
      const searchKey = `<${styleKey}>`
      const styleValue = styleConfig[styleKey as keyof StyleConfig]
      if (!styleValue) {
        return baseStyle
      } else if (ColorKeys.includes(styleKey)) {
        return baseStyle.replace(searchKey, `rgba(${styleValue})`)
      } else if (typeof styleValue === 'number' && !isNaN(styleValue)) {
        return baseStyle.replace(searchKey, `${styleValue}px`)
      } else if (typeof styleValue === 'string' && styleValue > '') {
        return baseStyle.replace(searchKey, styleValue as string)
      }
      return baseStyle
    }, mappedBaseStyle)
  }

  return mappedBaseStyle
}

export const configureBaseStyle = (params: {
  baseStyle: string
  brandBaseStyle: string
  isStyleConfigActive: boolean
  styleConfig: StyleConfig
}) => createGlobalStyle`
  ${params.baseStyle}
  ${setStyleConfigInBaseStyle(params)}
`
