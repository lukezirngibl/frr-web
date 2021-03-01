import React from 'react'
import { OptionGroup, Props as OptionGroupProps } from './OptionGroup'

export type Props = {
  onChange: (v: boolean) => void
  value: boolean | null
} & Omit<OptionGroupProps, 'value' | 'onChange' | 'options'>

export const YesNoOptionGroup = (props: Props) => {
  const { value, onChange, ...otherProps } = props

  const options: Array<{ label: string; value: string }> = [
    {
      label: 'no',
      value: 'false',
    },
    {
      label: 'yes',
      value: 'true',
    },
  ]

  return (
    <OptionGroup
      {...otherProps}
      options={options}
      value={props.value ? 'true' : 'false'}
      onChange={v => {
        props.onChange(v === 'true' ? true : false)
      }}
    />
  )
}
