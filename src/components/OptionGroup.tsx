import React from 'react'
import styled from 'styled-components'
import { useGroupFocus } from '../hooks/useGroupFocus'
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
  onFocus?: () => void
  onBlur?: (v: string | number) => void
  options: Options<string | number>
  style?: Partial<ComponentTheme['optionGroup']>
  value: string | number | null
}

export const OptionGroup = (props: Props) => {
  const theme = useComponentTheme()

  const getCSSStyles = useCSSStyles(theme, 'optionGroup')(props.style)

  const { onKeyDown, onBlur, onChange, onFocus, isFocused, focusedIndex } = useGroupFocus<
    string | number
  >(props)

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
        tabIndex={0}
      >
        {props.options.map((item, itemIndex) => (
          <Item
            {...getCSSStyles({
              item: true,
              itemActive: item.value === props.value,
              itemFocus: isFocused && itemIndex === focusedIndex,
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
