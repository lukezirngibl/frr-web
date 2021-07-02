import React from 'react'
import styled from 'styled-components'

import { LabelProps, Label } from './Label'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'

export type Props = {
  onChange: (value: boolean) => void
  value: boolean | null
  label?: LabelProps
  style?: Partial<AppTheme['toggle']>
  defaultValue?: boolean
  error?: boolean
  dataTestId?: string
  name?: string
}

export const Toggle = (props: Props) => {
  const theme = useAppTheme()
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
      >
        <Circle
          {...{
            ...getInlineStyle('circle'),
            ...(props.value ? getInlineStyle('circleActive') : {}),
          }}
        >
          <input
            style={{
              width: 1,
              height: 1,
              opacity: 0,
            }}
            type="checkbox"
            onChange={() => {
              props.onChange(!props.value)
            }}
            data-test-id={props.dataTestId}
            checked={!!props.value}
          />
        </Circle>
      </Wrapper>
    </>
  )
}

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
