import { Meta } from '@storybook/react'
import React from 'react'
import { CodeInput } from '../../src/components/CodeInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CodeInput> = {
  title: 'Components/Code input',
  component: CodeInput,
}
export default meta

const props = {
  isAutoFocus: false,
  value: 'Test',
  onChange: (value) => console.log(value),
  length: 4,
}

export const Primary = () => (
    <CodeInput {...props} />
)
