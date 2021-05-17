import React from 'react'
import { LabelProps, Label } from './Label'
import { TextInput, Props as TextInputProps } from './TextInput'
import { Button, Props as ButtonProps } from './Button'
import { AppTheme } from '../theme/theme'
import { getUseInlineStyle, useCSSStyles, createStyled } from '../theme/util'
import { useAppTheme } from '../theme/theme'

const Wrapper = createStyled('div')

export type Props = {
  label?: LabelProps
  buttonProps?: Partial<ButtonProps>
  style?: Partial<AppTheme['fileInput']>
  onChange: (n: File | null) => void
  value: File | null
}

export const FileInput = (props: Props) => {
  const inputRef = React.createRef<HTMLInputElement>()

  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'fileInput')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper {...getCSSStyle('wrapper')}>
        <TextInput
          value={props.value ? props.value.name : ''}
          style={{ wrapper: { pointerEvents: 'none' } }}
        />
        <input
          style={{ display: 'none' }}
          onChange={(e: any) => {
            if (e.target.files.length > 0) {
              props.onChange(e.target.files[0])
            }
          }}
          ref={inputRef}
          type="file"
          id="upload-file"
        />
        <Button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.click()
            }
          }}
          label="Select File"
          {...props.buttonProps}
        />
      </Wrapper>
    </>
  )
}
