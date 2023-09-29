import React, { Component } from 'react'
import { Label, LabelProps } from './Label'
import styled from 'styled-components'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'

const Wrapper = createStyled('div')

export type SingleCheckboxProps = {
  dataTestid?: string
  disabled?: boolean
  error: boolean
  label?: LabelProps
  name?: string
  onChange: (value: boolean) => void
  style?: ComponentTheme['singleCheckbox']
  value: boolean
}

export const SingleCheckbox = (props: SingleCheckboxProps) => {
  const { value } = props

  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'singleCheckbox')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'singleCheckbox')(props.style)
  const inputStyle = getInlineStyle('input', { marginLeft: 16 })
  return (
    <>
      {props.label && <Label style={{ wrapper: { marginBottom: 0 } }} {...props.label}></Label>}
      <Wrapper {...getCSSStyles('wrapper')}>
        <input
          checked={value}
          data-test-id={props.dataTestid}
          data-theme-id={inputStyle.dataThemeId}
          onChange={() => props.onChange(!value)}
          name={props.name}
          style={inputStyle.style}
          type="checkbox"
        />
      </Wrapper>
    </>
  )
}
