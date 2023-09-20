import React from 'react'
import styled from 'styled-components'
import { useCSSStyles, useFormTheme } from '../../theme/theme.form'
import { createStyled } from '../../theme/util'
import { FieldRowItem } from './FieldRowItem'
import { CommonThreadProps, FormFieldRow } from './types'

export type FieldRowProps<FormData> = CommonThreadProps<FormData> & {
  field: FormFieldRow<FormData>
}

export const FieldRowWrapper = createStyled(styled.div`
  & > * {
    margin-left: 4px;
    margin-right: 4px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`)

// ------------------------------------
export const FieldRow = <FormData extends {}>({
  autoFocus,
  data,
  errorFieldId,
  field,
  fieldIndex,
  formReadOnly,
  localeNamespace,
  onChange,
  onChangeMulti,
  showValidation,
  style,
}: FieldRowProps<FormData>) => {
  // Form styles
  const theme = useFormTheme()
  const getRowStyle = useCSSStyles(theme, 'row')(style?.row)

  return (
    <FieldRowWrapper
      {...getRowStyle({ wrapper: true, wrapperReadOnly: formReadOnly })}
      key={`row-${fieldIndex}`}
      readOnly={formReadOnly}
    >
      {field.map((fieldItem, fieldItemIndex) => (
        <FieldRowItem
          autoFocus={autoFocus}
          data={data}
          errorFieldId={errorFieldId}
          field={fieldItem}
          fieldIndex={fieldItemIndex}
          formReadOnly={formReadOnly}
          key={`field-item-${fieldItem.lens.id()}-${fieldItemIndex}`}
          localeNamespace={localeNamespace}
          onChange={onChange}
          onChangeMulti={onChangeMulti}
          showValidation={showValidation}
          style={style}
        />
      ))}
    </FieldRowWrapper>
  )
}
