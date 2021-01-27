import React, { useState } from 'react'
import { TranslationGeneric } from '../util'
import styled from 'styled-components'

import { Label } from './Label'
import { TextInput } from './TextInput'
import { Dropdown } from './Dropdown'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const DropdownWrapper = styled.div`
  flex: 0 0 96px;
  margin-right: 8px;
`

export type Props<TM> = {
  onChange: (value: string) => void
  value: string
  error: boolean
  options: Array<{ label?: keyof TM; name?: string; value: string }>
  required?: boolean
  readOnly?: boolean
  placeholder: string
  label?: keyof TM
}

export const InputWithDropdown = <TM extends TranslationGeneric>(
  props: Props<TM>,
) => {
  const { label, value: externalValue, placeholder } = props

  const [sliceIndex, setSliceIndex] = React.useState(placeholder.length)

  const value = {
    prefix: (externalValue || placeholder).slice(0, sliceIndex),
    tail: (externalValue || placeholder).slice(
      sliceIndex,
      (externalValue || placeholder).length,
    ),
  }

  return (
    <>
      {label && <Label<TM> label={label} />}
      <Wrapper>
        <DropdownWrapper>
          <Dropdown<TM>
            readOnly={props.readOnly}
            options={props.options}
            value={value.prefix}
            error={props.error}
            onChange={v => {
              setSliceIndex(v.length)
              props.onChange(`${v}${value.tail}`)
            }}
          />
        </DropdownWrapper>
        <TextInput<TM>
          readOnly={props.readOnly}
          value={value.tail}
          onChange={str => {
            props.onChange(`${value.prefix}${str}`)
          }}
          style={{ wrapper: { flex: 1 } }}
        />
      </Wrapper>
    </>
  )
}
