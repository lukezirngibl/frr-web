import { Meta } from '@storybook/react'
import React from 'react'
import { FieldSection } from '../../src/form/components/FieldSection'
import { Form, FormProps } from '../../src/form/components/Form'
import { FormField, FormFieldType } from '../../src/form/components/types'
import { makeFormLens } from '../../src/form/util'
import { createStory } from '../storybook.helpers'
import { ComponentTheme } from '../../src/theme/theme.components'

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
): Array<FormField<FormData>> => [
  {
    type: FormFieldType.Slider,
    label: {
      label: options.isAmountReadonly
        ? 'paymentTerms.formFields.loanAmount.labelReadonly'
        : 'paymentTerms.formFields.loanAmount.label',
      labelData: {
        minAmount: Formatter.short.format(1000),
        maxAmount: Formatter.short.format(6350.45),
      },
    },
    initialValue: 1500,
    inputMax: null,
    inputMin: null,
    inputStep: 0.05,
    isCurrency: true,
    isEditable: true,
    readOnly: options.isAmountReadonly,
    lens: mkFormStateLens(['termsInfo', 'loanAmount']),
    max: 6350.45,
    min: 1000.0,
    onChangeInputType: (type) => {
      console.log('CHANGE INPUT TYPE', type)
    },
    placeholder: `1000.00`,
    step: 1,

    style: SliderStyle,
  },
  // {
  //   type: FormFieldType.Slider,
  //   label: {
  //     label: 'paymentTerms.formFields.duration.label',
  //   },
  //   initialValue:
  //     formState.termsInfo.payment.duration &&
  //     formState.termsInfo.payment.duration > 0
  //       ? formState.termsInfo.payment.duration
  //       : null,
  //   inputMax: null,
  //   inputMin: null,
  //   isEditable: true,
  //   lens: mkBplFinancingFormLens(['termsInfo', 'payment', 'duration']),
  //   onChangeInputType: (type) => {
  //     onChangeInputType?.({ id: 'termsInfo.payment.duration', type })
  //   },
  //   prefix: 'paymentTerms.formFields.duration.monthsPrefix',
  //   style: SliderStyle,
  //   ...configureDurationSlider(formState.product),
  // },
  {
    type: FormFieldType.OptionGroup,
    label: {
      label: 'paymentTerms.formFields.duration.label',
      labelData: { loanAmount: Formatter.short.format(1500) },
      style: {
        wrapper: {
          marginTop: 24,
        },
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
    lens: mkFormStateLens(['termsInfo', 'payment', 'duration']),
    // onChangeInputType: (type) => {
    //   onChangeInputType?.({ id: 'termsInfo.payment.duration', type })
    // },
    style: {
      wrapper: {
        flexWrap: 'wrap',
      },
      item: {
        flexGrow: 0,
        maxWidth: '30%',
        height: 'auto',
        padding: '8px 16px',
      },
    },
  },
]

const story = createStory<FormProps<FormData>, typeof Form>(Form)

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
      {story({
        formFields: paymentTermsFields(),
        style: {
          
        },
        data,
        // onChange: () => {
        //   setData({ ...data, [lens.id()]: value })
        // },
      })}
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
      {story({
        formFields: paymentTermsFields({ isAmountReadonly: true }),
        style: {},
        data,
        // onChange: () => {
        //   setData({ ...data, [lens.id()]: value })
        // },
      })}
    </div>
  )
}
ECommercePaymentTerms.storyName = 'Ecommerce customer'
