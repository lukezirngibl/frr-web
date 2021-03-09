import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'
import { getLanguageContext } from '../theme/language'
import { Label, LabelProps } from './Label'

const CheckboxGroupWapper = styled.div``

const CheckboxRow = styled.div`
  margin: 8px 0;
`

export type CheckboxGroupProps = {
  onChange: (value: Array<string>) => void
  value: Array<string>
  error: boolean
  label?: LabelProps
  options: Array<{ label: string; value: string }>
}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const language = React.useContext(getLanguageContext())

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
              label={o.label}
              checked={isChecked(o.value)}
              onChange={() => onChange(o.value)(!isChecked(o.value))}
            />
          </CheckboxRow>
        ))}
      </CheckboxGroupWapper>
    </>
  )
}
