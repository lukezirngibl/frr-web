import styled from 'styled-components'
import React, { ReactNode } from 'react'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { TranslationGeneric } from '../util'
import { getLanguageContext, getTranslation, Language } from '../theme/language'
import { Icon } from './Icon'
import ClickAwayListener from 'react-click-away-listener'

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

const DescriptionText = styled.p``

const LabelText = styled.p``

const SublabelText = styled.p``

const ErrorLabelText = styled.p``

export type LabelProps<T> = {
  style?: Partial<AppTheme['label']>
  error?: boolean
  label: keyof T | ((params: { language: Language }) => ReactNode)
  sublabel?: keyof T | ((params: { language: Language }) => ReactNode)
  errorLabel?: keyof T
  description?: keyof T | ((params: { language: Language }) => ReactNode)
  renderChildren?: ReactNode | ((params: { language: Language }) => ReactNode)
}

export const Label = <TM extends TranslationGeneric>(props: LabelProps<TM>) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'label')(props.style)

  const [open, setOpen] = React.useState(false)

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

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
        <LabelText
          style={{
            ...getStyle('labelText'),
            ...(props.error ? getStyle('labelTextError') : {}),
          }}
          itemID={
            (typeof props.label === 'function'
              ? '<computed>'
              : props.label) as string
          }
        >
          {typeof props.label === 'function'
            ? props.label({ language })
            : translate(props.label)}
        </LabelText>
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
              <DescriptionText
                style={getStyle('descriptionText')}
                itemID={
                  (typeof props.description === 'function'
                    ? '<computed>'
                    : props.description) as string
                }
              >
                {typeof props.description === 'function'
                  ? props.description({ language })
                  : translate(props.description)}
              </DescriptionText>
            </DescriptionPopup>
          </ClickAwayListener>
        )}
      </LabelTextWrapper>

      {props.sublabel ? (
        <SublabelText
          style={getStyle('sublabelText')}
          itemID={
            (typeof props.sublabel === 'function'
              ? '<computed>'
              : props.sublabel) as string
          }
        >
          {typeof props.sublabel === 'function'
            ? props.sublabel({ language })
            : translate(props.sublabel)}
        </SublabelText>
      ) : (
        <></>
      )}
      {props.error ? (
        <ErrorLabelText
          style={getStyle('errorLabel')}
          itemID={typeof props.errorLabel as string}
        >
          {translate((props.errorLabel || 'fieldError') as keyof TM)}
        </ErrorLabelText>
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
