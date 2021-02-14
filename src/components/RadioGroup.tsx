import React from 'react'
import { LabelProps, Label } from './Label'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation } from '../theme/language'
import styled from 'styled-components'
import { Options } from '../util'
import { P } from '../html'

export type Props = {
  onChange: (value: string) => void
  value: string
  label?: LabelProps
  options: Options<string>
  style?: Partial<AppTheme['radioGroup']>
  required?: boolean
  error?: boolean
}

const Wrapper = styled.div``

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
`

const LabelText = styled.p``

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

export const RadioGroup = (props: Props) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'radioGroup')(props.style)

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

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
