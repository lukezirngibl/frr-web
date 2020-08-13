import React from 'react'
import styled from 'styled-components'

import CurrencyInputLib from 'react-currency-input-field'
import { CurrencyInputProps } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { getLanguageContext, getTranslation } from '../../theme/language'
import { Label } from './Label'
import { TranslationGeneric } from '../../util'

const Wrapper = styled.div`
  position: relative;

  input {
    border: 1px solid rgba(34, 36, 38, 0.15);
    height: 48px;
    width: 100%;
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.28571429rem;
    padding: 0 18px;

    &:focus {
      outline: none;
      border-color: rgb(133, 183, 217) !important;
    }
  }
`

const ErrorWrapper = styled.div`
  position: absolute;
  bottom: -20px;
  color: red;
  font-size: 11px;
  left: 0;
`

export type Props<TM> = {
  value: number
  label?: keyof TM
  error?: boolean
  onChange: (v: number) => void
} & Partial<Omit<CurrencyInputProps, 'onChange' | 'value'>>

export const CurrencyInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const max = props.max || 9999999
  const min = props.min || 0

  const maxError = props.value > max
  const minError = props.value < min
  const hasError = maxError || minError
  return (
    <Wrapper>
      {props.label && <Label<TM> label={props.label} />}
      <CurrencyInputLib
        {...props}
        value={props.value}
        onChange={(v, name) => {
          props.onChange(Number(v || 0))
        }}
        style={{
          borderColor: hasError ? 'red' : 'rgba(34, 36, 38, 0.15)',
        }}
      />
      {hasError && (
        <ErrorWrapper>
          {maxError
            ? `${translate('maxError')} ${props.prefix}${max}`
            : `${translate('minError')} ${props.prefix}${min}`}
        </ErrorWrapper>
      )}
    </Wrapper>
  )
}
