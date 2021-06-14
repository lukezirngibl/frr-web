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
import rgbHex from 'rgb-hex'

const ColorPickerWrapper = createStyled('div')
const ColorPickerContainer = createStyled(styled.div`
  position: relative;
  width: 48px;
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
  top: -96px;
  right: -96px;
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

const ColorLabelWrapper = styled.div`
  width: calc(100% - 48px);
`

export type Props = {
  dataTestId?: string
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  onChange?: (c: string) => void
  readOnly?: boolean
  style?: Partial<AppTheme['colorPicker']>
  value: string | null // Color string in format "<r>,<g>,<b>,<a>" (e.g. "0,122,247,0.8")
}
export const ColorPicker = (props: Props) => {
  const { t } = useTranslation(props.localeNamespace)

  const theme = useAppTheme()
  const getModalCSSStyles = useCSSStyles(theme, 'modal')()
  const getCSSStyles = useCSSStyles(theme, 'colorPicker')(props.style)

  const [initialized, setInitialized] = useState(false)
  const [color, setColor] = useState(`rgba(${props.value})` || '')
  const [newColor, setNewColor] = useState(`rgba(${props.value})` || '')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setInitialized(true)
  }, [initialized])

  useEffect(() => {
    setColor(props.value > '' ? `rgba(${props.value})` : '')
  }, [props.value])

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
              color={color}
              data-test-id={props.dataTestId}
              onClick={() => !props.readOnly && !open && setOpen(true)}
              open={open}
            >
              {open && (
                <>
                  <ColorPickerOverlayClose onClick={() => setOpen(false)} />

                  <ColorPickerOverlay className="animated fadeIn">
                    <ColorPickerModal {...getModalCSSStyles('innerWrapper')}>
                      <div className="grid-title">
                        <P
                          {...getCSSStyles('labelModal')}
                          label={props.label.label}
                          localeNamespace={props.localeNamespace}
                        />
                      </div>

                      <ColorPickerContent className="grid-content">
                        <SketchPicker
                          color={newColor > '' ? `rgba(${newColor})` : ''}
                          onChangeComplete={(col) => setNewColor(Object.values(col.rgb).join(','))}
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
                            props.onChange(newColor)
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

        {color > '' && (
          <ColorLabelWrapper>
            <P
              label={`#${rgbHex(color.replace(',1)', ')'))}`}
              isLabelTranslated
              {...getCSSStyles('labelColor')}
            />
            <P label={color.split(',').join(', ')} isLabelTranslated {...getCSSStyles('labelColor')} />
          </ColorLabelWrapper>
        )}
      </ColorPickerWrapper>
    </>
  )
}
