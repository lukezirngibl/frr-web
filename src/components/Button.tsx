import React, { ReactElement, useState } from 'react'
import { IconType } from 'react-icons'
import { CSSProperties } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { P } from '../html'
import {
  ComponentTheme,
  useCSSStyles,
  useComponentTheme,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Loading } from './Loading'

const ButtonWrapper = createStyled('button')

export enum ButtonType {
  Secondary = 'Secondary',
  Chromeless = 'Chromeless',
  Primary = 'Primary',
}

const mapTypeToStyleKey: {
  [k in ButtonType]: keyof Partial<ComponentTheme['button']>
} = {
  [ButtonType.Chromeless]: 'chromeless',
  [ButtonType.Primary]: 'primary',
  [ButtonType.Secondary]: 'secondary',
}

const mapTypeToStyleLabelKey: {
  [k in ButtonType]: keyof Partial<ComponentTheme['button']>
} = {
  [ButtonType.Chromeless]: 'chromelessLabel',
  [ButtonType.Primary]: 'primaryLabel',
  [ButtonType.Secondary]: 'secondaryLabel',
}

export type Props = {
  dataTestId?: string
  disabled?: boolean
  Icon?: ReactElement<IconType>
  id?: string
  label: string
  labelMobile?: string
  localeNamespace?: LocaleNamespace
  loading?: boolean
  onClick?: () => void
  override?: CSSProperties
  style?: Partial<ComponentTheme['button']>
  tabIndex?: number
  type?: ButtonType
}

export const Button = (props: Props) => {
  /* Style hooks */
  const type = props.type || ButtonType.Secondary
  const theme = useComponentTheme()

  const getStyle = useInlineStyle(theme, 'button')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'button')(props.style)

  /* Click handler */
  const [isClicked, setIsClicked] = useState(false)

  const onClicked = useDebouncedCallback(() => {
    props.onClick?.()
    setIsClicked(false)
  }, 300)

  const handleClicked =
    props.disabled || props.loading
      ? undefined
      : (e: MouseEvent) => {
          e.preventDefault()
          setIsClicked(true)
          onClicked()
        }

  const { isMobile } = useMobileTouch()

  // Remove all button types expect primary from the form tab index
  const tabIndex = props.tabIndex || (props.type !== ButtonType.Primary && -1) || 0

  return (
    <ButtonWrapper
      id={props.id}
      className={isClicked ? 'animate' : ''}
      dataTestId={props.dataTestId || `button-${type}`}
      onClick={handleClicked}
      disabled={props.disabled}
      tabIndex={tabIndex}
      type="button"
      {...getCSSStyles(['common', mapTypeToStyleKey[type]], props.override)}
    >
      {props.Icon}
      <P
        style={{ marginLeft: props.Icon ? 8 : 0 }}
        {...getCSSStyles(['label', mapTypeToStyleLabelKey[type]])}
        label={(isMobile && props.labelMobile) || props.label}
        localeNamespace={props.localeNamespace}
      />
      {props.loading && (
        <Loading
          style={{
            transform: 'scale(0.3)',
            marginRight: -24,
            marginTop: -12,
            marginLeft: 12,
            height: 32,
            width: 32,
            ...getStyle('spinner'),
          }}
        />
      )}
    </ButtonWrapper>
  )
}
