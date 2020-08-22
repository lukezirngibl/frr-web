import React, { FC } from 'react'
import {
  Dropdown as SemanticDropdown,
  StrictDropdownProps as SemanticDropdownProps,
} from 'semantic-ui-react'
import styled, { SimpleInterpolation } from 'styled-components'
import { TranslationGeneric } from '../util'
import { getTranslation, getLanguageContext } from '../theme/language'
import { Label } from './Label'

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

export type Props<TM> = {
  label?: keyof TM
  required?: boolean
  options: Array<{ label: keyof TM; value: number }>
  onChange: (value: number) => void
  error: boolean
  value: number
} & Omit<SemanticDropdownProps, 'onChange' | 'value' | 'options'>

export const DropdownNumber = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { onChange, label, options, error, disabled, ...otherProps } = props

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
        options={options.map(o => ({
          text: typeof o.label === 'string' ? translate(o.label) : `${o.label}`,
          value: o.value,
        }))}
        error={error}
        disabled={disabled}
        {...otherProps}
      />
    </DropdownWrapper>
  )
}
