import React from 'react'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { Label, LabelProps } from '../Label'
import { UploadDropzone, UploadDropzoneProps } from './UploadDropzone'

const Wrapper = createStyled('div')

export type SingleFileInputProps = {
  dataTestId?: string
  label?: LabelProps
  onChange: (n: File | null) => void
  style?: Partial<ComponentTheme['fileInput']>
  value: File | null
  uploadDropzoneProps?: Partial<UploadDropzoneProps>
}

export const SingleFileInput = (props: SingleFileInputProps) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'fileInput')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper {...getCSSStyle('wrapper')} data-test-id={props.dataTestId}>
        <UploadDropzone
          key={props.dataTestId}
          onChange={(files) => props.onChange(files.length ? files[0] : null)}
          {...(props.uploadDropzoneProps || {})}
        />
      </Wrapper>
    </>
  )
}
