import React, { ReactNode } from 'react'
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
import {
  CommonThreadProps,
  DescriptionType,
  FormFieldType,
  FormSection,
  InternalSectionField,
} from './types'
import { AiOutlineCheck } from '../../icons/new/AiOutlineCheck'
import { MdErrorOutline } from '../../icons/new/MdErrorOutline'

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

export type FieldSectionProps<FormData> = CommonThreadProps<FormData> & {
  field: FormSection<FormData>
  onFormEdit?: () => void
}

export const FieldSection = <FormData extends {}>({
  autoFocus,
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
}: FieldSectionProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()
  const getSectionStyle = useCSSStyles(theme, 'section')(style?.section || fieldSection.style || {})
  const getSectionRightStyle = useCSSStyles(theme, 'sectionRight')({})

  const row = style?.row || ({ wrapper: {}, wrapperReadOnly: {}, item: {} } as FormTheme['row'])
  const commonFieldStyle: Partial<FormTheme> = fieldSection.style?.rowItem
    ? {
        ...style,
        row: {
          ...row,
          item: {
            ...row.item,
            ...fieldSection.style.rowItem,
          },
        },
      }
    : style

  const commonFieldProps = {
    autoFocus: false,
    data,
    errorFieldId,
    formReadOnly,
    localeNamespace,
    onChange,
    onChangeMulti,
    showValidation,
    style: commonFieldStyle,
  }

  const renderSectionField = (field: InternalSectionField<FormData>, fieldIndex: number) => {
    commonFieldProps.autoFocus = autoFocus && fieldIndex === 0

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

  const descriptionTypeStyle = fieldSection.descriptionType
    ? ({ [`description${fieldSection.descriptionType}`]: true } as { [key: string]: boolean })
    : {}

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

                  <fieldSection.TitleCenterComponent
                    onChangeMulti={onChangeMulti}
                    readOnly={formReadOnly}
                  />
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

          {formReadOnly && !fieldSection.title && (
            <EmptyTitleWrapperMobile {...getSectionStyle('emptyTitleWrapperMobile')} />
          )}

          {!formReadOnly && fieldSection.description && (
            <P
              {...getSectionStyle({ description: true, ...descriptionTypeStyle })}
              label={fieldSection.description}
              localeNamespace={localeNamespace}
              Icon={
                (fieldSection.descriptionType === DescriptionType.Success && <AiOutlineCheck />) ||
                (fieldSection.descriptionType === DescriptionType.Error && <MdErrorOutline />) ||
                null
              }
            />
          )}

          {fieldSection.fields.map(renderSectionField)}
        </Div>

        {onEditSection && (
          <Div
            {...getSectionRightStyle('wrapper')}
            disabled={fieldSection.isOnEditDisabled}
            readOnly={formReadOnly}
            data-test-id={
              fieldSection.dataTestId ? `${fieldSection.dataTestId}-edit-link` : 'section-edit-link'
            }
          >
            <Link
              icon={{ type: 'edit', style: getSectionRightStyle('editIcon') }}
              label={fieldSection.editLabel}
              localeNamespace={localeNamespace}
              onClick={onEditSection}
              style={getSectionRightStyle('editLink')}
            />
          </Div>
        )}
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
