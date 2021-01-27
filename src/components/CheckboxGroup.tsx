import React from 'react'
import styled from 'styled-components'
import { Checkbox } from 'semantic-ui-react'
import { Label, LabelProps } from './Label'
import { TranslationGeneric } from '../util'
import { getLanguageContext, getTranslation } from '../theme/language'

const CheckboxGroupWapper = styled.div``

const CheckboxRow = styled.div`
  margin: 8px 0;
`

export type CheckboxGroupProps<T> = {
  onChange: (value: Array<string>) => void
  value: Array<string>
  error: boolean
  label?: LabelProps<T>
  options: Array<{ label: keyof T; value: string }>
}

export const CheckboxGroup = <TM extends TranslationGeneric>(
  props: CheckboxGroupProps<TM>,
) => {
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const onChange = (key: string) => (bool: boolean) => {
    const { value, onChange } = props
    if (onChange) {
      onChange(
        bool ? [...(value || []), key] : (value || []).filter(v => v !== key),
      )
    }
  }

  const isChecked = (key: string) => (props.value || []).includes(key)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <CheckboxGroupWapper>
        {props.options.map((o, k) => (
          <CheckboxRow key={k}>
            <Checkbox
              className={props.error ? 'error' : ''}
              label={translate(o.label)}
              checked={isChecked(o.value)}
              onChange={() => onChange(o.value)(!isChecked(o.value))}
            />
          </CheckboxRow>
        ))}
      </CheckboxGroupWapper>
    </>
  )
}
