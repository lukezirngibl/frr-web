import React from 'react'
import { useTranslation } from 'react-i18next'
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
import ReactSelect from 'react-select'
import { Options, Option } from '../html'
import { useMobileTouch } from '../hooks/useMobileTouch'

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
  selectParentElement?: string
  onChange: (value: Value) => void
  options: Options<Value> | ((lan: Language) => Options<Value>)
  priority?: Array<string | number>
  readOnly?: boolean
  style?: Partial<ComponentTheme['select']>
  value: Value
}

const mapInternalOption = (option) => ({ ...option, isDisabled: option.disabled })

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
    ...(props.value === null || props.value === undefined
      ? [
          {
            value: isMobileTouch ? null : 'default',
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
  const optionStyle = getInlineStyle('option').style as any
  const valueStyle = getInlineStyle('value').style as any
  const valueContainerStyle = getInlineStyle('valueContainer').style as any

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
              value={props.value === null ? 'null' : props.value}
              onChange={(e) => {
                props.onChange(e.target.value === 'null' ? null : e.target.value)
              }}
              data-test-id={props.dataTestId}
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
          <ReactSelect
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
                  ...optionStyle,
                  backgroundColor:
                    (state.isDisabled && !state.isFocused && 'transparent') ||
                    optionStyle.backgroundColor ||
                    optionStyle.background ||
                    provided.backgroundColor,
                }
                return style
              },
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
            getOptionLabel={getOptionLabel}
            onChange={(option) => {
              props.onChange(option.value === 'null' ? null : option.value)
            }}
            isDisabled={props.disabled || props.readOnly}
            menuPortalTarget={props.menuPortalTarget || document.body}
            onMenuOpen={() => {
              document.getElementById(props.selectParentElement || 'root').style['pointer-events'] = 'none'
            }}
            onMenuClose={() => {
              document.getElementById(props.selectParentElement || 'root').style['pointer-events'] = 'all'
            }}
            openMenuOnFocus
            options={options.map(mapInternalOption)}
            placeholder={t('formFields.select.defaultLabel')}
            value={options.find((option) => option.value === props.value)}
            data-test-id={props.dataTestId}
          />
        )}
      </Wrapper>
    </>
  )
}

const Wrapper = createStyled('div')
const SelectWrapper = createStyled('select')
