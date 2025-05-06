import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { Div, LabelText, P } from '../html'
import { PFExclamationMarkIcon } from '../icons/new/PFExclamationMark'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { LabelPopup } from './LabelPopup'
import { Link } from './Link'

/*
 * Label
 */

export type LabelProps = {
  description?: LabelText
  descriptionData?: Record<string, string>
  error?: boolean
  errorDataTestId?: string
  errorLabel?: string | string[]
  errorLabelData?: Record<string, string>
  errorButton?: {
    dataTestId?: string
    errorLabel: string
    onClick: () => void
    label: string
  }
  hasActiveState?: boolean // Controls whether the label is shown differently when focused or set
  isSet?: boolean
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
        {props.error && (
          <Span {...getCSSStyles('errorIcon')}>
            <PFExclamationMarkIcon
              color="currentColor"
              width={24}
              onClick={() => {
                setOpen(!open)
              }}
            />
          </Span>
        )}

        <P
          {...getCSSStyles({
            labelText: true,
            labelTextActive: props.hasActiveState && (props.isFocused || props.isSet),
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
                $svgCSSStyles={getCSSStyles('descriptionIcon').cssStyles}
                {...getCSSStyles('descriptionIconWrapper')}
              />
            ) : null
          }
        />

        {description && (
          <LabelPopup open={open} onClose={() => setOpen(false)} style={props.style?.descriptionPopup}>
            <P
              {...getCSSStyles('descriptionText')}
              label={description}
              localeNamespace={props.localeNamespace}
              data={props.descriptionData}
            />
          </LabelPopup>
        )}
      </Div>

      {props.sublabel && (
        <P
          {...getCSSStyles({
            sublabelText: true,
            sublabelTextActive: props.hasActiveState && (props.isFocused || props.isSet),
            errorLabel: props.error,
          })}
          label={props.sublabel}
          localeNamespace={props.localeNamespace}
          data={props.sublabelData}
        />
      )}
      <ErrorText $error={props.error} {...getCSSStyles('errorLabelWrapper')}>
        {props.error && (
          <Div {...getCSSStyles('errorLabelTextWrapper')}>
            {errorLabels.map((errorLabel) => (
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

            {props.errorButton && errorLabels.includes(props.errorButton.errorLabel) && (
              <Link
                data-test-id={props.errorButton.errorLabel}
                icon={{ type: 'edit', style: getCSSStyles('errorButtonIcon') }}
                onClick={props.errorButton.onClick}
                label={props.errorButton.label}
                localeNamespace={props.localeNamespace}
                style={getCSSStyles('errorButton')}
              />
            )}

            {props.renderChildren &&
              (typeof props.renderChildren === 'function' ? (
                props.renderChildren()
              ) : (
                <>{props.renderChildren}</>
              ))}
          </Div>
        )}
      </ErrorText>
    </Div>
  )
}

const Span = createStyled('span')

const DescriptionIconWrapper = createStyled(styled.span<{ $svgCSSStyles: string }>`
  & svg {
    ${(props) => css`
      ${props.$svgCSSStyles}
    `}

    color: currentColor;
  }
`)

const ErrorText = createStyled(styled.div<{ $error: boolean }>`
  height: auto;
  max-height: ${(props) => (props.$error ? '72px' : '0')};
  transition: max-height 0.15s;
`)
