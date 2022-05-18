import React, { useState } from 'react'
import { CSSProperties } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { P } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Icon, IconProps } from './Icon'
import { Loading } from './Loading'

const ButtonWrapper = createStyled('button')

export enum ButtonType {
  Secondary = 'Secondary',
  Chromeless = 'Chromeless',
  Primary = 'Primary',
}

const mapTypeToStyleKey: {
  [k in ButtonType]: keyof Partial<AppTheme['button']>
} = {
  [ButtonType.Chromeless]: 'chromeless',
  [ButtonType.Primary]: 'primary',
  [ButtonType.Secondary]: 'secondary',
}

const mapTypeToStyleLabelKey: {
  [k in ButtonType]: keyof Partial<AppTheme['button']>
} = {
  [ButtonType.Chromeless]: 'chromelessLabel',
  [ButtonType.Primary]: 'primaryLabel',
  [ButtonType.Secondary]: 'secondaryLabel',
}

export type Props = {
  dataTestId?: string
  disabled?: boolean
  icon?: IconProps
  label: string
  labelMobile?: string
  localeNamespace?: LocaleNamespace
  loading?: boolean
  onClick?: () => void
  override?: CSSProperties
  style?: Partial<AppTheme['button']>
  type?: ButtonType
}

export const Button = (props: Props) => {
  /* Style hooks */
  const type = props.type || ButtonType.Secondary
  const theme = useAppTheme()

  const getStyle = useInlineStyle(theme, 'button')(props.style)
  const getCSSStyle = useCSSStyles(theme, 'button')(props.style)

  /* Click handler */
  const [isClicked, setIsClicked] = useState(false)

  const onClicked = useDebouncedCallback(() => {
    props.onClick()
    setIsClicked(false)
  }, 300)

  const handleClicked =
    props.disabled || props.loading
      ? undefined
      : () => {
          setIsClicked(true)
          onClicked()
        }

  const { isMobile } = useMobileTouch()

  return (
    <ButtonWrapper
      className={isClicked ? 'animate' : ''}
      data-test-id={props.dataTestId}
      onClick={handleClicked}
      disabled={props.disabled}
      {...getCSSStyle(['common', mapTypeToStyleKey[type]], props.override)}
    >
      {props.icon && <Icon {...props.icon} />}
      <P
        style={{
          marginLeft: props.icon === undefined ? 0 : 8,
        }}
        {...getCSSStyle(['label', mapTypeToStyleLabelKey[type]])}
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
