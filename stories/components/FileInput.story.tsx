import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { SingleFileInput } from '../../src/components/fileUpload/SingleFileInput'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SingleFileInput> = {
  title: 'File Upload/Single file input',
  component: SingleFileInput,
}
export default meta

type FormData = { file: File | null }
type Story = StoryObj<typeof SingleFileInput>

const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const formLens = makeFormLens<FormData>()

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const SingleFileInputStory: Story = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      {story({
        autoFocus: false,
        field: {
          type: FormFieldType.FileInput,
          lens: formLens(['file']),
          label: { label: 'Invoice' },
        },
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data: {
          file: null,
        },
        onChange: (lens, value) => {
          alert(`ON CHANGE\File changed: ${value}`)
        },
        showValidation: false,
      })}
    </div>
  ),
}

SingleFileInputStory.name = 'Single file input'
