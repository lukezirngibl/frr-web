import React from 'react'
import { CSSProperties } from 'styled-components'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createStyled, useStyle } from '../theme/util'
import { IconProps, Icon } from './Icon'
import { Loading } from './Loading'
import { P } from '../html'

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
  const { disabled } = props
  const type = props.type || ButtonType.Secondary
  const theme = React.useContext(getThemeContext())

  const getStyle = useStyle(theme, 'button')(props.style)

  const buttonStyle = getStyle(['common', mapTypeToStyleKey[type]], {
    ...(disabled ? { opacity: 0.4, pointerEvents: 'none' } : {}),
    ...(props.override || {}),
  })
  console.log('BUTTON STYLES', buttonStyle)

  return (
    <ButtonWrapper
      data-test-id={props.dataTestId}
      onClick={disabled || props.loading ? undefined : props.onClick}
      {...buttonStyle}
    >
      {props.icon && <Icon {...props.icon} />}
      <P
        style={{
          color: 'inherit',
          fontSize: 'inherit',
          flexGrow: 1,
          marginLeft: props.icon === undefined ? 0 : 8,
        }}
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
