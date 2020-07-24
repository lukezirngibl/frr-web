import React from 'react'
import styled, { keyframes, CSSProperties, css } from 'styled-components'
import { Icon } from './Icon'

export const blink = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1
  }

  100% {
    opacity: 0.5
  }
`

const RadioButtonWrapper = styled.div<{
  selected: boolean
  primary?: string
  blink?: boolean
}>`
  width: 24px;
  height: 24px;
  border-radius: 14px;
  border: 1px solid ${props => (props.selected ? props.primary : '#B8B8B8')};
  background-color: ${props => (props.selected ? props.primary : 'transparent')}
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props =>
    props.blink
      ? css`
          animation: ${blink} 2s ease infinite;
        `
      : ''}
`

type Props = {
  selected: boolean
  onSelect?: () => void
  style?: CSSProperties
  primary?: string
  inProgress?: boolean
  blink?: boolean
}

export const RadioButton: React.FC<Props> = props => {
  return (
    <RadioButtonWrapper
      primary={props.primary}
      onClick={props.onSelect}
      selected={props.selected}
      style={props.style}
      blink={props.blink}
    >
      <Icon
        icon={props.inProgress ? 'radio_button_checked' : 'check'}
        size={14}
        color={'white'}
      />
    </RadioButtonWrapper>
  )
}
