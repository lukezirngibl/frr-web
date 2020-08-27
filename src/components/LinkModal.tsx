import React from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'
import { Modal } from '@material-ui/core'
import { Option, none, some } from 'fp-ts/lib/Option'
import { Loading } from './Loading'
import { Document, Page, Outline } from 'react-pdf'
import pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

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

const PageSelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 56px;
  position: absolute;
  bottom: 8px;
  left: 0;
`

const PageNumber = styled.p`
  font-size: 18px;
`

const PageSelector = styled.div`
  width: 192px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background-color: white;
  box-shadow: 2px 2px 24px 24px rgba(0, 0, 0, 0.08);
  height: 56px;
  z-index: 10;
`

export enum ModalLinkType {
  PDF = 'PDF',
  IFrame = 'Iframe',
}

type ModalLinkConfig = Option<{ url: string; type: ModalLinkType }>

export type Props = {
  modalOpen: boolean
  config: ModalLinkConfig
  setConfig: (v: ModalLinkConfig) => void
}

export const LinkModal = (props: Props) => {
  const [iframeLoading, setIframeLoading] = React.useState(true)
  const [numPages, setNumPages] = React.useState(0)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [file, setFile] = React.useState<any>()

  const getPDF = (url: string) => {
    setFile(undefined)
    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        response.blob().then(blob => {
          const fileReader = new FileReader()

          fileReader.onloadend = function(event) {
            const buffer = event.target.result
            setFile(buffer)
          }
          fileReader.readAsArrayBuffer(blob)
        })
      })
      .catch(error => {
        // console.log(error)
      })
  }

  React.useEffect(() => {
    if (
      props.config.isSome() &&
      props.config.value.type === ModalLinkType.PDF
    ) {
      getPDF(props.config.value.url)
    }
  }, [props.config])

  return (
    <Modal
      open={props.modalOpen}
      onBackdropClick={() => {
        setIframeLoading(true)
        props.setConfig(none)
      }}
      style={{ display: 'flex' }}
    >
      {props.config.fold(null, modalConfig => (
        <IframeOuterWrapper
          onClick={() => {
            setIframeLoading(true)
            props.setConfig(none)
            setNumPages(0)
            setPageNumber(1)
          }}
        >
          {numPages !== 0 && modalConfig.type === ModalLinkType.PDF && (
            <PageSelectorWrapper>
              <PageSelector>
                <Icon
                  icon="keyboard_arrow_left"
                  size={24}
                  onClick={e => {
                    e.stopPropagation()
                    if (pageNumber !== 1) {
                      setPageNumber(pageNumber - 1)
                      // setIframeLoading(true)
                    }
                  }}
                  style={{
                    opacity: pageNumber === 1 ? 0.2 : 1,
                  }}
                />

                <PageNumber>
                  {pageNumber} / {numPages}
                </PageNumber>
                <Icon
                  icon="keyboard_arrow_right"
                  size={24}
                  onClick={e => {
                    e.stopPropagation()
                    if (pageNumber !== numPages) {
                      setPageNumber(pageNumber + 1)
                      // setIframeLoading(true)
                    }
                  }}
                  style={{
                    opacity: pageNumber === numPages ? 0.2 : 1,
                  }}
                />
              </PageSelector>
            </PageSelectorWrapper>
          )}
          <IframeWrapper
            onClick={e => {
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
            {modalConfig.type === ModalLinkType.PDF && file !== undefined ? (
              <>
                <Document
                  loading={
                    <IframeLoader>
                      <Loading style={{ transform: 'scale(0.6)' }} />
                    </IframeLoader>
                  }
                  file={{
                    data: file,
                  }}
                  onLoadSuccess={({ numPages }) => {
                    setIframeLoading(false)
                    setNumPages(numPages)
                  }}
                >
                  <Outline
                    onItemClick={({ pageNumber }) => {
                      setPageNumber(pageNumber)
                    }}
                  />
                  <Page
                    loading={
                      <IframeLoader>
                        <Loading style={{ transform: 'scale(0.6)' }} />
                      </IframeLoader>
                    }
                    pageNumber={pageNumber}
                  />
                </Document>
              </>
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
