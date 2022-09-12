import React, { ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Link } from '../../components/Link'
import { P } from '../../html'
import { MediaQuery } from '../../theme/configure.theme'
import { FormTheme, useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { FieldGroup } from './FieldGroup'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldMultiInputAutosuggest } from './FieldMultiInputAutosuggest'
import { FieldRow } from './FieldRow'
import { StaticField } from './StaticField'
import { CommonThreadProps, FormFieldType, FormSection, InternalSectionField } from './types'

type FieldSection<FormData> = CommonThreadProps<FormData> & {
  field: FormSection<FormData>
  onFormEdit?: (params: { dispatch: any }) => void
}

export const FieldSectionWrapper = (props: {
  dataTestId?: string
  style?: Partial<FormTheme['section']>
  readOnly?: boolean
  children: ReactNode
}) => {
  const theme = useFormTheme()
  const getSectionStyle = useCSSStyles(theme, 'section')(props.style || {})

  return (
    <Div
      readOnly={props.readOnly}
      data-test-id={props.dataTestId}
      {...getSectionStyle('wrapper', props.style?.wrapper || {})}
    >
      {props.children}
    </Div>
  )
}

export const FieldSection = <FormData extends {}>({
  data,
  errorFieldId,
  field: fieldSection,
  fieldIndex: fieldSectionIndex,
  formReadOnly,
  localeNamespace,
  onChange,
  onChangeMulti,
  onFormEdit,
  showValidation,
  style,
}: FieldSection<FormData>) => {
  const dispatch = useDispatch()

  // Form styles
  const theme = useFormTheme()
  const getSectionStyle = useCSSStyles(theme, 'section')(style?.section || fieldSection.style || {})
  const getSectionRightStyle = useCSSStyles(theme, 'sectionRight')({})

  const commonFieldProps = {
    data,
    errorFieldId,
    formReadOnly,
    localeNamespace,
    onChange,
    onChangeMulti,
    showValidation,
    style,
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
        return (
          <StaticField
            {...field}
            fieldIndex={fieldIndex}
            formReadOnly={formReadOnly}
            key={`field-${fieldIndex}`}
          />
        )

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

  const onEditSection = fieldSection.onEdit || onFormEdit

  // Render
  return (
    <FieldSectionWrapper
      key={typeof fieldSectionIndex === 'string' ? fieldSectionIndex : `section-${fieldSectionIndex}`}
      readOnly={formReadOnly}
      dataTestId={fieldSection.dataTestId}
      style={style?.section || fieldSection.style || {}}
    >
      {!formReadOnly && fieldSection.introduction && (
        <P
          {...getSectionStyle('introduction', fieldSection.style?.introduction || {})}
          readOnly={formReadOnly}
          label={fieldSection.introduction}
          localeNamespace={localeNamespace}
        />
      )}

      {formReadOnly && fieldSection.introductionReadOnly && (
        <P
          {...getSectionStyle('introduction', fieldSection.style?.introduction || {})}
          readOnly={formReadOnly}
          label={fieldSection.introductionReadOnly}
          localeNamespace={localeNamespace}
        />
      )}

      <Div {...getSectionStyle('contentWrapper')}>
        <Div {...getSectionStyle('content')}>
          {fieldSection.title
            ? (fieldSection.TitleCenterComponent && (
                <Div {...getSectionStyle('titleWrapper')}>
                  <P
                    {...getSectionStyle('title', fieldSection.style?.title || {})}
                    readOnly={formReadOnly}
                    label={fieldSection.title}
                    data={fieldSection.titleData}
                    localeNamespace={localeNamespace}
                  />

                  {fieldSection.TitleCenterComponent}
                </Div>
              )) || (
                <P
                  {...getSectionStyle('title', fieldSection.style?.title || {})}
                  readOnly={formReadOnly}
                  label={fieldSection.title}
                  data={fieldSection.titleData}
                  localeNamespace={localeNamespace}
                />
              )
            : null}

          {formReadOnly && !fieldSection.title && <TitleSpaceMobile />}

          {!formReadOnly && fieldSection.description && (
            <P
              {...getSectionStyle('description')}
              label={fieldSection.description}
              localeNamespace={localeNamespace}
            />
          )}

          {fieldSection.fields.map(renderSectionField)}
        </Div>

        {onEditSection && (
          <Div
            {...getSectionRightStyle('wrapper')}
            readOnly={formReadOnly}
            data-test-id={
              fieldSection.dataTestId ? `${fieldSection.dataTestId}-edit-link` : 'section-edit-link'
            }
          >
            <Link
              icon={{ type: 'edit', style: getSectionRightStyle('editIcon') }}
              label={fieldSection.editLabel}
              localeNamespace={localeNamespace}
              onClick={() => onEditSection({ dispatch })}
              style={getSectionRightStyle('editLink')}
            />
          </Div>
        )}
      </Div>
    </FieldSectionWrapper>
  )
}

const Div = createStyled('div')
const TitleSpaceMobile = styled.div`
  display: none;
  @media ${MediaQuery.Mobile} {
    display: block;
    margin-bottom: 32px;
  }
`
