import React from 'react'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { Label, LabelProps } from './Label'
import { UploadDropzone, UploadDropzoneProps } from './UploadDropzone'

const Wrapper = createStyled('div')

export type Props = {
  dataTestId?: string
  label?: LabelProps
  onChange: (n: File | null) => void
  style?: Partial<AppTheme['fileInput']>
  value: File | null
  uploadDropzoneProps?: Partial<UploadDropzoneProps>
}

export const FileInput = (props: Props) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'fileInput')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper {...getCSSStyle('wrapper')} data-test-id={props.dataTestId}>
        <UploadDropzone
          key={props.dataTestId}
          onChange={(files) => props.onChange(files[0])}
          {...(props.uploadDropzoneProps || {})}
        />
      </Wrapper>
    </>
  )
}
