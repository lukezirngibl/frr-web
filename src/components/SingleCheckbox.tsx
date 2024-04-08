import { Div } from '../html'
import {
  ComponentTheme,
  useCSSStyles,
  useComponentTheme,
  useInlineStyle,
} from '../theme/theme.components'
import { Label, LabelProps } from './Label'

export type SingleCheckboxProps = {
  dataTestid?: string
  disabled?: boolean
  error: boolean
  label?: LabelProps
  name?: string
  onChange: (value: boolean) => void
  style?: ComponentTheme['singleCheckbox']
  value: boolean
}

export const SingleCheckbox = (props: SingleCheckboxProps) => {
  const { value } = props

  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'singleCheckbox')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'singleCheckbox')(props.style)
  const inputStyle = getInlineStyle({ input: true, inputDisabled: props.disabled }, { marginLeft: 16 })
  return (
    <>
      {props.label && <Label style={{ wrapper: { marginBottom: 0 } }} {...props.label}></Label>}
      <Div {...getCSSStyles({ wrapper: true, wrapperDisabled: props.disabled })}>
        <input
          checked={value}
          disabled={props.disabled}
          data-test-id={props.dataTestid}
          data-theme-id={inputStyle.dataThemeId}
          onChange={() => props.onChange(!value)}
          name={props.name}
          style={inputStyle.style}
          type="checkbox"
        />
      </Div>
    </>
  )
}
