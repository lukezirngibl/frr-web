import React from 'react'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { Props as ButtonProps } from '../Button'
import { Label, LabelProps } from '../Label'
import { UploadDropzone } from './UploadDropzone'

const Wrapper = createStyled('div')

export type MultiFileInputProps = {
  label?: LabelProps
  buttonProps?: Partial<ButtonProps>
  style?: Partial<ComponentTheme['multiFileInput']>
  onChange: (n: Array<File> | []) => void
  value: Array<File> | []
}

export const MultiFileInput = (props: MultiFileInputProps) => {
  const theme = useComponentTheme()
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
