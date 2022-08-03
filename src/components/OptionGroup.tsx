import React from 'react'
import styled from 'styled-components'
import { Options, P } from '../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

const Wrapper = createStyled(styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`)

const Item = createStyled(styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`)

export type Props = {
  dataTestId?: string
  disabled?: boolean
  error?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  onChange: (v: string | number) => void
  options: Options<string | number>
  style?: Partial<ComponentTheme['optionGroup']>
  value: string | number | null
}

export const OptionGroup = (props: Props) => {
  const theme = useComponentTheme()

  const getCSSStyles = useCSSStyles(theme, 'optionGroup')(props.style)

  return (
    <>
      {props.label && <Label {...props.label} />}
      <Wrapper
        {...getCSSStyles({
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
            data-test-id={`${props.dataTestId || 'option'}:${item.value}`}
            {...getCSSStyles({
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
