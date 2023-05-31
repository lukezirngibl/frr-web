export const baseStyle = `
/* Font definition */
@font-face {
  font-family: 'partner font'; 
  src: url('https://stbobfspfrontendassets.blob.core.windows.net/fonts/FoundryContext-Regular.woff2')
    format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'partner font'; 
  src: url('https://stbobfspfrontendassets.blob.core.windows.net/fonts/FoundryContext-Medium.woff2')
    format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'partner font'; 
  src: url('https://stbobfspfrontendassets.blob.core.windows.net/fonts/FoundryContext-Bold.woff2')
    format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: block;
}

/* Variables definition */
:root {
  /* Colors */
  --color-background-primary: <colorBackgroundPrimary>;
  --color-background-primary-dark: #d4a011;
  --color-background-secondary: <colorBackgroundSecondary>;
  --color-background-hover: <colorBackgroundPrimary>;
  --color-background-accent: <colorBackgroundAccent>;
  --color-background-button-default: rgb(232, 232, 232);

  --color-error: <colorError>;
  --color-primary: <colorPrimary>;
  --color-input: <colorInput>;
  --color-secondary: <colorSecondary>;
  --color-disabled: <colorDisabled>;
  --color-accent: <colorAccent>;
  --color-active: <colorActive>;
  --color-hover: <colorHover>;

  --color-form-field-border: rgba(34,36,38,.2);
  --color-form-field-border-focus: rgba(34,36,38,.5) /* var(--color-accent) */;
  --color-form-field-background: rgba(234, 234, 234);
  
  /* Drop zone color */
  --color-uploadDropzoneIsDragAccept: #00e676;
  --color-uploadDropzoneIsDragReject: #ff1744;
  --color-uploadDropzoneIsDragActive: #2196f3;

  --shadow-overlay: 2px 2px 8px rgba(0,145,178, 0.25), 0 -1px 4px rgba(0,145,178, 0.05);

  /* Font family & size */
  --font-family: 'partner font', helvetica, arial narrow, arial, sans-serif;
  --font-size-p: <fontSizeP>;
  --font-size-p-small: <fontSizePSmall>;
  --font-size-label: <fontSizeLabel>;
  --font-size-sublabel: <fontSizeSublabel>;
  --font-size-input: <fontSizeInput>;
  --font-size-title: <fontSizeTitle>;
  
  /* Button */
  --button-font-size: <buttonFontSize>;
  --button-border-radius: <buttonBorderRadius>;
  --button-width: <buttonWidth>;
  --button-height: <buttonHeight>;
   
  /* Header */
  --header-height: <headerHeight>;
  --header-logo-width: <headerLogoWidth>;
  --header-background-color: <headerBackgroundColor>;
  --header-title-color: <headerTitleColor>;
  --header-title-font-size: <headerTitleFontSize>;

  /* Form */
  --form-padding-horizontal: <formPaddingHorizontal>;
  --form-padding-vertical: <formPaddingVertical>;
  --form-row-height: <formRowHeight>;
  --form-row-bottom-border: <formRowBottomBorder>;
  --form-section-padding: 48px var(--form-padding-horizontal);

  /* Form field */
  --form-field-height: <formFieldHeight>;
  --form-field-border-radius: <formFieldBorderRadius>;
  --form-field-padding-horizontal: <formFieldPaddingHorizontal>;
  --form-field-width: 440px;
  --form-field-mobile-padding: 0;
  --form-field-yes-no-option-width: 212px;

  /* Multi form field */ 
  --multi-form-field-country-code-width: 150px;
  --multi-form-field-street-nr-width: 96px;
  --multi-form-field-zip-width: 112px;
  --multi-form-field-gap: 0px;
  
  /* Layout */
  --display-flex-mobile-block: flex;
  --display-block-mobile-none: block;
  --flex-mobile-wrap: nowrap;
  --flex-end-mobile-center: center;
  --layout-app-max-width: 1000px;
  --layout-content-content-padding: 0;

  /* Calculator */
  --calculator-radio-group-min-width: 416px;
  --calculator-toggle-width: 96px;
  --calculator-field-gap: 14px;
}
@media (max-width: 1000px) {
  :root {
    --form-padding-horizontal: <formPaddingHorizontalMobile>;
  }
}

@media (max-width: 840px) {
  :root {
   /* Form field */
    --form-field-width: 100%;
    --form-field-mobile-padding: 4px;
    --form-section-padding: 24px var(--form-padding-horizontal);

    /* Layout */
    --display-flex-mobile-block: block;
  }
}

@media (max-width: 840px) {
  :root {
    /* Header */
    --header-height: <headerHeightMobile>;

     /* Form */
    --form-padding-vertical: <formPaddingVerticalMobile>;

    /* Layout */
    --display-block-mobile-none: none;
    --flex-end-mobile-center: center;

    /* Calculator */
    --calculator-radio-group-min-width: 100%;
    --calculator-toggle-width: 0;
  }
}

/* Base styles */

html,
body {
  font-family: var(--font-family);
  font-size: <fontBaseSize>;
}

@media (max-width: 840px) {
  html, body {
    font-size: calc(<fontBaseSize> - 1px);
  }
}

p, a, h1, h2, h3, h4, h5, h6, div, input, select, button {
  font-family: var(--font-family);
}

h1 {
  color: var(--color-primary);
  font-size: var(--font-size-title);
  font-weight: 500;
}

h2 {
  color: var(--color-primary);
  font-size: var(--font-size-title);
  font-weight: 400;
  margin-bottom: 20px;
  
  @media (max-width: 840px) { 
    margin-bottom: 24px;
  }
}

p {
  font-size: var(--font-size-p);
  line-height: 1.35;
}

small {
  font-size: var(--font-size-p-small);
}

a {
  color: black;
  text-decoration: underline;
}
a:hover {
  color:  rgb(0,145,178);
}
b {
  font-weight: 700;
}

div {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: 16px;
  font-weight: 400;
}

/* Button animations */

@keyframes button-primary-animation {
  0% {
    background: radial-gradient(circle at center, var(--color-hover) 0%, var(--color-accent) 0%, var(--color-accent) 100%);
  }
  25% {
    background: radial-gradient(circle at center, var(--color-hover) 24%, var(--color-accent) 25%, var(--color-accent) 100%);
  }
  50% {
    background: radial-gradient(circle at center, var(--color-hover) 49%, var(--color-accent) 50%, var(--color-accent) 100%);
  }
  75% {
    background: radial-gradient(circle at center, var(--color-hover) 74%, var(--color-accent) 75%, var(--color-accent) 100%);
  }
  100% {
    background: radial-gradient(circle at center, var(--color-hover) 99%, var(--color-accent) 100%, var(--color-accent) 100%);
  }
}

@keyframes button-secondary-animation {
  0% {
    background: radial-gradient(circle at center, var(--color-background-hover) 0%, var(--color-background-primary) 0%, var(--color-background-primary) 100%);
  }
  25% {
    background: radial-gradient(circle at center, var(--color-background-hover) 24%, var(--color-background-primary) 25%, var(--color-background-primary) 100%);
  }
  50% {
    background: radial-gradient(circle at center, var(--color-background-hover) 49%, var(--color-background-primary) 50%, var(--color-background-primary) 100%);
  }
  75% {
    background: radial-gradient(circle at center, var(--color-background-hover) 74%, var(--color-background-primary) 75%, var(--color-background-primary) 100%);
  }
  100% {
    background: radial-gradient(circle at center, var(--color-background-hover) 99%, var(--color-background-primary) 100%, var(--color-background-primary) 100%);
  }
}

/* Modal animations */

@keyframes modal-open-animation {
  0% {
    opacity: 0;
    scale: 0.1;
  }
  25% {
    opacity: 0.2;
    scale: 0.2;
  }
  50% {
    opacity: 0.7;
    scale: 0.7;
  }
  75% {
    opacity: 0.9;
    scale: 0.9;
  }
  100% {
    opacity: 1.0;
    scale: 1.0;
  }
}
@keyframes modal-open-background-animation {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.9;
  }
  75% {
    opacity: 1.0;
  }
  100% {
    opacity: 1.0;
  }
}

/* Custom styling for Option Group */

.duration-option__duration-label {
  font-size: 18px;
  font-weight: 700;
}

.duration-option__months-label {
  color: var(--color-secondary);
}

.duration-option__monthly-installment-label {
  color: var(--color-secondary);
  font-size: 11px;
}
`
