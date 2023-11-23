import { createGlobalStyle } from 'styled-components'

export enum FieldStyle {
  SharpEdge = 'SHARP EDGE',
  SoftEdge = 'SOFT EDGE',
  Round = 'ROUND',
}

export type StyleConfigDTO = {
  colorBackgroundAccent: string
  colorBackgroundActive: string
  colorBackgroundHover: string
  colorBackgroundPrimary: string
  colorBackgroundSecondary: string

  colorAccent: string
  colorAccentHover: string
  colorActive: string
  colorDisabled: string
  colorError: string
  colorHover: string
  colorInput: string
  colorPrimary: string
  colorSecondary: string
  colorWarning: string

  colorButtonPrimary: string

  fontFamilyNormalUrl: string | null
  fontFamilyNormalFormat: string | null
  fontFamilyMediumUrl: string | null
  fontFamilyMediumFormat: string | null
  fontFamilyBoldUrl: string | null
  fontFamilyBoldFormat: string | null

  fontBaseSize: string
  fontSizeP: string
  fontSizePSmall: string
  fontSizeInput: string
  fontSizeLabel: string
  fontSizeSublabel: string
  fontSizeTitle: string
  fontSizeTitleMobile: string

  headerBoxShadow: string
  headerHeight: number
  headerHeightMobile: number
  headerLogoWidth: number
  headerLogoWidthMobile: number
  headerBackgroundColor: string
  headerBackgroundColorDark: string
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
  formFieldStyle: FieldStyle

  formIconFilter: string
}

const ColorKeys = [
  'colorBackgroundAccent',
  'colorBackgroundActive',
  'colorBackgroundHover',
  'colorBackgroundPrimary',
  'colorBackgroundSecondary',

  'colorAccent',
  'colorAccentHover',
  'colorActive',
  'colorDisabled',
  'colorError',
  'colorHover',
  'colorInput',
  'colorPrimary',
  'colorSecondary',
  'colorWarning',

  'colorButtonPrimary',

  'headerBackgroundColor',
  'headerTitleColor',
]

const setStyleConfigInBaseStyle = (params: {
  brandBaseStyle: string
  isStyleConfigActive: boolean
  styleConfig: StyleConfigDTO
}) => {
  let mappedBaseStyle = params.brandBaseStyle

  if (params.isStyleConfigActive) {
    if (params.styleConfig.colorActive?.split(',').length >= 3) {
      // Special color mappings
      mappedBaseStyle = mappedBaseStyle.replace(
        '<colorActiveFaded>',
        `rgba(${params.styleConfig.colorActive.split(',').slice(0, 3).join(',')}, 0.35)`,
      )
      mappedBaseStyle = mappedBaseStyle.replace(
        '<colorActiveShadowLight>',
        `rgba(${params.styleConfig.colorActive.split(',').slice(0, 3).join(',')}, 0.05)`,
      )
    }

    // Get styleConfiig
    const styleConfig = { ...params.styleConfig }
    if (params.styleConfig.colorBackgroundAccent === params.styleConfig.colorBackgroundPrimary) {
      styleConfig.colorBackgroundAccent = params.styleConfig.headerTitleColor
    }

    // Replace style definitions with styleConfig values
    mappedBaseStyle = Object.keys(styleConfig).reduce<string>((baseStyle, styleKey) => {
      const searchKey = new RegExp(`<${styleKey}>`, 'g') as RegExp
      const styleValue = styleConfig[styleKey as keyof StyleConfigDTO]
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
  styleConfig: StyleConfigDTO
}) => createGlobalStyle`
  ${params.baseStyle}
  ${setStyleConfigInBaseStyle(params)}
`
