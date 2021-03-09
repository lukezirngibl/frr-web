import React from 'react'
import { LabelProps, Label } from './Label'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation } from '../theme/language'
import styled from 'styled-components'

const Wrapper = styled.div`
  transition: all ease 0.7s;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 32px;
  width: 52px;
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
  style?: Partial<AppTheme['toggle']>
  error?: boolean
  dataTestId?: string
  name?: string
}

export const Toggle = (props: Props) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'toggle')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper
        onClick={() => props.onChange(!props.value)}
        style={{
          ...getStyle('wrapper'),
          ...(props.value ? getStyle('wrapperActive') : {}),
        }}
      >
        <Circle
          style={{
            ...getStyle('circle'),
            ...(props.value ? getStyle('circleActive') : {}),
          }}
        >
          <input
            style={{
              width: 1,
              height: 1,
              opacity: 0,
            }}
            data-test-id={props.dataTestId}
            value={`${props.value}`}
            onClick={() => {
              props.onChange(!props.value)
            }}
          />
        </Circle>
      </Wrapper>
    </>
  )
}
