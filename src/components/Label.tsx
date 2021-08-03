import React, { ReactNode } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import styled, { css, keyframes } from 'styled-components'
import { LabelText, P } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'

const DescriptionPopupAnimation = keyframes`
  from {
    opacity: 0;
    transform-origin: top center;
    transform: scale(0, 0);
  }
  to {
    opacity: 1;
    transform-origin: top center;
    transform: scale(1, 1);
  }
`

export const LabelWrapper = createStyled('div')

const LabelTextWrapper = styled.div`
  position: relative;
  diplay: flex;
  align-items: center;
`

const DescriptionPopup = createStyled(styled.div`
  position: absolute;
  top: 48px;
  left: 48px;
  animation: ${DescriptionPopupAnimation} 0.12s ease-out;
`)

const DescriptionIconWrapper = createStyled(styled.span`
  & svg {
    vertical-align: top;

    ${({ svgCSSStyles }: { svgCSSStyles: string }) =>
      css`
        ${svgCSSStyles}
      `}

    color: currentColor;
  }
`)

export type LabelProps = {
  description?: LabelText
  descriptionData?: Record<string, string>
  error?: boolean
  errorLabel?: string | string[]
  errorLabelData?: Record<string, string>
  errorDataTestId?: string
  label: LabelText
  labelData?: Record<string, string>
  localeNamespace?: LocaleNamespace
  renderChildren?: ReactNode | (() => ReactNode)
  style?: Partial<AppTheme['label']>
  sublabel?: LabelText
  sublabelData?: Record<string, string>
}

export const Label = (props: LabelProps) => {
  const { t, i18n } = useTranslation(props.localeNamespace)

  // Styles
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'label')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'label')(props.style)

  const getIcon = useInlineStyle(theme, 'icon')({})
  const infoIcon = getIcon('info')

  // Modal
  const [open, setOpen] = React.useState(false)

  // Error
  const errorLabels = Array.isArray(props.errorLabel) ? props.errorLabel : [props.errorLabel]

  let { description } = props

  const generatedDescriptionKey = `${props.label}-info`

  description =
    description ||
    (t(generatedDescriptionKey) !== generatedDescriptionKey && generatedDescriptionKey) ||
    null

  return (
    <LabelWrapper {...getCSSStyle('wrapper')}>
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
          localeNamespace={props.localeNamespace}
          data={props.labelData}
          Icon={
            description ? (
              <DescriptionIconWrapper
                onClick={() => setOpen(true)}
                dangerouslySetInnerHTML={{ __html: infoIcon.style.svg }}
                svgCSSStyles={getCSSStyle('descriptionIcon').cssStyles}
                {...getCSSStyle('descriptionIconWrapper')}
              />
            ) : null
          }
        />

        {open && description && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <DescriptionPopup onClick={() => setOpen(false)} {...getCSSStyle('descriptionPopup')}>
              <P
                {...getCSSStyle('descriptionText')}
                label={description}
                localeNamespace={props.localeNamespace}
                data={props.descriptionData}
              />
            </DescriptionPopup>
          </ClickAwayListener>
        )}
      </LabelTextWrapper>

      {props.sublabel && (
        <P
          {...getCSSStyle('sublabelText')}
          label={props.sublabel}
          localeNamespace={props.localeNamespace}
          data={props.sublabelData}
        />
      )}
      {props.error &&
        errorLabels.map((errorLabel) => (
          <P
            key={errorLabel}
            label={errorLabel || 'fieldError'}
            localeNamespace={props.localeNamespace}
            data={props.errorLabelData}
            dataTestId={props.errorDataTestId}
            dataValue={errorLabel}
            {...getCSSStyle('errorLabel')}
          />
        ))}
      {props.renderChildren &&
        (typeof props.renderChildren === 'function' ? (
          props.renderChildren()
        ) : (
          <>{props.renderChildren}</>
        ))}
    </LabelWrapper>
  )
}
