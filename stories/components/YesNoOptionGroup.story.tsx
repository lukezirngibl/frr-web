import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { YesNoOptionGroup } from '../../src/components/YesNoOptionGroup'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType, YesNoOptionGroupField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof YesNoOptionGroup> = {
  title: 'Components/Yes-No option group',
  component: YesNoOptionGroup,
}
export default meta

type FormData = { isMovedRecently: boolean | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const field: YesNoOptionGroupField<FormData> = {
  type: FormFieldType.YesNoOptionGroup,
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
