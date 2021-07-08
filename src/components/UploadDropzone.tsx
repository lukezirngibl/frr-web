import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropzone, FileRejection } from 'react-dropzone'
import styled from 'styled-components'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { useCSSStyles, createStyled } from '../theme/util'
import { AppTheme, useAppTheme } from '../theme/theme'
import { P } from '../html'
import { LocaleNamespace } from '../translation'

type DragProps = {
  isDragActive: boolean
  isDragAccept: boolean
  isDragReject: boolean
}

type UploadDropzoneProps = {
  onChange: (files: Array<File>) => void
  acceptedFileTypes?: string
  maxFilesToUpload?: number
  maxFileSize?: number
  localeNamespace?: LocaleNamespace
  style?: Partial<AppTheme['uploadDropzone']>
}

// const PDF = 'application/pdf'
const IMAGE = 'image/*'

export const UploadDropzone = ({
  onChange,
  acceptedFileTypes = 'image/*, application/pdf',
  maxFilesToUpload = 1,
  localeNamespace,
  maxFileSize,
  style,
}: UploadDropzoneProps) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'uploadDropzone')(style)

  const [acceptedFileItems, setAcceptedFileItems] = useState<File[]>([])
  const [rejectedFileItems, setRejectedFileItems] = useState<FileRejection[]>([])
  const isOnlyImagesAllowed = acceptedFileTypes === IMAGE
  const [errorMessage, setErrorMessage] = useState<string>()
  const [loadFiles, setLoadFiles] = useState(false)

  const { t: translate } = useTranslation(localeNamespace)

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: acceptedFileTypes,
    maxFiles: maxFilesToUpload,
    maxSize: maxFileSize,
    disabled: maxFilesToUpload
      ? acceptedFileItems.length >= maxFilesToUpload
      : acceptedFileItems.length > 0,
  })

  useEffect(() => {
    if (
      acceptedFiles.length > 0 &&
      acceptedFileItems.find(
        (file) => file.name === acceptedFiles.find((f) => f.name === file.name)?.name,
      ) === undefined &&
      acceptedFiles.length + acceptedFileItems.length <= maxFilesToUpload
    ) {
      acceptedFiles.map((file: File) => setAcceptedFileItems((prev) => [...prev, file]))
      setRejectedFileItems([])
      setErrorMessage(undefined)
      setLoadFiles(true)
    } else {
      if (
        acceptedFileItems.find(
          (file) => file.name === acceptedFiles.find((f) => f.name === file.name)?.name,
        ) !== undefined
      ) {
        setErrorMessage(translate('dropzone.rejectedFile.fileAlreadySelected'))
      } else if (acceptedFiles.length + acceptedFileItems.length <= maxFilesToUpload) {
        setErrorMessage(translate('dropzone.rejectedFile.tooManyFiles', { maxFilesToUpload }))
      }
    }
  }, [acceptedFiles])

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

      if (maxFilesToUpload && fileRejections.length > maxFilesToUpload)
        setErrorMessage(translate('dropzone.rejectedFile.tooManyFiles', { maxFilesToUpload }))
      else if (isOnlyImagesAllowed) setErrorMessage(translate('dropzone.rejectedFile.fileFormat'))
      else setErrorMessage(translate('dropzone.rejectedFile.uploadPdfMessage'))
    }
  }, [fileRejections])

  useEffect(() => {
    if (loadFiles) {
      onChange(acceptedFileItems)
      setLoadFiles(false)
    }
  }, [loadFiles, acceptedFileItems, onChange])

  function formatFileSize(size: number) {
    const formattedSize: number = size / 1000
    if (formattedSize > 1000) return `${(formattedSize / 1000).toFixed(2)} MB`

    return `${formattedSize.toFixed(2)} KB`
  }

  return (
    <div>
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
              <Section {...getCSSStyle(maxFilesToUpload === 1 ? 'sectionSingleItem' : 'section')}>
                <P
                  {...getCSSStyle('acceptedFilesLabel')}
                  label={maxFilesToUpload === 1 ? 'dropzone.acceptedFile' : 'dropzone.acceptedFiles'}
                />
                {acceptedFileItems.map((file: File) => (
                  <ListItem
                    key={file.name}
                    {...getCSSStyle(maxFilesToUpload === 1 ? 'listSingleItem' : 'listItem')}
                  >
                    {file.name.endsWith('.png' || '.jpeg' || '.svg') && (
                      <ItemIcon
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        {...getCSSStyle('imageItem')}
                      />
                    )}
                    <P
                      isLabelTranslated
                      label={`${file.name} - ${formatFileSize(file.size)}`}
                      {...getCSSStyle('acceptedFileItem')}
                    />
                    <RemoveItemIcon {...getCSSStyle('removeItemIcon')}>
                      <HighlightOffIcon
                        onClick={() => {
                          setAcceptedFileItems(acceptedFileItems.filter((e) => file.name !== e.name))
                          setErrorMessage(undefined)
                        }}
                      />
                    </RemoveItemIcon>
                  </ListItem>
                ))}
              </Section>
            )}
            {rejectedFileItems.length > 0 && (
              <Section {...getCSSStyle('section')}>
                <P {...getCSSStyle('rejectedFilesLabel')} label={'dropzone.rejectedFiles'} />
                {rejectedFileItems.map(({ file, errors }: FileRejection) => (
                  <ListItem key={file.name} {...getCSSStyle('listItem')}>
                    <P
                      isLabelTranslated
                      label={
                        maxFileSize && file.size > maxFileSize
                          ? 'dropzone.rejectedFile.fileSizeMessage'
                          : `${file.name}`
                      }
                      data={{
                        fileName: file.name,
                        maxFileSize: formatFileSize(maxFileSize),
                        fileSize: formatFileSize(file.size),
                      }}
                      {...getCSSStyle('rejectedFileItem')}
                    />
                  </ListItem>
                ))}
              </Section>
            )}
            {errorMessage && (
              <Section {...getCSSStyle('section')}>
                <P
                  {...getCSSStyle('errorMessage')}
                  label={'dropzone.errorLabel'}
                  data={{
                    errorMessage: errorMessage,
                  }}
                />
              </Section>
            )}
          </aside>
        </section>
      )}
    </div>
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
  return 'var(--color-uploadDropzoneDefault)'
}

const Container = createStyled(styled.div<DragProps>`
  border-color: ${(props) => getColor(props)};
`)

const Section = createStyled('div')

const ListItem = createStyled('div')

const ItemIcon = createStyled('img')

const RemoveItemIcon = createStyled('div')
