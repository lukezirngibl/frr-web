import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Option, Options } from '../html'
import { Language } from '../theme/language'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { replaceUmlaute } from '../utils/replaceUmlaute'
import { Icon } from './Icon'
import { Label, LabelProps } from './Label'

const Wrapper = styled.div``
const SelectWrapper = styled.select``

type Value = string | number | null


export type Props = {
  label?: LabelProps
  options: Options<Value> | ((lan: Language) => Options<Value>)
  onChange: (value: Value) => void
  style?: Partial<AppTheme['select']>
  priority?: Array<string | number>
  value: Value
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
  dataTestId?: string
  alphabetize?: boolean
}

export const Select = (props: Props) => {
  const { label } = props

  const theme = useAppTheme()

  const { t: translate, i18n } = useTranslation()

  const getInlineStyle = useInlineStyle(theme, 'select')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'select')(props.style)

  let options =
    typeof props.options === 'function'
      ? props.options(i18n.language)
      : props.options
  
  const parseOptions = (
    options: Array<{
      value: Value
      disabled?: boolean
      label?: string
      name?: string
    }>,
  ) =>
    props.alphabetize
      ? options
          .map((o) => ({
            ...o,
            name: o.label ? translate(o.label) : o.name,
            isLabelTranslated: true,
            label: `${o.label}`,
          }))
          .sort((a, b) =>
            replaceUmlaute(a.name.toLowerCase()) >
            replaceUmlaute(b.name.toLowerCase())
              ? 1
              : -1,
          )
      : options

  options = [
    ...parseOptions(
      props.value === null || props.value === undefined
        ? [
            {
              value: null,
              disabled: true,
              label: 'pleaseSelect',
            },
            {
              value: '---',
              disabled: true,
              label: '---',
            },
          ]
        : [],
    ),

    ...parseOptions(
      props.priority
        ? [...options.filter((option) => props.priority.includes(option.value))]
        : [],
    ),
    ...(props.priority
      ? [
          {
            value: '---',
            disabled: true,
            label: '---',
          },
        ]
      : []),
    ...parseOptions(
      props.priority
        ? options.filter((option) => !props.priority.includes(option.value))
        : options,
    ),
  ]

  return (
    <>
      {label && <Label {...label} />}
      <Wrapper {...getInlineStyle('wrapper')}>
        <SelectWrapper
          {...getInlineStyle(
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
              isLabelTranslated={option.isLabelTranslated}
            />
          ))}
        </SelectWrapper>
        <Icon icon="expand_more" size={16} {...getInlineStyle('icon')} />
      </Wrapper>
    </>
  )
}
