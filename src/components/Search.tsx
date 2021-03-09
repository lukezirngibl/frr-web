import React, { FC, ReactNode, useEffect, useState } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  color: #1d252f;
  /* border-radius: 4px; */
  border-width: 1px;
  padding-left: 16px;
  cursor: pointer;
  background: transparent;
  border: 0;
  /* border: 1px solid #d0d8e2; */

  font-size: 14px;

  &:focus {
    outline: none;
  }
`

const SearchWrapper = styled.div`
  width: 100%;
  transition: all ease 0.5s;
  max-width: 400px;
  background-color: #f8f8f8;
  border: 1px rgba(34, 36, 38, 0.15) solid;
  border-radius: 4px;
  height: 38px;
  position: relative;
`

type Props = {
  placeholder: string
  value: string
  onChange: (v: string) => void
  children?: ReactNode
  style?: CSSProperties
}

export const Search = (props: Props) => {
  const onChange = useDebouncedCallback((text: string) => {
    props.onChange(text)
  }, 1000)

  const [value, setValue] = useState(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <SearchWrapper style={props.style}>
      <SearchBar
        value={value}
        placeholder={props.placeholder}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
      ></SearchBar>

      {props.children}
    </SearchWrapper>
  )
}
