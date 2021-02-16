import React, { FC } from 'react'
import {
  Dropdown as SemanticDropdown,
  StrictDropdownProps as SemanticDropdownProps,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { getTranslation, getLanguageContext } from '../theme/language'
import { Label, LabelProps } from './Label'
import { processOptions } from '../util'
import { Language } from '../util'

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

type Options = Array<{ label?: string; name?: string; value: number }>

export type Props = {
  label?: LabelProps
  options: Options | ((lan: Language) => Options)
  onChange: (value: number) => void
  error: boolean
  value: number
  readOnly?: boolean
} & Omit<SemanticDropdownProps, 'onChange' | 'value' | 'options'>

export const DropdownNumber = (props: Props) => {
  const { onChange, label, error, disabled, options, ...otherProps } = props

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <DropdownWrapper
        hasLabel={label !== undefined}
        className={error ? 'error' : disabled ? 'disabled' : ''}
      >
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
    </>
  )
}
