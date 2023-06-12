import { Meta } from '@storybook/react'
import React from 'react'
import { Select } from '../../src/components/Select'
import { FieldSectionWrapper } from '../../src/form/components/FieldSection'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType, NumberSelectField, TextSelectField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { StorybookTemplateProvider } from '../storybook.TemplateProvider'
import styled from 'styled-components'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
}
export default meta

type FormData = {
  letter: string | null
  numberOfChildren: number | null
  zip?: string | null
  city?: string | null
}
const formLens = makeFormLens<FormData>()
// const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)
const field = (props: FieldRowItemProps<FormData>) => <FieldRowItem {...props} />

const textSelectField = (props: SelectStoryProps): TextSelectField<FormData> => ({
  type: FormFieldType.TextSelect,
  lens: formLens(['letter']),
  label: { label: 'Buchstabe' },
  overwriteIsMobileTouch: !!props.isMobile,
  options: [
    {
      value: 'a',
      label: 'A',
      isLabelTranslated: true,
    },
    {
      value: 'b',
      label: 'B',
      isLabelTranslated: true,
    },
    {
      value: 'c',
      label: 'C',
      isLabelTranslated: true,
    },
  ],
})

const numberSelectField = (props: SelectStoryProps): NumberSelectField<FormData> => ({
  type: FormFieldType.NumberSelect,
  lens: formLens(['numberOfChildren']),
  label: { label: 'Anzahl Kinder' },
  overwriteIsMobileTouch: !!props.isMobile,
  options: [
    {
      value: 0,
      label: 'Keine',
      isLabelTranslated: true,
    },
    {
      value: 1,
      label: '1',
      isLabelTranslated: true,
    },
    {
      value: 2,
      label: '2',
      isLabelTranslated: true,
    },
  ],
})

type SelectStoryProps = {
  isMobile?: boolean
}

const SelectText = (props: SelectStoryProps) => {
  const [value, setValue] = React.useState(null)
  return field({
    field: textSelectField(props),
    fieldIndex: 0,
    formReadOnly: false,
    style: {},
    data: {
      letter: value,
      numberOfChildren: null,
    },
    onChange: (lens, value) => {
      alert(`ON CHANGE\nLetter value: ${value}`)
      setValue(value)
    },
    showValidation: false,
    autoFocus: false,
  })
}

const SelectTextWithValue = (props: SelectStoryProps) => {
  const [value, setValue] = React.useState('b')
  return field({
    field: textSelectField(props),
    fieldIndex: 0,
    formReadOnly: false,
    style: {},
    data: {
      letter: value,
      numberOfChildren: null,
    },
    onChange: (lens, value) => {
      alert(`ON CHANGE\nLetter value: ${value}`)
      setValue(value)
    },
    showValidation: false,
    autoFocus: false,
  })
}

const SelectReadonly = (props: SelectStoryProps) =>
  field({
    field: textSelectField(props),
    fieldIndex: 0,
    formReadOnly: true,
    style: {},
    data: {
      letter: 'b',
      numberOfChildren: null,
    },
    onChange: (lens, value) => {
      alert(`ON CHANGE\nLetter value: ${value}`)
    },
    showValidation: false,
    autoFocus: false,
  })

const SelectNumber = (props: SelectStoryProps) => {
  const [value, setValue] = React.useState(null)
  return field({
    field: numberSelectField(props),
    fieldIndex: 0,
    formReadOnly: false,
    style: {},
    data: {
      letter: null,
      numberOfChildren: value,
    },
    onChange: (lens, newValue) => {
      alert(`ON CHANGE\nNumber of children value: ${newValue}`)
      setValue(newValue)
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
        <li>
          <SelectTextWithValue {...props} />
        </li>
        <li>
          <SelectNumber {...props} />
        </li>
        <li>
          <SelectReadonly {...props} />
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
