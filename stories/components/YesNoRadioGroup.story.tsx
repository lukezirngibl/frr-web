import { YesNoRadioGroup, Props } from '../../src/components/YesNoRadioGroup'
import { createStory, meta } from '../storybook.helpers'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import React, { useState } from 'react'
import { makeFormLens } from '../../src/form/util'
import { FormFieldType, SingleFormField } from '../../src/form/components/types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof YesNoRadioGroup>({
  title: 'Components/YesNoRadioGroup',
  component: YesNoRadioGroup,
})

type FormData = { isMovedRecently: boolean | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const field: SingleFormField<FormData> = {
  type: FormFieldType.YesNoRadioGroup,
  lens: formLens(['isMovedRecently']),
  label: { label: 'Did you move recently?' },
} as any

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
          isMovedRecently: value,
        },
        onChange: (lens, value) => {
          setValue(value)
        },
        showValidation: false,
      })}
    </div>
  )
}
