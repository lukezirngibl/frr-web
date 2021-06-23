import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

import { Button, ButtonType } from './Button'

type FileRejections = {
  file: File
  errors: any
}

type UploadDropzoneProps = {
  onCancel: () => void
  onSubmit: () => void
  setData: (items: any) => void
  acceptedFilesToUpload?: string
  maxFilesToUpload?: number
}

// const PDF = 'application/pdf'
const IMAGE = 'image/*'

export const UploadDropzone = ({
  onCancel,
  onSubmit,
  setData,
  acceptedFilesToUpload,
  maxFilesToUpload,
}: UploadDropzoneProps) => {
  const [acceptedFileItems, setAcceptedFileItems] = useState<File[]>([])
  const [rejectedFileItems, setRejectedFileItems] = useState<FileRejections[]>([])
  const isOnlyImagesAllowed = acceptedFilesToUpload === IMAGE

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: acceptedFilesToUpload,
    maxFiles: maxFilesToUpload,
    disabled: maxFilesToUpload
      ? acceptedFileItems.length >= maxFilesToUpload
      : acceptedFileItems.length > 0,
  })

  useEffect(() => {
    if (
      acceptedFiles.length > 0 &&
      acceptedFileItems.find(
        (file) => file.name === acceptedFiles.find((f) => f.name === file.name)?.name,
      ) === undefined
    ) {
      acceptedFiles.map((file: File) => setAcceptedFileItems([...acceptedFileItems, file]))
    }
    if (
      fileRejections.length > 0 &&
      rejectedFileItems.find(
        ({ file }) => file.name === fileRejections.find((f) => f.file.name === file.name)?.file.name,
      ) === undefined
    ) {
      fileRejections.map(({ file, errors }: FileRejections) =>
        setRejectedFileItems((prev) => [...prev, { file, errors }]),
      )
    }
  }, [acceptedFiles, fileRejections])

  useEffect(() => {
    setData(acceptedFileItems)
  }, [acceptedFileItems, setData])

  function formatFileSize(size: number) {
    const formattedSize: number = size / 1000
    if (formattedSize > 1000) return `${(formattedSize / 1000).toFixed(2)} MB`

    return `${formattedSize.toFixed(2)} KB`
  }

  function getErrorMessage() {
    if (maxFilesToUpload && fileRejections.length > maxFilesToUpload)
      return `Too many files selected (maximun files: ${maxFilesToUpload})`
    if (isOnlyImagesAllowed) return 'upload jpg, png, gif or svg image'
    return 'upload PDF documents'
  }

  return (
    <div>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject, className: 'dropzone disabled' })}
      >
        <input {...getInputProps()} />
        <p>{`Drag 'n drop some${
          isOnlyImagesAllowed && ' image'
        } files here, or click to select files`}</p>
      </Container>
      {(acceptedFileItems.length > 0 || rejectedFileItems.length > 0) && (
        <section className="section">
          <aside>
            {acceptedFileItems.length > 0 && (
              <Section>
                <h4 style={{ color: 'green' }}>Accepted files</h4>
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
                    <span style={{ fontSize: 12 }}>
                      {file.name} - {formatFileSize(file.size)}
                    </span>
                  </ListItem>
                ))}
              </Section>
            )}
            {rejectedFileItems.length > 0 && (
              <Section>
                <h4 style={{ color: 'red' }}>{`Rejected files - ${getErrorMessage()}`}</h4>
                {rejectedFileItems.map(({ file, errors }: FileRejections) => (
                  <ListItem key={file.name}>
                    <span style={{ fontSize: 12 }}>{file.name}</span>
                  </ListItem>
                ))}
              </Section>
            )}
          </aside>
        </section>
      )}
      <ButtonsWrapper>
        <Button label="cancel" onClick={onCancel} override={{ marginRight: 16 }} />
        <Button
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
