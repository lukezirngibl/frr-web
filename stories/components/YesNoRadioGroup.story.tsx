import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { YesNoRadioGroup } from '../../src/components/YesNoRadioGroup'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType, YesNoRadioGroupField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YesNoRadioGroup> = {
  title: 'Components/Yes-No radio group',
  component: YesNoRadioGroup,
}
export default meta

type FormData = { isMovedRecently: boolean | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const field: YesNoRadioGroupField<FormData> = {
  type: FormFieldType.YesNoRadioGroup,
  lens: formLens(['isMovedRecently']),
  label: { label: 'Did you move recently?' },
}

export const Initial = () => {
  const [value, setValue] = useState(null)

  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        autoFocus: false,
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
