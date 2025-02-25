import React from 'react'
import styled from 'styled-components'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { Label, LabelProps } from './Label'
import { PFCheckIcon } from '../icons/new/PFCheck'

export type Props = {
  onChange: (value: boolean) => void
  value: boolean | null
  label?: LabelProps
  style?: Partial<ComponentTheme['toggle']>
  defaultValue?: boolean
  error?: boolean
  dataTestId?: string
  name?: string
}

export const Toggle = (props: Props) => {
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'toggle')(props.style)
  
  const [isFocused, setIsFocused] = React.useState(false)

  const onFocus = () => {
    setIsFocused(true)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowRight'].includes(event.key)) {
      setIsFocused(true)
      props.onChange(!props.value)
      event.preventDefault()
    } else if (['ArrowLeft', 'Backspace'].includes(event.key)) {
      setIsFocused(true)
      props.onChange(!props.value)
      event.preventDefault()
    } else if (['Enter'].includes(event.key)) {
      props.onChange(!props.value)
      event.preventDefault()
    }
  }

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <Wrapper
        dataTestId={props.dataTestId}
        data-checked={!!props.value}
        onClick={() => props.onChange(!props.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        tabIndex={0}
        {...getCSSStyles({
          wrapper: true,
          wrapperActive: props.value,
          wrapperFocus: isFocused,
        })}
      >
        <Circle {...getCSSStyles({ circle: true, circleActive: props.value })} tabIndex={-1}>
          <button
            style={{
              width: 1,
              height: 1,
              opacity: 0,
            }}
            value={`${props.value}`}
            onChange={() => {}}
            onClick={(e) => {
              e.preventDefault()
              props.onChange(!props.value)
            }}
            tabIndex={-1}
          ></button>
          {props.value && <PFCheckIcon />}
        </Circle>
      </Wrapper>
    </>
  )
}

const Wrapper = createStyled(styled.div`
  align-items: center;
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 32px;
  min-width: 52px;
  padding: 2px;
  transition: all ease 0.7s;
  width: 52px;
`)
const Circle = createStyled(styled.div`
  transition: all ease 0.4s;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    position: absolute;
    width: 1, height: 1, opacity: 0;
  }

  svg {
    width: 10px;
    height: 10px;
  }
`)
