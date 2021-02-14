import styled from 'styled-components'
import React, { ReactNode } from 'react'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation, Language } from '../theme/language'
import { Icon } from './Icon'
import ClickAwayListener from 'react-click-away-listener'
import { P } from '../html'

export const LabelWrapper = styled.div``

const LabelTextWrapper = styled.div`
  position: relative;
  diplay: flex;
  align-items: center;
`

const DescriptionPopup = styled.div`
  position: absolute;
  top: 32px;
  left: 48px;
`

export type LabelProps = {
  style?: Partial<AppTheme['label']>
  error?: boolean
  label: string | ((params: { language: Language }) => ReactNode)
  sublabel?: string | ((params: { language: Language }) => ReactNode)
  errorLabel?: string
  description?: string | ((params: { language: Language }) => ReactNode)
  renderChildren?: ReactNode | ((params: { language: Language }) => ReactNode)
}

export const Label = (props: LabelProps) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'label')(props.style)

  const [open, setOpen] = React.useState(false)

  const language = React.useContext(getLanguageContext())

  return (
    <LabelWrapper style={getStyle('wrapper')}>
      <LabelTextWrapper style={getStyle('labelTextWrapper')}>
        {props.error && (
          <Icon
            style={{
              ...((getStyle('errorIcon') as any) || {}),
            }}
            icon="error_outline"
            size={18}
            onClick={() => {
              setOpen(!open)
            }}
          />
        )}
        <P
          style={{
            ...getStyle('labelText'),
            ...(props.error ? getStyle('labelTextError') : {}),
          }}
          label={props.label}
        />
        {props.description && (
          <Icon
            style={{
              marginLeft: 8,
              ...((getStyle('descriptionIcon') as any) || {}),
            }}
            icon="help_outline"
            size={16}
            onClick={() => {
              setOpen(!open)
            }}
          />
        )}
        {open && props.description && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <DescriptionPopup
              onClick={() => setOpen(false)}
              style={getStyle('descriptionPopup')}
            >
              <P
                style={getStyle('descriptionText')}
                label={props.description}
              />
            </DescriptionPopup>
          </ClickAwayListener>
        )}
      </LabelTextWrapper>

      {props.sublabel ? (
        <P style={getStyle('sublabelText')} label={props.sublabel} />
      ) : (
        <></>
      )}
      {props.error ? (
        <P
          style={getStyle('errorLabel')}
          label={props.errorLabel || 'fieldError'}
        />
      ) : (
        <></>
      )}
      {props.renderChildren ? (
        typeof props.renderChildren === 'function' ? (
          props.renderChildren({ language })
        ) : (
          <>{props.renderChildren}</>
        )
      ) : (
        <></>
      )}
    </LabelWrapper>
  )
}
