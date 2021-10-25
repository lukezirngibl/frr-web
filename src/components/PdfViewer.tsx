import React from 'react'
import styled from 'styled-components'
import { Icon } from './Icon'
import { Loading } from './Loading'
import { Document, Page, Outline } from 'react-pdf'
import pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

const PageSelectorWrapper = createStyled('div')
const PageNumber = createStyled('p')
const PageSelector = createStyled('div')
const PdfWrapper = createStyled('div')
const DownloadButton = createStyled('div')

export enum ModalLinkType {
  PDF = 'PDF',
  IFrame = 'Iframe',
}

export type Props = {
  onLoadSuccess: () => void
  url: string
  downloadButton?: { filename: string }
  bearerToken?: string
  style?: Partial<AppTheme['pdfViewer']>
  scale?: number;
  width?: number;
}

export const PdfViewer = (props: Props) => {
  const [numPages, setNumPages] = React.useState(0)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [file, setFile] = React.useState<string | ArrayBuffer>()

  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'pdfViewer')(props.style)

  const getPDF = (url: string) => {
    setFile(undefined)
    fetch(url, {
      method: 'GET',
      headers: {
        ...(props.bearerToken
          ? {
              Authorization: `Bearer ${props.bearerToken}`,
            }
          : {}),
      },
    })
      .then((response) => {
        response.blob().then((blob) => {
          const fileReader = new FileReader()

          fileReader.onloadend = function (event) {
            const buffer = event.target.result
            setFile(buffer)
          }
          fileReader.readAsArrayBuffer(blob)
        })
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  React.useEffect(() => {
    getPDF(props.url)
  }, [])

  if (!file) {
    return <></>
  }

  return (
    <>
      {props.downloadButton && (
        <DownloadButton
          {...getCSSStyle('downloadButton')}
          onClick={() => {
            var a: any = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'

            const blob = new Blob([file])
            const url = window.URL.createObjectURL(blob)
            a.href = url
            a.download = props.downloadButton.filename
            a.click()
            window.URL.revokeObjectURL(url)
          }}
        >
          <Icon icon="download" size={24} onClick={(e) => {}} />
        </DownloadButton>
      )}
      <PageSelectorWrapper {...getCSSStyle('pageSelectorWrapper')}>
        <PageSelector {...getCSSStyle('pageSelector')}>
          <Icon
            icon="keyboard_arrow_left"
            size={24}
            onClick={(e) => {
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

          <PageNumber {...getCSSStyle('pageNumber')}>
            {pageNumber} / {numPages}
          </PageNumber>
          <Icon
            icon="keyboard_arrow_right"
            size={24}
            onClick={(e) => {
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
      <PdfWrapper {...getCSSStyle('pdfWrapper')}>
        <Document
          loading={<Loading style={{ transform: 'scale(0.6)' }} />}
          file={{
            data: file,
          }}
          onLoadSuccess={({ numPages }) => {
            props.onLoadSuccess()
            setNumPages(numPages)
          }}
        >
          <Outline
            onItemClick={({ pageNumber }) => {
              setPageNumber(pageNumber)
            }}
          />
          <Page loading={<Loading style={{ transform: 'scale(0.6)' }} />} pageNumber={pageNumber} width={props.width || 800} scale={props.scale} />
        </Document>
      </PdfWrapper>
    </>
  )
}
