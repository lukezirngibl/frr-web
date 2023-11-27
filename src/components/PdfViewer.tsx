import React, { useState } from 'react'
import { Document, Outline, Page, pdfjs } from 'react-pdf'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { Loading } from './Loading'
import { MdClose } from '../icons/new/MdClose'
import { MdDownload } from '../icons/new/MdDownload'
import { MdFullscreen } from '../icons/new/MdFullscreen'
import { MdKeyboardArrowLeft } from '../icons/new/MdKeyboardArrowLeft'
import { MdKeyboardArrowRight } from '../icons/new/MdKeyboardArrowRight'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export enum ModalLinkType {
  PDF = 'PDF',
  IFrame = 'Iframe',
}

const downloadPdf = (params: { fileName: string; blob: Blob }) => {
  // Create a temporary URL for the blob
  const url = URL.createObjectURL(params.blob)

  // Create a link element and trigger the download
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style.display = 'none'
  a.href = url
  a.download = params.fileName
  a.click()

  // Clean up
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

export type Props = {
  bearerToken?: string
  downloadButton?: { filename: string }
  isFullscreen?: boolean
  onClose?: () => void
  onFullscreenChanged?: (v: boolean) => void
  onLoadSuccess: () => void
  scale?: number
  style?: Partial<ComponentTheme['pdfViewer']>
  url: string
  width?: number
}

export const PdfViewer = (props: Props) => {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfDownloadData, setPdfDownloadData] = useState<Blob | null>(null)

  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'pdfViewer')(props.style)

  React.useEffect(() => {
    fetch(props.url, {
      method: 'GET',
      headers: {
        ...(props.bearerToken
          ? {
              Authorization: `Bearer ${props.bearerToken}`,
            }
          : {}),
      },
    })
      .then((response) => response.blob())
      .then((blob) => setPdfDownloadData(blob))
      .catch((error) => {
        // console.log(error)
      })
  }, [])

  if (!pdfDownloadData) {
    return <></>
  }

  return (
    <>
      {props.downloadButton && (
        <Div
          {...getCSSStyle('downloadButton')}
          onClick={() => {
            downloadPdf({ fileName: props.downloadButton.filename, blob: pdfDownloadData })
          }}
        >
          <MdDownload width={24} />
        </Div>
      )}
      <Div {...getCSSStyle('pageSelectorWrapper')}>
        <Div {...getCSSStyle('pageSelector')}>
          <MdKeyboardArrowLeft
            onClick={(e) => {
              e.stopPropagation()
              if (pageNumber !== 1) {
                setPageNumber(pageNumber - 1)
              }
            }}
            width={24}
            style={{
              opacity: pageNumber === 1 ? 0.2 : 1,
              cursor: pageNumber === 1 ? 'default' : 'pointer',
            }}
          />

          <Text {...getCSSStyle('pageNumber')}>
            {pageNumber} / {numPages}
          </Text>

          <MdKeyboardArrowRight
            onClick={(e) => {
              e.stopPropagation()
              if (pageNumber !== numPages) {
                setPageNumber(pageNumber + 1)
              }
            }}
            width={24}
            style={{
              opacity: pageNumber === numPages ? 0.2 : 1,
              cursor: pageNumber === numPages ? 'default' : 'pointer',
            }}
          />
        </Div>
      </Div>

      {((props.isFullscreen && props.onFullscreenChanged) || props.onClose) && (
        <Div {...getCSSStyle('closeButton')} onClick={props.onFullscreenChanged || props.onClose}>
          {props.isFullscreen ? <MdFullscreen width={24} /> : <MdClose width={24} />}
        </Div>
      )}

      <Div {...getCSSStyle('pdfWrapper')}>
        <Document
          loading={<Loading style={{ transform: 'scale(0.6)' }} />}
          file={pdfDownloadData}
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
          <Page
            loading={<Loading style={{ transform: 'scale(0.6)' }} />}
            pageNumber={pageNumber}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            scale={props.scale}
            width={props.width || 800}
          />
        </Document>
      </Div>
    </>
  )
}

const Div = createStyled('div')
const Text = createStyled('p')
