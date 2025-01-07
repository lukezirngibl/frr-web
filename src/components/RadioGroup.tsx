import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useGroupFocus } from '../hooks/useGroupFocus'
import { Div, OptionType, P } from '../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'

export type Props = {
  dataTestId?: string
  error?: boolean
  hasFocus?: boolean
  isAlignVertical?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  name?: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: (value: string) => void
  options: Array<OptionType<string> & { sublabel?: string }>
  style?: Partial<ComponentTheme['radioGroup']>
  value: string
  defaultValue?: string
}

export const RadioGroup = (props: Props) => {
  const theme = useComponentTheme()
  const radioGroupRef = useRef(null)

  const getCSSStyles = useCSSStyles(theme, 'radioGroup')(props.style)

  const { onKeyDown, onBlur, onChange, onFocus, isFocused, focusedIndex } = useGroupFocus<string>(props)

  useEffect(() => {
    if (props.value === null && props.defaultValue !== undefined) {
      props.onChange(props.defaultValue)
    }
  }, [])

  useEffect(() => {
    if (props.hasFocus) {
      if (radioGroupRef.current) {
        radioGroupRef.current.focus()
      }
      onFocus()
    }
  }, [props.hasFocus])

  return (
    <>
      {props.label && <Label {...props.label} isFocused={isFocused} />}

      <Div
        {...getCSSStyles({
          wrapper: !props.isAlignVertical,
          wrapperVertical: !!props.isAlignVertical,
          wrapperFocus: isFocused,
        })}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        ref={radioGroupRef}
        tabIndex={0}
      >
        {props.options.map((option, optionIndex) => {
          const isActive = option.value === props.value

          return (
            <Item
              {...getCSSStyles({
                item: true,
                itemActive: isActive,
                itemVertical: !!props.isAlignVertical,
                itemVerticalActive: !!props.isAlignVertical && isActive,
              })}
              className={isActive ? 'active' : ''}
              dataTestId={`${props.dataTestId}:${option.value}`}
              key={`option-${optionIndex}`}
              onClick={() => onChange(option)}
              tabIndex={-1}
            >
              <Div {...getCSSStyles('labelWrapper')}>
                <P
                  {...getCSSStyles('label')}
                  label={option.label}
                  localeNamespace={props.localeNamespace}
                />
                {option.sublabel && (
                  <P
                    {...getCSSStyles('sublabel')}
                    label={option.sublabel}
                    localeNamespace={props.localeNamespace}
                  />
                )}
              </Div>
              {option.icon && <Icon src={option.icon} {...getCSSStyles('icon')} />}
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
      </Div>
    </>
  )
}

const Item = createStyled(styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
`)

const Icon = createStyled('img')

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
