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

type FormData = { amount: number | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const field: SliderField<FormData> = {
  type: FormFieldType.Slider,
  lens: formLens(['amount']),
  label: { label: 'Credit amount' },
  min: 6,
  max: 48,
  step: 1,
}

export const Initial = () => {
  const [value, setValue] = useState(null)

  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        field,
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data: {
          amount: value,
        },
        onChange: (lens, value) => {
          setValue(value)
        },
        showValidation: false,
      })}
    </div>
  )
}
