import React, { Component } from 'react'
import { Label, LabelProps } from './Label'
import styled from 'styled-components'
import { Switch as MaterialSwitch } from '@material-ui/core'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  padding-top: 24px;
`

export type Props = {
  onChange: (value: boolean) => void
  value: boolean
  disabled?: boolean
  error: boolean
  name?: string
  label?: LabelProps
}

export const Switch = (props: Props) => {
  const { value, label } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked)
  }

  return (
    <Wrapper className={value ? 'mui-active-switch' : ''}>
      {props.label && (
        <Label style={{ wrapper: { marginBottom: 0, marginRight: 'auto' } }} {...props.label}></Label>
      )}
      <MaterialSwitch
        checked={value}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </Wrapper>
  )
}
