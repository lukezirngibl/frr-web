export enum FieldStyle {
  SharpEdge = 'SHARP EDGE',
  SoftEdge = 'SOFT EDGE',
  Round = 'ROUND',
}

export const bobStyleConfig = {
  colorBackgroundAccent: '0,145,178,1',
  colorBackgroundHover: '242,242,242,0.6',
  colorBackgroundPrimary: '255,255,255,1',
  colorBackgroundSecondary: '242,242,242,1',

  colorAccent: '255,199,44,1',
  colorActive: '0,145,178,1',
  colorDisabled: '156,156,156,1',
  colorError: '169,16,29,1',
  colorHover: '249,193,0,0.6',
  colorInput: '0,0,0,1',
  colorPrimary: '0,0,0,1',
  colorSecondary: '0,0,0,0.6',

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
  fontSizeP: '1.6rem',
  fontSizePSmall: '1.4rem',
  fontSizeLabel: '1.6rem',
  fontSizeSublabel: '1.2rem',
  fontSizeInput: '1.6rem',
  fontSizeTitle: '2.4rem',

  headerHeight: 84,
  headerHeightMobile: 72,
  headerLogoWidth: 256,
  headerBackgroundColor: '#41afc8',
  headerTitleColor: '255,255,255,1',
  headerTitleFontSize: '2.4rem',

  buttonFontSize: '2.0rem',
  buttonBorderRadius: 8,
  buttonWidth: 172,
  buttonHeight: 52,
  buttonStyle: FieldStyle.SoftEdge,

  formPaddingVertical: 12,
  formPaddingVerticalMobile: 4,
  formPaddingHorizontal: 48,
  formPaddingHorizontalMobile: 32,

  formRowHeight: 72,
  formRowBottomBorder: '1px solid rgba(0,0,0,0.1)',
  formFieldHeight: 48,
  formFieldBorderRadius: '5px',
  formFieldPaddingHorizontal: 12,
  formFieldStyle: FieldStyle.SoftEdge,
}
