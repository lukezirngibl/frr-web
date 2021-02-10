import React from 'react'
import { LabelProps, Label } from './Label'
import { TranslationGeneric } from '../util'
import { AppTheme, getThemeContext } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation } from '../theme/language'
import styled from 'styled-components'

export type Props<T> = {
  onChange: (value: string) => void
  value: string
  label?: LabelProps<T>
  options: Array<{ label: keyof T; value: string }>
  style?: Partial<AppTheme['radioGroup']>
  required?: boolean
  error?: boolean
}

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
`

const LabelText = styled.p`
  flex: 0 0 96px;
`

const OuterRadio = styled.div`
  width: 36px;
  height: 36px;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`

const InnerRadio = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`

export const RadioGroup = <TM extends TranslationGeneric>(props: Props<TM>) => {
  const theme = React.useContext(getThemeContext())
  const getStyle = createGetStyle(theme, 'radioGroup')(props.style)

  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  return (
    <>
      {props.label && <Label<TM> {...props.label} />}
      <div style={getStyle('wrapper')}>
        {props.options.map(o => {
          const active = o.value === props.value
          return (
            <Item style={getStyle('item')}>
              <LabelText style={getStyle('label')}>
                {translate(o.label)}
              </LabelText>
              <OuterRadio
                style={{
                  ...getStyle('radioOuter'),
                  ...(active ? getStyle('radioOuterActive') : {}),
                }}
              >
                <InnerRadio
                  style={{
                    ...getStyle('radioInner'),
                    ...(active ? getStyle('radioInnerActive') : {}),
                  }}
                ></InnerRadio>
              </OuterRadio>
            </Item>
          )
        })}
      </div>
    </>
  )
}
