import React from 'react'
import { OptionGroup, Props as OptionGroupProps } from './OptionGroup'
import { TranslationGeneric } from '../util'

export type Props<T> = {
  onChange: (v: boolean) => void
  value: boolean
} & Omit<OptionGroupProps<T>, 'value' | 'onChange' | 'options'>

export const YesNoToggle = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { value, onChange, ...otherProps } = props

  const options: Array<{ label: keyof TM; value: string }> = [
    {
      label: 'no' as keyof TM,
      value: 'false',
    },
    {
      label: 'yes' as keyof TM,
      value: 'true',
    },
  ]

  return (
    <OptionGroup<TM>
      {...otherProps}
      options={options}
      value={props.value ? 'true' : 'false'}
      onChange={v => {
        props.onChange(v === 'true' ? true : false)
      }}
    />
  )
}
