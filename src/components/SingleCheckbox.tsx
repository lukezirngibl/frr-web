import React, { Component } from 'react'
import { Label, LabelProps } from './Label'
import styled from 'styled-components'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'

const Wrapper = styled.div``

export type Props = {
  onChange: (value: boolean) => void
  value: boolean
  disabled?: boolean
  error: boolean
  name?: string
  style?: AppTheme['singleCheckbox']
  label?: LabelProps
}

export const SingleCheckbox = (props: Props) => {
  const { value } = props

  const theme = useAppTheme()
  const getInlineStyle = useInlineStyle(theme, 'singleCheckbox')(props.style)

  return (
    <>
      {props.label && (
        <Label
          style={{ wrapper: { marginBottom: 0 } }}
          {...props.label}
        ></Label>
      )}
      <Wrapper {...getInlineStyle('wrapper')}>
        <input
          type="checkbox"
          checked={value}
          onChange={() => props.onChange(!value)}
          {...getInlineStyle('input', { marginLeft: 16 })}
        />
      </Wrapper>
    </>
  )
}
