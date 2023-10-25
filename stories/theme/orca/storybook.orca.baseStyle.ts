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
  
  --color-primary: #000000;
  --color-secondary: #333333;
  --color-disabled: #8d8d8d;

  --color-success: rgba(61, 111, 26, 1);
  --color-background-success: rgba(61, 111, 26, 0.05); 

  --color-error: rgba(255, 0, 0, 1);
  --color-background-error: rgba(255, 0, 0, 0.05);
  
  --color-form-field-background: #F2F2F2;
  --color-form-field-border: #8d8d8d;
  --color-form-field-border-focus: #99bbbf;
  
  /* Partner colors */
  --color-partner-primary: #FFD400;
  --color-partner-secondary: rgba(0, 84, 94, 1);


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
  --form-field-readonly-width: 424px;
  --form-field-mobile-padding: 0;
  --form-field-padding: 16px;
  --form-field-description-min-width: 400px;

  /* Form field focus */
  --form-field-focus-border: 1px solid var(--color-form-field-border-focus);
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
  --calculator-preview-min-width: 416px;
  --calculator-toggle-width: 96px;
  --calculator-field-width: 148px;
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
    --form-field-description-min-width: 600px;

    /* Layout */
    --display-flex-mobile-block: block;

    /* Calculator */ 
    --calculator-field-width: 148px;
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
    --form-padding-horizontal: 24px;
    --form-padding-vertical: 32px;
    --form-field-description-min-width: calc(100vw - 40px);

    /* Layout */
    --display-block-mobile-none: none;
    --flex-end-mobile-center: center;
    --layout-content-padding: 24px 0 32px;

    /* Calculator */
    --calculator-padding-top: 40px;
    --calculator-preview-min-width: 100%;
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
  background-color: white !important;
  z-index: 20 !important;
}

#CybotCookiebotDialog div {
  font-size: 9.5pt !important;
}

#CybotCookiebotDialog h2 {
  font-family: Foundry,Arial,sans-serif !important;
}

#CybotCookiebotDialog label{
  font-size: 12px !important;
}

#CybotCookiebotDialogBodyContentTitle {
  margin-bottom: 8px !important;
}

#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll {
  width: 180px !important;
  color: black !important;
  background-color: #FFC53D !important;
  border-radius: 4px !important;
  text-align: center !important;
  cursor: pointer !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection {
  width: 180px !important;
  color: black !important;
  background-color: white !important;
  border-color: #C7C7C7 !important;
  border-radius: 4px !important;
  text-align: center !important;
  cursor: pointer !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

#CybotCookiebotDialogBodyLevelButtons {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

@media (max-width: 768px) {
  #CybotCookiebotDialog {
      max-height: 400px !important;
      left: 0 !important;
      width: 100% !important;
      z-index: 20 !important;
  }
  #CybotCookiebotDialogBody {
      padding-left: 20px !important;
      padding-right: 20px !important;
  }
  #CybotCookiebotDialogBodyContent {
      padding-right: 20px !important;
  }
  #CybotCookiebotDialogBodyLevelWrapper {
      text-align: center !important;
  }
  #CybotCookiebotDialogBodyLevelButtons {
      width: auto !important;
      max-width: 350px !important;
      
      display: flex !important;
      margin-left: 0 !important;
  }
}
`
