import React from 'react'
import { P } from '../html'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

export type Props = {
  value: string
  transform?: (v: string) => string
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  data?: { [k: string]: string }
}

export const Text = (props: Props) => {
  return (
    <>
      {props.label && <Label {...props.label}></Label>}
      <P
        label={props.transform ? props.transform(props.value) : props.value}
        localeNamespace={props.localeNamespace}
        data={props.data}
      />
    </>
  )
}
