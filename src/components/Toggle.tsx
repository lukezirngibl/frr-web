import React from 'react'
import { LabelProps, Label } from './Label'
import { TranslationGeneric } from '../util'
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

export type Props<T> = {
  onChange: (value: boolean) => void
  value: boolean
  label?: LabelProps<T>
  style?: Partial<AppTheme['toggle']>
  required?: boolean
  error?: boolean
}

export const Toggle = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'toggle')(props.style)

  const language = React.useContext(getLanguageContext())

  return (
    <>
      {props.label && <Label<TM> {...props.label} />}
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
        />
      </Wrapper>
    </>
  )
}
