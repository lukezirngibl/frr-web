import React, { ReactNode, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useGroupFocus } from '../hooks/useGroupFocus'
import { Div, Img, OptionType, Options, P } from '../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../theme/theme.components'
import { createStyled } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Label, LabelProps } from './Label'
import { RadioOptionItem } from './RadioGroup'

export type OptionGroupOptions = Array<OptionType<string | number> & { CustomElement?: ReactNode }>

export type Props = {
  dataTestId?: string
  disabled?: boolean
  error?: boolean
  hasFocus?: boolean
  isAutoSetEnabled?: boolean
  label?: LabelProps
  localeNamespace?: LocaleNamespace
  onChange: (v: string | number) => void
  onFocus?: () => void
  onBlur?: (v: string | number) => void
  options: OptionGroupOptions
  style?: Partial<ComponentTheme['optionGroup']>
  value: string | number | null
}

export const OptionGroup = (props: Props) => {
  const theme = useComponentTheme()
  const optionGroupRef = useRef(null)

  const getCSSStyles = useCSSStyles(theme, 'optionGroup')(props.style)

  const { onKeyDown, onBlur, onChange, onFocus, isFocused, focusedIndex } = useGroupFocus<
    string | number
  >(props)

  useEffect(() => {
    if (props.hasFocus) {
      if (optionGroupRef.current) {
        optionGroupRef.current.focus()
      }
      onFocus()
    }
  }, [props.hasFocus])

  // Directly select option if only one exists
  useEffect(() => {
    if (
      props.isAutoSetEnabled && props.options.length === 1 &&
      !props.options.some((option) => option.value === props.value)
    ) {
      onChange(props.options[0])
    }
  }, [props.isAutoSetEnabled, props.value, props.options])

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
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        ref={optionGroupRef}
        tabIndex={0}
      >
        {props.options.map((item, itemIndex) => (
          <Item
            {...getCSSStyles({
              item: true,
              itemActive: item.value === props.value,
              itemFocus: isFocused && itemIndex === focusedIndex,
              itemDisabled: item.disabled,
            })}
            className={item.value === props.value ? 'active' : 'inactive'}
            dataTestId={`${props.dataTestId || 'option'}:${item.value}`}
            disabled={item.disabled || props.disabled}
            key={item.value}
            onClick={item.disabled || props.disabled ? undefined : () => onChange(item)}
            tabIndex={-1}
          >
            {item.CustomElement || (
              <>
                <Div {...getCSSStyles('itemRadioCircle')}>
                  <RadioOptionItem
                    dataTestId={'option'}
                    error={props.error}
                    isActive={item.value === props.value}
                    // isFocused={isFocused && itemIndex === focusedIndex}
                    localeNamespace={props.localeNamespace}
                    option={{ value: item.value }}
                    optionIndex={itemIndex}
                    style={props.style}
                  />
                </Div>

                <P
                  {...getCSSStyles({
                    label: true,
                    labelActive: item.value === props.value,
                  })}
                  label={item.label}
                  data={item.labelData}
                  localeNamespace={props.localeNamespace}
                />
              </>
            )}
          </Item>
        ))}
      </Wrapper>
    </>
  )
}

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
