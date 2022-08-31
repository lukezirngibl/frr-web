import React, { useEffect, useRef, useState } from 'react'
import MaskInput from 'react-maskinput'
import styled, { css } from 'styled-components'

import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'

import { Label, LabelProps } from './Label'

export type Props = {
  dataTestId?: string
  error?: boolean
  hasFocus?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  name?: string
  onBlur: (value: string) => void
  onChange?: (value: string) => void
  onFocus?: () => void
  style?: Partial<ComponentTheme['textInput']>
  value: string | null
  maskInput: {
    alwaysShowMask?: boolean
    mask?: string
    maskString?: string
  }
}

export const MaskedInput = (props: Props) => {
  const inputRef = useRef(null)

  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'textInput')(props.style)

  /* Internal value */

  const [internalValue, setInternalValue] = useState(props.value)
  const [lastValue, setLastValue] = useState('')

  useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  /* Masked input */

  const [mask, setMask] = React.useState(props.maskInput.mask)
  const [maskString, setMaskString] = React.useState(props.maskInput.maskString)

  const onChangeMasked = (e: any): string => {
    const value = e.target.value

    try {
      setMaskString(props.maskInput.maskString)
    } catch (e) {
      setMaskString(props.maskInput.maskString)
      setMask(props.maskInput.mask)
    }
    return value
  }

  /* Focus field (e.g. on error) */
  useEffect(() => {
    let timerId: any = null
    if (props.hasFocus && inputRef.current) {
      // Timeout is required to keep scrollIntoView smooth
      timerId = setTimeout(() => inputRef.current.focus(), 500)
    }
    return () => clearTimeout(timerId)
  }, [props.hasFocus])

    const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <InputWrapperContainer
        {...getCSSStyle({
          wrapper: true,
          wrapperFocus: isFocused,
          errorWrapper: props.error,
          disabledInput:
            isFocused ||
            (!!internalValue && internalValue !== maskString) ||
            (internalValue !== maskString && lastValue !== '' && internalValue !== lastValue)
              ? false
              : true,
        })}
        inputCSSStyles={{
          ...getCSSStyle({
            input: true,
            errorInput: props.error,
            disabledInput:
              isFocused ||
              (!!internalValue && internalValue !== maskString) ||
              (internalValue !== maskString && lastValue !== '' && internalValue !== lastValue)
                ? false
                : true,
          }),
        }}
        onClick={() => {
          if (inputRef.current) {
            const input = inputRef.current
            // input.setSelectionRange(0, 10)
            input.focus()
          }
        }}
      >
        <Hook
          {...getCSSStyle({
            hook: true,
            errorHook: props.error,
          })}
        />
        <MaskInput
          getReference={(el) => {
            inputRef.current = el
          }}
          data-test-id={props.dataTestId}
          alwaysShowMask={props.maskInput.alwaysShowMask}
          onChange={(e) => {
            const value = onChangeMasked(e)
            setInternalValue(value)
            props.onChange?.(value)
            setLastValue(value)

            if (!isFocused) {
              // Required for browser auto-fill fields to ensure the form gets the values
              props.onBlur(value)
            }
          }}
          onBlur={() => {
            let newValue = (internalValue || '').trim()
            setInternalValue(newValue)
            setIsFocused(false)
            props.onBlur(newValue)
          }}
          onFocus={() => {
            setIsFocused(true)
            props.onFocus?.()
          }}
          maskString={maskString}
          mask={mask}
          value={internalValue || lastValue}
        />
      </InputWrapperContainer>
    </>
  )
}

const InputWrapper = createStyled('div')
const InputWrapperContainer = styled(InputWrapper)<{ inputCSSStyles: string }>`
  input {
    ${({ inputCSSStyles }) => css`
      ${inputCSSStyles}
    `};
  }
`
const Hook = createStyled('div')
