import { Modal as MaterialUiModal } from '@material-ui/core'
import React, { ReactNode } from 'react'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'

const ModalInnerWrapper = createStyled('div')

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
      <ModalInnerWrapper {...getCSSStyle('innerWrapper')}>
        {props.open ? props.children : <></>}
      </ModalInnerWrapper>
    </MaterialUiModal>
  )
}
