import { Label } from './Label'
import { LabelProps } from './Label'
import { Options } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { processOptions } from '../util'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dropdown as SemanticDropdown,
  StrictDropdownProps as SemanticDropdownProps,
} from 'semantic-ui-react'
import styled from 'styled-components'

const DropdownWrapper = createStyled(styled.div`
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
`)

type Value = string | number

export type Props = {
  disabled?: boolean
  dropdownProps?: SemanticDropdownProps
  error?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  onChange: (value: string) => void
  options: Options<Value>
  readOnly?: boolean
  style?: Partial<AppTheme['dropdown']>
  value: string
}

export const Dropdown = (props: Props) => {
  const { disabled, dropdownProps, error, localeNamespace, onChange, options, readOnly, ...otherProps } =
    props

  const theme = useAppTheme()
  const getCSSStyles = useCSSStyles(theme, 'dropdown')(props.style)
  const { t } = useTranslation(props.localeNamespace)
  // const language = useLanguage()
  // const translate = useTranslate(language)

  return (
    <>
      {props.label && <Label localeNamespace={localeNamespace} {...props.label} />}
      <DropdownWrapper
        className={`frr-dropdown-wrapper ${error ? 'error' : disabled ? 'disabled' : ''}`}
        {...getCSSStyles('wrapper')}
      >
        <SemanticDropdown
          placeholder="Select"
          fluid
          selection
          onChange={(e, { value }) => {
            onChange(value as string)
          }}
          search
          options={processOptions(options, t)}
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
