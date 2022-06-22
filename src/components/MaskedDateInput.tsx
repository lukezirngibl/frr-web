import React, { useEffect, useRef, useState, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
//import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'
import MaskInput from 'react-maskinput'
import styled, { css } from 'styled-components'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'

const InputWrapper = createStyled('div')
const InputWrapperContainer = styled(InputWrapper)<{ inputCSSStyles: string }>`
  input {
    ${({ inputCSSStyles }) =>
      css`
        ${inputCSSStyles}
      `}
  }
`

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
}

export const MaskedDateInput = (props: Props) => {
  const inputRef = useRef(null)

  //  const theme = useComponentTheme()
  // const getStyle = useCSSStyles(theme, 'datePicker')(props.style)
  // const getInlineStyle = useInlineStyle(theme, 'datePicker')(props.style)

  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'textInput')(props.style)

  /* Internal value */

  const [internalValue, setInternalValue] = useState(props.value)

  useEffect(() => {
    setInternalValue(props.value)
  }, [props.value])

  /* Masked input */

  const [mask, setMask] = React.useState('00.00.0000')
  const [maskString, setMaskString] = React.useState('DD.MM.YYYY')

  const onChangeMasked = (e: any): string => {
    const value = e.target.value

    try {
      if (parseInt(value[6], 10) > 2) {
        setMaskString('DD.MM.YY')
        setMask('00.00.00')
      } else {
        setMaskString('DD.MM.YYYY')
      }
    } catch (e) {
      setMaskString('DD.MM.YYYY')
      setMask('00.00.0000')
    }
    console.log(mask, maskString)
    return value
  }

  /* Focus field (e.g. on error) */

  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    let timerId: any = null
    if (props.hasFocus && inputRef.current) {
      // Timeout is required to keep scrollIntoView smooth
      timerId = setTimeout(() => inputRef.current.focus(), 500)
    }
    return () => clearTimeout(timerId)
  }, [props.hasFocus])

  return (
    <>
      {props.label && <Label {...props.label} />}
      <InputWrapperContainer
        {...getCSSStyle({
          wrapper: true,
          errorWrapper: props.error,
        })}
        inputCSSStyles={getCSSStyle({
          input: true,
          errorInput: props.error,
        })}
        onClick={() => {
          if (inputRef.current) {
            const input = inputRef.current
            input.setSelectionRange(0, 10)
            input.focus()
          }
        }}
      >
        <MaskInput
          getReference={(el) => {
            inputRef.current = el
          }}
          data-test-id={props.dataTestId}
          alwaysShowMask
          onChange={(e) => {
            const value = onChangeMasked(e)

            setInternalValue(value)
            props.onChange?.(value)

            if (!isFocus) {
              // Required for browser auto-fill fields to ensure the form gets the values
              props.onBlur(value)
            }
          }}
          onBlur={() => {
            let newValue = (internalValue || '').trim()

            setInternalValue(newValue)
            setIsFocus(false)
            props.onBlur(newValue)
          }}
          onFocus={() => {
            setIsFocus(true)
          }}
          maskString={maskString}
          mask={mask}
          value={internalValue}
        />
      </InputWrapperContainer>
    </>
  )
}
