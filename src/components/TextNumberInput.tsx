import React, { useState } from 'react'
import { Input as SematicInput, StrictInputProps } from 'semantic-ui-react'
import { TranslationGeneric } from '../util'
import { useDebouncedCallback } from 'use-debounce'
import styled from 'styled-components'
import { Label } from './Label'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'

const InputWrapper = styled.div``

const Input = styled.input``

export type Props<TM> = {
  onChange: (n: number) => void
  value: number
  required?: boolean
  debouncedDelay?: number
  style?: Partial<AppTheme['textNumberInput']>
  label?: keyof TM
  readOnly?: boolean
  disabled?: boolean
}

const getValue = (v: string) => (isNaN(Number(v)) ? 0 : Number(v))

export const TextNumberInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { label, value, ...otherProps } = props

  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'textNumberInput')(props.style)

  const [internalValue, setInternalValue] = useState(`${value}`)

  const [onChange] = useDebouncedCallback((text: string) => {
    props.onChange(getValue(text))
    setInternalValue(`${getValue(text)}`)
  }, props.debouncedDelay || 300)

  React.useEffect(() => {
    setInternalValue(`${value}`)
  }, [value])

  React.useEffect(
    () => () => {
      if (internalValue !== `${value}`) {
        props.onChange(getValue(internalValue))
      }
    },
    [],
  )

  return (
    <>
      {label && <Label<TM> label={label} />}
      <InputWrapper style={getStyle('wrapper')}>
        <Input
          className="frr-text-number-input"
          style={{
            ...getStyle('input'),
            ...(props.readOnly || props.disabled ? getStyle('disabled') : {}),
          }}
          disabled={props.readOnly || props.disabled}
          onChange={e => {
            setInternalValue(e.target.value)
            onChange(e.target.value)
          }}
          value={internalValue}
        ></Input>
      </InputWrapper>
    </>
  )
}
