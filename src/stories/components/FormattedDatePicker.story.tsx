import { FormattedDatePicker, Props } from '../../components/FormattedDatePicker'
import { createStory, meta } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta({
  title: 'Components/FormattedDatePicker',
  component: FormattedDatePicker,
})

const story = createStory<Props, typeof FormattedDatePicker>(FormattedDatePicker)

export const Initial = story({
  dateFormat: 'YYYY-MM-DD',
  error: false,
  hasFocus: false,
  label: { label: 'Geburtsdatum' },
  onChange: (value: string) => alert(`ON CHANGE\nDate value: ${value}`),
  onBlur: (value: string) => alert(`ON BLUR\n\nDate value: ${value}`),
  value: null,
})
