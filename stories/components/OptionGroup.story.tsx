import { OptionGroup, Props } from '../../src/components/OptionGroup'
import { createStory, meta } from '../storybook.helpers'
import { FieldRowItem, Props as FieldRowItemProps } from '../../src/form/components/FieldRowItem'
import React, { useState } from 'react'
import { makeFormLens } from '../../src/form/util'
import { FormFieldType, OptionGroupField } from '../../src/form/components/types'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default meta<Props, typeof OptionGroup>({
  title: 'Components/OptionGroup',
  component: OptionGroup,
})

type FormData = { duration: string | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowItemProps<FormData>, typeof FieldRowItem>(FieldRowItem)

const field: OptionGroupField<FormData> = {
  type: FormFieldType.OptionGroup,
  lens: formLens(['duration']),
  label: { label: 'Monthly installments', sublabel: '' },
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

export const Duration = () => {
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

