import CheckIcon from '@material-ui/icons/Check'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { components, OptionProps, StylesConfig } from 'react-select'
import styled from 'styled-components'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { Option, Options, OptionType } from '../html'
import { Language } from '../theme/language'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace, Translate } from '../translation'
import { replaceUmlaute } from '../utils/replaceUmlaute'
import { Icon } from './Icon'
import { Label, LabelProps } from './Label'

type Value = string | number | null

type InternalOption = {
  label?: string
  name?: string
  value: Value
  isDisabled?: boolean
  isLabelTranslated?: boolean
}

type Priority = Array<string | number>

export type Props = {
  alphabetize?: boolean
  dataTestId?: string
  disabled?: boolean
  error?: boolean
  inputRef?: React.Ref<any>
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  menuPortalTarget?: HTMLElement
  onChange: (value: Value) => void
  onFocus?: () => void
  onBlur?: (value: Value) => void
  options: Options<Value> | ((lan: Language) => Options<Value>)
  priority?: Priority
  readOnly?: boolean
  style?: Partial<ComponentTheme['select']>
  value: Value
}

export const Select = (props: Props) => {
  const theme = useComponentTheme()
  const getInlineStyle = useInlineStyle(theme, 'select')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'select')(props.style)
  const { isMobileTouch } = useMobileTouch()
  const { t, i18n } = useTranslation(props.localeNamespace)

  /*
   * Map value
   */

  const value = props.value === null ? 'null' : props.value

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
  }, [props.alphabetize, props.options, props.priority])

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

  const [isFocused, setIsFocused] = useState(false)
  const onFocus = () => {
    setIsFocused(true)
    props.onFocus?.()
  }
  const onBlur = () => {
    setIsFocused(false)
  }

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <Wrapper {...getCSSStyles('wrapper')}>
        {isMobileTouch ? (
          <>
            <SelectWrapper
              {...getCSSStyles(
                {
                  select: true,
                  placeholder:
                    options.findIndex((option) => option.value === value && option.disabled) !== -1,
                  errorWrapper: props.error,
                },
                {},
                'select-wrapper',
              )}
              data-test-id={props.dataTestId}
              data-value={value}
              disabled={props.disabled || props.readOnly}
              onBlur={onBlur}
              onFocus={onFocus}
              onChange={(e) => {
                props.onChange(e.target.value === 'null' ? null : e.target.value)
              }}
              ref={props.inputRef}
              value={value}
            >
              {options.map((option, optionIndex) => (
                <Option
                  disabled={option.disabled}
                  isLabelTranslated={option.isLabelTranslated}
                  key={optionIndex}
                  label={option.label || option.name}
                  localeNamespace={props.localeNamespace}
                  value={option.value === null ? 'null' : option.value}
                />
              ))}
            </SelectWrapper>
            <Icon icon="expand_more" size={16} {...getInlineStyle({ icon: true, iconMobile: true })} />
          </>
        ) : (
          <div data-test-id={props.dataTestId} data-value={value}>
            <ReactSelect
              blurInputOnSelect
              components={{ Option: SelectOption }}
              data-test-id={props.dataTestId}
              getOptionLabel={getOptionLabel}
              isDisabled={props.disabled || props.readOnly}
              menuPlacement="auto"
              menuPortalTarget={props.menuPortalTarget || document.body}
              menuShouldBlockScroll
              onBlur={onBlur}
              onChange={onChange}
              onFocus={onFocus}
              openMenuOnFocus
              options={options.map(mapInternalOption)}
              placeholder={t('formFields.select.defaultLabel')}
              styles={mapReactSelectStyles(getInlineStyle, props.error, isFocused)}
              ref={props.inputRef}
              tabSelectsValue={false}
              value={options.find((option) => option.value === props.value)}
            />
          </div>
        )}
      </Wrapper>
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
  t: Translate
  value?: Value | null
}) => {
  const { alphabetize, language, options, t, priority } = params
  const translatedOptions = typeof options === 'function' ? options(language as Language) : options

  const filteredOptions = priority
    ? translatedOptions.filter((option) => !priority.includes(option.value))
    : translatedOptions

  const mappedOptions = [
    // According to meeting with Jürgen Meier on the 12.8.2022 we remove the initial placeholder/separator options
    ...(params.isMobileTouch && (params.value === null || params.value === undefined)
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
      ? priority.map((prio) => translatedOptions.find((option) => option.value === prio)).filter(Boolean)
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
          .map((option) => ({
            ...option,
            name: option.name || option.label,
            isLabelTranslated: true,
            label: option.isLabelTranslated ? option.label : t(option.label),
          }))
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
 * Option Component
 */

export const SelectOption = (props: OptionProps<InternalOption> & { value: Value }) => {
  const { children, value, ...other } = props
  return (
    <div data-test-id={`option-${props.value}`}>
      <components.Option {...other} data-test-id={`option-${props.value}`}>
        <OptionValueWrapper>
          {props.isSelected && <CheckIcon className="selected-icon" />}
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
    font-size: 18px;
    margin-left: -22px;
    margin-top: -3px;
  }
`

/*
 * React select style mapper
 */

export const mapReactSelectStyles = (
  getInlineStyle: any,
  error?: boolean,
  isFocused?: boolean,
): StylesConfig => {
  const iconStyle = getInlineStyle('icon').style as any
  const menuStyle = getInlineStyle('menu').style as any
  const optionStyle = getInlineStyle('option').style as any
  const optionStyleHover = getInlineStyle('optionHover').style as any
  const optionStyleActive = getInlineStyle('optionActive').style as any
  const placeholderStyle = getInlineStyle('placeholder').style as any
  const selectStyle = getInlineStyle(
    {
      select: true,
      wrapperFocus: !!isFocused,
      errorWrapper: error,
    },
    {},
    'select-wrapper',
  ).style as any
  const valueStyle = getInlineStyle('value').style as any
  const valueContainerStyle = getInlineStyle('valueContainer').style as any

  return {
    control: () => {
      return {
        ...selectStyle,
      }
    },
    dropdownIndicator: (provided) => {
      return {
        ...provided,
        ...iconStyle,
        transition: 'color 1.5s, opacity 1.5s',
        ':hover': {
          color: 'var(--color-primary)',
          opacity: 1.0,
        },
      }
    },
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-form-field-background-secondary)',
      boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)',
      ...menuStyle,
      zIndex: 999,
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
    indicatorSeparator: () => ({ display: 'none' }),
  }
}
