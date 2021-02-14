import React from 'react'
import styled from 'styled-components'
import { getThemeContext, AppTheme } from '../theme/theme'
import { createGetStyle } from '../theme/util'
import { getLanguageContext, getTranslation } from '../theme/language'
import { Options } from '../util'
import { Label, LabelProps } from './Label'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Item = styled.div`
  &.inactive:last-child {
    border-right-width: 0 !important;
  }
`

const ItemLabel = styled.p``

export type Props = {
  label?: LabelProps
  onChange: (v: string) => void
  value: string
  options: Options<string>
  disabled?: boolean
  style?: Partial<AppTheme['optionGroup']>
  error?: boolean
}

export const OptionGroup = (props: Props) => {
  const theme = React.useContext(getThemeContext())
  const language = React.useContext(getLanguageContext())
  const translate = getTranslation(language)

  const getStyle = createGetStyle(theme, 'optionGroup')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper
        style={{
          ...getStyle('wrapper'),
          ...(props.error ? getStyle('errorWrapper') : {}),
        }}
      >
        {props.options.map((item, k) => (
          <Item
            className={item.value === props.value ? 'active' : 'inactive'}
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
