import React, { ReactNode, RefCallback } from 'react'
import { Div } from '../../html'
import { ComponentTheme, useCSSStyles, useComponentTheme } from '../../theme/theme.components'
import { CommonPropsAndClassName } from './Menu.types'

// ==============================
// Menu Option Component
// ==============================

export interface MenuOptionProps extends CommonPropsAndClassName {
  children: ReactNode
  dataTestId: string
  innerRef?: RefCallback<HTMLDivElement>
  isDisabled?: boolean
  isFocused?: boolean
  isSelected?: boolean
  onSelect?: (event: React.MouseEvent<HTMLDivElement>) => void
  onHover?: (event: React.MouseEvent<HTMLDivElement>) => void
  style?: Partial<ComponentTheme['select']>
}

export const MenuOption = (props: MenuOptionProps) => {
  const theme = useComponentTheme()
  const cssStyles = useCSSStyles(theme, 'select')(props.style)
  
  return (
    <Div
      {...cssStyles({ option: true, optionActive: props.isSelected, optionHover: props.isFocused })}
      className={props.cx(
        {
          option: true,
          'option--is-disabled': props.isDisabled,
          'option--is-selected': props.isSelected,
          'option--is-focused': props.isFocused,
        },
        props.className,
      )}
      aria-disabled={props.isDisabled}
      dataTestId={props.dataTestId}
      disabled={props.isDisabled}
      label="option"
      onClick={props.onSelect}
      onMouseMove={props.onHover}
      onMouseOver={props.onHover}
      ref={props.innerRef}
      tabIndex={-1}
    >
      {props.children}
    </Div>
  )
}

