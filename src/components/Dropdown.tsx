import React from 'react'
import {
  Dropdown as SemanticDropdown,
  StrictDropdownProps as SemanticDropdownProps,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { TranslationGeneric } from '../util'
import { getTranslation, getLanguageContext, Language } from '../theme/language'
import { Label } from './Label'
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

type Options<T> = Array<{ label?: keyof T; name?: string; value: string }>

export type Props<T> = {
  label?: keyof T
  required?: boolean
  options: Options<T> | ((lan: Language) => Options<T>)
  onChange: (value: string) => void
  style?: Partial<AppTheme['dropdown']>
  error?: boolean
  value: string
  disabled?: boolean
  dropdownProps?: SemanticDropdownProps
}

export const processOptions = <TM extends TranslationGeneric>(
  raw: Array<{ label?: keyof TM; name?: string; value: string | number }>,
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

export const Dropdown = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const {
    onChange,
    label,
    options,
    error,
    disabled,
    dropdownProps,
    ...otherProps
  } = props

  const theme = React.useContext(getThemeContext())
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const getStyle = createGetStyle(theme, 'dropdown')(props.style)

  return (
    <DropdownWrapper
      className={error ? 'error' : disabled ? 'disabled' : ''}
      style={getStyle('wrapper')}
    >
      {label && <Label<TM> label={label} />}
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
        {...dropdownProps}
        {...otherProps}
      />
    </DropdownWrapper>
  )
}
