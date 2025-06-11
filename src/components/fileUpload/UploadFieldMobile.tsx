import React, { useEffect, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Div, P } from '../../html'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { LocaleNamespace } from '../../translation'
import { UploadDocumentItem, formatFileSize } from './UploadDocumentItem'
import { Modal } from '../Modal'
import { OptionGroup } from '../OptionGroup'
import { BsCamera } from '../../icons/new/BsCamera'
import { IoImagesOutline } from '../../icons/new/IoImagesOutline'

type DragProps = {
  isDragActive: boolean
  isDragAccept: boolean
  isDragReject: boolean
}

export type UploadFieldMobileProps = {
  acceptedFileTypes?: string
  localeNamespace?: LocaleNamespace
  maxFileSize?: number
  onChange: (files: Array<File>) => void
  style?: Partial<ComponentTheme['uploadDropzone']>
}

// const PDF = 'application/pdf'
const IMAGE = 'image/*'

export const UploadFieldMobile = ({
  acceptedFileTypes = 'image/*, application/pdf',
  localeNamespace,
  maxFileSize,
  onChange,
  style,
}: UploadFieldMobileProps) => {
  const { t: translate } = useTranslation(localeNamespace)

  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'uploadDropzone')(style)

  // Internal file list states
  const [file, setFile] = useState<File | null>(null)
  const [hasFileListChanged, setFileListChanged] = useState(false)

  useEffect(() => {
    console.log('FILES CHANGED', {
      file,
      hasFileListChanged,
    })
  }, [file, hasFileListChanged])

  const handleFileUpload = (value: 'camera' | 'gallery') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = false

    if (value === 'camera') {
      input.accept = 'image/*'
      input.capture = 'environment'
    } else {
      input.accept = acceptedFileTypes
    }

    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files
      if (files && files.length === 1) {
        const fileArray = Array.from(files)
        setFile(fileArray[0])
        onChange(fileArray)
        setFileListChanged(true)
      }
    }

    input.click()
  }

  return file === null ? (
    <OptionGroup
      value={null}
      onChange={handleFileUpload}
      options={[
        {
          value: 'camera',
          CustomElement: (
            <>
              <BsCamera width={36} height={36} />
              <P label={'uploadFieldMobile.camera.label'} localeNamespace={localeNamespace} />
            </>
          ),
        },
        {
          value: 'gallery',
          CustomElement: (
            <>
              <IoImagesOutline width={36} height={36} />
              <P label={'uploadFieldMobile.gallery.label'} localeNamespace={localeNamespace} />
            </>
          ),
        },
      ]}
      style={{
        item: {
          boxSizing: 'unset',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          height: 84,
          width: '50%',
          padding: '12px 8px',
        },
      }}
    />
  ) : (
    <section className="section">
      {/* <Container {...getCSSStyle('container')} onClick={() => handleFileUpload('gallery')}>
        <BsCamera width="24px" height="24px" />
        <P label={'dropzone.labelCamera'} {...getCSSStyle('dropzoneLabel')} />
        {maxFileSize && (
          <P
            {...getCSSStyle('dropzoneSublabel')}
            label={'dropzone.sublabel'}
            data={{
              maxFileSize: formatFileSize(maxFileSize),
            }}
          />
        )}
      </Container>

      <Container {...getCSSStyle('container')} onClick={() => setShowUploadFileModal(true)}>
        <BsCamera width="24px" height="24px" />
        <P label={'dropzone.labelCamera'} {...getCSSStyle('dropzoneLabel')} />
        {maxFileSize && (
          <P
            {...getCSSStyle('dropzoneSublabel')}
            label={'dropzone.sublabel'}
            data={{
              maxFileSize: formatFileSize(maxFileSize),
            }}
          />
        )}
      </Container> */}

      <Div {...getCSSStyle('sectionSingleItem')}>
        <UploadDocumentItem
          file={file}
          key={file.name}
          maxFilesToUpload={1}
          maxFileSize={maxFileSize}
          onRemove={() => {
            setFile(null)
            setFileListChanged(true)
          }}
          style={style}
        />
      </Div>
    </section>
  )
}
