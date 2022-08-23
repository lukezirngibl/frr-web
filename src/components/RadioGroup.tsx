import React from 'react'
import styled from 'styled-components'
import { Options, OptionType, P } from '../html'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

const Wrapper = createStyled('div')

export type Props = {
  dataTestId?: string
  error?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  name?: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: (value: string) => void
  options: Options<string>
  style?: Partial<ComponentTheme['radioGroup']>
  value: string
}

export const RadioGroup = (props: Props) => {
  const theme = useComponentTheme()

  const getInlineStyle = useInlineStyle(theme, 'radioGroup')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'radioGroup')(props.style)

  const [isFocused, setIsFocused] = React.useState(false)

  const onFocus = () => {
    setIsFocused(true)
    props.onFocus?.()
  }
  const onChange = (item: OptionType<string>) => {
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
      <Wrapper {...getCSSStyles('wrapper')} tabIndex={0} onFocus={onFocus} onKeyDown={onKeyDown}>
        {props.options.map((option, k) => {
          const active = option.value === props.value
          return (
            <Item
              {...getCSSStyles('item')}
              key={k}
              data-test-id={`${props.dataTestId}:${option.value}`}
              onClick={() => onChange(option)}
              tabIndex={-1}
            >
              <P
                {...getCSSStyles('label')}
                label={option.label}
                localeNamespace={props.localeNamespace}
              />
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

const Item = createStyled(styled.div`
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
