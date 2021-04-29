import React from 'react'
import { useMobileTouch } from '../hooks/useMobileTouch'
import { P } from '../html'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { LocaleNamespace } from '../translation'
import { Icon } from './Icon'
import {
  PopoverWithItems,
  Props as PopoverWithItemsProps,
} from './PopoverWithItems'

const DrodownSelector = createStyled('div')

export type Props = {
  hasIcon?: boolean
  hasMobileBurgerMenu?: boolean
  label: string
  localeNamespace?: LocaleNamespace
  style?: Partial<AppTheme['popoverDropdown']>
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
              <P
                label={props.label}
                localeNamespace={props.localeNamespace}
                {...getCSSStyles(['label'])}
              />
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
