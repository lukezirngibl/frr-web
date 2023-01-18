import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Modal from '@mui/material/Modal'

import { Loading } from './Loading'
import { PdfViewer } from './PdfViewer'
import { MediaQuery } from '../theme/configure.theme'
import { useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { Icon } from './Icon'

export enum ModalLinkType {
  PDF = 'PDF',
  IFrame = 'Iframe',
}

export type ModalLinkConfig = {
  bearerToken?: string
  downloadButton?: { filename: string }
  onClose?: () => void
  type: ModalLinkType
  url: string
} | null

export type Props = {
  modalOpen: boolean
  config: ModalLinkConfig
  setConfig: (v: ModalLinkConfig) => void
}

export const LinkModal = (props: Props) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'pdfViewer')({})

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
    props.setConfig(null)
  }

  return (
    // @ts-ignore
    <Modal open={props.modalOpen} onClose={onClose} style={{ display: 'flex' }}>
      {props.config && (
        <IframeOuterWrapper
          onClick={() => {
            setIframeLoading(true)
            props.setConfig(null)
          }}
        >
          <IframeWrapper
            onClick={(e) => {
              e.stopPropagation()
            }}
            isPdf={props.config.type === ModalLinkType.PDF}
            style={
              props.config.type === ModalLinkType.PDF
                ? { overflowY: 'auto', overflowX: 'hidden', width: viewerWidth }
                : { overflow: 'hidden' }
            }
          >
            {iframeLoading && (
              <IframeLoader>
                <Loading style={{ transform: 'scale(0.6)' }} />
              </IframeLoader>
            )}
            {props.config.type === ModalLinkType.PDF ? (
              <PdfViewer
                {...props.config}
                onLoadSuccess={() => setIframeLoading(false)}
                onClose={onClose}
                width={viewerWidth}
              />
            ) : (
              <>
                <iframe
                  src={props.config.url}
                  onLoad={() => {
                    setIframeLoading(false)
                  }}
                ></iframe>

                <PageSelectorWrapper {...getCSSStyle('pageSelectorWrapper')}></PageSelectorWrapper>
                {props.config.onClose && (
                  <CloseButton {...getCSSStyle('closeButton')} onClick={props.config.onClose}>
                    <Icon icon={'close'} size={24} />
                  </CloseButton>
                )}
              </>
            )}
          </IframeWrapper>
        </IframeOuterWrapper>
      )}
    </Modal>
  )
}

const CloseButton = createStyled('div')
const PageSelectorWrapper = createStyled('div')

const IframeOuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;

  @media ${MediaQuery.Small} {
    border-radius: 0px;
    padding: 0;
  }
`

const IframeWrapper = styled.div<{ isPdf: boolean }>`
  height: ${({ isPdf }) => (isPdf ? '1200px' : '100%')};
  width: 100%;
  max-width: 800px;
  max-height: 100%;
  border-radius: 8px;
  background-color: white;
  position: relative;

  @media ${MediaQuery.Small} {
    border-radius: 0px;
    height: 100%;
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
