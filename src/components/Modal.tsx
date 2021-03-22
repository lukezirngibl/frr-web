import { Modal as MaterialUiModal, ModalProps } from '@material-ui/core'
import React, { FC, useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { useAppTheme, AppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'

const ModalOuterWrapper = createStyled('div')
const ModalInnerWrapper = createStyled('div')

type Props = {
  open: boolean
  children: ReactNode
  style?: Partial<AppTheme['modal']>
  modalProps?: Partial<ModalProps>
}

export const Modal = (props: Props) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'modal')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'modal')(props.style)

  return (
    <MaterialUiModal
      open={props.open}
      {...(props.modalProps || {})}
      style={getInlineStyle('outerWrapper').style}
    >
      <ModalInnerWrapper {...getCSSStyle('innerWrapper')}>
        {props.open ? props.children : <></>}
      </ModalInnerWrapper>
    </MaterialUiModal>
  )
}
