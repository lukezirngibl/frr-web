import React from 'react'
import styled from 'styled-components'
import { ComponentTheme, useComponentTheme, useInlineStyle } from '../theme/theme.components'
import { Label, LabelProps } from './Label'

const Wrapper = styled.div`
  transition: all ease 0.7s;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 32px;
  width: 52px;
  min-width: 52px;
  padding: 2px;
  border-radius: 16px;
  cursor: pointer;
`
const Circle = styled.div`
  transition: all ease 0.4s;
  width: 28px;
  height: 28px;
  border-radius: 14px;
`

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
  const getInlineStyle = useInlineStyle(theme, 'toggle')(props.style)

  React.useEffect(() => {
    if (props.value === null && props.defaultValue !== undefined) {
      props.onChange(props.defaultValue)
    }
  }, [])

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper
        onClick={() => props.onChange(!props.value)}
        {...{
          ...getInlineStyle('wrapper'),
          ...(props.value ? getInlineStyle('wrapperActive') : {}),
        }}
        data-test-id={props.dataTestId}
        data-checked={!!props.value}
      >
        <Circle
          {...{
            ...getInlineStyle('circle'),
            ...(props.value ? getInlineStyle('circleActive') : {}),
          }}
        >
          <button
            style={{
              width: 1,
              height: 1,
              opacity: 0,
            }}
            data-test-id={props.dataTestId}
            value={`${props.value}`}
            onChange={() => {}}
            onClick={(e) => {
              e.preventDefault()
              props.onChange(!props.value)
            }}
          />
        </Circle>
      </Wrapper>
    </>
  )
}
