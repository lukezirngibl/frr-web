import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { components, OptionProps } from 'react-select'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { Option, Options, OptionType } from '../html'
import { Language } from '../theme/language'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { replaceUmlaute } from '../utils/replaceUmlaute'
import { Icon } from './Icon'
import { Label, LabelProps } from './Label'
import CheckIcon from '@material-ui/icons/Check'
import styled from 'styled-components'

type Value = string | number | null

type InternalOption = {
  label?: string
  name?: string
  value: Value
  isDisabled?: boolean
  isLabelTranslated?: boolean
}

export type Props = {
  alphabetize?: boolean
  dataTestId?: string
  disabled?: boolean
  error?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  menuPortalTarget?: HTMLElement
  onChange: (value: Value) => void
  options: Options<Value> | ((lan: Language) => Options<Value>)
  priority?: Array<string | number>
  readOnly?: boolean
  selectParentElement?: string
  style?: Partial<ComponentTheme['select']>
  value: Value
}

const mapInternalOption = (option: OptionType<Value>): InternalOption => ({
  ...option,
  isDisabled: option.disabled,
})

const SelectOption = (props: OptionProps<InternalOption> & { value: Value }) => {
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

export const Select = (props: Props) => {
  const { label } = props

  const theme = useComponentTheme()
  const { isMobileTouch } = useMobileTouch()
  const { t, i18n } = useTranslation(props.localeNamespace)

  const getInlineStyle = useInlineStyle(theme, 'select')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'select')(props.style)

  const transformedOptions =
    typeof props.options === 'function' ? props.options(i18n.language as Language) : props.options

  const parseOptions = (options: Options<Value>) =>
    props.alphabetize
      ? options
          .map((option) => ({
            ...option,
            name: option.name || option.label,
            isLabelTranslated: true,
            label: option.isLabelTranslated ? option.label : t(option.label),
          }))
          .sort((a, b) =>
            replaceUmlaute(a.label.toLowerCase()) > replaceUmlaute(b.label.toLowerCase()) ? 1 : -1,
          )
      : options

  const options: Options<Value> = [
    // According to meeting with Jürgen Meier on the 12.8.2022 we remove the initial placeholder/separator options
    // ...(props.value === null || props.value === undefined
    //   ? [
    //       {
    //         value: isMobileTouch ? null : 'default',
    //         disabled: true,
    //         label: 'formFields.select.defaultLabel',
    //       },
    //       {
    //         value: '---',
    //         disabled: true,
    //         label: '---',
    //         isLabelTranslated: true,
    //       },
    //     ]
    //   : []),
    // ,
    ...(props.priority
      ? props.priority
          .map((prio) => transformedOptions.find((option) => option.value === prio))
          .filter(Boolean)
      : []),
    ,
    ...(props.priority
      ? [
          {
            value: '---',
            disabled: true,
            label: '---',
            isLabelTranslated: true,
          },
        ]
      : []),
    ...parseOptions(
      props.priority
        ? transformedOptions.filter((option) => !props.priority.includes(option.value))
        : transformedOptions,
    ),
  ].filter(Boolean)

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

  const selectStyle = getInlineStyle(
    {
      select: true,
      errorWrapper: props.error,
    },
    {},
    'select-wrapper',
  ).style as any
  const iconStyle = getInlineStyle('icon').style as any
  const menuStyle = getInlineStyle('menu').style as any
  const optionStyle = getInlineStyle('option', undefined, undefined, true).style as any
  const placeholderStyle = getInlineStyle('placeholder').style as any
  const valueStyle = getInlineStyle('value').style as any
  const valueContainerStyle = getInlineStyle('valueContainer').style as any

  const value = props.value === null ? 'null' : props.value

  return (
    <>
      {label && <Label {...label} />}
      <Wrapper {...getCSSStyles('wrapper')}>
        {isMobileTouch ? (
          <>
            <SelectWrapper
              {...getCSSStyles(
                {
                  select: true,
                  errorWrapper: props.error,
                },
                {},
                'select-wrapper',
              )}
              disabled={props.disabled || props.readOnly}
              value={value}
              onChange={(e) => {
                props.onChange(e.target.value === 'null' ? null : e.target.value)
              }}
              data-test-id={props.dataTestId}
              data-value={value}
            >
              {options.map((option, optionIndex) => (
                <Option
                  value={option.value === null ? 'null' : option.value}
                  key={optionIndex}
                  disabled={option.disabled}
                  label={option.label || option.name}
                  localeNamespace={props.localeNamespace}
                  isLabelTranslated={option.isLabelTranslated}
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
              menuShouldBlockScroll
              menuPlacement="auto"
              menuPortalTarget={props.menuPortalTarget || document.body}
              onChange={(option: InternalOption) => {
                props.onChange(option.value === 'null' ? null : option.value)
              }}
              openMenuOnFocus
              options={options.map(mapInternalOption)}
              placeholder={t('formFields.select.defaultLabel')}
              tabSelectsValue={false}
              value={options.find((option) => option.value === props.value)}
              styles={{
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
                      (state.isFocused && optionStyle[':hover']?.backgroundColor) ||
                      (state.isDisabled && !state.isFocused && 'transparent') ||
                      (state.isSelected && optionStyle[':active']?.backgroundColor) ||
                      optionStyle.backgroundColor ||
                      optionStyle.background ||
                      provided.backgroundColor,
                    color:
                      (state.isFocused && optionStyle[':hover']?.color) ||
                      (state.isSelected && optionStyle[':active']?.color) ||
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
                singleValue: (provided) => {
                  return { ...provided, ...valueStyle }
                },
                indicatorSeparator: () => ({ display: 'none' }),
              }}
            />
          </div>
        )}
      </Wrapper>
    </>
  )
}

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
