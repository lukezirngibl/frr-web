import { Div, P } from '../../html'
import { useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { FieldMultiInput } from './FieldMultiInput'
import { FieldMultiInputAutosuggest } from './FieldMultiInputAutosuggest'
import { FieldRow } from './FieldRow'
import { StaticField } from './StaticField'
import { CommonThreadProps, FormFieldGroup, FormFieldType, GroupField } from './types'

const DescriptionList = createStyled('ul')
const DescriptionItem = createStyled('li')

type FieldGroup<FormData> = CommonThreadProps<FormData> & {
  field: FormFieldGroup<FormData>
}

// ------------------------------------
export const FieldGroup = <FormData extends {}>(props: FieldGroup<FormData>) => {
  const {
    data,
    field: fieldGroup,
    fieldIndex: fieldGroupIndex,
    formReadOnly,
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
    formReadOnly,
    localeNamespace,
    onChange,
    style,
    ...otherProps,
  }

  const renderGroupField = (field: GroupField<FormData>, fieldIndex: number) => {
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
            key={`field-${fieldIndex}`}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )

      default:
        return (
          <FieldRow
            key={`field-${field.lens.id()}-${fieldIndex}`}
            field={[field]}
            fieldIndex={fieldIndex}
            {...commonFieldProps}
          />
        )
    }
  }

  return (
    <Div
      key={typeof fieldGroupIndex === 'string' ? fieldGroupIndex : `group-${fieldGroupIndex}`}
      readOnly={formReadOnly}
      {...getCSSStyle('wrapper', fieldGroup.style ? fieldGroup.style.wrapper || {} : {})}
    >
      {fieldGroup.title && (
        <P
          {...getCSSStyle('title', fieldGroup.style ? fieldGroup.style.title || {} : {})}
          label={fieldGroup.title}
          readOnly={formReadOnly}
          localeNamespace={localeNamespace}
        />
      )}
      {fieldGroup.description && (
        <P
          {...getCSSStyle(
            'descriptionText',
            fieldGroup.style ? fieldGroup.style.descriptionText || {} : {},
          )}
          label={fieldGroup.description}
          localeNamespace={localeNamespace}
        />
      )}
      {fieldGroup.descriptionList && (
        <DescriptionList {...getCSSStyle('descriptionList')}>
          {fieldGroup.descriptionList.map((descriptionItem, descriptionItemIndex) => (
            <DescriptionItem key={descriptionItem} {...getCSSStyle('descriptionItem')}>
              <P
                {...getCSSStyle('descriptionText')}
                label={`${descriptionItemIndex + 1})`}
                isLabelTranslated
              />
              <P
                {...getCSSStyle('descriptionText')}
                label={descriptionItem}
                localeNamespace={localeNamespace}
              />
            </DescriptionItem>
          ))}
        </DescriptionList>
      )}
      {fieldGroup.fields.map(renderGroupField)}
    </Div>
  )
}
