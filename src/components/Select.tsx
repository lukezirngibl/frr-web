import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { OptionProps, StylesConfig, components, createFilter } from 'react-select'
import styled, { CSSProperties } from 'styled-components'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { Div, Option, OptionType, Options } from '../html'
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

type Value = string | number | null

type SelectOptionType = OptionType<Value> & { selectedIconStyle?: CSSProperties }

type InternalOption = {
  CustomComponent?: React.ReactNode
  label?: string
  name?: string
  value: Value
  isDisabled?: boolean
  isLabelTranslated?: boolean
  selectedIconStyle?: CSSProperties
}

type Priority = Array<string | number>

export type Props = {
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
  onChange: (value: Value) => void
  onFocus?: () => void
  onBlur?: (value: Value) => void
  options: Options<Value> | ((lan: Language) => Options<Value>)
  overwriteIsMobileTouch?: boolean // For testing purposes only
  placeholder?: string
  priority?: Priority // Show on top of select options
  readOnly?: boolean
  style?: Partial<ComponentTheme['select']>
  value: Value
}

export const Select = (props: Props) => {
  const theme = useComponentTheme()
  const getInlineStyle = useInlineStyle(theme, 'select')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'select')(props.style)
  const { isMobileTouch } = useMobileTouch({ overwriteIsMobileTouch: props.overwriteIsMobileTouch })
  const { t, i18n } = useTranslation(props.localeNamespace)

  const getReactSelectStyles = useCallback(
    (error?: boolean, isFocused?: boolean): StylesConfig =>
      mapReactSelectStyles(getInlineStyle)(error, isFocused),
    [],
  )

  /*
   * Map value
   */

  const value = props.value === undefined || props.value === null ? 'null' : props.value

  /*
   * Determine options (incl. auto-suggest)
   */

  const [options, setOptions] = useState(
    getOptions({
      alphabetize: props.alphabetize,
      isMobileTouch,
      language: i18n.language,
      options: props.options,
      priority: props.priority,
      selectedIconStyle: getInlineStyle('optionSelectedIcon').style as any,
      t: t as Translate,
      value,
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
        selectedIconStyle: getInlineStyle('optionSelectedIcon').style as any,
        t: t as Translate,
        value,
      }),
    )
  }, [props.alphabetize, props.options, props.priority, isMobileTouch])

  const onChange = (option: InternalOption) => {
    const newValue = option.value === 'null' ? null : option.value
    props.onChange(newValue)
    props.onBlur?.(newValue)
  }

  /*
   * Translate option label
   */

  const getOptionLabel = (option: InternalOption) => {
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
      <Div {...getCSSStyles('wrapper')}>
        {isMobileTouch ? (
          <>
            <SelectWrapper
              {...getCSSStyles(
                {
                  select: true,
                  value: value !== 'null',
                  placeholder: value === 'null',
                  errorWrapper: props.error,
                },
                {},
                'select-wrapper',
              )}
              dataTestId={props.dataTestId}
              data-value={value}
              disabled={props.disabled || props.readOnly}
              onBlur={onBlur}
              onFocus={onFocus}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const newValue = e.target.value === 'null' ? null : e.target.value
                props.onChange(newValue)
              }}
              ref={props.inputRef}
              value={value}
            >
              {options.map((option, optionIndex) =>
                option.CustomComponent ? (
                  <option
                    disabled={option.disabled}
                    key={optionIndex}
                    value={option.value === null ? 'null' : option.value}
                  >
                    {option.CustomComponent}
                  </option>
                ) : (
                  <Option
                    disabled={option.disabled}
                    isLabelTranslated={option.isLabelTranslated}
                    key={optionIndex}
                    label={option.label || option.name}
                    localeNamespace={props.localeNamespace}
                    value={option.value === null ? 'null' : option.value}
                  />
                ),
              )}
            </SelectWrapper>

            <MdOutlineExpandMore width={24} {...getInlineStyle({ icon: true, iconMobile: true })} />
          </>
        ) : (
          <div data-test-id={props.dataTestId} data-value={value}>
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
              placeholder={props.placeholder || t('formFields.select.defaultLabel')}
              styles={getReactSelectStyles(props.error, isFocused)}
              ref={props.inputRef}
              tabSelectsValue={false}
              value={options.find((option) => option.value === props.value)}
            />
          </div>
        )}
      </Div>
    </>
  )
}

/*
 * Option mapper functions
 */

