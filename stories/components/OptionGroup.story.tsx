import { Meta } from '@storybook/react'
import React, { useState } from 'react'
import { OptionGroup } from '../../src/components/OptionGroup'
import { FieldRow, FieldRowProps } from '../../src/form/components/FieldRow'
import { FormFieldType, OptionGroupField } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { H2, P } from '../../src/html'
import { createStory } from '../storybook.helpers'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof OptionGroup> = {
  title: 'Components/Option group',
  component: OptionGroup,
}
export default meta

type FormData = { duration: string | null }
const formLens = makeFormLens<FormData>()
const story = createStory<FieldRowProps<FormData>, typeof FieldRow>(FieldRow)

const Formatter = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
})

const CustomOptionItem = (props: { onSelect: () => void; value: number; computedRate: number }) => {
  return (
    <div
      style={{ display: 'flex', padding: '24px 32px', alignItems: 'baseline', gap: 8, width: '100%' }}
    >
      <H2 style={{ flex: 0, fontWeight: 600, marginBottom: 0 }}>{props.value}</H2>
      <P style={{ flex: 1 }} label={'paymentTerms.formFields.duration.options.monthsLabel'} />

      <P
        style={{ flex: 0, fontSize: 14, opacity: 0.7 }}
        label={Formatter.format(props.computedRate)}
        isLabelTranslated
      />
    </div>
  )
}

export const durationField: OptionGroupField<FormData> = {
  type: FormFieldType.OptionGroup,
  lens: formLens(['duration']),
  label: {
    label: 'Select monthly installments for the amount {{amount}}',
    labelData: { amount: 'CHF 1500.00' },
    sublabel: '',
  },
  style: {
    wrapper: {
      display: 'flex',
      gap: 16,
      flexDirection: 'column',
      width: '100%',
    },
    item: {
      width: '100%',
      height: 'auto',
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
  ].map((option) => ({
    ...option,
    CustomElement: (
      <CustomOptionItem
        value={option.value}
        computedRate={option.value * 0.1}
        onSelect={() => alert(`SELECTED DURATION: ${option.value}`)}
      />
    ),
  })),
}

export const DurationOption = () => {
  const [value, setValue] = useState(null)

  return (
    <div style={{ maxWidth: 600, minHeight: 600, padding: '0 32px' }}>
      {story({
        autoFocus: false,
        field: [durationField],
        fieldIndex: 0,
        formReadOnly: false,
        data: {
          duration: value,
        },
        onChange: (lens, value) => {
          setValue(value)
        },
        showValidation: false,
        style: {
          row: {
            item: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 16,
            },
            wrapper: {},
            wrapperReadOnly: {},
          },
        },
      })}
    </div>
  )
}
