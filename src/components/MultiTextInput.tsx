import React from 'react'
import { Label, LabelProps } from './Label'
import { Props as TextInputProps, TextInput } from './TextInput'

export type Props = {
  inputFields: Array<TextInputProps>
  label?: LabelProps
}

export const MultiTextInput = (props: Props) => {
  const { inputFields, label, ...otherProps } = props
  return (
    <>
      {label && <Label {...label} />}
      {inputFields.map((field, fieldIndex) => (
        <TextInput key={`field-${fieldIndex}}`} {...field} {...otherProps} />
      ))}
    </>
  )
}
