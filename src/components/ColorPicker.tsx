import React, { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { SketchPicker } from 'react-color'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { P } from '../html'
import { AppTheme, MediaQuery, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Button, ButtonType } from './Button'
import { Label, LabelProps } from './Label'

const ColorPickerWrapper = createStyled('div')
const ColorPickerContainer = createStyled(styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
`)

const ColorCircle = createStyled(styled.a<{ color: string; open: boolean }>`
  cursor: pointer;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`)

const ColorPickerOverlay = styled.div`
  position: absolute;
  width: 264px;
  top: -64px;
  right: 96px;
  z-index: 9999;

  @media ${MediaQuery.Mobile} {
    position: fixed;
    top: 65px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const ColorPickerOverlayClose = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 999;
`

const ColorPickerModal = createStyled(styled.div`
  text-align: center;

  display: grid;
  grid-template-areas:
    'title'
    'content'
    'actions';
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  grid-column-gap: 0;
  grid-row-gap: 16px;
  justify-content: center;

  .grid-title {
    grid-area: title;
  }
  .grid-content {
    grid-area: content;
  }
  .grid-actions {
    grid-area: actions;
    display: flex;
    justify-content: space-between;
  }
`)

const ColorPickerContent = styled.div`
  .sketch-picker {
    box-shadow: none !important;
    border-radius: none !important;
  }
`

// const CancelButton = styled(Button)`
//   margin-left: 8px;
//   z-index: 99999;
// `

// const SaveButton = styled(Button)`
//   margin-right: 8px;
//   width: 110px;
//   z-index: 999999;
// `

export type Props = {
  dataTestId?: string
  label?: LabelProps
  labelModal?: string
  localeNamespace?: LocaleNamespace
  onChange?: (c: string) => void
  readOnly?: boolean
  style?: Partial<AppTheme['colorPicker']>
  value: string | null
}
export const ColorPicker = (props: Props) => {
  const { t } = useTranslation(props.localeNamespace)

  const theme = useAppTheme()
  const getModalCSSStyles = useCSSStyles(theme, 'modal')()
  const getCSSStyles = useCSSStyles(theme, 'colorPicker')(props.style)

  const [initialized, setInitialized] = useState(false)
  const [selectedColor, setSelectedColor] = useState(props.value || '')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setInitialized(true)
  }, [initialized])

  return (
    <>
      {props.label && <Label {...props.label} />}

      <ColorPickerWrapper {...getCSSStyles('wrapper')}>
        <ColorPickerContainer>
          <ClickAwayListener
            onClickAway={() => {
              open && setOpen(false)
            }}
          >
            <ColorCircle
              {...getCSSStyles('circle')}
              color={selectedColor}
              data-test-id={props.dataTestId}
              onClick={() => !props.readOnly && !open && setOpen(true)}
              open={open}
            >
              {open && (
                <>
                  <ColorPickerOverlayClose onClick={() => setOpen(false)} />

                  <ColorPickerOverlay className="animated fadeIn">
                    <ColorPickerModal {...getModalCSSStyles('innerWrapper')}>
                      {props.labelModal && (
                        <div className="grid-title">
                          <P
                            {...getCSSStyles('labelModal')}
                            label={props.labelModal}
                            localeNamespace={props.localeNamespace}
                          />
                        </div>
                      )}
                      <ColorPickerContent className="grid-content">
                        <SketchPicker
                          color={selectedColor}
                          onChangeComplete={(color) =>
                            setSelectedColor(`rgba(${Object.values(color.rgb).join(',')})`)
                          }
                        />
                      </ColorPickerContent>

                      <div className="grid-actions">
                        <Button
                          type={ButtonType.Secondary}
                          onClick={() => setOpen(false)}
                          label={t('colorPicker.cancel')}
                          style={{
                            secondary: {
                              flexGrow: 1,
                              marginRight: 4,
                            },
                          }}
                        />

                        <Button
                          label={t('colorPicker.setColor')}
                          type={ButtonType.Primary}
                          onClick={() => {
                            setOpen(false)
                            console.log('ON CHANGE COLOR', selectedColor)
                            props.onChange(selectedColor)
                          }}
                          style={{
                            primary: {
                              flexGrow: 2,
                              marginLeft: 4,
                            },
                          }}
                        />
                      </div>
                    </ColorPickerModal>
                  </ColorPickerOverlay>
                </>
              )}
            </ColorCircle>
          </ClickAwayListener>
        </ColorPickerContainer>
      </ColorPickerWrapper>
    </>
  )
}
