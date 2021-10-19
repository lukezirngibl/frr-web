import React from 'react'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { Label, LabelProps } from './Label'
import { UploadDropzone } from './UploadDropzone'

const Wrapper = createStyled('div')

export type Props = {
  dataTestId?: string
  label?: LabelProps
  onChange: (n: File | null) => void
  style?: Partial<ComponentTheme['fileInput']>
  value: File | null
}

export const FileInput = (props: Props) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'fileInput')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper {...getCSSStyle('wrapper')} data-test-id={props.dataTestId}>
        <UploadDropzone
          key={props.dataTestId}
          onChange={(files) => props.onChange(files[0])}
          maxFilesToUpload={1}
        />
      </Wrapper>
    </>
  )
}
