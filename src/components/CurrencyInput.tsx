import React from 'react'
import { getLanguageContext, getTranslation } from '../theme/language'
import { TranslationGeneric } from '../util'
import { TextInput, Props as TextInputProps } from './TextInput'

export type Props<TM> = {
  value: number
  onChange: (v: number) => void
  max: number
  min: number
  prefix: string
} & Omit<TextInputProps<TM>, 'onChange' | 'value'>

export const CurrencyInput = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const [internalValue, setInteralValue] = React.useState(props.value)

  React.useEffect(() => {
    if (Number(props.value) !== Number(internalValue)) {
      setInteralValue(props.value)
    }
  }, [props.value])

  const max = props.max || 9999999
  const min = props.min || 0

  const maxError = props.value > max
  const minError = props.value < min
  const hasError = maxError || minError
  return (
    <TextInput
      {...props}
      value={`${props.prefix} ${internalValue}`}
      onChange={v => {
        const s = v.slice(props.prefix.length, v.length)
        if (isNaN(Number(s))) {
          setInteralValue(0)
          props.onChange(0)
        } else {
          setInteralValue(Number(s))
          props.onChange(Number(s))
        }
      }}
      error={hasError}
      errorString={
        maxError
          ? `${translate('maxError')} ${props.prefix}${max}`
          : `${translate('minError')} ${props.prefix}${min}`
      }
    />
  )
}
