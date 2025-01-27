import { Meta } from '@storybook/react'
import React from 'react'
import { FieldSection } from '../../src/form/components/FieldSection'
import { Form } from '../../src/form/components/Form'
import { DescriptionType, FormField, FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FieldSection> = {
  title: 'Form/Section',
  component: FieldSection,
}
export default meta

type FormData = {
  loanAmount: number
  interestRateAmount: number
  monthlyRate: number
  duration: number
  shippingAddress: string
  acceptDataPrivacyAndAGB: boolean | null
}

const mkFormStateLens = makeFormLens<FormData>()

const Formatter = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF',
})

const summaryFields: Array<FormField<FormData>> = [
  {
    type: FormFieldType.FormSection,
    title: 'customerPlanSummary.title',
    introduction: 'customerPlanSummary.introduction',
    description: 'customerPlanSummary.descriptionSuccess',
    descriptionType: DescriptionType.Success,
    fields: [
      {
        label: {
          label: 'customerPlanSummary.formFields.loanAmount.label',
          errorButton: {
            errorLabel: 'formFields.error.invalidMaxAmount',
            onClick: () => {
              console.log('error button clicked')
            },
            label: 'Correct loan amount',
          },
        },
        type: FormFieldType.CurrencyInput,
        lens: mkFormStateLens(['loanAmount']),
        min: 1000,
        max: 10000,
      },
      {
        label: {
          label: 'customerPlanSummary.formFields.interestRateAmount.label',
        },
        type: FormFieldType.CurrencyInput,
        lens: mkFormStateLens(['interestRateAmount']),
      },
    ],
  },
  {
    type: FormFieldType.FormSection,
    style: { rowItem: { background: 'rgba(0,0,0,0.12)' } },
    fields: [
      {
        label: { label: 'customerPlanSummary.formFields.monthlyRate.label' },
        type: FormFieldType.CurrencyInput,
        lens: mkFormStateLens(['monthlyRate']),
      },
      {
        label: { label: 'customerPlanSummary.formFields.duration.label' },
        type: FormFieldType.NumberInput,
        lens: mkFormStateLens(['duration']),
      },
    ],
  },
  {
    type: FormFieldType.FormSection,
    fields: [
      {
        label: {
          label: 'customerPlanSummary.formFields.address.label',
        },
        type: FormFieldType.TextArea,
        lens: mkFormStateLens(['shippingAddress']),
      },
    ],
  },
  {
    type: FormFieldType.FormSection,
    fields: [
      {
        label: {
          label: 'customerPlanSummary.formFields.acceptDataPrivacyAndGTC.label',
          labelData: {
            linkToAGB: 'https://bob.ch/en/corporate-clients/service/dataprotection/bob-zero/',
          },
        },
        type: FormFieldType.Toggle,
        lens: mkFormStateLens(['acceptDataPrivacyAndAGB']),
      },
    ],
  },
]

export const LoanForm = () => {
  const [data, setData] = React.useState<FormData>({
    loanAmount: 2400,
    interestRateAmount: 0,
    monthlyRate: 133.35,
    duration: 18,
    shippingAddress: 'Max Mustermann<br/>Fischerweg 36<br/>8005 Zürich',
    acceptDataPrivacyAndAGB: null,
  })

  return (
    <div style={{ maxWidth: 1000, minHeight: 1200 }}>
      <Form
        formFields={summaryFields}
        data={data}
        onChange={(data) => {
          setData(data)
        }}
      />
    </div>
  )
}
LoanForm.storyName = 'Loan Form'
