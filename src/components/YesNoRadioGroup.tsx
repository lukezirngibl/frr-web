import React from 'react'
import { RadioGroup, Props as RadioGroupProps } from './RadioGroup'

export type Props = {
  onChange: (v: boolean) => void
  value: boolean
} & Omit<RadioGroupProps, 'value' | 'onChange' | 'options'>

export const YesNoRadioGroup = (props: Props) => {
  const { value, onChange, ...otherProps } = props

  const options: Array<{ label: string; value: string }> = [
    {
      label: 'yes',
      value: 'true',
    },
    {
      label: 'no',
      value: 'false',
    },
  ]

  return (
    <RadioGroup
      {...otherProps}
      options={options}
      value={props.value ? 'true' : 'false'}
      onChange={v => {
        props.onChange(v === 'true' ? true : false)
      }}
    />
  )
}
