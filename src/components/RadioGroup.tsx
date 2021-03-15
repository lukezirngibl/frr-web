import React from 'react'
import { LabelProps, Label } from './Label'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle, useCSSStyles } from '../theme/util'
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
  const theme = useAppTheme()

  const getInlineStyle = useInlineStyle(theme, 'radioGroup')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'radioGroup')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper {...getInlineStyle('wrapper')}>
        {props.options.map((o, k) => {
          const active = o.value === props.value
          return (
            <Item
              {...getInlineStyle('item')}
              key={k}
              onClick={() => {
                props.onChange(o.value)
              }}
              data-test-id={`${props.dataTestId}:${o.value}`}
            >
              <P {...getCSSStyles('label')} label={o.label} />
              <OuterRadio
                {...getInlineStyle({
                  radioOuter: true,
                  radioOuterActive: active,
                  radioOuterError: props.error,
                })}
              >
                {active && (
                  <InnerRadio
                    {...getInlineStyle({
                      radioInner: true,
                      radioInnerActive: active,
                    })}
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
