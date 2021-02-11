import React from 'react'
import { CommonTM } from '../translations'
import { OptionGroup, Props as OptionGroupProps } from './OptionGroup'

export type Props = {
  onChange: (v: boolean) => void
  value: boolean
} & Omit<OptionGroupProps<CommonTM>, 'value' | 'onChange' | 'options'>

export const YesNoToggle = (props: Props) => {
  const { value, onChange, ...otherProps } = props

  const options: Array<{ label: keyof CommonTM; value: string }> = [
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
    <OptionGroup<CommonTM>
      {...otherProps}
      options={options}
      value={props.value ? 'true' : 'false'}
      onChange={v => {
        props.onChange(v === 'true' ? true : false)
      }}
    />
  )
}
