import MaterialUiModal from '@mui/material/Modal'
import React, { ReactNode } from 'react'
import { Div } from '../html'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'


type Props = {
  children: ReactNode
  onClose?: () => void
  open: boolean
  style?: Partial<ComponentTheme['modal']>
}

export const Modal = (props: Props) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'modal')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'modal')(props.style)

  return (
    // @ts-ignore
    <MaterialUiModal
      open={props.open}
      onClose={props.onClose}
      style={getInlineStyle('outerWrapper').style}
    >
      <Div {...getCSSStyle('innerWrapper')}>
        {props.open ? props.children : <></>}
      </Div>
    </MaterialUiModal>
  )
}
