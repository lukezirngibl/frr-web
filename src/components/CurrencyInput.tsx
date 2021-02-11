import React from 'react'
import { TranslationGeneric } from '../util'
import { TextNumberInput, Props as TextNumberProps } from './TextNumberInput'

export type Props<TM> = {
  error?: boolean
} & TextNumberProps<TM>

export const CurrencyInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  return <TextNumberInput {...props} />
}
