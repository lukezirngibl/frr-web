import React from 'react'
import { useMobileTouch } from '../../hooks/useMobileTouch'
import { Div } from '../../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { Label, LabelProps } from '../Label'
import { UploadDropzone, UploadDropzoneProps } from './UploadDropzone'
import { UploadFieldMobile } from './UploadFieldMobile'

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
  const { isMobile } = useMobileTouch()

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Div {...getCSSStyle('wrapper')} dataTestId={props.dataTestId}>
        {isMobile ? (
          <UploadFieldMobile onChange={(files) => props.onChange(files.length ? files[0] : null)} />
        ) : (
          <UploadDropzone
            key={props.dataTestId}
            onChange={(files) => props.onChange(files.length ? files[0] : null)}
            {...(props.uploadDropzoneProps || {})}
          />
        )}
      </Div>
    </>
  )
}
