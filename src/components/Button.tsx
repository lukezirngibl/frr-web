import React, { useState } from 'react'
import { CSSProperties } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce/lib'
import { P } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
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

export type Props = {
  label: string
  onClick?: () => void
  disabled?: boolean
  style?: Partial<AppTheme['button']>
  loading?: boolean
  override?: CSSProperties
  type?: ButtonType
  icon?: IconProps
  dataTestId?: string
}

export const Button = (props: Props) => {
  /* Style hooks */
  const type = props.type || ButtonType.Secondary
  const theme = useAppTheme()

  const getStyle = useInlineStyle(theme, 'button')(props.style)
  const getCSSStyle = useCSSStyles(theme, 'button')(props.style)

  /* Click handler */
  const [isClicked, setIsClicked] = useState(false)

  const [onClicked] = useDebouncedCallback(() => {
    props.onClick()
    setIsClicked(false)
  }, 300)

  const handleClicked =
    props.disabled || props.loading
      ? undefined
      : () => {
          setIsClicked(true)
          // @ts-ignore
          onClicked()
        }

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
          color: 'inherit',
          fontSize: 'inherit',
          textTransform: 'inherit',
          flexGrow: 1,
          marginLeft: props.icon === undefined ? 0 : 8,
        }}
        {...getCSSStyle('label')}
        label={props.label}
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
