import { format, isValid } from 'date-fns'
import { findFirst } from 'fp-ts/lib/Array'
import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import rgbHex from 'rgb-hex'
import styled from 'styled-components'
import { P } from '../../html'
import { MediaQuery } from '../../theme/configure.theme'
import { Language, mapLanguageToLocale } from '../../theme/language'
import { useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { LocaleNamespace, Translate } from '../../translation'

import {
  CommonThreadProps,
  fieldMap,
  FormFieldType,
  MultiInputAutosuggestField,
  MultiInputField,
  SingleFormField,
} from './types'

/*
 * Value mapper
 */

var formatter = {
  long: new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
  }),
  short: new Intl.NumberFormat('de-CH'),
}

type MapperParams<T> = {
  value: T
  prefix?: string
  translate: Translate
  language?: Language
}

const defaultStringNumberMapper = ({ value, prefix }: MapperParams<string | number | null>): string =>
  `${prefix > '' ? `${prefix} ` : ''} ${value ? `${value}` : ''}`

const defaultCountryMapper = ({ value, translate }: MapperParams<string | null>): string =>
  value > '' ? translate(`country.${value.toLowerCase()}`) : ''

const defaultDateStringMapper = ({ value, language }: MapperParams<string | null>): string => {
  const locale = mapLanguageToLocale[language]
  return value && isValid(new Date(value)) ? format(new Date(value), 'dd.MM.yyyy', { locale }) : ''
}

const defaultBooleanMapper = ({ value, translate }: MapperParams<boolean>): string =>
  translate(value ? 'yes' : 'no')

const defaultCurrencyMapper = ({ value }: MapperParams<number>): string =>
  formatter.long.format(value || 0)

const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`
const ColorLabelWrapper = styled.div`
  margin-left: 16px;
`

const colorLabelStyle = {
  color: 'var(--color-secondary)',
  fontSize: 'var(--font-size-small)',
  lineHeight: 1.2,
}

const defaultColorMapper = ({ value }: MapperParams<string>): ReactNode => (
  <ColorWrapper>
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: `rgba(${value})`,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '0, 0, 0, 0.3',
      }}
    ></div>
    <ColorLabelWrapper>
      <P
        label={`#${rgbHex(`rgba(${value.replace(',1)', ')')})`)}`}
        isLabelTranslated
        style={colorLabelStyle}
      />
      <P label={`rgba(${value.split(',').join(', ')})`} isLabelTranslated style={colorLabelStyle} />
    </ColorLabelWrapper>
  </ColorWrapper>
)

const defaultOptionArrayMapper = (
  params: MapperParams<Array<string>> & {
    options: Array<{ label?: string; value: string }>
  },
): string =>
  Array.isArray(params.value)
    ? params.value
        .map((val) =>
          params.translate(
            findFirst(params.options, (option) => option.value === val).fold(
              'null',
              (option) => option.label,
            ),
          ),
        )
        .join(', ')
    : ''

const defaultFileArrayMapper = (params: MapperParams<Array<File>>) =>
  Array.isArray(params.value) ? params.value : []

const defaultOptionMapper = (
  params: MapperParams<string | number> & {
    options: Array<{ label?: string; value: string }>
  },
): string => {
  return findFirst(params.options, (option) => option.value === params.value).fold('', (option) =>
    params.translate(option.label),
  )
}

const defaultReadOnlyMappers: {
  [K in FormFieldType]: (
    params: Omit<typeof fieldMap[K], 'lens' | '_value' | 'type'> & {
      value: typeof fieldMap[K]['_value']
      translate: Translate
      language?: Language
    },
  ) => string | ReactNode
} = {
  // [FormFieldType.CheckboxGroup]: defaultOptionArrayMapper,
  // [FormFieldType.CountryDropdown]: defaultStrNumMapper,
  // [FormFieldType.Dropdown]: defaultStrNumMapper,
  // [FormFieldType.DropdownNumber]: defaultStrNumMapper,
  // [FormFieldType.InputWithDropdown]: defaultStrNumMapper,

  [FormFieldType.CodeInput]: defaultStringNumberMapper,
  [FormFieldType.CountrySelect]: defaultCountryMapper,
  [FormFieldType.CurrencyInput]: defaultCurrencyMapper,
  [FormFieldType.ColorPicker]: defaultColorMapper,
  [FormFieldType.DatePicker]: (v) =>
    !!v ? format(v.value, 'P', { locale: mapLanguageToLocale[v.language] }) : '',
  [FormFieldType.FormattedDatePicker]: defaultDateStringMapper,
  [FormFieldType.FormFieldGroup]: () => '',
  [FormFieldType.FormFieldRepeatGroup]: () => '',
  [FormFieldType.FormFieldRepeatSection]: () => '',
  [FormFieldType.FormSection]: () => '',
  [FormFieldType.FormText]: () => '',
  [FormFieldType.FileInput]: () => '',
  [FormFieldType.MaskedDatePicker]: defaultDateStringMapper,
  [FormFieldType.MaskedInput]: defaultStringNumberMapper,
  [FormFieldType.MultiFileInput]: () => defaultFileArrayMapper,
  [FormFieldType.MultiSelect]: defaultOptionArrayMapper,
  [FormFieldType.MultiInput]: () => '',
  [FormFieldType.MultiInputAutosuggest]: () => '',
  [FormFieldType.NumberInput]: defaultStringNumberMapper,
  [FormFieldType.NumberSelect]: defaultOptionMapper,
  [FormFieldType.OptionGroup]: defaultOptionMapper,
  [FormFieldType.RadioGroup]: defaultOptionMapper,
  [FormFieldType.SingleCheckbox]: defaultBooleanMapper,
  [FormFieldType.Slider]: defaultStringNumberMapper,
  [FormFieldType.Switch]: defaultBooleanMapper,
  [FormFieldType.TextArea]: defaultStringNumberMapper,
  [FormFieldType.TextInput]: defaultStringNumberMapper,
  [FormFieldType.TextInputDescription]: () => '',
  [FormFieldType.TextNumber]: defaultStringNumberMapper,
  [FormFieldType.TextSelect]: defaultOptionMapper,
  [FormFieldType.Toggle]: defaultBooleanMapper,
  [FormFieldType.YesNoOptionGroup]: defaultBooleanMapper,
  [FormFieldType.YesNoRadioGroup]: defaultBooleanMapper,
  [FormFieldType.Static]: () => '',
  [FormFieldType.Button]: () => '',
}

