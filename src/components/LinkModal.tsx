import React from 'react'
import styled from 'styled-components'
import { Modal } from '@material-ui/core'
import { Option, none } from 'fp-ts/lib/Option'

import { Loading } from './Loading'
import { PdfViewer } from './PdfViewer'
import { MediaQuery } from '../theme/theme'

export enum ModalLinkType {
  PDF = 'PDF',
  IFrame = 'Iframe',
}

type ModalLinkConfig = Option<{
  url: string
  bearerToken?: string
  type: ModalLinkType
  downloadButton?: { filename: string }
}>

export type Props = {
  modalOpen: boolean
  config: ModalLinkConfig
  setConfig: (v: ModalLinkConfig) => void
}

export const LinkModal = (props: Props) => {
  const [iframeLoading, setIframeLoading] = React.useState(true)

  return (
    <Modal
      open={props.modalOpen}
      onClose={() => {
        setIframeLoading(true)
        props.setConfig(none)
      }}
      style={{ display: 'flex' }}
    >
      {props.config.fold(<div />, (modalConfig) => (
        <IframeOuterWrapper
          onClick={() => {
            setIframeLoading(true)
            props.setConfig(none)
          }}
        >
          <IframeWrapper
            onClick={(e) => {
              e.stopPropagation()
            }}
            style={
              modalConfig.type === ModalLinkType.PDF
                ? { overflowY: 'auto', overflowX: 'hidden' }
                : { overflow: 'hidden' }
            }
          >
            {iframeLoading && (
              <IframeLoader>
                <Loading style={{ transform: 'scale(0.6)' }} />
              </IframeLoader>
            )}
            {modalConfig.type === ModalLinkType.PDF ? (
              <PdfViewer
                {...modalConfig}
                onLoadSuccess={() => {
                  setIframeLoading(false)
                }}
              />
            ) : (
              <iframe
                src={modalConfig.url}
                onLoad={() => {
                  setIframeLoading(false)
                }}
              ></iframe>
            )}
          </IframeWrapper>
        </IframeOuterWrapper>
      ))}
    </Modal>
  )
}

const IframeOuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${MediaQuery.Small} {
    border-radius: 0px;
  }
`

const IframeWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 1000px;
  border-radius: 8px;
  background-color: white;
  height: 100%;
  position: relative;

  @media ${MediaQuery.Small} {
    border-radius: 0px;
  }
  
  object {
    width: 100%;
    height: 100%;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: 0 !important;
    outline: 0 !important;
  }
`

const IframeLoader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`
