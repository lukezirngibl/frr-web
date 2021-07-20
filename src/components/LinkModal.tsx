import React from 'react'
import styled from 'styled-components'
import { Modal } from '@material-ui/core'
import { Option, none } from 'fp-ts/lib/Option'
import { Loading } from './Loading'
import { PdfViewer } from './PdfViewer'

const IframeOuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px;
`

const IframeWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 1000px;
  border-radius: 8px;
  background-color: white;
  height: 100%;
  position: relative;

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

export enum ModalLinkType {
  PDF = 'PDF',
  IFrame = 'Iframe',
}

type ModalLinkConfig = Option<{
  url: string
  bearerToken?: string
  type: ModalLinkType
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
      onBackdropClick={() => {
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
