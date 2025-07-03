import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Div, Img, P } from '../../html'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { MdOutlineCancel } from '../../icons/new/MdOutlineCancel'
import { BsFiletypePdf } from '../../icons/new/BsFiletypePdf'
import { AiOutlineCheck } from '../../icons/new/AiOutlineCheck'

export const formatFileSize = (size: number) => {
  const formattedSize: number = size / 1000
  if (formattedSize > 1000) return `${(formattedSize / 1000).toFixed(2)} MB`

  return `${formattedSize.toFixed(2)} KB`
}

export type UploadedFile = {
  format?: string
  isFileHidden?: boolean
  name: string
  previewUri?: string
  size?: number
}

type UploadDocumentItemProps = {
  file: File | UploadedFile
  fileLabel?: string
  maxFilesToUpload: number
  maxFileSize: number
  onRemove: () => void
  style?: Partial<ComponentTheme['uploadDropzone']>
}
export const UploadDocumentItem = (props: UploadDocumentItemProps) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'uploadDropzone')(props.style)

  const fileLabel =
    props.fileLabel ||
    (props.file.size && `${props.file.name} - ${formatFileSize(props.file.size || 0)}`) ||
    props.file.name

  const isFileHidden = 'isFileHidden' in props.file ? props.file.isFileHidden : false

  return (
    <Div
      {...getCSSStyle({
        listItem: true,
        listSingleItem: props.maxFilesToUpload === 1,
      })}
      key={props.file.name}
      readOnly={isFileHidden}
    >
      <PreviewImageWrapper {...getCSSStyle('imageItem')} readOnly={isFileHidden}>
        {isFileHidden ? (
          <div className="icon-wrapper">
            <AiOutlineCheck className="check-icon" />
          </div>
        ) : props.file instanceof File ? (
          props.file.name.endsWith('.png') ||
          props.file.name.endsWith('.jpeg') ||
          (props.file.name.endsWith('.svg') && (
            <Img
              src={URL.createObjectURL(props.file)}
              alt={props.file.name}
              {...getCSSStyle('imageItem')}
            />
          )) ||
          (props.file.type === 'application/pdf' && (
            <div className="icon-wrapper">
              <BsFiletypePdf className="pdf-icon" />
            </div>
          ))
        ) : (
          (props.file.previewUri && (
            <Img
              src={(props.file as UploadedFile).previewUri}
              alt={props.file.name}
              {...getCSSStyle('imageItem')}
            />
          )) ||
          (props.file.format === 'pdf' && (
            <div className="icon-wrapper">
              <BsFiletypePdf className="pdf-icon" />
            </div>
          ))
        )}
      </PreviewImageWrapper>

      <P
        isLabelTranslated
        readOnly={isFileHidden}
        label={props.fileLabel || fileLabel}
        data={{
          fileName: props.file.name,
          fileSize: formatFileSize(props.file.size),
          maxFileSize: formatFileSize(props.maxFileSize),
        }}
        {...getCSSStyle({ acceptedFileItem: true })}
      />

      {!isFileHidden && (
        <RemoveItemIcon {...getCSSStyle('removeItemIcon')}>
          <MdOutlineCancel className="remove-icon" onClick={props.onRemove} width={16} />
        </RemoveItemIcon>
      )}
    </Div>
  )
}

const PreviewImageWrapper = createStyled(styled.div`
  img.file-image {
    width: 100%;
  }

  .icon-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: currentColor;
  }

  svg.pdf-icon {
    width: 28px;
    height: 28px;
  }

  svg.check-icon {
    width: 24px;
    height: 24px;
  }
`)

const RemoveItemIcon = createStyled(styled.div`
  svg.remove-icon {
    width: 100%;
    height: 100%;
  }
`)
