import React from 'react'
import { useMobileTouch } from '../../hooks/useMobileTouch'
import { Div } from '../../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { Label, LabelProps } from '../Label'
import { UploadDocumentItem, type UploadedFile } from './UploadDocumentItem'
import { UploadDropzone, UploadDropzoneProps } from './UploadDropzone'
import { UploadFieldMobile } from './UploadFieldMobile'

export type SingleFileInputProps = {
  dataTestId?: string
  label?: LabelProps
  onChange: (n: File | null) => void
  style?: Partial<ComponentTheme['fileInput']>
  uploadedFile?: UploadedFile | null
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
        {props.uploadedFile ? (
          <UploadDocumentItem
            file={props.uploadedFile}
            maxFileSize={props.uploadDropzoneProps.maxFileSize}
            maxFilesToUpload={props.uploadDropzoneProps.maxFilesToUpload}
            onRemove={() => props.onChange(null)}
          />
        ) : isMobile ? (
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
