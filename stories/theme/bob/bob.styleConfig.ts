export enum FieldStyle {
  SharpEdge = 'SHARP EDGE',
  SoftEdge = 'SOFT EDGE',
  Round = 'ROUND',
}

export const styleConfig = {
  colorBackgroundAccent: '0,145,178,1',
  colorBackgroundHover: '242,242,242,0.6',
  colorBackgroundPrimary: '255,255,255,1',
  colorBackgroundSecondary: '242,242,242,1',

  colorAccent: '255,199,44,1',
  colorDisabled: '156,156,156,1',
  colorError: '169,16,29,1',
  colorHover: '249,193,0,0.6',
  colorInput: '0,0,0,1',
  colorPrimary: '0,0,0,1',
  colorSecondary: '51,51,51,1',

  fontFamilyNormalUrl:
    'https://stbobfspfrontendassets.blob.core.windows.net/bobzeroassets/FoundryContext-Regular.woff2',
  fontFamilyNormalFormat: 'woff2',
  fontFamilyMediumUrl:
    'https://stbobfspfrontendassets.blob.core.windows.net/bobzeroassets/FoundryContext-Medium.woff2',
  fontFamilyMediumFormat: 'woff2',
  fontFamilyBoldUrl:
    'https://stbobfspfrontendassets.blob.core.windows.net/bobzeroassets/FoundryContext-Bold.woff2',
  fontFamilyBoldFormat: 'woff2',

  fontBaseSize: '10px',
  fontSizeP: '1.76rem',
  fontSizeLabel: '1.76rem',
  fontSizeSublabel: '1.1rem',
  fontSizeInput: '1.76rem',
  fontSizeTitle: '2.4rem',

  headerHeight: 80,
  headerHeightMobile: 64,
  headerLogoWidth: 256,
  headerTitleColor: '255,255,255,1',
  headerTitleFontSize: '2.4rem',

  buttonFontSize: '2.0rem',
  buttonBorderRadius: 26,
  buttonWidth: 172,
  buttonHeight: 52,
  buttonStyle: FieldStyle.SoftEdge,

  formPaddingVertical: 24,
  formPaddingVerticalMobile: 24,
  formPaddingHorizontal: 96,
  formPaddingHorizontalMobile: 16,

  formRowHeight: 72,
  formRowBottomBorder: '1px solid rgba(0,0,0,0.1)',
  formFieldHeight: 48,
  formFieldBorderRadius: '5px',
  formFieldPaddingHorizontal: 12,
  formFieldStyle: FieldStyle.SoftEdge,
}
