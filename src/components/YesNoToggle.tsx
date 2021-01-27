import React from 'react'
import styled from 'styled-components'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation } from '../theme/language'
import { TranslationGeneric } from '../util'
import { CommonTM } from '../translations'
import { Label, LabelProps } from './Label'

const YesNoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Item = styled.div``

const ItemLabel = styled.p``

export type Props<T> = {
  label?: LabelProps<T>
  onChange: (v: boolean) => void
  value: boolean
  disabled?: boolean
  style?: Partial<AppTheme['yesNoToggle']>
}

export const YesNoToggle = <T extends TranslationGeneric>(props: Props<T>) => {
  const theme = React.useContext(getThemeContext())
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const getStyle = createGetStyle(theme, 'yesNoToggle')(props.style)

  const items: Array<{ label: keyof CommonTM; value: boolean }> = [
    {
      label: 'no',
      value: false,
    },
    {
      label: 'yes',
      value: true,
    },
  ]

  return (
    <>
      {props.label && <Label<T> {...props.label} />}
      <YesNoWrapper style={getStyle('wrapper')}>
        {items.map((item, k) => (
          <Item
            key={k}
            onClick={() => {
              props.onChange(item.value)
            }}
            style={{
              ...getStyle('item'),
              ...(item.value === props.value ? getStyle('active') : {}),
              ...(item.value === props.value && !item.value
                ? getStyle('activeFalse')
                : {}),
            }}
          >
            <ItemLabel style={getStyle('label')}>
              {translate(item.label)}
            </ItemLabel>
          </Item>
        ))}
      </YesNoWrapper>
    </>
  )
}
