import React, { Component } from 'react'
import { StrictInputProps } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

import 'react-day-picker/lib/style.css'
import { LabelProps, Label } from './Label'
import { TranslationGeneric } from '../util'

export type Props<T> = {
  onChange: (value: Date) => void
  value?: Date
  required?: boolean
  error?: boolean
  label: LabelProps<T>
}

export const DatePicker = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const [day, setDay] = React.useState(props.value)
  return (
    <>
      {props.label && <Label<TM> {...props.label} />}
      <div>
        {day && <p>Day: {day}</p>}
        <DayPickerInput onDayChange={setDay} />;
      </div>
    </>
  )
}
