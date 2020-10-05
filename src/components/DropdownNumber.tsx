import React, { FC } from 'react'
import {
  Dropdown as SemanticDropdown,
  StrictDropdownProps as SemanticDropdownProps,
} from 'semantic-ui-react'
import styled, { SimpleInterpolation } from 'styled-components'
import { TranslationGeneric } from '../util'
import { getTranslation, getLanguageContext, Language } from '../theme/language'
import { Label } from './Label'
import { processOptions } from './Dropdown'

const DropdownWrapper = styled.div<{ hasLabel: boolean }>`
  width: 100%;

  &.disabled .label {
    opacity: 0.45;
  }

  &.error {
    .label {
      background-color: #9f3a38 !important;
      color: white !important;
    }
  }
`

type Options<T> = Array<{ label?: keyof T; name?: string; value: number }>

export type Props<TM> = {
  label?: keyof TM
  required?: boolean
  options: Options<TM> | ((lan: Language) => Options<TM>)
  onChange: (value: number) => void
  error: boolean
  value: number
  readOnly?: boolean
} & Omit<SemanticDropdownProps, 'onChange' | 'value' | 'options'>

export const DropdownNumber = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { onChange, label, error, disabled, options, ...otherProps } = props

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  return (
    <DropdownWrapper
      hasLabel={label !== undefined}
      className={error ? 'error' : disabled ? 'disabled' : ''}
    >
      {label && <Label<TM> label={label} />}
      <SemanticDropdown
        placeholder="Select"
        fluid
        selection
        onChange={(e, { value }) => {
          onChange(value as number)
        }}
        options={processOptions(
          typeof options === 'function' ? options(language) : options,
          translate,
        )}
        error={error}
        disabled={disabled || props.readOnly}
        {...otherProps}
      />
    </DropdownWrapper>
  )
}
