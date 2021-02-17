import React from 'react'
import styled from 'styled-components'
import { Options, Language } from '../util'
import { getTranslation, getLanguageContext } from '../theme/language'
import { Label, LabelProps } from './Label'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { Icon } from './Icon'
import { Option } from '../html'

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
}

export const Select = (props: Props) => {
  const { label } = props

  const theme = React.useContext(getThemeContext())
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const getStyle = createGetStyle(theme, 'select')(props.style)

  let options =
    typeof props.options === 'function'
      ? props.options(language)
      : props.options

  options = [
    ...(props.value === null || props.value === undefined
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
      : []),

    ...(props.priority
      ? [
          ...options.filter(o => props.priority.includes(o.value)),
          {
            value: '---',
            disabled: true,
            label: '---',
          },
        ]
      : []),
    ...(props.priority
      ? options.filter(o => !props.priority.includes(o.value))
      : options),
  ]

  return (
    <>
      {label && <Label {...label} />}
      <div style={getStyle('wrapper')}>
        <SelectWrapper
          className={'select-wrapper'}
          style={{
            ...getStyle('select'),
            ...(props.error ? getStyle('errorWrapper') : {}),
          }}
          disabled={props.disabled || props.readOnly}
          value={props.value === null ? 'null' : props.value}
          onChange={e => {
            props.onChange(e.target.value === 'null' ? null : e.target.value)
          }}
          data-test-id={props.dataTestId}
        >
          {options.map((o, i) => (
            <Option
              value={o.value === null ? 'null' : o.value}
              key={i}
              disabled={o.disabled}
              style={getStyle('option')}
              label={o.label || o.name}
            />
          ))}
        </SelectWrapper>
        <Icon icon="expand_more" size={16} style={getStyle('icon') as any} />
      </div>
    </>
  )
}
