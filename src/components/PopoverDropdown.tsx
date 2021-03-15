import React, { useState } from 'react'
import { AppTheme, useAppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import {
  Props as PopoverWithItemsProps,
  PopoverWithItems,
} from './PopoverWithItems'
import { P } from '../html'
import { Icon } from './Icon'

const DrodownSelector = createStyled('div')

export type Props = {
  style?: Partial<AppTheme['popoverDropdown']>
  label: string
  hasIcon?: boolean
} & Omit<PopoverWithItemsProps, 'trigger'>

export const PopoverDropdown: React.FC<Props> = (props: Props) => {
  const { style, label, hasIcon, ...otherProps } = props
  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'popoverDropdown')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'popoverDropdown')(props.style)

  return (
    <PopoverWithItems
      {...otherProps}
      trigger={({ onClick }) => (
        <DrodownSelector onClick={onClick} {...getInlineStyle(['button'])}>
          <P label={props.label} {...getCSSStyle(['label'])} />
          {props.hasIcon && (
            <Icon icon="expand_more" size={18} {...getInlineStyle(['icon'])} />
          )}
        </DrodownSelector>
      )}
    />
  )
}
