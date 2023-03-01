import React from 'react'
import { CodeInput, Props } from '../../src/components/CodeInput'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/CodeInput',
  component: CodeInput,
}

export const Primary = () => (
  <CodeInput isAutoFocus={false} value={'Test'} onChange={(value) => console.log(value)} length={4} />
)
 