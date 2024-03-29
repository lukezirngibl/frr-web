import React from 'react'
import styled from 'styled-components'
import { Div, P } from '../../html'
import { MediaQuery } from '../../theme/configure.theme'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import {
  CommonThreadProps,
  FormFieldType,
  MultiInputAutosuggestAddressField,
  MultiInputAutosuggestField,
  MultiInputField,
  SingleFormField,
} from './types'
import { FieldItemReadOnlyValue } from './FieldItemReadOnlyValue'
import { LocaleNamespace } from '../../translation'
import { DeepPartial } from '../../util'

/*
 * Field readonly component
 */

type FieldItemReadOnlyProps<FormData> = Omit<
  Omit<CommonThreadProps<FormData>, 'autoFocus'>,
  'onChange' | 'showValidation' | 'formReadOnly'
> & {
  width?: number
}

export const SingleFieldItemReadonly = <FormData extends {}>(props: {
  data: FormData
  field: SingleFormField<FormData>
  localeNamespace?: LocaleNamespace
  style?: DeepPartial<FormTheme>
  width: string
}) => {
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')(props.style?.row)
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')(props.style?.fieldReadOnly)

  const isFullWidth = props.field.readOnlyOptions?.isFullWidth

  return (
    <FormFieldWrapper
      className="form-field field-readonly"
      {...getRowStyle({
        item: !isFullWidth,
        itemFullwidth: isFullWidth,
      })}
      readOnly={true}
      width={props.width}
    >
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
        <FieldItemReadOnlyValue<FormData>
          data={props.data}
          field={props.field}
          getFieldStyle={getFieldStyle}
          localeNamespace={props.localeNamespace}
        />
      </Div>
    </FormFieldWrapper>
  )
}

export const MultiFieldItemReadonly = <FormData extends {}>(props: {
  data: FormData
  field: MultiInputField<FormData> | MultiInputAutosuggestField<FormData>
  localeNamespace?: LocaleNamespace
  style?: DeepPartial<FormTheme>
  width: string
}) => {
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')(props.style?.row)
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')(props.style?.fieldReadOnly)

  const isFullWidth = props.field.readOnlyOptions?.isFullWidth

  return (
    <FormFieldWrapper
      className="form-field field-readonly"
      {...getRowStyle('item')}
      readOnly={true}
      width={props.width}
    >
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
        {props.field.fields.map((fieldItem, fieldItemIndex) => (
          <FieldItemReadOnlyValue<FormData>
            data={props.data}
            field={fieldItem}
            getFieldStyle={getFieldStyle}
            key={`field-item-value-${fieldItemIndex}`}
            localeNamespace={props.localeNamespace}
          />
        ))}
      </Div>
    </FormFieldWrapper>
  )
}

export const AddressFieldItemReadonly = <FormData extends {}>(props: {
  data: FormData
  field: MultiInputAutosuggestAddressField<FormData>
  localeNamespace?: LocaleNamespace
  style?: DeepPartial<FormTheme>
  width: string
}) => {
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')(props.style?.row)
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')(props.style?.fieldReadOnly)

  const isFullWidth = props.field.readOnlyOptions?.isFullWidth

  // Get row fields
  // const { firstRowFields, secondRowFields } = useAddressFields(props.field)
  const firstRowLabelField = props.field.firstRow.fields.find((fieldItem) => fieldItem.label)
  const secondRowLabelField = props.field.secondRow?.fields.find((fieldItem) => fieldItem.label)

  return (
    <AddressFieldWrapper>
      {props.field.firstRow.fields.length > 0 && (
        <FormFieldWrapper
          className="form-field field-readonly"
          {...getRowStyle('item')}
          readOnly={true}
          width={props.width}
        >
          {props.field.firstRow.label && (
            <P
              {...getFieldStyle({
                label: true,
                labelFullwidth: isFullWidth,
              })}
              data={props.field.firstRow.label.labelData}
              label={props.field.firstRow.label.label}
              localeNamespace={props.localeNamespace}
            />
          )}
          <Div {...getFieldStyle({ item: true, itemFullwidth: isFullWidth })}>
            {props.field.firstRow.fields.map((fieldItem, fieldItemIndex) => (
              <FieldItemReadOnlyValue<FormData>
                data={props.data}
                field={fieldItem}
                getFieldStyle={getFieldStyle}
                key={`field-item-value-${fieldItemIndex}`}
                localeNamespace={props.localeNamespace}
              />
            ))}
          </Div>
        </FormFieldWrapper>
      )}

      {props.field.secondRow && props.field.secondRow.fields.length > 0 && (
        <FormFieldWrapper
          className="form-field field-readonly"
          {...getRowStyle('item')}
          readOnly={true}
          width={props.width}
        >
          {props.field.secondRow.label && (
            <P
              {...getFieldStyle({
                label: true,
                labelFullwidth: isFullWidth,
              })}
              data={props.field.secondRow.label.labelData}
              label={props.field.secondRow.label.label}
              localeNamespace={props.localeNamespace}
            />
          )}
          <Div {...getFieldStyle({ item: true, itemFullwidth: isFullWidth })}>
            {props.field.secondRow.fields.map((fieldItem, fieldItemIndex) => (
              <FieldItemReadOnlyValue<FormData>
                data={props.data}
                field={fieldItem}
                getFieldStyle={getFieldStyle}
                key={`field-item-value-${fieldItemIndex}`}
                localeNamespace={props.localeNamespace}
              />
            ))}
          </Div>
        </FormFieldWrapper>
      )}
    </AddressFieldWrapper>
  )
}

export const FieldItemReadOnly = <FormData extends {}>(
  props: FieldItemReadOnlyProps<FormData> & {
    field:
      | SingleFormField<FormData>
      | MultiInputField<FormData>
      | MultiInputAutosuggestField<FormData>
      | MultiInputAutosuggestAddressField<FormData>
  },
) => {
  return props.field.type === FormFieldType.AutocompleteAddress ? (
    <AddressFieldItemReadonly<FormData>
      data={props.data}
      field={props.field}
      key={`field-item-value-${props.fieldIndex}`}
      localeNamespace={props.localeNamespace}
      style={props.style}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    />
  ) : props.field.type === FormFieldType.MultiInput ||
    props.field.type === FormFieldType.MultiInputAutosuggest ? (
    <MultiFieldItemReadonly<FormData>
      data={props.data}
      field={props.field}
      key={`field-item-value-${props.fieldIndex}`}
      localeNamespace={props.localeNamespace}
      style={props.style}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    />
  ) : (
    <SingleFieldItemReadonly<FormData>
      data={props.data}
      field={props.field}
      key={`field-item-value-${props.fieldIndex}`}
      localeNamespace={props.localeNamespace}
      style={props.style}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    />
  )
}

/*
 * Styled components
 */

const FormFieldWrapper = createStyled(styled.div<{ width?: string }>`
  position: relative;
  width: ${(props) => props.width || '100%'};

  @media ${MediaQuery.Mobile} {
    width: 100%;
    margin-left: 0;
    margin-right: 0;

    &:first-of-type {
      margin-top: 0;
    }
  }
`)

const AddressFieldWrapper = createStyled(styled.div`
  width: 100%;
`)
