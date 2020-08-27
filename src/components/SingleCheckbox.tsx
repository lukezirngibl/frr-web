import React, { Component } from 'react'
import { Label } from './Label'
import { TranslationGeneric } from '../util'
import styled from 'styled-components'

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
  label: keyof TM
}

export const SingleCheckbox = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { value, label } = props
  return (
    <Wrapper>
      <Label label={label} style={{ wrapper: { marginBottom: 0 } }}></Label>
      <input
        type="checkbox"
        checked={value}
        onChange={() => props.onChange(!value)}
        style={{
          marginLeft: 16,
        }}
      />
    </Wrapper>
  )
}
