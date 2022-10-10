export const resetStyleConfig = `
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

`
