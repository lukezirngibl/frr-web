import React, { useEffect, useState } from 'react'

import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../theme/theme.components'
import { Icon } from './Icon'
import { createStyled } from '../theme/util'

type Props = {
  columnKeyActive: string
  columnKey: string
  onClick?: (params: { columnKey: string; value: string }) => void
  style?: Partial<ComponentTheme['table']>
}

export const TableSortingIcons = (props: Props) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'table')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'table')(props.style)

  const columnActive = props.columnKeyActive === props.columnKey

  const [arrowUpActive, setArrowUpActive] = useState(false)
  const [arrowDownActive, setArrowDownActive] = useState(false)

  const activeCssSettings = {
    color: 'black',
    fontWeight: 'bolder',
  }
  const nonActiveCssSettings = {
    color: 'inherit',
    fontWeight: 'inherit',
  }

  const onClickArrowUp = () => {
    setArrowUpActive(true)
    setArrowDownActive(false)
    if (props.onClick) {
      props.onClick({ columnKey: props.columnKey, value: 'asc' })
    }
  }

  const onClickArrowDown = () => {
    setArrowUpActive(false)
    setArrowDownActive(true)
    if (props.onClick) {
      props.onClick({ columnKey: props.columnKey, value: 'desc' })
    }
  }

  useEffect(() => {
    if (!columnActive && (arrowUpActive || arrowDownActive)) {
      setArrowUpActive(false)
      setArrowDownActive(false)
    }
  }, [columnActive])

  return (
    <SortingIconWrapper {...getCSSStyle('sortingIconWrapper')}>
      <Icon
        icon="arrow_drop_up"
        style={{
          ...getInlineStyle('sortingIcon').style,
          fontWeight: arrowUpActive ? activeCssSettings.fontWeight : nonActiveCssSettings.fontWeight,
          color: arrowUpActive ? activeCssSettings.color : nonActiveCssSettings.color,
          zIndex: arrowUpActive ? 0 : arrowDownActive ? 100 : 0,
        }}
        onClick={onClickArrowUp}
      />
      <Icon
        icon="arrow_drop_down"
        style={{
          ...getInlineStyle('sortingIcon').style,
          fontWeight: arrowDownActive ? activeCssSettings.fontWeight : nonActiveCssSettings.fontWeight,
          color: arrowDownActive ? activeCssSettings.color : nonActiveCssSettings.color,
          zIndex: arrowUpActive ? 100 : arrowDownActive ? 0 : 100,
        }}
        onClick={onClickArrowDown}
      />
    </SortingIconWrapper>
  )
}

const SortingIconWrapper = createStyled('div')
