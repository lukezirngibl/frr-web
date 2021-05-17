import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Option, Options } from '../html'
import { Language } from '../theme/language'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { replaceUmlaute } from '../utils/replaceUmlaute'
import { Icon } from './Icon'
import { Label, LabelProps } from './Label'

const Wrapper = createStyled('div')
const SelectWrapper = createStyled('select')

type Value = string | number | null

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
  style?: Partial<AppTheme['select']>
  value: Value
}

export const Select = (props: Props) => {
  const { label } = props

  const theme = useAppTheme()

  const { t: translate, i18n } = useTranslation(props.localeNamespace)

  const getInlineStyle = useInlineStyle(theme, 'select')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'select')(props.style)

  let options = typeof props.options === 'function' ? props.options(i18n.language) : props.options

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

  options = [
    ...parseOptions(
      props.value === null || props.value === undefined
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
        : [],
    ),

    ...parseOptions(
      props.priority ? [...options.filter((option) => props.priority.includes(option.value))] : [],
    ),
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
      props.priority ? options.filter((option) => !props.priority.includes(option.value)) : options,
    ),
  ]

  return (
    <>
      {label && <Label {...label} />}
      <Wrapper {...getCSSStyles('wrapper')}>
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
              {...getCSSStyles('option')}
              label={option.label || option.name}
              localeNamespace={props.localeNamespace}
              isLabelTranslated={option.isLabelTranslated}
            />
          ))}
        </SelectWrapper>
        <Icon icon="expand_more" size={16} {...getInlineStyle('icon')} />
      </Wrapper>
    </>
  )
}
