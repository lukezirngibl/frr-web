import React from 'react'
import { Options } from '../util'
import Select from 'react-select'
import { Label, LabelProps } from './Label'
import { useLanguage, useTranslate } from '../theme/language'

export type Props = {
  onChange: (value: Array<string>) => void
  value: Array<string>
  options: Options<string>
  inputType?: string
  label?: LabelProps
  error?: boolean
}

export const MultiSelect = (props: Props) => {
  const language = useLanguage()
  const translate = useTranslate(language)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Select
        value={props.options.filter((o) => props.value.includes(o.value))}
        isMulti
        name="colors"
        options={props.options}
        getOptionLabel={(o) => (o.label ? o.label : o.name)}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(v) => props.onChange((v || []).map((i) => i.value))}
      />
    </>
  )
}
