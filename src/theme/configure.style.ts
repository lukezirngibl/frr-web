import { createGlobalStyle, SimpleInterpolation } from 'styled-components'

export const configureBaseStyle = (
  config: {
    h1?: SimpleInterpolation
    h2?: SimpleInterpolation
    h3?: SimpleInterpolation
    h4?: SimpleInterpolation
    h5?: SimpleInterpolation
    h6?: SimpleInterpolation
    p?: SimpleInterpolation
    a?: SimpleInterpolation
    span?: SimpleInterpolation
    button?: SimpleInterpolation
    div?: SimpleInterpolation
  },
  injected?: SimpleInterpolation,
) => createGlobalStyle`

  ${injected};

  h1 { ${config.h1}; }
  h2 { ${config.h2}; }
  h3 { ${config.h3}; }
  h4 { ${config.h4}; }
  h5 { ${config.h5}; }
  h6 { ${config.h6}; }
  p { ${config.p}; }
  a { ${config.a};  }
  span { ${config.span}; }
  button { ${config.button}; }
  div { ${config.div}; }

  h1, h2, h3, h4, h5, h6, li, p, a, span {
    margin: 0;
  }

  * {
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch
  }


  body {
    overflow-x: hidden;
    overflow-y: auto;
  }

  body, html, #root {
    margin: 0;
    flex-direction: column;
    display: flex;
    flex: 1;
    padding: 0;
  }

  body {
    overflow-y: scroll;
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
`
