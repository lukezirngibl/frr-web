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

const findActiveIndex = (props: Props) => {
  const activeIndex = props.options.findIndex(({ value: optionValue }) => optionValue === props.value)
  return activeIndex === -1 ? 0 : activeIndex
}

export const RadioGroup = (props: Props) => {
  const theme = useComponentTheme()

  const getInlineStyle = useInlineStyle(theme, 'radioGroup')(props.style)
  const getCSSStyles = useCSSStyles(theme, 'radioGroup')(props.style)

  const [focusState, setFocusState] = React.useState({
    isFocused: false,
    focusedIndex: findActiveIndex(props),
  })

  const onFocus = () => {
    setFocusState({ isFocused: true, focusedIndex: findActiveIndex(props) })
    props.onFocus?.()
  }
  const onChange = (item: OptionType<string>) => {
    props.onChange(item.value)
    props.onBlur?.(item.value)
  }
  const onBlur = () => {
    setFocusState({ isFocused: false, focusedIndex: 0 })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowRight'].includes(event.key)) {
      setFocusState({
        isFocused: true,
        focusedIndex: (focusState.focusedIndex + 1) % props.options.length,
      })
      event.preventDefault()
    } else if (['ArrowLeft', 'Backspace'].includes(event.key)) {
      setFocusState({
        isFocused: true,
        focusedIndex: focusState.focusedIndex === 0 ? props.options.length - 1 : focusState.focusedIndex - 1,
      })
      event.preventDefault()
    } else if (['Enter'].includes(event.key)) {
      props.onChange(props.options[focusState.focusedIndex].value)
      event.preventDefault()
    }
  }

  return (
    <>
      {props.label && <Label {...props.label} isFocused={focusState.isFocused} />}
      <Wrapper
        {...getCSSStyles('wrapper')}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {props.options.map((option, optionIndex) => {
          const isActive = option.value === props.value
          const isFocused = focusState.isFocused && optionIndex === focusState.focusedIndex

          return (
            <Item
              {...getCSSStyles({
                item: true,
              })}
              key={`option-${optionIndex}`}
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
                  radioOuterActive: isActive,
                  radioOuterFocus: isFocused,
                  radioOuterError: props.error,
                })}
              >
                {isActive && (
                  <InnerRadio
                    {...getInlineStyle({
                      radioInner: true,
                      radioInnerActive: isActive,
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
  position: relative;
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
