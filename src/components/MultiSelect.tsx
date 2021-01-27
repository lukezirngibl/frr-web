import React from 'react'
import { TranslationGeneric } from '../util'
import Select from 'react-select'

import { Label, LabelProps } from './Label'
import { getTranslation, getLanguageContext } from '../theme/language'

export type Props<TM> = {
  onChange: (value: Array<string>) => void
  value: Array<string>
  required?: boolean
  options: Array<{ label?: keyof TM; name?: string; value: string }>
  inputType?: string
  label?: LabelProps<TM>
  error?: boolean
}

export const MultiSelect = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  return (
    <>
      {props.label && <Label<TM> {...props.label} />}
      <Select
        value={props.options.filter(o => props.value.includes(o.value))}
        isMulti
        name="colors"
        options={props.options}
        getOptionLabel={o => (o.label ? translate(o.label) : o.name)}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={v => props.onChange((v || []).map(i => i.value))}
      />
    </>
  )
}
