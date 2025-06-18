import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Div, Img, P } from '../../html'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { MdOutlineCancel } from '../../icons/new/MdOutlineCancel'
import { BsFiletypePdf } from '../../icons/new/BsFiletypePdf'

export const formatFileSize = (size: number) => {
  const formattedSize: number = size / 1000
  if (formattedSize > 1000) return `${(formattedSize / 1000).toFixed(2)} MB`

  return `${formattedSize.toFixed(2)} KB`
}

type UploadDocumentItemProps = {
  file: File
  fileLabel?: string
  maxFilesToUpload: number
  maxFileSize: number
  onRemove: () => void
  style?: Partial<ComponentTheme['uploadDropzone']>
}
export const UploadDocumentItem = (props: UploadDocumentItemProps) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'uploadDropzone')(props.style)
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    if (/\.(png|jpeg|jpg|svg)$/i.test(props.file.name)) {
      const url = URL.createObjectURL(props.file)
      setImageUrl(url)

      // Clean up the URL when component unmounts
      return () => {
        URL.revokeObjectURL(url)
      }
    } else {
      return () => {}
    }
  }, [props.file])

  console.log('UploadDocumentItem', { file: props.file, imageUrl })

  return (
    <Div
      key={props.file.name}
      {...getCSSStyle({
        listItem: true,
        listSingleItem: props.maxFilesToUpload === 1,
      })}
    >
      <PreviewImageWrapper {...getCSSStyle('imageItem')}>
        {(/\.(png|jpeg|jpg|svg)$/i.test(props.file.name) && imageUrl && (
          <Img className="file-image" src={imageUrl} alt={props.file.name} />
        )) ||
          (props.file.type === 'application/pdf' && (
            <div className="pdf-icon-wrapper">
              <BsFiletypePdf className="pdf-icon" />
            </div>
          ))}
      </PreviewImageWrapper>

      <P
        isLabelTranslated
        label={props.fileLabel || `${props.file.name} - ${formatFileSize(props.file.size)}`}
        data={{
          fileName: props.file.name,
          maxFileSize: formatFileSize(props.maxFileSize),
          fileSize: formatFileSize(props.file.size),
        }}
        {...getCSSStyle({ acceptedFileItem: true })}
      />
      <RemoveItemIcon {...getCSSStyle('removeItemIcon')}>
        <MdOutlineCancel className="remove-icon" onClick={props.onRemove} width={16} />
      </RemoveItemIcon>
    </Div>
  )
}

const PreviewImageWrapper = createStyled(styled.div`
  img.file-image {
    width: 100%;
  }

  .pdf-icon-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg.pdf-icon {
    width: 28px;
    height: 28px;
  }
`)

const RemoveItemIcon = createStyled(styled.div`
  svg.remove-icon {
    width: 100%;
    height: 100%;
  }
`)
