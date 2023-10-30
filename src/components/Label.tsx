import React, { ReactNode } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { useTranslation } from 'react-i18next'
import styled, { css, keyframes } from 'styled-components'
import { LabelText, P } from '../html'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { MdErrorOutline } from '../icons/new/MdErrorOutline'

export type LabelProps = {
  description?: LabelText
  descriptionData?: Record<string, string>
  error?: boolean
  errorLabel?: string | string[]
  errorLabelData?: Record<string, string>
  errorDataTestId?: string
  isFocused?: boolean
  label: LabelText
  labelData?: Record<string, string | number>
  localeNamespace?: LocaleNamespace
  renderChildren?: ReactNode | (() => ReactNode)
  style?: Partial<ComponentTheme['label']>
  sublabel?: LabelText
  sublabelData?: Record<string, string | number>
}

export const Label = (props: LabelProps) => {
  const { t } = useTranslation(props.localeNamespace)

  // Styles
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'label')(props.style)

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
    <Div {...getCSSStyles('wrapper')}>
      <Div {...getCSSStyles('labelTextWrapper')}>
        <P
          {...getCSSStyles({
            labelText: true,
            labelTextError: props.error,
            labelTextFocus: props.isFocused,
          })}
          label={props.label}
          localeNamespace={props.localeNamespace}
          data={props.labelData}
          Icon={
            description ? (
              <DescriptionIconWrapper
                onClick={() => setOpen(true)}
                dangerouslySetInnerHTML={{ __html: infoIcon.style.svg }}
                $svgCSSStyles={getCSSStyles('descriptionIcon').cssStyles}
                {...getCSSStyles('descriptionIconWrapper')}
              />
            ) : null
          }
          children={
            props.error ? (
              <Span {...getCSSStyles('errorIcon')}>
                <MdErrorOutline
                  color="currentColor"
                  width={20}
                  onClick={() => {
                    setOpen(!open)
                  }}
                />
              </Span>
            ) : undefined
          }
        />

        {open && description && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <DescriptionPopup onClick={() => setOpen(false)} {...getCSSStyles('descriptionPopup')}>
              <P
                {...getCSSStyles('descriptionText')}
                label={description}
                localeNamespace={props.localeNamespace}
                data={props.descriptionData}
              />
            </DescriptionPopup>
          </ClickAwayListener>
        )}
      </Div>

      {props.sublabel && (
        <P
          {...getCSSStyles({
            sublabelText: true,
            errorLabel: props.error,
          })}
          label={props.sublabel}
          localeNamespace={props.localeNamespace}
          data={props.sublabelData}
        />
      )}
      <ErrorText $error={props.error}>
        {props.error &&
          errorLabels.map((errorLabel) => (
            <P
              key={errorLabel}
              label={errorLabel || 'fieldError'}
              localeNamespace={props.localeNamespace}
              data={props.errorLabelData}
              dataTestId={props.errorDataTestId}
              dataValue={errorLabel}
              {...getCSSStyles('errorLabel')}
            />
          ))}
        {props.renderChildren &&
          (typeof props.renderChildren === 'function' ? (
            props.renderChildren()
          ) : (
            <>{props.renderChildren}</>
          ))}
      </ErrorText>
    </Div>
  )
}

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

export const Div = createStyled('div')
export const Span = createStyled('span')

const DescriptionPopup = createStyled(styled.div`
  animation: ${DescriptionPopupAnimation} 0.12s ease-out;
`)

const DescriptionIconWrapper = createStyled(styled.span<{ $svgCSSStyles: string }>`
  & svg {
    ${(props) => css`
      ${props.$svgCSSStyles}
    `}

    color: currentColor;
  }
`)

const ErrorText = styled.div<{ $error: boolean }>`
  height: auto;
  max-height: ${(props) => (props.$error ? '72px' : '0')};
  transition: max-height 0.15s;
`
