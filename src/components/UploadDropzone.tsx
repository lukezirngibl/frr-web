import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropzone, FileRejection } from 'react-dropzone'
import styled from 'styled-components'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { useCSSStyles } from '../theme/util'
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
          className="uploadDropZone-container"
        >
          <input {...getInputProps()} />
          <>
            <P label={isOnlyImagesAllowed === true ? 'dropzone.imagesLabel' : 'dropzone.label'} />
            {maxFileSize && (
              <P
                style={{ fontSize: 12 }}
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
              <Section
                style={
                  maxFilesToUpload === 1
                    ? {
                        paddingTop: '0px',
                        display: 'flex',
                        width: '100%',
                        whiteSpace: 'nowrap',
                        alignItems: 'center',
                      }
                    : null
                }
              >
                <P
                  {...getCSSStyle('acceptedFilesLabel')}
                  label={maxFilesToUpload === 1 ? 'dropzone.acceptedFile' : 'dropzone.acceptedFiles'}
                />
                {acceptedFileItems.map((file: File) => (
                  <ListItem
                    key={file.name}
                    style={maxFilesToUpload === 1 ? { padding: '0 20px' } : null}
                  >
                    {isOnlyImagesAllowed && (
                      <img
                        src={URL.createObjectURL(file)}
                        width={40}
                        height={40}
                        alt={file.name}
                        style={{ marginRight: '10px' }}
                      />
                    )}
                    <P
                      isLabelTranslated
                      label={`${file.name} - ${formatFileSize(file.size)}`}
                      {...getCSSStyle('acceptedFileItem')}
                    />
                    <HighlightOffIcon
                      style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                      onClick={() => {
                        setAcceptedFileItems(acceptedFileItems.filter((e) => file.name !== e.name))
                        setErrorMessage(undefined)
                      }}
                    />
                  </ListItem>
                ))}
              </Section>
            )}
            {rejectedFileItems.length > 0 && (
              <Section>
                <P {...getCSSStyle('rejectedFilesLabel')} label={'dropzone.rejectedFiles'} />
                {rejectedFileItems.map(({ file, errors }: FileRejection) => (
                  <ListItem key={file.name}>
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
              <Section>
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
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}

const Container = styled.div<DragProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

const Section = styled.div`
  padding-top: 20px;
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 20px 0;
`

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 32px 0 0;
`

const RemoveElementButton = styled.span`
  color: white;
  background-color: red;
  margin-left: 20px;
  cursor: pointer;
  border: 2px solid red;
  border-radius: 100%;
  padding: 1px 4px;
  font-size: 8px;
`
