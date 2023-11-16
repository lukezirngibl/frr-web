import { useEffect, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Div, P } from '../../html'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { LocaleNamespace } from '../../translation'
import { UploadDocumentItem, formatFileSize } from './UploadDocumentItem'

type DragProps = {
  isDragActive: boolean
  isDragAccept: boolean
  isDragReject: boolean
}

export type UploadDropzoneProps = {
  acceptedFileTypes?: string
  localeNamespace?: LocaleNamespace
  maxFileSize?: number
  maxFilesToUpload?: number
  onChange: (files: Array<File>) => void
  style?: Partial<ComponentTheme['uploadDropzone']>
}

// const PDF = 'application/pdf'
const IMAGE = 'image/*'

export const UploadDropzone = ({
  acceptedFileTypes = 'image/*, application/pdf',
  localeNamespace,
  maxFileSize,
  maxFilesToUpload,
  onChange,
  style,
}: UploadDropzoneProps) => {
  const { t: translate } = useTranslation(localeNamespace)

  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'uploadDropzone')(style)

  // Internal file list states
  const [acceptedFileItems, setAcceptedFileItems] = useState<File[]>([])
  const [rejectedFileItems, setRejectedFileItems] = useState<FileRejection[]>([])
  const [errorMessage, setErrorMessage] = useState<string>()
  const [hasFileListChanged, setFileListChanged] = useState(false)

  const isOnlyImagesAllowed = acceptedFileTypes === IMAGE

  // React dropzone
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: acceptedFileTypes.split(', ').reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: maxFilesToUpload,
    maxSize: maxFileSize,
    disabled: maxFilesToUpload
      ? acceptedFileItems.length >= maxFilesToUpload
      : acceptedFileItems.length > 0,
  })

  // Handle accepted files
  useEffect(() => {
    if (
      acceptedFiles.length > 0 &&
      acceptedFileItems.find(
        (file) => file.name === acceptedFiles.find((f) => f.name === file.name)?.name,
      ) === undefined &&
      (!!maxFilesToUpload ? acceptedFiles.length + acceptedFileItems.length <= maxFilesToUpload : true)
    ) {
      acceptedFiles.map((file: File) => setAcceptedFileItems((prev) => [...prev, file]))
      setRejectedFileItems([])
      setErrorMessage(undefined)
      setFileListChanged(true)
    } else {
      if (
        acceptedFileItems.find(
          (file) => file.name === acceptedFiles.find((f) => f.name === file.name)?.name,
        ) !== undefined
      ) {
        setErrorMessage(translate('dropzone.rejectedFile.fileAlreadySelected'))
      } else if (
        !!maxFilesToUpload &&
        acceptedFiles.length + acceptedFileItems.length <= maxFilesToUpload
      ) {
        setErrorMessage(translate('dropzone.rejectedFile.tooManyFiles', { maxFilesToUpload }))
      }
    }
  }, [acceptedFiles])

  // Handle rejected files
  useEffect(() => {
    if (
      fileRejections.length > 0 &&
      rejectedFileItems.find(
        ({ file }) => file.name === fileRejections.find((f) => f.file.name === file.name)?.file.name,
      ) === undefined
    ) {
      fileRejections.map(({ file, errors }: FileRejection) =>
        setRejectedFileItems((prev) => [...prev, { file, errors }]),
      )

      if (!!maxFilesToUpload && fileRejections.length > maxFilesToUpload)
        setErrorMessage(translate('dropzone.rejectedFile.tooManyFiles', { maxFilesToUpload }))
      else if (isOnlyImagesAllowed) setErrorMessage(translate('dropzone.rejectedFile.fileFormat'))
      else setErrorMessage(translate('dropzone.rejectedFile.uploadPdfMessage'))
    }
  }, [fileRejections])

  // Send files to form
  useEffect(() => {
    if (hasFileListChanged) {
      onChange(acceptedFileItems)
      setFileListChanged(false)
    }
  }, [hasFileListChanged, acceptedFileItems, onChange])

  return (
    <>
      {maxFilesToUpload === acceptedFileItems.length ? null : (
        <Container
          {...(getRootProps({ isDragActive, isDragAccept, isDragReject }) as DragProps)}
          {...getCSSStyle('container')}
        >
          <input {...getInputProps()} />
          <>
            <P
              label={isOnlyImagesAllowed === true ? 'dropzone.imagesLabel' : 'dropzone.label'}
              {...getCSSStyle('dropzoneLabel')}
            />
            {maxFileSize && (
              <P
                {...getCSSStyle('dropzoneSublabel')}
                label={'dropzone.sublabel'}
                data={{
                  maxFileSize: formatFileSize(maxFileSize),
                }}
              />
            )}
          </>
        </Container>
      )}

      {(acceptedFileItems.length > 0 || rejectedFileItems.length > 0) && (
        <section className="section">
          <aside>
            {acceptedFileItems.length > 0 && (
              <Div {...getCSSStyle(maxFilesToUpload === 1 ? 'sectionSingleItem' : 'section')}>
                <P
                  {...getCSSStyle('acceptedFilesLabel')}
                  label={maxFilesToUpload === 1 ? 'dropzone.acceptedFile' : 'dropzone.acceptedFiles'}
                />

                {acceptedFileItems.map((file: File) => (
                  <UploadDocumentItem
                    file={file}
                    key={file.name}
                    maxFilesToUpload={maxFilesToUpload}
                    maxFileSize={maxFileSize}
                    onRemove={() => {
                      setAcceptedFileItems(acceptedFileItems.filter((f) => file.name !== f.name))
                      setErrorMessage(undefined)
                      setFileListChanged(true)
                    }}
                    style={style}
                  />
                ))}
              </Div>
            )}
            {rejectedFileItems.length > 0 && (
              <Div {...getCSSStyle('section')}>
                <P {...getCSSStyle('rejectedFilesLabel')} label={'dropzone.rejectedFiles'} />
                {rejectedFileItems.map(({ file, errors }: FileRejection) => (
                  <UploadDocumentItem
                    file={file}
                    key={file.name}
                    maxFilesToUpload={maxFilesToUpload}
                    maxFileSize={maxFileSize}
                    onRemove={() => {
                      setRejectedFileItems(
                        rejectedFileItems.filter((item) => file.name !== item.file.name),
                      )
                      setErrorMessage(undefined)
                    }}
                    style={style}
                  />
                ))}
              </Div>
            )}
            {errorMessage && (
              <P
                {...getCSSStyle('errorMessage')}
                label={'dropzone.errorLabel'}
                data={{
                  errorMessage: errorMessage,
                }}
              />
            )}
          </aside>
        </section>
      )}
    </>
  )
}

const getColor = (props: DragProps) => {
  if (props.isDragAccept) {
    return 'var(--color-uploadDropzoneIsDragAccept)'
  }
  if (props.isDragReject) {
    return 'var(--color-uploadDropzoneIsDragReject)'
  }
  if (props.isDragActive) {
    return 'var(--color-uploadDropzoneIsDragActive)'
  }
  return 'var(--color-background-button-default)'
}

const Container = createStyled(styled.div<DragProps>`
  border-color: ${(props) => getColor(props)};
`)
