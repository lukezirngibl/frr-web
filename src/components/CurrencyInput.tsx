import React from 'react'
import { TextNumberInput, Props as TextNumberProps } from './TextNumberInput'

export type Props = {
  error?: boolean
} & TextNumberProps

export const CurrencyInput = (props: Props) => {
  return <TextNumberInput min={props.min || 0} max={props.max || 10000000}  {...props} />
}
