import React, { Component } from 'react'
import { Label, LabelProps } from './Label'
import { TranslationGeneric } from '../util'
import styled from 'styled-components'
import { Switch as MaterialSwitch } from '@material-ui/core'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 75px;
  padding-top: 24px;
`

export type Props<TM> = {
  onChange: (value: boolean) => void
  value: boolean
  disabled?: boolean
  error: boolean
  required?: boolean
  name?: string
  label?: LabelProps<TM>
}

export const Switch = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const { value, label } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked)
  }

  return (
    <Wrapper className={value ? 'mui-active-switch' : ''}>
      {props.label && (
        <Label
          style={{ wrapper: { marginBottom: 0, marginRight: 'auto' } }}
          {...props.label}
        ></Label>
      )}
      <MaterialSwitch
        checked={value}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </Wrapper>
  )
}
