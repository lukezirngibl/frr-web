import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { OptionGroup } from '../../src/components/OptionGroup'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import { FormFieldType, OptionGroupField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OptionGroup> = {
  title: 'Components/Option group',
  component: OptionGroup,
}
export default meta

type FormData = { duration: string | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const field: OptionGroupField<FormData> = {
  type: FormFieldType.OptionGroup,
  lens: formLens(['duration']),
  label: { label: 'Select monthly installments for the amount {{amount}}', labelData: { amount: 'CHF 1500.00' }, sublabel: '' },
  style: {
    wrapper: {
      flexWrap: 'wrap',
    },
    item: {
      width: '30%',
      maxWidth: '30%',
      height: 'auto',
      padding: '8px 0',
    },
  },
  options: [
    {
      label: 'paymentTerms.formFields.duration.options.monthlyInstallmentLabel',
      labelData: {
        duration: 6,
        loanAmount: 1500,
        monthlyInstallment: `CHF 250.00`,
      },
      value: 6,
    },
    {
      label: 'paymentTerms.formFields.duration.options.monthlyInstallmentLabel',
      labelData: {
        duration: 12,
        loanAmount: 1500,
        monthlyInstallment: `CHF 125.00`,
      },
      value: 12,
    },
    {
      label: 'paymentTerms.formFields.duration.options.monthlyInstallmentLabel',
      labelData: {
        duration: 24,
        loanAmount: 1500,
        monthlyInstallment: `CHF 62.50`,
      },
      value: 24,
    },
    {
      label: 'paymentTerms.formFields.duration.options.monthlyInstallmentLabel',
      labelData: {
        duration: 36,
        loanAmount: 1500,
        monthlyInstallment: `CHF 41.65`,
      },
      value: 36,
    },
    {
      label: 'paymentTerms.formFields.duration.options.monthlyInstallmentLabel',
      labelData: {
        duration: 48,
        loanAmount: 1500,
        monthlyInstallment: `CHF 31.30`,
      },
      value: 48,
    },
  ],
}

export const DurationOption = () => {
  const [value, setValue] = useState(null)

  return (
    <div style={{ maxWidth: 600, minHeight: 600 }} >
      {story({
        autoFocus: false,
        field,
        fieldIndex: 0,
        formReadOnly: false,
        style: {},
        data: {
          duration: value,
        },
        onChange: (lens, value) => {
          setValue(value)
        },
        showValidation: false,
      })}
    </div>
  )
}

