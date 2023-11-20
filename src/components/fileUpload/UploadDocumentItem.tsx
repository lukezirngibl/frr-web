import styled from 'styled-components'
import { Div, Img, P } from '../../html'
import { MdOutlineCancel } from '../../icons/new/MdOutlineCancel'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'

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

  return (
    <Div
      key={props.file.name}
      {...getCSSStyle({
        listItem: true,
        listSingleItem: props.maxFilesToUpload === 1,
      })}
    >
      {props.file.name.endsWith('.png' || '.jpeg' || '.svg') && (
        <Img
          src={URL.createObjectURL(props.file)}
          alt={props.file.name}
          {...getCSSStyle('imageItem')}
        />
      )}
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

const RemoveItemIcon = createStyled(styled.div`
  svg.remove-icon {
    width: 100%;
    height: 100%;
  }
`)
