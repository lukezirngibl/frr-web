import { Div } from '../../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { Props as ButtonProps } from '../Button'
import { Label, LabelProps } from '../Label'
import { UploadDropzone } from './UploadDropzone'

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
      <Div {...getCSSStyle('wrapper')}>
        <UploadDropzone onChange={(files) => props.onChange(files)} />
      </Div>
    </>
  )
}
