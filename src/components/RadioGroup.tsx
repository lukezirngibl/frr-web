import React from 'react'
import { LabelProps, Label } from './Label'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useInlineStyle, useCSSStyles, createStyled } from '../theme/util'
import styled from 'styled-components'
import { Options } from '../util'
import { P } from '../html'

const Wrapper = createStyled('div')

const Item = createStyled(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around !important;
  padding-left: 8px;
  align-items: flex-start;
`)

const OuterRadio = styled.label`
  padding: 0px !important;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  cursor: pointer;
`

const InnerRadio = styled.input`
  padding: 4px;
  border-radius: 50%;
  margin-bottom: 4px;
  margin-left: 3px;
  cursor: pointer;

  &:checked {
    background-color: black;
  }
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
      <Wrapper {...getCSSStyles('wrapper')}>
        {props.options.map((o, k) => {
          const active = o.value === props.value
          return (
            <Item
              key={k}
              data-test-id={`${props.dataTestId}:${o.value}`}
              {...getCSSStyles('item')}
            >
              <label htmlFor={o.label}><P label={o.label} /></label>
              <OuterRadio
                {...getInlineStyle({
                  radioOuter: true,
                  radioOuterActive: active,
                  radioOuterError: props.error,
                })}
                htmlFor={o.label}
              >
                <InnerRadio
                  type="radio"
                  checked={active}
                  id={o.label}
                  value={o.label}
                  onChange={() => {
                    props.onChange(o.value)
                  }}
                />
              </OuterRadio>
            </Item>
          )
        })}
      </Wrapper>
    </>
  )
}
