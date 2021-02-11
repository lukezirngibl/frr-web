import React from 'react'
import styled from 'styled-components'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation } from '../theme/language'
import { TranslationGeneric } from '../util'
import { Label, LabelProps } from './Label'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Item = styled.div``

const ItemLabel = styled.p``

export type Props<T> = {
  label?: LabelProps<T>
  onChange: (v: string) => void
  value: string
  options: Array<{ label: keyof T; value: string }>
  disabled?: boolean
  style?: Partial<AppTheme['optionGroup']>
}

export const OptionGroup = <T extends TranslationGeneric>(props: Props<T>) => {
  const theme = React.useContext(getThemeContext())
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const getStyle = createGetStyle(theme, 'optionGroup')(props.style)

  console.log(props)
  return (
    <>
      {props.label && <Label<T> {...props.label} />}
      <Wrapper style={getStyle('wrapper')}>
        {props.options.map((item, k) => (
          <Item
            key={item.value}
            onClick={() => {
              props.onChange(item.value)
            }}
            style={{
              ...getStyle('item'),
              ...(item.value === props.value ? getStyle('itemActive') : {}),
            }}
          >
            <ItemLabel
              style={{
                ...getStyle('label'),
                ...(item.value === props.value ? getStyle('labelActive') : {}),
              }}
            >
              {translate(item.label)}
            </ItemLabel>
          </Item>
        ))}
      </Wrapper>
    </>
  )
}
