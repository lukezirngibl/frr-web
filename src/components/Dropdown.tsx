import React from 'react'
import {
  Dropdown as SemanticDropdown,
  StrictDropdownProps as SemanticDropdownProps,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { Options, Language } from '../util'
import { getTranslation, getLanguageContext } from '../theme/language'
import { Label, LabelProps } from './Label'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'

const DropdownWrapper = styled.div`
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

type Value = string | number

export type Props = {
  label?: LabelProps
  options: Options<Value> | ((lan: Language) => Options<Value>)
  onChange: (value: string) => void
  style?: Partial<AppTheme['dropdown']>
  error?: boolean
  value: string
  disabled?: boolean
  readOnly?: boolean
  dropdownProps?: SemanticDropdownProps
}

export const processOptions = (
  raw: Array<{ label?: string; name?: string; value: Value }>,
  translate: (s: string) => string,
) =>
  raw.map(o => ({
    text:
      o.label !== undefined
        ? typeof o.label === 'string'
          ? translate(o.label)
          : `${o.label}`
        : o.name || 'Unknown',
    value: o.value,
  }))

export const Dropdown = (props: Props) => {
  const {
    onChange,
    options,
    error,
    disabled,
    dropdownProps,
    readOnly,
    ...otherProps
  } = props

  const theme = React.useContext(getThemeContext())
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const getStyle = createGetStyle(theme, 'dropdown')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <DropdownWrapper
        className={`frr-dropdown-wrapper ${
          error ? 'error' : disabled ? 'disabled' : ''
        }`}
        style={getStyle('wrapper')}
      >
        <SemanticDropdown
          placeholder="Select"
          fluid
          selection
          onChange={(e, { value }) => {
            onChange(value as string)
          }}
          search
          value={props.value}
          options={processOptions(
            typeof options === 'function' ? options(language) : options,
            translate,
          )}
          error={error}
          disabled={disabled}
          readOnly={readOnly}
          {...dropdownProps}
          {...otherProps}
        />
      </DropdownWrapper>
    </>
  )
}