export const getOptions = (params: {
  alphabetize?: boolean
  isMobileTouch: boolean
  language: string
  options: Options<Value> | ((lan: Language) => Options<Value>)
  priority?: Priority
  selectedIconStyle?: CSSProperties
  t: Translate
  value?: Value | null
}): Options<Value> => {
  const { alphabetize, language, options, t, priority } = params
  const translatedOptions = typeof options === 'function' ? options(language as Language) : options

  const filteredOptions = priority
    ? translatedOptions.filter((option) => !priority.includes(option.value))
    : translatedOptions

  const mapOption = (option: OptionType<Value> & { selectedIconStyle?: CSSProperties }) => ({
    disabled: option.disabled,
    isLabelTranslated: true,
    label: option.isLabelTranslated ? option.label : t(option.label),
    name: option.name || option.label,
    selectedIconStyle: params.selectedIconStyle,
    value: option.value,
  })

  const mappedOptions = [
    // According to meeting with Jürgen Meier on the 12.8.2022 we remove the initial placeholder/separator options
    ...(params.isMobileTouch &&
    (params.value === 'null' || params.value === null || params.value === undefined)
      ? [
          {
            value: 'null',
            disabled: true,
            label: 'formFields.select.defaultLabel',
          },
          {
            value: '---',
            disabled: true,
            label: '---',
            isLabelTranslated: true,
          },
        ]
      : []),
    ,
    ...(priority
      ? priority
          .map((prio) => translatedOptions.find((option) => option.value === prio))
          .map(mapOption)
          .filter(Boolean)
      : []),
    ,
    ...(priority
      ? [
          {
            value: '---',
            disabled: true,
            label: '---',
            isLabelTranslated: true,
          },
        ]
      : []),
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

export const mapInternalOption = (option: OptionType<Value>): InternalOption => ({
  ...option,
  isDisabled: option.disabled,
})

/*
 * Control & Option Component
 */

export const SelectOption = (props: OptionProps<InternalOption> & { value: Value }) => {
  const dataTestId = `${props.selectProps['data-test-id']}:option-${props.value}`

  return (
    <div data-test-id={dataTestId}>
      <components.Option {...props} data-test-id={dataTestId}>
        <OptionValueWrapper>
          {props.isSelected && (
            <MdDone className="selected-icon" style={props.data.selectedIconStyle} width={18} />
          )}
          {props.data.CustomComponent || props.children}
        </OptionValueWrapper>
      </components.Option>
    </div>
  )
}

/*
 * Styled components
 */

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

/*
 * React select style mapper
 */

export const mapReactSelectStyles =
  (getInlineStyle: any) =>
  (error?: boolean, isFocused?: boolean, isClearable?: boolean): StylesConfig => {
    const iconStyle = getInlineStyle('icon').style as any
    const menuPortalStyle = getInlineStyle('menuPortal').style as any
    const menuStyle = getInlineStyle('menu').style as any
    const menuListStyle = getInlineStyle('menuList').style as any
    const optionStyle = getInlineStyle('option').style as any
    const optionStyleHover = getInlineStyle('optionHover').style as any
    const optionStyleActive = getInlineStyle('optionActive').style as any
    const placeholderStyle = getInlineStyle('placeholder').style as any
    const selectStyle = getInlineStyle(
      {
        select: true,
        wrapperFocus: isFocused,
        errorWrapper: error,
      },
      {},
      'select-wrapper',
      true,
    ).style as any
    const valueStyle = getInlineStyle('value').style as any
    const valueContainerStyle = getInlineStyle('valueContainer').style as any

    return {
      control: () => {
        return selectStyle
      },
      dropdownIndicator: (provided, state) => {
        return {
          ...provided,
          transition: 'color 300ms, opacity 300ms, transform 300ms',
          transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          ...iconStyle,
          ':hover': {
            color: 'var(--color-primary)',
            opacity: 1.0,
          },
        }
      },

      menuPortal: (provided) => ({
        ...provided,
        ...menuPortalStyle,
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: 'var(--color-form-field-background-secondary)',
        boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)',
        zIndex: 999,
        ...menuStyle,
      }),
      menuList: (provided) => ({
        ...provided,
        ...menuListStyle,
      }),
      option: (provided, state) => {
        const style = {
          ...provided,
          cursor: state.isDisabled ? 'default' : 'pointer',
          ...optionStyle,
          backgroundColor:
            (state.isFocused && optionStyleHover.backgroundColor) ||
            (state.isDisabled && !state.isFocused && 'transparent') ||
            (state.isSelected && optionStyleActive.backgroundColor) ||
            optionStyle.backgroundColor ||
            optionStyle.background ||
            provided.backgroundColor,
          color:
            (state.isFocused && optionStyleHover.color) ||
            (state.isSelected && optionStyleActive.color) ||
            optionStyle.color ||
            provided.color,
        }
        return style
      },
      placeholder: (provided) => ({
        ...provided,
        ...placeholderStyle,
      }),
      valueContainer: (provided) => {
        return {
          ...provided,
          ...valueContainerStyle,
        }
      },
      input: (provided) => {
        return {
          ...provided,
          ...valueStyle,
        }
      },
      singleValue: (provided) => {
        return { ...provided, ...valueStyle }
      },
      indicatorSeparator: (provided) => (isClearable ? provided : { display: 'none' }),
      clearIndicator: (provided) => (isClearable ? provided : { display: 'none' }),
    }
  }
