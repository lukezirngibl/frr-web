import React from 'react'
import styled from 'styled-components'

import { Options, P } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

export type Props = {
  dataTestId?: string
  error?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  name?: string
  onChange: (value: string) => void
  options: Options<string>
  style?: Partial<AppTheme['radioGroup']>
  value: string
}

export const RadioGroup = (props: Props) => {
  const theme = useAppTheme()

  const getInlineStyle = useInlineStyle(theme, 'radioGroup')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'radioGroup')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper {...getCSSStyles('wrapper')}>
        {props.options.map((option, k) => {
          const active = option.value === props.value
          return (
            <Item
              {...getCSSStyles('item')}
              key={k}
              onClick={() => {
                props.onChange(option.value)
              }}
              data-test-id={`${props.dataTestId}:${option.value}`}
              htmlFor={`${props.dataTestId}-${k}`}
            >
              <P
                {...getCSSStyles('label')}
                label={option.label}
                localeNamespace={props.localeNamespace}
              />
              <input type="radio" id={`${props.dataTestId}-${k}`} checked={active} />
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

const Wrapper = createStyled('div')

const Item = createStyled(styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
`)

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
