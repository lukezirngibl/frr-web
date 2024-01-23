import { Meta } from '@storybook/react'
import React from 'react'
import { FieldSection } from '../../src/form/components/FieldSection'
import { Form } from '../../src/form/components/Form'
import { FormField, FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { ComponentTheme } from '../../src/theme/theme.components'
import { durationField } from '../components/OptionGroup.story'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof FieldSection> = {
  title: 'Form/Payment terms section',
  component: FieldSection,
}
export default meta

type FormData = {
  termsInfo: {
    loanAmount: number
    payment: {
      duration: number
    }
  }
}

const mkFormStateLens = makeFormLens<FormData>()

const Formatter = {
  long: new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  short: new Intl.NumberFormat('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
}

const SliderStyle: Partial<ComponentTheme['slider']> = {
  label: {
    maxWidth: 'calc(100% - 212px - 4px)',
    '@media-mobile': { maxWidth: 'unset' },
  },
  valueWrapperEditable: {
    maxWidth: 212,
    '@media-mobile': {
      maxWidth: 'unset',
      position: 'relative',
      top: 0,
      paddingTop: 0,
      marginBottom: 16,
    },
  },
  wrapper: {
    '@media-mobile': { maxWidth: 480, marginTop: 0, marginBottom: 16 },
  },
}

const paymentTermsFields = (
  options: { isAmountReadonly: boolean } = { isAmountReadonly: false },
): Array<FormField<FormData>> =>
  [
    {
      type: FormFieldType.FormSection,
      fields: [
        ...((options.isAmountReadonly
          ? []
          : [
              {
                type: FormFieldType.CurrencyInput,
                label: {
                  label: 'paymentTerms.formFields.loanAmount.label',
                  labelData: {
                    minAmount: Formatter.short.format(1000),
                    maxAmount: Formatter.short.format(6350.45),
                  },
                },
                lens: mkFormStateLens(['termsInfo', 'loanAmount']),
                placeholder: `1000.00`,
                style: {
                  wrapper: {
                    height: 'auto',
                    padding: '16px 32px',
                  },
                  input: {
                    fontSize: '2.4rem',
                  },
                },
              },
            ]) as Array<FormField<FormData>>),
        {
          ...durationField,
          lens: mkFormStateLens(['termsInfo', 'payment', 'duration']),
        },
      ],
    },
  ] as Array<FormField<FormData>>

export const RetailPaymentTerms = () => {
  const [data, setData] = React.useState<FormData>({
    termsInfo: {
      loanAmount: 2400,
      payment: {
        duration: 18,
      },
    },
  })

  return (
    <div style={{ maxWidth: 1000, minHeight: 1200 }}>
      <Form
        formFields={paymentTermsFields()}
        style={{
          row: {
            item: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 16,
            },
            wrapper: {
              marginBottom: 48,
              ':last-child': {
                marginBottom: 0,
              },
            },
            wrapperReadOnly: {},
          },
        }}
        data={data}
        // onChange: () => {
        //   setData({ ...data, [lens.id()]: value })
        // },
      />
    </div>
  )
}
RetailPaymentTerms.storyName = 'Retail partner'

export const ECommercePaymentTerms = () => {
  const [data, setData] = React.useState<FormData>({
    termsInfo: {
      loanAmount: 2400,
      payment: {
        duration: 18,
      },
    },
  })

  return (
    <div style={{ maxWidth: 1000, minHeight: 1200 }}>
      <Form
        formFields={paymentTermsFields({ isAmountReadonly: true })}
        style={{
          row: {
            item: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 16,
            },
            wrapper: {},
            wrapperReadOnly: {},
          },
        }}
        data={data}
        // onChange: () => {
        //   setData({ ...data, [lens.id()]: value })
        // },
      />
    </div>
  )
}
ECommercePaymentTerms.storyName = 'Ecommerce customer'
