import React from 'react'

import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'

import { Icon } from './Icon'
import { createStyled } from '../theme/util'

export enum SortValue {
  ASC = 'asc',
  DESC = 'desc',
}

type Props = {
  columnKeyActive: string
  column: { columnKey: string; sortValue: SortValue }
  onClick?: (params: { columnKey: string; value: string }) => void
  style?: Partial<ComponentTheme['table']>
}

export const TableSortingIcons = (props: Props) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'table')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'table')(props.style)

  const columnActive = props.columnKeyActive === props.column.columnKey

  const activeCssSettings = {
    color: 'black',
    fontWeight: 'bolder',
  }
  const nonActiveCssSettings = {
    color: 'inherit',
    fontWeight: 'inherit',
  }

  return (
    <SortingIconWrapper {...getCSSStyle('sortingIconsContainer')}>
      <IconWrapper
        {...getCSSStyle('sortingIconWrapper')}
        onClick={() => props.onClick({ columnKey: props.column.columnKey, value: SortValue.ASC })}
      >
        <Icon
          icon="arrow_drop_up"
          style={{
            ...getInlineStyle('sortingIcon').style,
            ...(columnActive && props.column.sortValue === SortValue.ASC
              ? activeCssSettings
              : nonActiveCssSettings),
          }}
        />
      </IconWrapper>
      <IconWrapper
        {...getCSSStyle('sortingIconWrapper')}
        onClick={() => props.onClick({ columnKey: props.column.columnKey, value: SortValue.DESC })}
      >
        <Icon
          icon="arrow_drop_down"
          style={{
            ...getInlineStyle('sortingIcon').style,
            ...(columnActive && props.column.sortValue === SortValue.DESC
              ? activeCssSettings
              : nonActiveCssSettings),
          }}
        />
      </IconWrapper>
    </SortingIconWrapper>
  )
}

const SortingIconWrapper = createStyled('div')
const IconWrapper = createStyled('div')