import React from 'react'
import Select from 'react-select'
import { Options } from '../html'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

export type Props = {
  onChange: (value: Array<string>) => void
  value: Array<string>
  options: Options<string>
  inputType?: string
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  error?: boolean
}

export const MultiSelect = (props: Props) => {
  return (
    <>
      {props.label && (
        <Label localeNamespace={props.localeNamespace} {...props.label} />
      )}
      <Select
        className="basic-multi-select"
        classNamePrefix="select"
        getOptionLabel={(o) => (o.label ? o.label : o.name)}
        isMulti
        localeNamespace={props.localeNamespace}
        name="colors"
        onChange={(v) => props.onChange((v || []).map((i) => i.value))}
        options={props.options}
        value={props.options.filter((o) => props.value.includes(o.value))}
      />
    </>
  )
}
