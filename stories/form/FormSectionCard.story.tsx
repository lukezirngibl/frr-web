import { Meta } from '@storybook/react'
import React from 'react'
import { FieldSectionCard } from '../../src/form/components/FieldSectionCard'
import { Form } from '../../src/form/components/Form'
import { FormField, FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FieldSectionCard> = {
  title: 'Form/Section card',
  component: FieldSectionCard,
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
    type: FormFieldType.FormSectionCard,
    fields: [
      {
        label: {
          label: 'customerPlanSummary.formFields.loanAmount.label',
        },
        type: FormFieldType.CurrencyInput,
        lens: mkFormStateLens(['loanAmount']),
        readOnly: true,
        readOnlyMapper: (params) => (params.value ? Formatter.format(params.value) : ''),
      },
      {
        label: {
          label: 'customerPlanSummary.formFields.interestRateAmount.label',
        },
        type: FormFieldType.CurrencyInput,
        lens: mkFormStateLens(['interestRateAmount']),
        readOnly: true,
        readOnlyMapper: (params) => (!isNaN(Number(params.value)) ? `${params.value}%` : ''),
      },
    ],
  },
  {
    type: FormFieldType.FormSectionCard,
    fields: [
      {
        label: { label: 'customerPlanSummary.formFields.monthlyRate.label' },
        type: FormFieldType.CurrencyInput,
        lens: mkFormStateLens(['monthlyRate']),
        readOnly: true,
        readOnlyMapper: (params) => (params.value ? Formatter.format(params.value) : ''),
        readOnlyOptions: { isHighlighted: true },
      },
      {
        label: { label: 'customerPlanSummary.formFields.duration.label' },
        type: FormFieldType.NumberInput,
        lens: mkFormStateLens(['duration']),
        readOnly: true,
        readOnlyMapper: (params) =>
          params.translate('customerPlanSummary.formFields.duration.months', {
            months: params.value,
          }),
      },
    ],
  },
  {
    type: FormFieldType.FormSectionCard,
    fields: [
      {
        label: {
          label: 'customerPlanSummary.formFields.address.label',
        },
        type: FormFieldType.TextArea,
        lens: mkFormStateLens(['shippingAddress']),
        readOnlyOptions: { isFullWidth: true },
        readOnly: true,
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

const formLens = makeFormLens<FormData>()

export const LoanSummary = () => {
  const [data, setData] = React.useState<FormData>({
    loanAmount: 2400,
    interestRateAmount: 0,
    monthlyRate: 133.35,
    duration: 18,
    shippingAddress: 'Max Mustermann<br/>Fischerweg 36<br/>8005 Zürich',
    acceptDataPrivacyAndAGB: null,
  })

  return (
    <div style={{ maxWidth: 800, minHeight: 1200 }}>
      <Form
        formFields={summaryFields}
        style={{}}
        data={data}
        // onChange: () => {
        //   // setData({ ...data, [lens.id()]: value })
        // },
      />
    </div>
  )
}
LoanSummary.storyName = 'Loan Summary'
