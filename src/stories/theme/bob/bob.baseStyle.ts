export const baseStyle = `
/* Base styles */

html {
  overflow: hidden;
  padding: 0;
  margin: 0;
}

body {
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, li, p, a, span {
    margin: 0;
  }

button,
button:focus {
  outline: none;
}

input, select, textarea, option {
  -webkit-appearance: none;
  -moz-appearance: none;
}

input,
input:focus {
  outline: none;
}

select:focus {
  outline: none;
}


/* Remove the brower's default on touch styles */

button, li, a, div, span, select, input {
  -webkit-tap-highlight-color: transparent;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

:focus {
  outline: none;
}


/* Date picker styles */

.react-datepicker__header select {
  padding: 4px !important;
}


/* React confetti styles */

#react-confetti {
  z-index: -1 !important;
  opacity: 0.5;
}


/* Font definition */
@font-face {
  font-family: 'partner font'; 
  src: url('https://stbobfspfrontendassets.blob.core.windows.net/bobzeroassets/FoundryContext-Regular.woff2')
    format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'partner font'; 
  src: url('https://stbobfspfrontendassets.blob.core.windows.net/bobzeroassets/FoundryContext-Medium.woff2')
    format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'partner font'; 
  src: url('https://stbobfspfrontendassets.blob.core.windows.net/bobzeroassets/FoundryContext-Bold.woff2')
    format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: block;
}

/* Variables definition */
:root {
  /* Colors */
  --color-background-primary: <colorBackgroundPrimary>;
  --color-partner-primary-dark: #d4a011;
  --color-background-secondary: <colorBackgroundSecondary>;
  --color-background-hover: <colorBackgroundPrimary>;
  --color-background-accent: <colorBackgroundAccent>;

  --color-error: <colorError>;
  --color-primary: <colorPrimary>;
  --color-input: <colorInput>;
  --color-secondary: <colorSecondary>;
  --color-disabled: <colorDisabled>;
  --color-accent: <colorAccent>;
  --color-hover: <colorHover>;

  --color-form-field-border: rgba(34,36,38,.15);

  --color-uploadDropzoneIsDragAccept: #00e676;
  --color-uploadDropzoneIsDragReject: #ff1744;
  --color-uploadDropzoneIsDragActive: #2196f3;
  --color-uploadDropzoneDefault: #eeeeee;

  /* Font family & size */
  --font-family: 'partner font', helvetica, arial narrow, arial, sans-serif;
  --font-size-p: <fontSizeP>;
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

  /* Form field */
  --form-field-height: <formFieldHeight>;
  --form-field-border-radius: <formFieldBorderRadius>;
  --form-field-padding-horizontal: <formFieldPaddingHorizontal>;
  --form-field-width: 380px;
  --form-field-mobile-padding: 0;
  --form-field-yes-no-option-width: 166px;

  /* Multi form field */ 
  --multi-form-field-country-code-width: 150px;
  --multi-form-field-street-nr-width: 96px;
  --multi-form-field-zip-width: 112px;
  
  /* Layout */
  --display-flex-mobile-block: flex;
  --display-block-mobile-none: block;
  --flex-mobile-wrap: nowrap;
  --flex-end-mobile-center: center;
  --layout-content-content-padding: 0;

  /* Calculator */
  --calculator-padding-top: 80px;
  --calculator-radio-group-min-width: 416px;
  --calculator-toggle-width: 96px;
}
@media (max-width: 1000px) {
  :root {
    --form-padding-horizontal: 64px;
  }
}

@media (max-width: 840px) {
  :root {
   /* Form field */
    --form-field-mobile-padding: 16px;

    /* Layout */
    --display-flex-mobile-block: block;
  }
}

@media (max-width: 640px) {
  :root {
    /* Font size */
    
    /* Header */
    --header-height: <headerHeightMobile>;

     /* Form */
    --form-field-width: 100%;
    --form-padding-horizontal: <formPaddingHorizontalMobile>;
    --form-padding-vertical: <formPaddingVerticalMobile>;

    /* Layout */
    --display-block-mobile-none: none;
    --flex-end-mobile-center: center;

    /* Calculator */
    --calculator-padding-top: 40px;
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

p, a, h1, h2, h3, h4, h5, h6, div, input, select, button {
  font-family: var(--font-family);
}

a {
  color: rgb(0, 84, 94);
  text-decoration: underline;
}
a:hover {
  color: var(--color-hover);
}
b {
  font-weight: 700;
}

div {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: 14px;
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

`
