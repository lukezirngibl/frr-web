import React, { Component } from 'react'
import { Label, LabelProps } from './Label'
import styled from 'styled-components'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'

const Wrapper =  createStyled('div')

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
  const getCSSStyles = useCSSStyles(theme, 'singleCheckbox')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'singleCheckbox')(props.style)
  const inputStyle = getInlineStyle('input', { marginLeft: 16 })
  return (
    <>
      {props.label && (
        <Label
          style={{ wrapper: { marginBottom: 0 } }}
          {...props.label}
        ></Label>
      )}
      <Wrapper {...getCSSStyles('wrapper')}>
        <input
          type="checkbox"
          checked={value}
          onChange={() => props.onChange(!value)}
          style={inputStyle.style}
          data-theme-id={inputStyle.dataThemeId}
        />
      </Wrapper>
    </>
  )
}
