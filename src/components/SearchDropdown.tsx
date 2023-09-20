import React, { FC, ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactSelectAsync from 'react-select/async'
import { useTranslation } from 'react-i18next'
import ReactSelect from 'react-select'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { Option, OptionType, Options } from '../html'
import { Language } from '../theme/language'
import {
  ComponentTheme,
  useCSSStyles,
  useComponentTheme,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace, Translate } from '../translation'
import { replaceUmlaute } from '../utils/replaceUmlaute'
import { Label, LabelProps } from './Label'
import { MENU_MAX_HEIGHT, MENU_MIN_HEIGHT, MENU_PAGE_SIZE } from './menu/Menu.constants'
import { MdOutlineExpandMore } from '../icons/new/MdOutlineExpandMore'
import { MdDone } from '../icons/new/MdDone'
import { SelectOption, mapReactSelectStyles } from './Select'

type SearchDropdownProps = {
  dataTestId?: string
  disabled?: boolean
  error?: boolean
  hasFocus?: boolean
  inputRef?: React.Ref<any>
  isMenuAlwaysOpen?: boolean // If true menu is always open and will not close
  isMatchAny?: boolean // If false search starts from the beginning otherwise it matches any part of the string
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  menuPortalTarget?: HTMLElement
  onSearch: (search: string) => void
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: (value: string) => void
  options: Options<string>
  placeholder?: string
  readOnly?: boolean
  style?: Partial<ComponentTheme['select']>
  value: string | null
}

export const SearchDropdown = (props: SearchDropdownProps) => {
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'select')(props.style)
  const { t } = useTranslation(props.localeNamespace)

  /*
   * Map value
   */

  const value = props.value === null ? 'null' : props.value

  /*
   * Handle options
   */


  const onChange = (option: OptionType<string>) => {
    const newValue = option.value === 'null' ? null : option.value
    props.onChange(newValue)
    props.onBlur?.(newValue)
  }

  /*
   * Translate option label
   */

  const getOptionLabel = (option: OptionType<string>) => {
    const label = option.label || option.name
    let optionLabel: string

    if (option.isLabelTranslated) {
      optionLabel = label
    } else {
      optionLabel = t(label)
    }

    return optionLabel
  }

  /*
   * Focus handling
   */

  const [isFocused, setIsFocused] = useState(false)
  const onFocus = () => {
    setIsFocused(true)
    props.onFocus?.()
  }
  const onBlur = () => {
    setIsFocused(false)
  }

  useEffect(() => {
    if (props.hasFocus) {
      if (props.inputRef && 'current' in props.inputRef) {
        props.inputRef.current.focus()
      }
      onFocus()
    }
  }, [props.hasFocus])

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <Wrapper {...getCSSStyles('wrapper')}>
        <div data-test-id={props.dataTestId} data-value={value}>
          <ReactSelect
            autoFocus={props.hasFocus}
            blurInputOnSelect
            components={{ Option: SelectOption }}
            data-test-id={props.dataTestId}
            getOptionLabel={getOptionLabel}
            isDisabled={props.disabled || props.readOnly}
            menuPlacement="auto"
            menuPortalTarget={props.menuPortalTarget || document.body}
            menuShouldBlockScroll
            onInputChange={props.onSearch}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            openMenuOnFocus
            menuIsOpen={props.isMenuAlwaysOpen}
            options={props.options}
            pageSize={MENU_PAGE_SIZE}
            minMenuHeight={MENU_MIN_HEIGHT}
            maxMenuHeight={MENU_MAX_HEIGHT}
            placeholder={props.placeholder || t('formFields.select.defaultLabel')}
            styles={mapReactSelectStyles(props.style, props.error, isFocused)}
            ref={props.inputRef}
            tabSelectsValue={false}
            value={props.options.find((option) => option.value === props.value)}
          />
        </div>
      </Wrapper>
    </>
  )
}

/*
 * Styled components
 */

const Wrapper = createStyled('div')
