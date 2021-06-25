import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { P } from '../html'
import { Button, ButtonType } from './Button'
import { LocaleNamespace } from '../translation'

type FileRejections = {
  file: File
  errors: any
}

type UploadDropzoneProps = {
  onCancel: () => void
  onSubmit: () => void
  setData: (items: any) => void
  acceptedFileTypes?: string
  maxFilesToUpload?: number
  maxFileSize?: number
  localeNamespace?: LocaleNamespace
}

// const PDF = 'application/pdf'
const IMAGE = 'image/*'

export const UploadDropzone = ({
  onCancel,
  onSubmit,
  setData,
  acceptedFileTypes,
  maxFilesToUpload,
  localeNamespace,
  maxFileSize,
}: UploadDropzoneProps) => {
  const [acceptedFileItems, setAcceptedFileItems] = useState<File[]>([])
  const [rejectedFileItems, setRejectedFileItems] = useState<FileRejections[]>([])
  const isOnlyImagesAllowed = acceptedFileTypes === IMAGE
  const [errorMessage, setErrorMessage] = useState<string>()

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
    } else {
      if (
        acceptedFileItems.find(
          (file) => file.name === acceptedFiles.find((f) => f.name === file.name)?.name,
        ) !== undefined
      ) {
        setErrorMessage(`${translate('File already selected')}`)
      } else if (acceptedFiles.length + acceptedFileItems.length <= maxFilesToUpload) {
        setErrorMessage(`${translate('Too many files selected')} (max: ${maxFilesToUpload})`)
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
      fileRejections.map(({ file, errors }: FileRejections) =>
        setRejectedFileItems((prev) => [...prev, { file, errors }]),
      )

      if (maxFilesToUpload && fileRejections.length > maxFilesToUpload)
        setErrorMessage(`${translate('Too many files selected')} (max: ${maxFilesToUpload})`)
      else if (isOnlyImagesAllowed) setErrorMessage(`${translate('Upload jpg, png, gif or svg image')}`)
      else setErrorMessage(`${translate('Upload PDF documents')}`)
    }
  }, [fileRejections])

  useEffect(() => {
    setData(acceptedFileItems)
  }, [acceptedFileItems, setData])

  function formatFileSize(size: number) {
    const formattedSize: number = size / 1000
    if (formattedSize > 1000) return `${(formattedSize / 1000).toFixed(2)} MB`

    return `${formattedSize.toFixed(2)} KB`
  }

  return (
    <div>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject, className: 'dropzone disabled' })}
      >
        <input {...getInputProps()} />
        {maxFilesToUpload === acceptedFileItems.length ? (
          <P
            label={translate(`Maximum number of files allowed to upload (${maxFilesToUpload}) reached`)}
          />
        ) : (
          <>
            <P
              label={translate(
                `Drag 'n drop some${
                  isOnlyImagesAllowed && ' image'
                } files here, or click to select files`,
              )}
            />
            {maxFileSize && (
              <P
                style={{ fontSize: 12 }}
                label={`${translate('Maximum file size allowed')} ${formatFileSize(maxFileSize)}`}
              />
            )}
          </>
        )}
      </Container>
      {(acceptedFileItems.length > 0 || rejectedFileItems.length > 0) && (
        <section className="section">
          <aside>
            {acceptedFileItems.length > 0 && (
              <Section>
                <h4 style={{ color: 'green' }}>{translate(`Accepted files`)}</h4>
                {acceptedFileItems.map((file: File) => (
                  <ListItem key={file.name}>
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
                      style={{ fontSize: 12 }}
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
                <h4 style={{ color: 'red' }}>{translate('Rejected files')}</h4>
                {rejectedFileItems.map(({ file, errors }: FileRejections) => (
                  <ListItem key={file.name}>
                    <P
                      isLabelTranslated
                      label={`${file.name}${
                        maxFileSize && file.size > maxFileSize
                          ? ` - ${translate('file size bigger than')} ${formatFileSize(
                              maxFileSize,
                            )} (${formatFileSize(file.size)})`
                          : ''
                      }`}
                      style={{ fontSize: 12 }}
                    />
                  </ListItem>
                ))}
              </Section>
            )}
            {errorMessage && (
              <Section>
                <h4 style={{ color: 'red' }}>{`${translate('Error')}: ${errorMessage}`}</h4>
              </Section>
            )}
          </aside>
        </section>
      )}
      <ButtonsWrapper>
        <Button label="cancel" onClick={onCancel} override={{ marginRight: 16 }} />
        <Button
          disabled={acceptedFileItems.length === 0}
          label="save"
          type={ButtonType.Primary}
          onClick={() => {
            onSubmit()
            onCancel()
          }}
        />
      </ButtonsWrapper>
    </div>
  )
}

const getColor = (props: any) => {
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

const Container = styled.div`
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