/*
 * Styled components
 */

const FormFieldWrapper = createStyled(styled.div`
  position: relative;
  width: ${({ width }: { width?: string }) => width || '100%'};

  @media ${MediaQuery.Mobile} {
    width: 100%;
    margin-left: 0;
    margin-right: 0;

    &:first-of-type {
      margin-top: 0;
    }
  }
`)

const FieldItemWrapper = createStyled('div')
const FieldItemValueWrapper = createStyled('div')

const Image = createStyled('img')

/*
 * Field value component
 */

type FieldItemReadOnlyValueProps<FormData> = {
  data: FormData
  field: SingleFormField<FormData>
  getFieldStyle: any //
  localeNamespace?: LocaleNamespace
}

const FieldItemReadOnlyValue = <FormData extends {}>(props: FieldItemReadOnlyValueProps<FormData>) => {
  const { t: translate, i18n } = useTranslation(props.localeNamespace)

  const readOnlyStyle: Array<'value' | 'valueHighlighted' | 'textAreaValue'> = ['value']

  const readOnlyMapper = props.field.readOnlyMapper || defaultReadOnlyMappers[props.field.type]

  props.field.readOnlyOptions?.isHighlighted && readOnlyStyle.push('valueHighlighted')
  props.field.type === FormFieldType.TextArea && readOnlyStyle.push('textAreaValue')

  if (props.field.readOnlyOptions?.image) {
    return (
      <Image
        data-test-id={props.field.lens.id()}
        src={props.field.readOnlyOptions.image}
        alt="value image"
        {...props.getFieldStyle('image')}
      />
    )
  }

  const value = readOnlyMapper({
    ...props.field,
    value: props.field.lens.get(props.data),
    translate,
    language: i18n.language as Language,
  } as any)

  return (props.field.type === FormFieldType.TextArea && (
    <FieldItemValueWrapper {...props.getFieldStyle('textAreaItem')}>
      {typeof value === 'string' ? (
        <P
          {...props.getFieldStyle(readOnlyStyle)}
          label={value}
          isLabelTranslateddataTestId={props.field.lens.id()}
          dataTestId={props.field.lens.id()}
          dataValue={props.field.lens.get(props.data)}
        />
      ) : (
        value
      )}
    </FieldItemValueWrapper>
  )) ||
    typeof value === 'string' ? (
    <P
      {...props.getFieldStyle(readOnlyStyle)}
      label={value}
      isLabelTranslated
      dataTestId={props.field.lens.id()}
      dataValue={props.field.lens.get(props.data)}
    />
  ) : (
    <>{value}</>
  )
}

/*
 * Field readonly component
 */

type FieldItemReadOnlyProps<FormData> = Omit<
  CommonThreadProps<FormData>,
  'onChange' | 'showValidation' | 'formReadOnly'
> & {
  field: SingleFormField<FormData> | MultiInputField<FormData> | MultiInputAutosuggestField<FormData>
  width?: number
}

export const FieldItemReadOnly = <FormData extends {}>(props: FieldItemReadOnlyProps<FormData>) => {
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')(props.style?.row)
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')(props.style?.fieldReadOnly)

  return (
    <FormFieldWrapper
      key={`field-item-${props.fieldIndex}`}
      className="form-field field-readonly"
      {...getRowStyle('item')}
      readOnly={true}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    >
      <FieldItemWrapper {...getFieldStyle('wrapper')}>
        {props.field.label && (
          <P
            {...getFieldStyle('label')}
            data={props.field.label.labelData}
            label={props.field.label.label}
            localeNamespace={props.localeNamespace}
          />
        )}
        <FieldItemValueWrapper {...getFieldStyle('item')}>
          {props.field.type === FormFieldType.MultiInput ||
          props.field.type === FormFieldType.MultiInputAutosuggest ? (
            props.field.fields.map((fieldItem, fieldItemIndex) => {
              return (
                <FieldItemReadOnlyValue<FormData>
                  data={props.data}
                  field={fieldItem}
                  getFieldStyle={getFieldStyle}
                  key={`field-item-value-${fieldItemIndex}`}
                  localeNamespace={props.localeNamespace}
                />
              )
            })
          ) : (
            <FieldItemReadOnlyValue<FormData>
              data={props.data}
              field={props.field}
              getFieldStyle={getFieldStyle}
              key={`field-item-value-${props.fieldIndex}`}
              localeNamespace={props.localeNamespace}
            />
          )}
        </FieldItemValueWrapper>
      </FieldItemWrapper>
    </FormFieldWrapper>
  )
}
