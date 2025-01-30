import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useGroupFocus } from '../hooks/useGroupFocus'
import { Div, OptionType, P } from '../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'
import { props } from 'monocle-ts/lib/Traversal'

type RadioOption = OptionType<string | number> & { sublabel?: string }

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
  options: Array<RadioOption>
  style?: Partial<ComponentTheme['radioGroup']>
  value: string
  defaultValue?: string
}

export const RadioOptionItem = (props: {
  dataTestId: string
  error?: boolean
  isActive: boolean
  isAlignVertical?: boolean
  isFocused?: boolean
  localeNamespace?: LocaleNamespace
  onChange?: (option: RadioOption) => void
  option: RadioOption
  optionIndex: number
  style?: Partial<ComponentTheme['radioGroup']>
}) => {
  const theme = useComponentTheme()
  const getCSSStyles = useCSSStyles(theme, 'radioGroup')(props.style)

  return (
    <Item
      {...getCSSStyles({
        item: true,
        itemActive: props.isActive,
        itemVertical: !!props.isAlignVertical,
        itemVerticalActive: !!props.isAlignVertical && props.isActive,
      })}
      className={props.isActive ? 'active' : ''}
      dataTestId={`${props.dataTestId}:${props.option.value}`}
      key={`option-${props.optionIndex}`}
      onClick={() => props.onChange?.(props.option)}
      tabIndex={-1}
    >
      {props.option.label && (
        <Div {...getCSSStyles('labelWrapper')}>
          <P
            {...getCSSStyles('label')}
            label={props.option.label}
            localeNamespace={props.localeNamespace}
          />
          {props.option.sublabel && (
            <P
              {...getCSSStyles('sublabel')}
              label={props.option.sublabel}
              localeNamespace={props.localeNamespace}
            />
          )}
        </Div>
      )}
      {props.option.icon && <Icon src={props.option.icon} {...getCSSStyles('icon')} />}
      <OuterRadio
        {...getCSSStyles({
          radioOuter: true,
          radioOuterActive: props.isActive,
          radioOuterFocus: props.isFocused,
          radioOuterError: props.error,
        })}
      >
        {props.isActive && (
          <InnerRadio
            {...getCSSStyles({
              radioInner: true,
              radioInnerActive: props.isActive,
            })}
          ></InnerRadio>
        )}
      </OuterRadio>
    </Item>
  )
}

export const RadioGroup = (props: Props) => {
  const theme = useComponentTheme()
  const radioGroupRef = useRef(null)

  const getCSSStyles = useCSSStyles(theme, 'radioGroup')(props.style)

  const { onKeyDown, onBlur, onChange, onFocus, isFocused, focusedIndex } = useGroupFocus<
    string | number
  >(props)

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
            <RadioOptionItem
              dataTestId={props.dataTestId || 'radioGroup'}
              error={props.error}
              isActive={isActive}
              isAlignVertical={!!props.isAlignVertical}
              isFocused={isFocused && optionIndex === focusedIndex}
              localeNamespace={props.localeNamespace}
              onChange={onChange}
              option={option}
              optionIndex={optionIndex}
              style={props.style}
            />
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
