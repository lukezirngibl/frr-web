import { P } from '../../html'
import { createStyled } from '../../theme/util'
import React, { ReactNode } from 'react'
import { useFormTheme } from '../theme/theme'
import { useCSSStyles } from '../theme/util'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldRow } from './FieldRow'
import {
  CommonThreadProps,
  FormFieldGroup,
  FormFieldType,
  GroupField,
} from './types'

const GroupWrapper = createStyled('div')

type FieldGroup<FormData> = CommonThreadProps<FormData> & {
  field: FormFieldGroup<FormData>
}

// ------------------------------------
export const FieldGroup = <FormData extends {}>(
  props: FieldGroup<FormData>,
) => {
  const {
    data,
    field: fieldGroup,
    fieldIndex: fieldGroupIndex,
    localeNamespace,
    onChange,
    style,
    ...otherProps
  } = props
  // Form styles
  const theme = useFormTheme()
  const getCSSStyle = useCSSStyles(theme, 'group')(style?.group || {})

  const commonFieldProps = {
    data,
    localeNamespace,
    onChange,
    style,
    ...otherProps,
  }

  const renderGroupField = (
    field: GroupField<FormData>,
    fieldIndex: number,
  ) => {
    if (Array.isArray(field)) {
      return (
        <FieldRow
          key={`field-section-${fieldIndex}`}
          fieldIndex={fieldIndex}
          field={field}
          {...commonFieldProps}
        />
      )
    }

    switch (field.type) {
      case FormFieldType.MultiInput:
        return (
          <FieldMultiInput
            key={`field-${fieldIndex}`}
            field={field}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
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
  return (
    <GroupWrapper
      key={
        typeof fieldGroupIndex === 'string'
          ? fieldGroupIndex
          : `group-${fieldGroupIndex}`
      }
      {...getCSSStyle(
        'wrapper',
        fieldGroup.style ? fieldGroup.style.wrapper || {} : {},
      )}
    >
      {fieldGroup.title && (
        <P
          {...getCSSStyle(
            'title',
            fieldGroup.style ? fieldGroup.style.title || {} : {},
          )}
          label={fieldGroup.title}
          localeNamespace={localeNamespace}
        />
      )}
      {fieldGroup.description && (
        <P
          {...getCSSStyle(
            'description',
            fieldGroup.style ? fieldGroup.style.description || {} : {},
          )}
          label={fieldGroup.description}
          localeNamespace={localeNamespace}
        />
      )}
      {fieldGroup.fields.map(renderGroupField)}
    </GroupWrapper>
  )
}
