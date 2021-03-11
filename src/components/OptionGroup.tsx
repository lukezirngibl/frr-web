import React from 'react'
import styled from 'styled-components'
import { getThemeContext, AppTheme } from '../theme/theme'
import { useInlineStyle } from '../theme/util'
import { Options } from '../util'
import { Label, LabelProps } from './Label'
import { P } from '../html'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &.inactive:last-child {
    border-right-width: 0 !important;
  }
`

export type Props = {
  label?: LabelProps
  onChange: (v: string) => void
  value: string | null
  options: Options<string>
  disabled?: boolean
  style?: Partial<AppTheme['optionGroup']>
  error?: boolean
  dataTestId?: string
}

export const OptionGroup = (props: Props) => {
  const theme = React.useContext(getThemeContext())

  const getInlineStyle = useInlineStyle(theme, 'optionGroup')(props.style)
  const getCSSStyles = useInlineStyle(theme, 'optionGroup')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper
        {...getInlineStyle([
          'wrapper',
          ...((props.error ? ['errorWrapper'] : []) as any),
        ])}
      >
        {props.options.map((item) => (
          <Item
            className={item.value === props.value ? 'active' : 'inactive'}
            key={item.value}
            onClick={() => {
              props.onChange(item.value)
            }}
            data-test-id={`${props.dataTestId}:${item.value}`}
            {...getInlineStyle([
              'item',
              ...((item.value === props.value ? ['itemActive'] : []) as any),
            ])}
          >
            <P
              {...getCSSStyles([
                'label',
                ...((item.value === props.value ? ['labelActive'] : []) as any),
              ])}
              label={item.label}
            />
          </Item>
        ))}
      </Wrapper>
    </>
  )
}
