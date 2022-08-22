import React, { ReactNode, RefCallback } from 'react'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { CommonPropsAndClassName } from './Menu.types'

// ==============================
// Menu Option Component
// ==============================

export interface MenuOptionProps extends CommonPropsAndClassName {
  children: ReactNode
  id: string
  innerRef?: RefCallback<HTMLDivElement>
  isDisabled?: boolean
  isFocused?: boolean
  isSelected?: boolean
  onSelect?: (event: React.MouseEvent<HTMLDivElement>) => void
  style?: Partial<ComponentTheme['select']>
}

export const MenuOption = (props: MenuOptionProps) => {
  const theme = useComponentTheme()
  const cssStyles = useCSSStyles(theme, 'select')(props.style)

  return (
    <StyledOption
      {...cssStyles({ option: true, optionActive: props.isSelected })}
      className={props.cx(
        {
          option: true,
          'option--is-disabled': props.isDisabled,
          'option--is-selected': props.isSelected,
        },
        props.className,
      )}
      aria-disabled={props.isDisabled}
      disabled={props.isDisabled}
      id={props.id}
      label="option"
      onClick={props.isDisabled ? undefined : props.onSelect}
      ref={props.innerRef}
    >
      {props.children}
    </StyledOption>
  )
}

// ==============================
// Styled components
// ==============================

const StyledOption = createStyled('div')
