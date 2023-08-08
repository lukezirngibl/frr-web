import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  onBlur: (value: string, resetValue: () => void) => void
  onChange?: (value: string) => void
  onFocus?: () => void
  shouldMoveCursorToStartOnClick?: boolean
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

  const { t } = useTranslation(props.localeNamespace)
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'textInput')(props.style)

  /* Internal value */

  const [internalValue, setInternalValue] = useState(props.value)
  const [lastValue, setLastValue] = useState('')

  useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  /* Masked input */

  const { mask, maskString } = props.maskInput

  const resetValue = () => {
    setInternalValue(props.value)
    setLastValue('')
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
        inputCSSStyles={
          getCSSStyle({
            input: true,
            inputPlaceholder: !internalValue || internalValue === '',
            errorInput: props.error,
            disabledInput:
              isFocused ||
              (!!internalValue && internalValue !== maskString) ||
              (internalValue !== maskString && lastValue !== '' && internalValue !== lastValue)
                ? false
                : true,
          }).cssStyles
        }
        onClick={() => {
          if (inputRef.current) {
            const input = inputRef.current
            props.shouldMoveCursorToStartOnClick && input.setSelectionRange(0, 0)
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
          onValueChange={(e) => {
            setInternalValue(e.maskedValue)
            props.onChange?.(e.maskedValue)
            setLastValue(e.maskedValue)

            if (!isFocused) {
              // Required for browser auto-fill fields to ensure the form gets the values
              props.onBlur(e.maskedValue, resetValue)
            }
          }}
          onBlur={() => {
            let newValue = (internalValue || '').trim()
            setInternalValue(newValue)
            setIsFocused(false)
            props.onBlur(newValue, resetValue)
          }}
          onFocus={() => {
            setIsFocused(true)
            props.onFocus?.()
          }}
          maskString={t(maskString)}
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
