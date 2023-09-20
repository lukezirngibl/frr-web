import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { OptionProps, StylesConfig, components, createFilter } from 'react-select'
import styled from 'styled-components'
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
import { mapReactSelectStyles } from './Select'

type InternalOption<T extends number | string> = {
  label?: string
  name?: string
  value: T
  isDisabled?: boolean
  isLabelTranslated?: boolean
}

type Priority = Array<string | number>

export type Props<T extends number | string> = {
  alphabetize?: boolean // Order alphabetically
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
  onFocus?: () => void
  options: Options<T> | ((lan: Language) => Options<T>)
  overwriteIsMobileTouch?: boolean // For testing purposes only
  priority?: Priority // Show on top of select options
  readOnly?: boolean
  style?: Partial<ComponentTheme['select']>
  onChange: (value: T[]) => void
  onBlur?: (value: T[]) => void
  value: T[]
}

export const MultiSelect = <T extends string | number>(props: Props<T>) => {
  const theme = useComponentTheme()
  const getInlineStyle = useInlineStyle(theme, 'select')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'select')(props.style)
  const { isMobileTouch } = useMobileTouch({ overwriteIsMobileTouch: props.overwriteIsMobileTouch })
  const { t, i18n } = useTranslation(props.localeNamespace)

  /*
   * Determine options (incl. auto-suggest)
   */

  const [options, setOptions] = useState(
    getOptions<T>({
      alphabetize: props.alphabetize,
      isMobileTouch,
      language: i18n.language,
      options: props.options,
      priority: props.priority,
      t,
      value: props.value,
    }),
  )

  useEffect(() => {
    setOptions(
      getOptions({
        alphabetize: props.alphabetize,
        isMobileTouch,
        language: i18n.language,
        options: props.options,
        priority: props.priority,
        t,
        value: props.value,
      }),
    )
  }, [props.alphabetize, props.options, props.priority, isMobileTouch])

  const onChange = (options: InternalOption<T>[]) => {
    props.onChange(options.map((o) => o.value))
    props.onBlur?.(options.map((o) => o.value))
  }

  /*
   * Translate option label
   */

  const getOptionLabel = (option: InternalOption<T>) => {
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
        <div data-test-id={props.dataTestId} data-value={props.value}>
          <ReactSelect
            autoFocus={props.hasFocus}
            blurInputOnSelect
            components={{ Option: SelectOption }}
            data-test-id={props.dataTestId}
            getOptionLabel={getOptionLabel}
            filterOption={createFilter({
              ignoreCase: true,
              matchFrom: props.isMatchAny ? 'any' : 'start',
            })}
            isDisabled={props.disabled || props.readOnly}
            menuPlacement="auto"
            menuPortalTarget={props.menuPortalTarget || document.body}
            menuShouldBlockScroll
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            openMenuOnFocus
            menuIsOpen={props.isMenuAlwaysOpen}
            options={options.map(mapInternalOption)}
            pageSize={MENU_PAGE_SIZE}
            minMenuHeight={MENU_MIN_HEIGHT}
            maxMenuHeight={MENU_MAX_HEIGHT}
            placeholder={t('formFields.select.defaultLabel')}
            styles={mapReactSelectStyles(props.style, props.error, isFocused)}
            ref={props.inputRef}
            tabSelectsValue={false}
            value={options.filter((option) => props.value.includes(option.value))}
            isMulti
          />
        </div>
      </Wrapper>
    </>
  )
}

/*
 * Option mapper functions
 */

export const getOptions = <T extends string | number>(params: {
  alphabetize?: boolean
  isMobileTouch: boolean
  language: string
  options: Options<T> | ((lan: Language) => Options<T>)
  priority?: Priority
  t: Translate
  value?: T[]
}) => {
  const { alphabetize, language, options, t, priority } = params
  const translatedOptions = typeof options === 'function' ? options(language as Language) : options

  const filteredOptions = translatedOptions

  const mapOption = (option: OptionType<T>) => ({
    disabled: option.disabled,
    isLabelTranslated: true,
    label: option.isLabelTranslated ? option.label : t(option.label),
    name: option.name || option.label,
    value: option.value,
  })

  const mappedOptions = [
    ...(priority
      ? priority
          .map((prio) => translatedOptions.find((option) => option.value === prio))
          .map(mapOption)
          .filter(Boolean)
      : []),
    ,
    ...(alphabetize
      ? filteredOptions
          .map(mapOption)
          .sort((a, b) =>
            replaceUmlaute(a.label.toLowerCase()) > replaceUmlaute(b.label.toLowerCase()) ? 1 : -1,
          )
      : filteredOptions),
  ].filter(Boolean)

  return mappedOptions
}

export const mapInternalOption = <T extends string | number>(
  option: OptionType<T>,
): InternalOption<T> => ({
  ...option,
  isDisabled: option.disabled,
})

/*
 * Control & Option Component
 */

export const SelectOption = <T extends string | number>(
  props: OptionProps<InternalOption<T>> & { value: T[] },
) => {
  const { children, value, ...other } = props
  const dataTestId = `${props.selectProps['data-test-id']}:option-${props.value}`

  return (
    <div data-test-id={dataTestId}>
      <components.Option {...other} data-test-id={dataTestId}>
        <OptionValueWrapper>
          {props.isSelected && <MdDone className="selected-icon" width={18} />}
          {children}
        </OptionValueWrapper>
      </components.Option>
    </div>
  )
}

/*
 * Styled components
 */

const Wrapper = createStyled('div')
const SelectWrapper = createStyled('select')
const OptionValueWrapper = styled.span`
  display: flex;
  align-items: center;
  position: relative;

  & svg.selected-icon {
    position: absolute;
    margin-left: -22px;
    margin-top: -3px;
  }
`
