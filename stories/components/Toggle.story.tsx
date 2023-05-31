import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { Toggle } from '../../src/components/Toggle'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType, ToggleField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
}
export default meta

type FormData = { isPrivacyPolicyAccepted: boolean | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const field: ToggleField<FormData> = {
  type: FormFieldType.Toggle,
  lens: formLens(['isPrivacyPolicyAccepted']),
  label: { label: 'Accept privacy policy' },
}

export const Initial = () => {
  const [value, setValue] = useState(false)

  return (
    <div style={{ maxWidth: 600, minHeight: 600 }}>
      {story({
        autoFocus: false,
        field,
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data: {
          isPrivacyPolicyAccepted: value,
        },
        onChange: (lens, value) => {
          setValue(value)
        },
        showValidation: false,
      })}
    </div>
  )
}

// export const Checked = () => (
//   <div style={{ maxWidth: 600, minHeight: 600 }} id="select-container">
//     {story({
//       field,
//       fieldIndex: 0,
//       formReadOnly: false,
//       style: {},
//       data: {
//         isPrivacyPolicyAccepted: true,
//       },
//       onChange: (lens, value) => {
//         alert(`ON CHANGE\nValue: ${value}`)
//       },
//       showValidation: false,
//     })}
//   </div>
// )
