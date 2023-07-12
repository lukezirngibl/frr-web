import React from 'react'
import { Document, Outline, Page } from 'react-pdf/dist/esm/entry.webpack5'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { Loading } from './Loading'
import { MdClose } from '../icons/new/MdClose'
import { MdDownload } from '../icons/new/MdDownload'
import { MdFullscreen } from '../icons/new/MdFullscreen'
import { MdKeyboardArrowLeft } from '../icons/new/MdKeyboardArrowLeft'
import { MdKeyboardArrowRight } from '../icons/new/MdKeyboardArrowRight'

const PageSelectorWrapper = createStyled('div')
const PageNumber = createStyled('p')
const PageSelector = createStyled('div')
const PdfWrapper = createStyled('div')
const DownloadButton = createStyled('div')
const CloseButton = createStyled('div')

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
  const [numPages, setNumPages] = React.useState(0)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [file, setFile] = React.useState<string | ArrayBuffer>()

  const theme = useComponentTheme()
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
          <MdDownload width={24} />
        </DownloadButton>
      )}
      <PageSelectorWrapper {...getCSSStyle('pageSelectorWrapper')}>
        <PageSelector {...getCSSStyle('pageSelector')}>
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
            }}
          />

          <PageNumber {...getCSSStyle('pageNumber')}>
            {pageNumber} / {numPages}
          </PageNumber>
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
            }}
          />
        </PageSelector>
      </PageSelectorWrapper>

      {((props.isFullscreen && props.onFullscreenChanged) || props.onClose) && (
        <CloseButton
          {...getCSSStyle('closeButton')}
          onClick={props.onFullscreenChanged || props.onClose}
        >
          {props.isFullscreen ? <MdFullscreen width={24} /> : <MdClose width={24} />}
        </CloseButton>
      )}

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
          <Page
            loading={<Loading style={{ transform: 'scale(0.6)' }} />}
            pageNumber={pageNumber}
            width={props.width || 800}
            scale={props.scale}
          />
        </Document>
      </PdfWrapper>
    </>
  )
}
