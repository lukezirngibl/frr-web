import React from 'react'
import styled from 'styled-components'
import { Options, P } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { useCSSStyles, useInlineStyle } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

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
  dataTestId?: string
  disabled?: boolean
  error?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  onChange: (v: string) => void
  options: Options<string>
  style?: Partial<AppTheme['optionGroup']>
  value: string | null
}

export const OptionGroup = (props: Props) => {
  const theme = useAppTheme()

  const getInlineStyle = useInlineStyle(theme, 'optionGroup')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'optionGroup')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper
        {...getInlineStyle({
          wrapper: true,
          errorWrapper: props.error,
        })}
      >
        {props.options.map((item) => (
          <Item
            className={item.value === props.value ? 'active' : 'inactive'}
            key={item.value}
            onClick={() => {
              props.onChange(item.value)
            }}
            data-test-id={`${props.dataTestId}:${item.value}`}
            {...getInlineStyle({
              item: true,
              itemActive: item.value === props.value,
            })}
          >
            <P
              {...getCSSStyles({
                label: true,
                labelActive: item.value === props.value,
              })}
              label={item.label}
              localeNamespace={props.localeNamespace}
            />
          </Item>
        ))}
      </Wrapper>
    </>
  )
}
