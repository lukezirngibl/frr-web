import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { P } from '../../html'
import { MediaQuery } from '../../theme/configure.theme'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { FieldGroup } from './FieldGroup'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldMultiInputAutosuggest } from './FieldMultiInputAutosuggest'
import { FieldRow } from './FieldRow'
import { CommonThreadProps, FormFieldType, FormSectionCard, InternalSectionField } from './types'

export const FieldSectionWrapper = (props: {
  children: ReactNode
  dataTestId?: string
  style?: Partial<FormTheme['section']>
}) => {
  const theme = useFormTheme()
  const getSectionStyle = useCSSStyles(theme, 'section')(props.style || {})

  return (
    <Div
      readOnly
      data-test-id={props.dataTestId}
      {...getSectionStyle('wrapper', props.style?.wrapper || {})}
    >
      {props.children}
    </Div>
  )
}

export type FieldSectionCardProps<FormData> = Omit<
  CommonThreadProps<FormData>,
  'autoFocus' | 'errorFieldId' | 'formReadOnly' | 'onChange' | 'onChangeMulti' | 'showValidation'
> & {
  field: FormSectionCard<FormData>
}

export const FieldSectionCard = <FormData extends {}>({
  data,
  field: fieldSection,
  fieldIndex: fieldSectionIndex,
  localeNamespace,
  style,
}: FieldSectionCardProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()
  const getSectionStyle = useCSSStyles(theme, 'section')(style?.section || fieldSection.style || {})

  const fieldReadOnlyStyle = style?.fieldReadOnly || ({} as Partial<FormTheme['fieldReadOnly']>)
  const commonFieldProps: Omit<CommonThreadProps<FormData>, 'fieldIndex'> = {
    autoFocus: false,
    data,
    localeNamespace,
    style: {
      ...style,
      row: {
        ...style?.row,
        item: {
          ...style?.row?.item,
          display: 'flex',
        },
      },
      fieldReadOnly: {
        ...style?.fieldReadOnly,
        wrapper: {
          ...fieldReadOnlyStyle,
          display: 'flex',
        },
        label: {
          ...fieldReadOnlyStyle.label,
          maxWidth: 160,
          marginRight: 16,
        },
        item: {
          ...fieldReadOnlyStyle.item,
          justifyContent: 'flex-end',
        },
        value: {
          ...fieldReadOnlyStyle.value,
          marginRight: 0,
        },
      },
    },
    showValidation: false,
    formReadOnly: true,
    onChange: () => {},
  }

  const renderSectionField = (field: InternalSectionField<FormData>, fieldIndex: number) => {
    if (Array.isArray(field)) {
      return (
        <FieldRow
          key={`field-section-${fieldIndex}`}
          field={field}
          fieldIndex={fieldIndex}
          {...commonFieldProps}
        />
      )
    }

    switch (field.type) {
      case FormFieldType.FormFieldGroup: {
        return (
          <FieldGroup
            key={`field-group-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
      }

      case FormFieldType.MultiInput:
        return (
          <FieldMultiInput
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )

      case FormFieldType.MultiInputAutosuggest:
        return (
          <FieldMultiInputAutosuggest
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )

      case FormFieldType.Static:
        return null

      default:
        return (
          <FieldRow
            key={`field-${fieldIndex}`}
            field={[field]}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
    }
  }

  return (
    <FieldSectionWrapper
      key={typeof fieldSectionIndex === 'string' ? fieldSectionIndex : `section-${fieldSectionIndex}`}
      dataTestId={fieldSection.dataTestId}
      style={style?.section || fieldSection.style || {}}
    >
      {fieldSection.introduction && (
        <P
          {...getSectionStyle('introduction', fieldSection.style?.introduction || {})}
          readOnly
          label={fieldSection.introduction}
          localeNamespace={localeNamespace}
        />
      )}

      <Div {...getSectionStyle('contentWrapper')}>
        <Div {...getSectionStyle('content')}>
          {fieldSection.title ? (
            <P
              {...getSectionStyle('title', fieldSection.style?.title || {})}
              readOnly
              label={fieldSection.title}
              data={fieldSection.titleData}
              localeNamespace={localeNamespace}
            />
          ) : null}

          {!fieldSection.title && (
            <EmptyTitleWrapperMobile {...getSectionStyle('emptyTitleWrapperMobile')} />
          )}

          {fieldSection.description && (
            <P
              {...getSectionStyle('description')}
              label={fieldSection.description}
              localeNamespace={localeNamespace}
            />
          )}

          <Div {...getSectionStyle('contentCardWrapper')}>
            {fieldSection.fields.map(renderSectionField)}
          </Div>
        </Div>
      </Div>
    </FieldSectionWrapper>
  )
}

const Div = createStyled('div')
const EmptyTitleWrapperMobile = createStyled(styled.div`
  display: none;
  @media ${MediaQuery.Mobile} {
    display: block;
    margin-bottom: 32px;
  }
`)
