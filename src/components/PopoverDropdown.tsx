import React, { useState } from 'react'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import {
  Props as PopoverWithItemsProps,
  PopoverWithItems,
} from './PopoverWithItems'
import { P } from '../html'
import { Icon } from './Icon'
import { useMobileTouch } from '../hooks/useMobileTouch'

const DrodownSelector = createStyled('div')

export type Props = {
  style?: Partial<AppTheme['popoverDropdown']>
  label: string
  hasIcon?: boolean
  hasMobileBurgerMenu?: boolean
} & Omit<PopoverWithItemsProps, 'trigger'>

export const PopoverDropdown = (props: Props) => {
  const { style, label, hasIcon, ...otherProps } = props
  const theme = useAppTheme()
  const getCSSStyles = useCSSStyles(theme, 'popoverDropdown')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'popoverDropdown')(props.style)

  const { isMobile } = useMobileTouch()

  return (
    <PopoverWithItems
      {...otherProps}
      trigger={({ onClick }) => (
        <DrodownSelector
          onClick={onClick}
          {...getCSSStyles({
            button: true,
            burgerMenuButton: isMobile && props.hasMobileBurgerMenu,
          })}
        >
          {isMobile && props.hasMobileBurgerMenu ? (
            <Icon icon="menu" size={20} />
          ) : (
            <>
              <P label={props.label} {...getCSSStyles(['label'])} />
              {props.hasIcon && (
                <Icon
                  icon="expand_more"
                  size={18}
                  {...getInlineStyle(['icon'])}
                />
              )}
            </>
          )}
        </DrodownSelector>
      )}
    />
  )
}
