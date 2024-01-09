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
  style?: Partial<FormTheme>
}) => {
  const theme = useFormTheme()
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')(props.style?.fieldReadOnly)

  const isFullWidth = props.field.readOnlyOptions?.isFullWidth

  return (
    <>
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
    </>
  )
}

export const MultiFieldItemReadonly = <FormData extends {}>(props: {
  data: FormData
  field: MultiInputField<FormData> | MultiInputAutosuggestField<FormData>
  localeNamespace?: LocaleNamespace
  style?: Partial<FormTheme>
}) => {
  const theme = useFormTheme()
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')(props.style?.fieldReadOnly)

  const isFullWidth = props.field.readOnlyOptions?.isFullWidth

  return (
    <>
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
    </>
  )
}

export const AddressFieldItemReadonly = <FormData extends {}>(props: {
  data: FormData
  field: MultiInputAutosuggestAddressField<FormData>
  localeNamespace?: LocaleNamespace
  style?: Partial<FormTheme>
}) => {
  const theme = useFormTheme()
  const getFieldStyle = useCSSStyles(theme, 'fieldReadOnly')(props.style?.fieldReadOnly)

  const isFullWidth = props.field.readOnlyOptions?.isFullWidth

  // First row fields
  const firstRowFields = props.field.fields.slice(0, 2)
  const firstRowLabelField = firstRowFields.find((fieldItem) => fieldItem.label)
  // Second row fields
  const secondRowFields = props.field.fields.slice(2)
  const secondRowLabelField = secondRowFields.find((fieldItem) => fieldItem.label)

  return (
    <>
      {firstRowLabelField && (
        <P
          {...getFieldStyle({
            label: true,
            labelFullwidth: isFullWidth,
          })}
          data={firstRowLabelField.label.labelData}
          label={firstRowLabelField.label.label}
          localeNamespace={props.localeNamespace}
        />
      )}

      {firstRowFields.length > 0 && (
        <Div {...getFieldStyle({ item: true, itemFullwidth: isFullWidth })}>
          {firstRowFields.map((fieldItem, fieldItemIndex) => (
            <FieldItemReadOnlyValue<FormData>
              data={props.data}
              field={fieldItem}
              getFieldStyle={getFieldStyle}
              key={`field-item-value-${fieldItemIndex}`}
              localeNamespace={props.localeNamespace}
            />
          ))}
        </Div>
      )}

      {secondRowLabelField && (
        <P
          {...getFieldStyle({
            label: true,
            labelFullwidth: isFullWidth,
          })}
          data={secondRowLabelField.label.labelData}
          label={secondRowLabelField.label.label}
          localeNamespace={props.localeNamespace}
        />
      )}
      {secondRowFields.length > 0 && (
        <Div {...getFieldStyle({ item: true, itemFullwidth: isFullWidth })}>
          {secondRowFields.map((fieldItem, fieldItemIndex) => (
            <FieldItemReadOnlyValue<FormData>
              data={props.data}
              field={fieldItem}
              getFieldStyle={getFieldStyle}
              key={`field-item-value-${fieldItemIndex}`}
              localeNamespace={props.localeNamespace}
            />
          ))}
        </Div>
      )}
    </>
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
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')(props.style?.row)

  return (
    <FormFieldWrapper
      key={`field-item-${props.fieldIndex}`}
      className="form-field field-readonly"
      {...getRowStyle('item')}
      readOnly={true}
      width={`${isNaN(props.width) ? 100 : props.width}%`}
    >
      {props.field.type === FormFieldType.AutocompleteAddress ? (
        <AddressFieldItemReadonly<FormData>
          data={props.data}
          field={props.field}
          key={`field-item-value-${props.fieldIndex}`}
          localeNamespace={props.localeNamespace}
        />
      ) : props.field.type === FormFieldType.MultiInput ||
        props.field.type === FormFieldType.MultiInputAutosuggest ? (
        <MultiFieldItemReadonly<FormData>
          data={props.data}
          field={props.field}
          key={`field-item-value-${props.fieldIndex}`}
          localeNamespace={props.localeNamespace}
        />
      ) : (
        <SingleFieldItemReadonly<FormData>
          data={props.data}
          field={props.field}
          key={`field-item-value-${props.fieldIndex}`}
          localeNamespace={props.localeNamespace}
        />
      )}
    </FormFieldWrapper>
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
