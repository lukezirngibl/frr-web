import { Meta } from '@storybook/react'
import React from 'react'
import { Select } from '../../src/components/Select'
import { FieldSectionWrapper } from '../../src/form/components/FieldSection'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import {
  FormFieldType,
  MultiSelectField,
  NumberMultiSelectField,
  NumberSelectField,
  TextSelectField,
} from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { StorybookTemplateProvider } from '../storybook.TemplateProvider'
import styled from 'styled-components'
import { MultiSelect } from '../../src/components/MultiSelect'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MultiSelect> = {
  title: 'Components/NumberMultiSelect',
  component: MultiSelect,
}
export default meta

type FormData = {
  numbers: number[]
}
const formLens = makeFormLens<FormData>()
// const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)
const field = (props: FieldRowItemProps<FormData>) => <FieldRowItem {...props} />

const textSelectField = (props: SelectStoryProps): NumberMultiSelectField<FormData> => ({
  type: FormFieldType.NumberMultiSelect,
  lens: formLens(['numbers']),
  label: { label: 'Numbers' },
  isMatchAny: props.isMatchAny,
  overwriteIsMobileTouch: !!props.isMobile,
  options: [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
  ],
})

type SelectStoryProps = {
  isMobile?: boolean
  isMatchAny?: boolean
}

const SelectText = (props: SelectStoryProps) => {
  const [value, setValue] = React.useState([])
  return field({
    field: textSelectField(props),
    fieldIndex: 0,
    formReadOnly: false,
    style: {},
    data: { numbers: value },
    onChange: (lens, value) => {
      setValue(value)
    },
    showValidation: false,
    autoFocus: false,
  })
}

const SelectOverview = (props: { isMobile?: boolean }) => (
  <div style={{ maxWidth: props.isMobile ? 480 : 720, minHeight: 600 }}>
    <FieldSectionWrapper>
      <List>
        <li className="mb-small">
          <SelectText {...props} />
        </li>
      </List>
    </FieldSectionWrapper>
  </div>
)

export const SelectOverviewDesktop = () => (
  <StorybookTemplateProvider>
    <SelectOverview />
  </StorybookTemplateProvider>
)
SelectOverviewDesktop.storyName = 'Overview (Desktop)'

export const SelectOverviewMobile = () => (
  <StorybookTemplateProvider>
    <SelectOverview isMobile />
  </StorybookTemplateProvider>
)
SelectOverviewMobile.storyName = 'Overview (Mobile)'

const List = styled.ul`
  list-style: none;
  padding: 0;

  > li {
    margin-bottom: 64px;

    &.mb-small {
      margin-bottom: 32px;
    }
  }
`
