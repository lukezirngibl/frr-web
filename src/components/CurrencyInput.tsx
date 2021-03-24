import React from 'react'
import { TextNumberInput, Props as TextNumberProps } from './TextNumberInput'

export type Props = {
  error?: boolean
} & TextNumberProps

const parseAmount = (value: any): string =>
  isNaN(value)
    ? ''
    : Number(value)
        .toFixed(2)
        .replace(/\.0{2}$/, '')

export const CurrencyInput = (props: Props) => {
  return <TextNumberInput {...props} parseValue={parseAmount} />
}
