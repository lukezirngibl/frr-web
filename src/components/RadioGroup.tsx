import React from 'react'
import styled from 'styled-components'
import { useGroupFocus } from '../hooks/useGroupFocus'
import { Options, P } from '../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
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
  defaultValue?: string
}

export const RadioGroup = (props: Props) => {
  const theme = useComponentTheme()

  const getCSSStyles = useCSSStyles(theme, 'radioGroup')(props.style)

  const { onKeyDown, onBlur, onChange, onFocus, isFocused, focusedIndex } = useGroupFocus<string>(props)

  React.useEffect(() => {
    if (props.value === null && props.defaultValue !== undefined) {
      props.onChange(props.defaultValue)
    }
  }, [])

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}
      <Wrapper
        {...getCSSStyles('wrapper')}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {props.options.map((option, optionIndex) => {
          const isActive = option.value === props.value

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
                {...getCSSStyles({
                  radioOuter: true,
                  radioOuterActive: isActive,
                  radioOuterFocus: isFocused && optionIndex === focusedIndex,
                  radioOuterError: props.error,
                })}
              >
                {isActive && (
                  <InnerRadio
                    {...getCSSStyles({
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

const OuterRadio = createStyled(styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`)

const InnerRadio = createStyled(styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`)
