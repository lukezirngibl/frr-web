import { createStory, meta } from '../storybook.helpers'
import { CodeInput, Props } from '../../src/components/CodeInput'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof CodeInput>({
  title: 'Components/CodeInput',
  component: CodeInput,
})

const story = createStory<Props, typeof CodeInput>(CodeInput)

export const Primary = story({
  value: 'Test',
  onChange: (value) => console.log(value),
  length: 4,
})
