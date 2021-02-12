import React from 'react'
import styled from 'styled-components'
import { TranslationGeneric } from '../util'
import { getTranslation, getLanguageContext, Language } from '../theme/language'
import { Label, LabelProps } from './Label'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { Icon } from './Icon'

const SelectWrapper = styled.select``

const Option = styled.option``

type Options<T> = Array<{
  label?: keyof T
  name?: string
  value: string | null
}>

export type Props<T> = {
  label?: LabelProps<T>
  required?: boolean
  options: Options<T> | ((lan: Language) => Options<T>)
  onChange: (value: string) => void
  style?: Partial<AppTheme['select']>
  value: string | null
  disabled?: boolean
  readOnly?: boolean
  error?: boolean
}

export const processOptions = <TM extends TranslationGeneric>(
  raw: Array<{ label?: keyof TM; name?: string; value: string | number }>,
  translate: (s: string) => string,
) =>
  raw.map(o => ({
    text:
      o.label !== undefined
        ? typeof o.label === 'string'
          ? translate(o.label)
          : `${o.label}`
        : o.name || 'Unknown',
    value: o.value,
  }))

export const Select = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const { label } = props

  const theme = React.useContext(getThemeContext())
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const getStyle = createGetStyle(theme, 'select')(props.style)

  const options = processOptions(
    typeof props.options === 'function'
      ? props.options(language)
      : props.options,
    translate,
  )

  return (
    <>
      {label && <Label<TM> {...label} />}
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
          {options.map((o, i) => (
            <Option
              value={o.value === null ? 'null' : o.value}
              key={i}
              style={getStyle('option')}
            >{`${o.text}`}</Option>
          ))}
        </SelectWrapper>
        <Icon icon="expand_more" size={16} style={getStyle('icon') as any} />
      </div>
    </>
  )
}
