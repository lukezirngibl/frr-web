import React from 'react'
import { Label, LabelProps } from './Label'
import { P } from '../html'

export type Props = {
  value: string
  transform?: (v: string) => string
  label?: LabelProps
  data?: { [k: string]: string }
}

export const Text = (props: Props) => {
  return (
    <>
      {props.label && <Label {...props.label}></Label>}
      <P
        label={props.transform ? props.transform(props.value) : props.value}
        data={props.data}
      />
    </>
  )
}
