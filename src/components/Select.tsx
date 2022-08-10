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
import ReactSelect, { OptionProps } from 'react-select'
import { Options, OptionType } from '../html'

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
  onChange: (value: Value) => void
  options: Options<Value> | ((lan: Language) => Options<Value>)
  priority?: Array<string | number>
  readOnly?: boolean
  style?: Partial<ComponentTheme['select']>
  value: Value
}

export const Select = (props: Props) => {
  const { label } = props

  const theme = useComponentTheme()

  const { t: translate, i18n } = useTranslation(props.localeNamespace)

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
            label: option.isLabelTranslated ? option.label : translate(option.label),
          }))
          .sort((a, b) =>
            replaceUmlaute(a.label.toLowerCase()) > replaceUmlaute(b.label.toLowerCase()) ? 1 : -1,
          )
      : options

  const options: Array<InternalOption> = [
    ...(props.value === null || props.value === undefined
      ? [
          {
            value: null,
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
  ]
    .filter(Boolean)
    .map((option) => ({ ...option, isDisabled: option.disabled }))

  const getOptionLabel = (option: InternalOption) => {
    const label = option.label || option.name
    let optionLabel: string

    if (option.isLabelTranslated) {
      optionLabel = label
    } else {
      optionLabel = translate(label)
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
  const optionStyle = getInlineStyle('option').style as any

  return (
    <>
      {label && <Label {...label} />}
      <Wrapper {...getCSSStyles('wrapper')}>
        <ReactSelect
          styles={{
            control: () => {
              return {
                alignItems: 'center',
                boxShadow: undefined,
                boxSizing: 'border-box',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                label: 'control',
                minHeight: 38,
                outline: '0 !important',
                position: 'relative',
                transition: 'all 100ms',
                ...selectStyle,
              }
            },
            // menuPortal: (provided) => ({
            //   ...provided,
            //   zIndex: 999,
            // }),
            menu: (provided) => ({
              ...provided,
              boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)',
              zIndex: 999,
            }),
            option: (provided, state) => {
              const style = {
                ...provided,
                ...optionStyle,
                backgroundColor:
                  (state.isDisabled && 'transparent') ||
                  optionStyle.backgroundColor ||
                  optionStyle.background ||
                  provided.backgroundColor,
                '&:active':
                  (state.isDisabled && { backgroundColor: 'transparent' }) ||
                  optionStyle[':active'] ||
                  provided['&:active'],
              }
              return style
            },
            indicatorSeparator: () => ({ display: 'none' }),
          }}
          getOptionLabel={getOptionLabel}
          onChange={(option) => {
            props.onChange(option.value === 'null' ? null : option.value)
          }}
          menuPortalTarget={document.body}
          isDisabled={props.disabled || props.readOnly}
          openMenuOnFocus
          options={options}
          value={options.find((option) => option.value === props.value)}
          data-test-id={props.dataTestId}
        />
        {/* <SelectWrapper
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
              {...getCSSStyles('option')}
              label={option.label || option.name}
              localeNamespace={props.localeNamespace}
              isLabelTranslated={option.isLabelTranslated}
            />
          ))}
          </SelectWrapper>
        <Icon icon="expand_more" size={16} {...getInlineStyle('icon')} /> */}
      </Wrapper>
    </>
  )
}

const Wrapper = createStyled('div')
// const SelectWrapper = createStyled('select')
