import { Meta } from '@storybook/react'
import React from 'react'
import { Select } from '../../src/components/Select'
import { FieldSectionWrapper } from '../../src/form/components/FieldSection'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import {
  FormFieldType,
  MultiSelectField,
  NumberSelectField,
  TextSelectField,
} from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { StorybookTemplateProvider } from '../storybook.TemplateProvider'
import styled from 'styled-components'
import { MultiSelect } from '../../src/components/MultiSelect'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
}
export default meta

type FormData = {
  animals: string[]
}
const formLens = makeFormLens<FormData>()
// const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)
const field = (props: FieldRowItemProps<FormData>) => <FieldRowItem {...props} />

const textSelectField = (props: SelectStoryProps): MultiSelectField<FormData> => ({
  type: FormFieldType.MultiSelect,
  lens: formLens(['animals']),
  label: { label: 'Animals' },
  isMatchAny: props.isMatchAny,
  overwriteIsMobileTouch: !!props.isMobile,
  options: [
    {
      value: 'cat',
      label: 'Cat',
      isLabelTranslated: true,
    },
    {
      value: 'elephant',
      label: 'Elephant',
      isLabelTranslated: true,
    },
    {
      value: 'tiger',
      label: 'Tiger',
      isLabelTranslated: true,
    },
    {
      value: 'teddybear',
      label: 'Teddy Bear',
      isLabelTranslated: true,
    },
  ],
})

type SelectStoryProps = {
  isMobile?: boolean
  isMatchAny?: boolean
}

const SelectText = (props: SelectStoryProps) => {
  const [value, setValue] = React.useState({ animals: [] })
  return field({
    field: textSelectField(props),
    fieldIndex: 0,
    formReadOnly: false,
    style: {},
    data: value,
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
        <li className="mb-small">
          <SelectText {...props} isMatchAny />
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
