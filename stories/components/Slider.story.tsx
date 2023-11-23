import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Slider } from '../../src/components/Slider'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FieldSectionWrapper } from '../../src/form/components/FieldSection'
import { FormFieldType, SliderField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
}
export default meta

type FormData = { amount: number | null; months: number | null }
const formLens = makeFormLens<FormData>()

const amountField: SliderField<FormData> = {
  type: FormFieldType.Slider,
  lens: formLens(['amount']),
  label: { label: 'Finanzierungsbetrag' },
  min: 500,
  max: 10000,
  step: 500,
  isCurrency: true,
}

export const AmoutSlider = () => {
  const [value1, setValue1] = useState(null)
  const [value2, setValue2] = useState(null)

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 48 }}>
      <FieldSectionWrapper>
        <List>
          <li>
            {field({
              field: amountField,
              fieldIndex: 0,
              formReadOnly: false,
              style: {},
              data: {
                amount: value1,
                months: null,
              },
              onChange: (_lens, value) => {
                setValue1(value)
              },
              autoFocus: false,
              showValidation: false,
            })}
          </li>
          <li>
            {field({
              field: {
                ...amountField,
                isEditable: true,
                onChangeInputType: (inputType) => console.log(`NEW INPUT TPYE DETECTED "${inputType}"`),
                size: 'small',
              },
              fieldIndex: 0,
              formReadOnly: false,
              style: {},
              data: {
                amount: value2,
                months: null,
              },
              onChange: (_lens, value) => {
                setValue2(value)
              },
              autoFocus: false,
              showValidation: false,
            })}
          </li>
        </List>
      </FieldSectionWrapper>
    </div>
  )
}

const monthField: SliderField<FormData> = {
  type: FormFieldType.Slider,
  lens: formLens(['months']),
  label: { label: 'Laufzeit' },
  min: 6,
  max: 48,
  step: 1,
  marks: [
    { label: '6 Mth', value: 6 },
    { label: '12 Mth', value: 12 },
    { label: '24 Mth', value: 24 },
    { label: '48 Mth', value: 48 },
  ],
  postfix: 'months',
  defaultValue: 12,
}

const field = (fieldProps: FieldRowItemProps<FormData>) => FieldRowItem<FormData>(fieldProps)

export const MonthsSlider = () => {
  const [value1, setValue1] = useState(null)
  const [value2, setValue2] = useState(null)

  return (
    <div style={{ maxWidth: 600, minHeight: 1200, paddingTop: 48 }}>
      <FieldSectionWrapper>
        <List>
          <li>
            {field({
              field: monthField,
              fieldIndex: 0,
              formReadOnly: false,
              style: {},
              data: {
                amount: null,
                months: value1,
              },
              onChange: (_lens, value) => {
                setValue1(value)
              },
              autoFocus: false,
              showValidation: false,
            })}
          </li>
          <li>
            {field({
              field: {
                ...monthField,
                isEditable: true,
                onChangeInputType: (inputType) => console.log(`NEW INPUT TPYE DETECTED "${inputType}"`),
                size: 'small',
              },
              fieldIndex: 0,
              formReadOnly: false,
              style: {},
              data: {
                amount: null,
                months: value2,
              },
              onChange: (_lens, value) => {
                setValue2(value)
              },
              autoFocus: false,
              showValidation: false,
            })}
          </li>
        </List>
      </FieldSectionWrapper>
    </div>
  )
}

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
