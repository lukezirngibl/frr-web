import React from 'react'

import { LabelProps, Label } from './Label'
import { Props as ButtonProps } from './Button'
import { AppTheme } from '../theme/theme'
import { useCSSStyles, createStyled } from '../theme/util'
import { useAppTheme } from '../theme/theme'
import { UploadDropzone } from './UploadDropzone'

const Wrapper = createStyled('div')

export type Props = {
  label?: LabelProps
  buttonProps?: Partial<ButtonProps>
  style?: Partial<AppTheme['multiFileInput']>
  onChange: (n: Array<File> | []) => void
  value: Array<File> | []
}

export const MultiFileInput = (props: Props) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'multiFileInput')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper {...getCSSStyle('wrapper')}>
        <UploadDropzone onChange={(files) => props.onChange(files)} />
      </Wrapper>
    </>
  )
}