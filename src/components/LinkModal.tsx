import React, { useEffect, useState } from 'react'
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
  onClose?: () => void
}>

export type Props = {
  modalOpen: boolean
  config: ModalLinkConfig
  setConfig: (v: ModalLinkConfig) => void
}

export const LinkModal = (props: Props) => {
  const [iframeLoading, setIframeLoading] = useState(true)

  const [viewerWidth, setViewerWidth] = useState(800)
  const [windowWidth, setWindowWith] = useState(window.innerWidth)

  useEffect(() => {
    const onWindowResize = () => setWindowWith(window.innerWidth)
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  useEffect(() => {
    if (windowWidth < 840) {
      setViewerWidth(windowWidth)
    } else {
      setViewerWidth(800)
    }
  }, [windowWidth])

  const onClose = () => {
    setIframeLoading(true)
    props.setConfig(none)
  }

  return (
    <Modal open={props.modalOpen} onClose={onClose} style={{ display: 'flex' }}>
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
                ? { overflowY: 'auto', overflowX: 'hidden', width: viewerWidth }
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
                onClose={onClose}
                width={viewerWidth}
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
  height: 100%;
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
  background-color: white;
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
