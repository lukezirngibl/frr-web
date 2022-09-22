export const baseStyle = `
/* Font definition */
@font-face {
  font-family: 'Partner-Font_Frutiger';
  src: url('https://stbobfspfrontendassets.blob.core.windows.net/bobzeroassets/frutiger-light.woff')
    format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
@font-face {
  font-family: 'Partner-Font_Frutiger';
  src: url('https://stbobfspfrontendassets.blob.core.windows.net/bobzeroassets/frutiger-bold.woff')
    format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: block;
}

/* Variables definition */
:root {
  /* Colors */
  --color-background-primary: #FFFFFF;
  --color-background-secondary: #F2F2F2;
  
  --color-error: #A51728;
  --color-primary: #000000;
  --color-secondary: #333333;
  --color-disabled: #8d8d8d;

  --color-form-field-background: #F2F2F2;
  --color-form-field-border: #8d8d8d;
  --color-form-field-border-focus: #99bbbf;
  
  /* Partner colors */
  --color-partner-primary: #FFD400;
  --color-partner-secondary: #000000;


  /* Font family & size */
  --font-family: 'Partner-Font_Frutiger', helvetica, arial narrow, arial, sans-serif;
  --font-size-12: 1.2rem;
  --font-size-14: 1.4rem;
  --font-size-16: 1.6rem;
  --font-size-18: 1.8rem;
  --font-size-24: 2.4rem;
  --font-size-32: 3.2rem;

  --line-height: 1.4;
  
  /* Header & Footer */
  --header-height: 80px;
  --header-logo-width: 242px;
  --header-title-wrapper-padding: 0 24px;
  --footer-height: 139px;
  --footer-flexFlow: wrap;
  --footer-div-height: auto;
  --footer-div-width: 100%;
  --footer-div-border-top: none;
  --footer-padding-top: 24px;
  
  
  /* Form */
  --form-padding-horizontal: 96px;
  --form-padding-vertical: 40px;
  --form-row-padding-vertical: 12px;
  
  /* Form field */
  --form-field-height: 48px;
  --form-field-width: 440px;
  --form-field-readonly-width: 240px;
  --form-field-mobile-padding: 0;
  --form-field-padding: 16px;

  /* Form field focus */
  --form-field-focus-border: 2px solid var(--color-form-field-border-focus);
  --form-field-focus-border-radius: 6px;
  --form-field-focus-padding: -6px;
  --form-field-focus-box-shadow: 0 10px 15px -3px #0003, 0 4px 6px -4px #0003;
  --form-field-focus-background: rgba(153,187,191,.08);
  
  /* Multi form field */ 
  --multi-form-field-country-code-width: 80px;
  --multi-form-field-street-nr-width: 96px;
  --multi-form-field-zip-width: 112px;
  --multi-form-field-gap: 0px;
  
  /* Layout */
  --display-flex-mobile-block: flex;
  --display-block-mobile-none: block;
  --flex-mobile-wrap: nowrap;
  --flex-end-mobile-center: flex-end;
  --layout-content-max-width: 1000px;
  --layout-content-padding: 48px 16px 32px;
  --layout-content-content-padding: 0;

  /* Calculator */
  --calculator-padding-top: 64px;
  --calculator-radio-group-min-width: 416px;
  --calculator-toggle-width: 96px;
  --calculator-insurance-radio-width: 66px;
  --calculator-field-gap: 12px;
}

@media (max-width: 1360px) {
  :root {
    /* Footer */
    --footer-height: 108px;
    --footer-flexFlow: column;
    --footer-div-height: 50px;
    --footer-div-width: 100%;
    --footer-div-border-top: 1px solid rgb(230, 230, 230);
    --footer-padding-top: 0;
  }
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
    --form-row-padding-vertical: 16px;

    /* Layout */
    --display-flex-mobile-block: block;

    /* Calculator */ 
    --calculator-insurance-radio-width: 112px;
    --calculator-field-gap: 0;

    /* Header & Footer */
    --header-title-wrapper-padding: 20px 24px;
    --footer-height: auto;
  }
}

@media (max-width: 640px) {
  :root {
    /* Font size */
    --font-size-12: 1rem;
    --font-size-14: 1.2rem;
    --font-size-24: 2.2rem;
    --font-size-32: 2.6rem;
    
    /* Header & Footer */
    --header-height: 64px;
    --header-logo-width: 120px;
    --footer-height: auto;
    --header-title-wrapper-padding: 0px 4px 0 16px;

     /* Form */
    --form-field-width: 100%;
    --form-padding-horizontal: 16px;
    --form-padding-vertical: 32px;

    /* Layout */
    --display-block-mobile-none: none;
    --flex-end-mobile-center: center;
    --layout-content-padding: 24px 8px 32px;

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
  font-size: 10px;
}

a {
  color: rgb(0, 84, 94);
  text-decoration: underline;
}
a:hover {
  color: rgba(0, 0, 0, 0.5);
}

button  {
  cursor: pointer;
  border: 0;
}

b {
  font-weight: 700;
}

input, select, textarea, option {
  font-family: var(--font-family);
}

h1 {
  color: var(--color-secondary);
  font-family: var(--font-family);
  font-size: 35px;
  font-weight: 400;
  line-height: var(--line-height);
}
h2 {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-24);
  font-weight: 400;
  line-height: var(--line-height);
  margin-bottom: 24px;
}
h3 {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: 20px;
  font-weight: 400;
  line-height: var(--line-height);
}
h4 {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-16);
  font-weight: 700;
  line-height: var(--line-height);
}
h5 {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-16);
  font-weight: 400;
  line-height: var(--line-height);
}
h6 {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-16);
  font-weight: 400;
  line-height: var(--line-height);
}
p {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: var(--font-size-16);
  font-weight: 400;
  line-height: var(--line-height);
}

div {
  color: var(--color-primary);
  font-family: var(--font-family);
  font-size: 14px;
  font-weight: 400;
  line-height: var(--line-height);
}

/* Button animations */

@keyframes button-primary-animation {
  0% {
    background: radial-gradient(circle at center, rgba(249, 193, 0, 0.6) 0%, var(--color-partner-primary) 0%, var(--color-partner-primary) 100%);
  }
  25% {
    background: radial-gradient(circle at center, rgba(249, 193, 0, 0.6) 24%, var(--color-partner-primary) 25%, var(--color-partner-primary) 100%);
  }
  50% {
    background: radial-gradient(circle at center, rgba(249, 193, 0, 0.6) 49%, var(--color-partner-primary) 50%, var(--color-partner-primary) 100%);
  }
  75% {
    background: radial-gradient(circle at center, rgba(249, 193, 0, 0.6) 74%, var(--color-partner-primary) 75%, var(--color-partner-primary) 100%);
  }
  100% {
    background: radial-gradient(circle at center, rgba(249, 193, 0, 0.6) 99%, var(--color-partner-primary) 100%, var(--color-partner-primary) 100%);
  }
}

@keyframes button-secondary-animation {
  0% {
    background: radial-gradient(circle at center, rgba(242, 242, 242, 0.6) 0%, var(--color-background-primary) 0%, var(--color-background-primary) 100%);
  }
  25% {
    background: radial-gradient(circle at center, rgba(242, 242, 242, 0.6) 24%, var(--color-background-primary) 25%, var(--color-background-primary) 100%);
  }
  50% {
    background: radial-gradient(circle at center, rgba(242, 242, 242, 0.6) 49%, var(--color-background-primary) 50%, var(--color-background-primary) 100%);
  }
  75% {
    background: radial-gradient(circle at center, rgba(242, 242, 242, 0.6) 74%, var(--color-background-primary) 75%, var(--color-background-primary) 100%);
  }
  100% {
    background: radial-gradient(circle at center, rgba(242, 242, 242, 0.6) 99%, var(--color-background-primary) 100%, var(--color-background-primary) 100%);
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

/* External vender styles: CookieBot */
#CybotCookiebotDialog {
  div, p, h1, h2, h3, h4, button, a {
    font-family: var(--font-family) !important;
  }
}
#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelectionWrapper {
  margin-bottom: 16px !important;
  
  @media (max-width: 768px) {
    padding-left: 8px !important;
    float: initial !important
  }
}
.CybotCookiebotDialogBodyButton {
  padding: 8px 16px !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  transition: all ease-out 0.15s;
  max-width: 180px;

  @media (max-width: 768px) {
    width: 100% !important;
    min-width: 100% !important;
    max-width: none;
    margin-top: 16px !important;
    margin-left: 0 !important;
    padding: 16px 0 !important;
  }

  &:hover { 
    transform: scale(1.05, 1.05);
  }
}
#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll {
  background: var(--color-partner-primary) !important;
  border: 1px solid var(--color-partner-primary) !important;
}
#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection {
  background: var(--color-background-primary) !important;
  border: 1px solid var(--color-partner-secondary) !important;
}
#CybotCookiebotDialogBodyContentTitle {
  font-size: 18px !important;
  margin-bottom: 16px !important;
}
`
