import React from 'react'
import { LabelProps, Label } from './Label'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import styled from 'styled-components'
import { Options } from '../util'
import { P } from '../html'

const Wrapper = styled.div``

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
`

const OuterRadio = styled.div`
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`

const InnerRadio = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

export type Props = {
  onChange: (value: string) => void
  value: string
  label?: LabelProps
  options: Options<string>
  style?: Partial<AppTheme['radioGroup']>
  error?: boolean
  dataTestId?: string
  name?: string
}

export const RadioGroup = (props: Props) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'radioGroup')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper style={getStyle('wrapper')}>
        {props.options.map((o, k) => {
          const active = o.value === props.value
          return (
            <Item
              style={getStyle('item')}
              key={k}
              onClick={() => {
                props.onChange(o.value)
              }}
            >
              <input
                type="radio"
                value={o.value}
                data-test-id={props.dataTestId}
                name={props.name || props.dataTestId}
                checked={active}
                style={{
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />
              <P style={getStyle('label')} label={o.label} />
              <OuterRadio
                style={{
                  ...getStyle('radioOuter'),
                  ...(active ? getStyle('radioOuterActive') : {}),
                  ...(props.error ? getStyle('radioOuterError') : {}),
                }}
              >
                {active && (
                  <InnerRadio
                    style={{
                      ...getStyle('radioInner'),
                      ...(active ? getStyle('radioInnerActive') : {}),
                    }}
                  ></InnerRadio>
                )}
              </OuterRadio>
            </Item>
          )
        })}
      </Wrapper>
    </>
  )
}
