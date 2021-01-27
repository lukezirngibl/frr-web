import React, { Component } from 'react'
import { Label, LabelProps } from './Label'
import { TranslationGeneric } from '../util'
import styled from 'styled-components'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'

const Wrapper = styled.div``

export type Props<TM> = {
  onChange: (value: boolean) => void
  value: boolean
  disabled?: boolean
  error: boolean
  required?: boolean
  name?: string
  style?: AppTheme['singleCheckbox']
  label?: LabelProps<TM>
}

export const SingleCheckbox = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { value } = props

  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'singleCheckbox')(props.style)

  return (
    <>
      {props.label && (
        <Label
          style={{ wrapper: { marginBottom: 0 } }}
          {...props.label}
        ></Label>
      )}
      <Wrapper style={getStyle('wrapper')}>
        <input
          type="checkbox"
          checked={value}
          onChange={() => props.onChange(!value)}
          style={{
            marginLeft: 16,
            ...(getStyle('input') || {}),
          }}
        />
      </Wrapper>
    </>
  )
}
