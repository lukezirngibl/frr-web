import React from 'react'
import { createStyled } from '../../theme/util'
import styled, { CSSProperties } from 'styled-components'
import { SortValue, TableSortingIcons } from './TableSortingIcons'
import { SimplePopover } from '../PopOver'
import {
  ComponentTheme,
  useComponentTheme,
  useCSSStyles,
  useInlineStyle,
} from '../../theme/theme.components'
import { TableColumns } from '../types'
import { useTranslation } from 'react-i18next'
import { P } from '../../html'
import { Namespace } from 'i18next'
import { MdInfoOutline } from '../../icons/new/MdInfoOutline'

export type Sorting = {
  onClick: (params: { columnKey: string; value: string }) => void
  columnKeyActive: string
  sortValue: SortValue
}

type TableHeaderProps<T extends {}> = {
  columns: TableColumns<T>
  localeNamespace: Namespace
  sorting?: Sorting
  style?: Partial<ComponentTheme['table']>
  width: number
}

export const TableHeader = <T extends {}>(props: TableHeaderProps<T>) => {
  const { t } = useTranslation(props.localeNamespace)
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'table')(props.style)
  const getInlineStyle = useInlineStyle(theme, 'table')(props.style)

  return (
    <HeaderOuterWrapper {...getCSSStyle('headerOuterWrapper')}>
      <Header {...getCSSStyle('headerWrapper')}>
        {props.columns.map((c) => {
          return (
            <HeaderCell
              {...getCSSStyle('headerCell', {
                width: `${(c.width / props.width) * 100}%`,
                flexShrink: 0,
                flexGrow: 0,
              })}
              key={c.dataKey}
            >
              <HeaderValue {...getCSSStyle('headerText')}>{t(c.label)}</HeaderValue>
              {c.isSortable && (
                <TableSortingIcons
                  style={props.style}
                  columnKeyActive={props.sorting.columnKeyActive}
                  onClick={props.sorting.onClick}
                  column={{
                    columnKey: c.dataKey as string,
                    sortValue: props.sorting.sortValue as SortValue,
                  }}
                />
              )}
              {c.labelInfo !== undefined && t(c.labelInfo).trim().length > 0 ? (
                <SimplePopover
                  style={getInlineStyle('descriptionOuterWrapper').style}
                  trigger={({ onClick }) => (
                    <DescriptionIconWrapper {...getCSSStyle('descriptionIconWrapper')} onClick={onClick}>
                      <MdInfoOutline style={getInlineStyle('descriptionIcon').style} />
                    </DescriptionIconWrapper>
                  )}
                  render={() => (
                    <DescriptionPopup {...getCSSStyle('descriptionPopup')}>
                      <P
                        {...getCSSStyle('descriptionText')}
                        label={c.labelInfo}
                        localeNamespace={props.localeNamespace}
                      />
                    </DescriptionPopup>
                  )}
                ></SimplePopover>
              ) : null}
            </HeaderCell>
          )
        })}
      </Header>
    </HeaderOuterWrapper>
  )
}

const Header = createStyled('div')
const HeaderOuterWrapper = createStyled('div')
const HeaderCell = createStyled('div')
const HeaderValue = createStyled(styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
`)

const DescriptionPopup = createStyled('div')
const DescriptionIconWrapper = createStyled('div')
