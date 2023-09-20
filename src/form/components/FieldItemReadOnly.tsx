import { format, isValid, parse } from 'date-fns'
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
  FormFieldType,
  MultiInputAutosuggestField,
  MultiInputField,
  SingleFormField,
  fieldMap,
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

const defaultDateStringMapper = ({
  value,
  language,
  dateFormat,
  displayDateFormat,
}: MapperParams<string | null> & { dateFormat: string; displayDateFormat?: string }): string => {
  const locale = mapLanguageToLocale[language]
  const parsedDate = parse(value, dateFormat ?? 'dd.MM.yyyy', new Date(), { locale })
  return value && isValid(parsedDate)
    ? format(parsedDate, displayDateFormat ?? dateFormat ?? 'dd.MM.yyyy', { locale })
    : ''
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
        .reduce((acc, val) => {
          const findOption = params.options.find((option) => option.value === val)
          if (!findOption) return acc
          return [...acc, findOption.label ? findOption.label : val]
        }, [] as Array<string>)
        .join(', ')
    : ''

const defaultFileArrayMapper = (params: MapperParams<Array<File>>): ReactNode => (
  <ul>
    {Array.isArray(params.value) ? (
      <li>{params.value.map((file) => `${file.name} (${file.type})`)}</li>
    ) : null}
  </ul>
)

const defaultOptionMapper = (
  params: MapperParams<string | number> & {
    options: Array<{ label?: string; value: string }>
  },
): string => {
  const option = params.options.find((option) => option.value === params.value)
  return option ? params.translate(option.label) : ''
}

export const defaultReadOnlyMappers: {
  [K in FormFieldType]: (
    params: Omit<(typeof fieldMap)[K], 'lens' | '_value' | 'type'> & {
      value: (typeof fieldMap)[K]['_value']
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

  [FormFieldType.Button]: () => '',
  [FormFieldType.CodeInput]: defaultStringNumberMapper,
  [FormFieldType.ColorPicker]: defaultColorMapper,
  [FormFieldType.CountrySelect]: defaultCountryMapper,
  [FormFieldType.CurrencyInput]: defaultCurrencyMapper,
  [FormFieldType.Custom]: () => '',
  [FormFieldType.DatePicker]: (v) =>
    !!v && v.value ? format(v.value, 'P', { locale: mapLanguageToLocale[v.language] }) : '',
  [FormFieldType.FileInput]: () => '',
  [FormFieldType.FormattedDatePicker]: defaultDateStringMapper,
  [FormFieldType.FormFieldGroup]: () => '',
  [FormFieldType.FormFieldRepeatGroup]: () => '',
  [FormFieldType.FormFieldRepeatSection]: () => '',
  [FormFieldType.FormSection]: () => '',
  [FormFieldType.FormSectionCard]: () => '',
  [FormFieldType.FormText]: () => '',
  [FormFieldType.MaskedDatePicker]: defaultDateStringMapper,
  [FormFieldType.MaskedInput]: defaultStringNumberMapper,
  [FormFieldType.MultiFileInput]: defaultFileArrayMapper,
  [FormFieldType.MultiInput]: () => '',
  [FormFieldType.MultiInputAutosuggest]: () => '',
  [FormFieldType.MultiSelect]: defaultOptionArrayMapper,
  [FormFieldType.NumberInput]: defaultStringNumberMapper,
  [FormFieldType.NumberMultiSelect]: defaultOptionArrayMapper,
  [FormFieldType.NumberSelect]: defaultOptionMapper,
  [FormFieldType.OptionGroup]: defaultOptionMapper,
  [FormFieldType.RadioGroup]: defaultOptionMapper,
  [FormFieldType.SingleCheckbox]: defaultBooleanMapper,
  [FormFieldType.Slider]: defaultStringNumberMapper,
  [FormFieldType.Static]: () => '',
  [FormFieldType.Switch]: defaultBooleanMapper,
  [FormFieldType.TextArea]: defaultStringNumberMapper,
  [FormFieldType.TextInput]: defaultStringNumberMapper,
  [FormFieldType.TextInputAutosuggest]: defaultStringNumberMapper,
  [FormFieldType.TextInputDescription]: () => '',
  [FormFieldType.TextNumber]: defaultStringNumberMapper,
  [FormFieldType.TextSelect]: defaultOptionMapper,
  [FormFieldType.Toggle]: defaultBooleanMapper,
  [FormFieldType.YesNoOptionGroup]: defaultBooleanMapper,
  [FormFieldType.YesNoRadioGroup]: defaultBooleanMapper,
}

/*
 * Field value component
 */

type FieldItemReadOnlyValueProps<FormData> = {
  data: FormData
  field: SingleFormField<FormData>
  getFieldStyle: any //
  localeNamespace?: LocaleNamespace
}

export const FieldItemReadOnlyValue = <FormData extends {}>(
  props: FieldItemReadOnlyValueProps<FormData>,
) => {
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
    <Div
      {...props.getFieldStyle('textAreaItem')}
      onClick={
        props.field.readOnlyOptions?.link
          ? () => {
              window.open(props.field.readOnlyOptions?.link, '_blank')
            }
          : undefined
      }
    >
      {typeof value === 'string' ? (
        <P
          {...props.getFieldStyle(readOnlyStyle)}
          label={value}
          isLabelTranslated
          dataTestId={props.field.lens.id()}
          dataValue={props.field.lens.get(props.data)}
        />
      ) : (
        value
      )}
    </Div>
  )) ||
    typeof value === 'string' ? (
    <P
      {...props.getFieldStyle(
        readOnlyStyle,
        props.field.readOnlyOptions?.link
          ? {
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'rgb(24,14,164)',
            }
          : {},
      )}
      label={value}
      isLabelTranslated
      dataTestId={props.field.lens.id()}
      dataValue={props.field.lens.get(props.data)}
      onClick={
        props.field.readOnlyOptions?.link
          ? () => {
              window.open(props.field.readOnlyOptions?.link, '_blank')
            }
          : undefined
      }
    />
  ) : (
    <>{value}</>
  )
}

/*
 * Field readonly component
 */

type FieldItemReadOnlyProps<FormData> = Omit<
  Omit<CommonThreadProps<FormData>, 'autoFocus'>,
  'onChange' | 'showValidation' | 'formReadOnly'
> & {
  field: SingleFormField<FormData> | MultiInputField<FormData> | MultiInputAutosuggestField<FormData>
  width?: number
}

export const FieldItemReadOnly = <FormData extends {}>(props: FieldItemReadOnlyProps<FormData>) => {
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')(props.style?.row)
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')(props.style?.fieldReadOnly)

  const isFullWidth = props.field.readOnlyOptions?.isFullWidth

  return (
    <FormFieldWrapper
      key={`field-item-${props.fieldIndex}`}
      className="form-field field-readonly"
      {...getRowStyle('item')}
      readOnly={true}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    >
      <Div {...getFieldStyle({ wrapper: true, wrapperFullwidth: isFullWidth })}>
        {props.field.label && (
          <P
            {...getFieldStyle({
              label: true,
              labelFullwidth: isFullWidth,
            })}
            data={props.field.label.labelData}
            label={props.field.label.label}
            localeNamespace={props.localeNamespace}
          />
        )}
        <Div {...getFieldStyle({ item: true, itemFullwidth: isFullWidth })}>
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
        </Div>
      </Div>
    </FormFieldWrapper>
  )
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

const Div = createStyled('div')
const Image = createStyled('img')
