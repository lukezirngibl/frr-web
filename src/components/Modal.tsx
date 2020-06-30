import { Modal as MaterialUiModal } from '@material-ui/core'
import React, { FC, useEffect, ReactNode } from 'react'
import styled from 'styled-components'

const ModalOuterWrapper = styled.div`
  width: 100%;
  margin: auto;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  outline: none;
  overflow: hidden;
`

const ModalInnerWrapper = styled.div`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  width: 100%;
  background-color: white;
  border-radius: 0;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

type Props = {
  open: boolean
  children: ReactNode
}

export const Modal = (props: Props) => {
  return (
    <MaterialUiModal open={props.open}>
      <ModalOuterWrapper>
        <ModalInnerWrapper>
          {props.open ? props.children : <></>}
        </ModalInnerWrapper>
      </ModalOuterWrapper>
    </MaterialUiModal>
  )
}
