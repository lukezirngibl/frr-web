import { Slider, Props } from '../../src/components/Slider'
import { createStory, meta } from '../storybook.helpers'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import React, { useState } from 'react'
import { makeFormLens } from '../../src/form/util'
import { FormFieldType, SingleFormField, SliderField } from '../../src/form/components/types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof Slider>({
  title: 'Components/Slider',
  component: Slider,
})

type FormData = { amount: number | null, months: number | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const amountField: SliderField<FormData> = {
  type: FormFieldType.Slider,
  lens: formLens(['amount']),
  label: { label: 'Finanzierungsbetrag' },
  min: 500,
  max: 10000,
  step: 500,
  isCurrency: true,
}

export const AmoutSlider = () => {
  const [value, setValue] = useState(null)

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 48 }}>
      <ul style={{ listStyle: 'none' }}>
        <li>
          {story({
            field: amountField,
            fieldIndex: 0,
            formReadOnly: false,
            style: {},
            data: {
              amount: value,
              months: null,
            },
            onChange: (lens, value) => {
              setValue(value)
            },
            showValidation: false,
          })}
        </li>
        <li>
          {story({
            field: { ...amountField, isEditable: true },
            fieldIndex: 0,
            formReadOnly: false,
            style: {},
            data: {
              amount: value,
              months: null,
            },
            onChange: (lens, value) => {
              setValue(value)
            },
            showValidation: false,
          })}
        </li>
      </ul>
    </div>
  )
}

const monthField: SliderField<FormData> = {
  type: FormFieldType.Slider,
  lens: formLens(['months']),
  label: { label: 'Laufzeit' },
  min: 6,
  max: 48,
  step: 1,
  postfix: 'months',
  defaultValue: 12,
}


export const MonthsSlider = () => {
  const [value, setValue] = useState(null)

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 48 }}>
      <ul style={{ listStyle: 'none' }}>
        <li>
          {story({
            field: monthField,
            fieldIndex: 0,
            formReadOnly: false,
            style: {},
            data: {
              amount: null,
              months: value,
            },
            onChange: (lens, value) => {
              setValue(value)
            },
            showValidation: false,
          })}
        </li>
        <li>
          {story({
            field: { ...monthField, isEditable: true },
            fieldIndex: 0,
            formReadOnly: false,
            style: {},
            data: {
              amount: null,
              months: value,
            },
            onChange: (lens, value) => {
              setValue(value)
            },
            showValidation: false,
          })}
        </li>
      </ul>
    </div>
  )
}