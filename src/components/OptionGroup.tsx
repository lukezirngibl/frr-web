import React from 'react'
import styled from 'styled-components'
import { Options, OptionType, P } from '../html'
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
  onFocus?: () => void
  onBlur?: (v: string | number) => void
  options: Options<string | number>
  style?: Partial<ComponentTheme['optionGroup']>
  value: string | number | null
}

export const OptionGroup = (props: Props) => {
  const theme = useComponentTheme()

  const getCSSStyles = useCSSStyles(theme, 'optionGroup')(props.style)

  const [isFocused, setIsFocused] = React.useState(false)

  const onFocus = () => {
    setIsFocused(true)
    props.onFocus?.()
  }
  const onChange = (item: OptionType<string | number>) => {
    props.onChange(item.value)
    props.onBlur?.(item.value)
    setIsFocused(false)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const activeIndex = props.options.findIndex((item) => item.value === props.value)
      props.onChange(props.options[(activeIndex + 1) % props.options.length].value)
      event.preventDefault()
    }
  }

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <Wrapper
        {...getCSSStyles({
          wrapper: true,
          wrapperFocus: isFocused,
          errorWrapper: props.error,
        })}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {props.options.map((item) => (
          <Item
            {...getCSSStyles({
              item: true,
              itemActive: item.value === props.value,
            })}
            className={item.value === props.value ? 'active' : 'inactive'}
            data-test-id={`${props.dataTestId || 'option'}:${item.value}`}
            key={item.value}
            onClick={() => onChange(item)}
            tabIndex={-1}
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
