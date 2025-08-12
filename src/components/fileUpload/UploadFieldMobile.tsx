import { useRef, useState } from 'react'
import { Div, P } from '../../html'
import { BsCamera } from '../../icons/new/BsCamera'
import { IoImagesOutline } from '../../icons/new/IoImagesOutline'
import {
  ComponentTheme,
  useCSSStyles,
  useComponentTheme,
  useInlineStyle,
} from '../../theme/theme.components'
import { LocaleNamespace } from '../../translation'
import { OptionGroup } from '../OptionGroup'
import { UploadDocumentItem } from './UploadDocumentItem'

export type UploadFieldMobileProps = {
  acceptedFileTypes?: string
  localeNamespace?: LocaleNamespace
  maxFileSize?: number
  onChange: (files: Array<File>) => void
  style?: Partial<ComponentTheme['uploadDropzone']>
}

export const UploadFieldMobile = ({
  acceptedFileTypes = 'image/*, application/pdf',
  localeNamespace,
  maxFileSize,
  onChange,
  style,
}: UploadFieldMobileProps) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'uploadDropzone')(style)
  const getInlineStyle = useInlineStyle(theme, 'uploadDropzone')(style)

  // Internal file list states
  const [file, setFile] = useState<File | null>(null)

  const inputCamera = useRef<HTMLInputElement>(null)
  const inputGallery = useRef<HTMLInputElement>(null)
  const handleFileUpload = (value: 'camera' | 'gallery') => {
    if (value === 'camera') {
      inputCamera.current?.click()
    } else if (value === 'gallery') {
      inputGallery.current?.click()
    }
  }

  return file === null ? (
    <>
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
                <input
                  accept="image/*"
                  capture="environment"
                  type="file"
                  multiple={false}
                  name="input-camera"
                  data-test-id="file-input-camera"
                  ref={inputCamera}
                  onChange={(event) => {
                    const files = event.target.files
                    if (files && files.length > 0) {
                      const fileArray = Array.from(files)
                      setFile(fileArray[0])
                      onChange(fileArray)
                    }
                  }}
                  style={{
                    opacity: 0,
                    pointerEvents: 'none',
                    position: 'absolute',
                    width: 0,
                    zIndex: -1,
                  }}
                />
              </>
            ),
          },
          {
            value: 'gallery',
            CustomElement: (
              <>
                <IoImagesOutline width={36} height={36} />
                <P label={'uploadFieldMobile.gallery.label'} localeNamespace={localeNamespace} />
                <input
                  accept={acceptedFileTypes}
                  type="file"
                  multiple={false}
                  name="input-gallery"
                  data-test-id="file-input-gallery"
                  ref={inputGallery}
                  onChange={(event) => {
                    const files = event.target.files
                    if (files && files.length > 0) {
                      const fileArray = Array.from(files)
                      setFile(fileArray[0])
                      onChange(fileArray)
                    }
                  }}
                  style={{
                    opacity: 0,
                    pointerEvents: 'none',
                    position: 'absolute',
                    width: 0,
                    zIndex: -1,
                  }}
                />
              </>
            ),
          },
        ]}
        style={{
          item: {
            boxSizing: 'unset',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            height: 84,
            width: '50%',
            ...getInlineStyle('containerMobile').style,
          },
        }}
      />
    </>
  ) : (
    <section className="section">
      <Div {...getCSSStyle('sectionSingleItem')}>
        <UploadDocumentItem
          file={file}
          key={file.name}
          maxFilesToUpload={1}
          maxFileSize={maxFileSize}
          onRemove={() => setFile(null)}
          style={style}
        />
      </Div>
    </section>
  )
}
