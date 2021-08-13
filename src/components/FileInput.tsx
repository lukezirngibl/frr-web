import React from 'react'

import { LabelProps, Label } from './Label'
import { Props as ButtonProps } from './Button'
import { AppTheme } from '../theme/theme'
import { useCSSStyles, createStyled } from '../theme/util'
import { useAppTheme } from '../theme/theme'
import { UploadDropzone } from './UploadDropzone'

const Wrapper = createStyled('div')

export type Props = {
  dataTestId?: string
  label?: LabelProps
  onChange: (n: File | null) => void
  style?: Partial<AppTheme['fileInput']>
  value: File | null
}

export const FileInput = (props: Props) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'fileInput')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper {...getCSSStyle('wrapper')} data-test-id={props.dataTestId}>
        <UploadDropzone onChange={(files) => props.onChange(files[0])} maxFilesToUpload={1} />
      </Wrapper>
    </>
  )
}
