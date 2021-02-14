import React from 'react'
import styled from 'styled-components'
import { Options } from '../util'
import { getTranslation, getLanguageContext, Language } from '../theme/language'
import { Label, LabelProps } from './Label'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { Icon } from './Icon'

const SelectWrapper = styled.select``

const Option = styled.option``

type Value = string | number | null

export type Props = {
  label?: LabelProps
  required?: boolean
  options: Options<Value> | ((lan: Language) => Options<Value>)
  onChange: (value: Value) => void
  style?: Partial<AppTheme['select']>
  value: Value
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
}

export const processOptions = (
  raw: Options<Value>,
  translate: (s: string) => string,
) =>
  raw.map(o => ({
    text:
      o.label !== undefined
        ? typeof o.label === 'string'
          ? translate(o.label)
          : `${o.label}`
        : o.name || 'Unknown',
    disabled: o.disabled,
    value: o.value,
  }))

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
    ...options,
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
        >
          {processOptions(options, translate).map((o, i) => (
            <Option
              value={o.value === null ? 'null' : o.value}
              key={i}
              disabled={o.disabled}
              style={getStyle('option')}
            >{`${o.text}`}</Option>
          ))}
        </SelectWrapper>
        <Icon icon="expand_more" size={16} style={getStyle('icon') as any} />
      </div>
    </>
  )
}
