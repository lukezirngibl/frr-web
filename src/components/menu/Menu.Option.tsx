import '@emotion/react'
import React from 'react'
import { CSSObjectWithLabel, MenuOptionProps } from './Menu.types'

export const MenuOption = (props: MenuOptionProps) => {
  const { children, className, cx, getStyles, isDisabled, isFocused, isSelected, innerRef, innerProps } =
    props

  return (
    <div
      style={getStyles('option', props)}
      className={cx(
        {
          option: true,
          'option--is-disabled': isDisabled,
          'option--is-focused': isFocused,
          'option--is-selected': isSelected,
        },
        className,
      )}
      ref={innerRef}
      aria-disabled={isDisabled}
      {...innerProps}
    >
      {children}
    </div>
  )
}

export const optionCSS = ({
  isDisabled,
  isFocused,
  isSelected,
  theme: { spacing, colors },
}: MenuOptionProps): CSSObjectWithLabel => ({
  label: 'option',
  backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
  color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
  cursor: 'default',
  display: 'block',
  fontSize: 'inherit',
  padding: `${spacing.baseUnit * 2}px ${spacing.baseUnit * 3}px`,
  width: '100%',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

  // provide some affordance on touch devices
  ':active': {
    backgroundColor: !isDisabled ? (isSelected ? colors.primary : colors.primary50) : undefined,
  },
})
