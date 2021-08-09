import { Modal as MaterialUiModal } from '@material-ui/core'
import React, { ReactNode } from 'react'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'

const ModalInnerWrapper = createStyled('div')

type Props = {
  children: ReactNode
  onClose?: () => void
  open: boolean
  style?: Partial<AppTheme['modal']>
}

export const Modal = (props: Props) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'modal')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'modal')(props.style)

  return (
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
