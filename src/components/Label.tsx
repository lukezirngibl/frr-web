import styled from 'styled-components'
import React, { ReactNode } from 'react'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle, useCSSStyles } from '../theme/util'
import { Icon } from './Icon'
import ClickAwayListener from 'react-click-away-listener'
import { P } from '../html'
import { Language } from '../util'
import { InfoIcon } from '../assets/Info'
import { useLanguage } from '../theme/language'

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
  description?: string | ((params: { language: Language }) => ReactNode)
  discriptionData?: Record<string, string>
  error?: boolean
  errorLabel?: string | string[]
  errorLabelData?: Record<string, string>
  label: string | ((params: { language: Language }) => ReactNode)
  labelData?: Record<string, string>
  renderChildren?: ReactNode | ((params: { language: Language }) => ReactNode)
  style?: Partial<AppTheme['label']>
  sublabel?: string | ((params: { language: Language }) => ReactNode)
  sublabelData?: Record<string, string>
}

export const Label = (props: LabelProps) => {
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'label')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'label')(props.style)

  const [open, setOpen] = React.useState(false)

  const language = useLanguage()

  const errorLabels = Array.isArray(props.errorLabel)
    ? props.errorLabel
    : [props.errorLabel]
  return (
    <LabelWrapper {...getInlineStyle('wrapper')}>
      <LabelTextWrapper {...getInlineStyle('labelTextWrapper')}>
        {props.error && (
          <Icon
            {...getInlineStyle('errorIcon')}
            icon="error_outline"
            size={18}
            onClick={() => {
              setOpen(!open)
            }}
          />
        )}
        <P
          {...getCSSStyle({
            labelText: true,
            labelTextError: props.error,
          })}
          label={props.label}
          data={props.labelData}
        />
        {props.description && (
          <div
            onClick={() => setOpen(true)}
            {...getInlineStyle('descriptionIcon')}
          >
            <InfoIcon />
          </div>
        )}
        {open && props.description && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <DescriptionPopup
              onClick={() => setOpen(false)}
              {...getInlineStyle('descriptionPopup')}
            >
              <P
                {...getCSSStyle('descriptionText')}
                label={props.description}
                data={props.discriptionData}
              />
            </DescriptionPopup>
          </ClickAwayListener>
        )}
      </LabelTextWrapper>

      {props.sublabel && (
        <P
          {...getCSSStyle('sublabelText')}
          label={props.sublabel}
          data={props.sublabelData}
        />
      )}
      {props.error &&
        errorLabels.map((errorLabel) => (
          <P
            key={errorLabel}
            label={errorLabel || 'fieldError'}
            data={props.errorLabelData}
            {...getCSSStyle('errorLabel')}
          />
        ))}
      {props.renderChildren &&
        (typeof props.renderChildren === 'function' ? (
          props.renderChildren({ language })
        ) : (
          <>{props.renderChildren}</>
        ))}
    </LabelWrapper>
  )
}
