import React from 'react'
import styled from 'styled-components'
import { TranslationGeneric } from '../util'
import { getTranslation, getLanguageContext, Language } from '../theme/language'
import { Label } from './Label'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'

const SelectWrapper = styled.select``

const Option = styled.option``

type Options<T> = Array<{ label?: keyof T; name?: string; value: string }>

export type Props<T> = {
  label?: keyof T
  required?: boolean
  options: Options<T> | ((lan: Language) => Options<T>)
  onChange: (value: string) => void
  style?: Partial<AppTheme['dropdown']>
  value: string
  disabled?: boolean
  readOnly?: boolean
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
  const { label, disabled, readOnly } = props

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
      {label && <Label<TM> label={label} />}
      <SelectWrapper
        className={'select-wrapper'}
        style={getStyle('wrapper')}
        disabled={props.disabled || props.readOnly}
        onChange={e => {
          props.onChange(e.target.value)
        }}
      >
        {options.map(o => (
          <Option
            value={o.value}
            key={o.value}
            style={getStyle('option')}
          >{`${o.text}`}</Option>
        ))}
      </SelectWrapper>
    </>
  )
}
