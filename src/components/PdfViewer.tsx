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
  const [pdfData, setPdfData] = useState<{ data: Uint8Array } | null>(null)

  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'pdfViewer')(props.style)

  const getPDF = (url: string) => {
    setPdfData(null)
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
            const buffer = event.target.result as ArrayBuffer
            setPdfData({ data: new Uint8Array(buffer) })
          }
          fileReader.readAsArrayBuffer(blob)
        })
      })
      .catch((error) => {
        // console.log(error)
      })
  }

  React.useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
    getPDF(props.url)
  }, [])

  if (!pdfData) {
    return <></>
  }

  return (
    <>
      {props.downloadButton && (
        <Div
          {...getCSSStyle('downloadButton')}
          onClick={() => {
            var a: any = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'

            const blob = new Blob([pdfData.data])
            const url = window.URL.createObjectURL(blob)
            a.href = url
            a.download = props.downloadButton.filename
            a.click()
            window.URL.revokeObjectURL(url)
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
                // setIframeLoading(true)
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
                // setIframeLoading(true)
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
          file={pdfData}
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
