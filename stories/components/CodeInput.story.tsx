import { Meta } from '@storybook/react'
import React from 'react'
import { CodeInput, Props } from '../../src/components/CodeInput'
import { createStory } from '../storybook.helpers'
import { StorybookTemplateProvider } from '../storybook.TemplateProvider'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof CodeInput> = {
  title: 'Components/Code input',
  component: CodeInput,
}
export default meta

const story = createStory<Props, typeof CodeInput>(CodeInput)

const props = {
  isAutoFocus: false,
  value: 'Test',
  onChange: (value) => console.log(value),
  length: 4,
}

export const Primary = () => (
  <StorybookTemplateProvider>
    <CodeInput {...props} />
  </StorybookTemplateProvider>
)
