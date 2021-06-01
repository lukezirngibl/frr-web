import React, { ReactNode } from 'react'
import { useTranslation, Namespace } from 'react-i18next'
import { AutoSizer, List, ListRowProps } from 'react-virtualized'
import { useAppTheme, AppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'

const TableWrapper = createStyled('div')
const ListWrapper = createStyled('div')
const Header = createStyled('div')
const HeaderCell = createStyled('div')
const HeaderValue = createStyled('p')
const Row = createStyled('div')
const RowCell = createStyled('div')
const RowValue = createStyled('p')

export type TableColumn<T extends {}> = {
  dataKey: keyof T
  label: string
  customRender?: (value: T[keyof T], row: T) => ReactNode
  width: number
}

export type TableColumns<T extends {}> = Array<TableColumn<T>>

type Props<T extends {}> = {
  data: Array<T>
  columns: TableColumns<T>
  onRowClick?: (item: T) => void
  localeNamespace: Namespace
  style?: Partial<AppTheme['table']>
}

export const Table = <T extends {}>(props: Props<T>) => {
  const { t: translate } = useTranslation(props.localeNamespace)

  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'table')(props.style)

  const rowRenderer = (params: ListRowProps) => {
    const row = props.data[params.index]
    return (
      <Row
        {...getCSSStyle('rowWrapper')}
        key={params.key}
        style={params.style}
        onRowClick={props.onRowClick}
      >
        {props.columns.map((c) => {
          const value = row[c.dataKey]
          return (
            <RowCell {...getCSSStyle('rowCell', { width: c.width, flexShrink: 0, flexGrow: 0 })}>
              {c.customRender ? (
                c.customRender(value, row)
              ) : (
                <RowValue {...getCSSStyle('rowText')}>{value}</RowValue>
              )}
            </RowCell>
          )
        })}
      </Row>
    )
  }

  return (
    <TableWrapper {...getCSSStyle('tableWrapper')}>
      <Header {...getCSSStyle('headerWrapper')}>
        {props.columns.map((c) => {
          return (
            <HeaderCell
              {...getCSSStyle('headerCell', { width: c.width, flexShrink: 0, flexGrow: 0 })}
              key={c.dataKey}
            >
              <HeaderValue {...getCSSStyle('headerText')}>{translate(c.label)}</HeaderValue>
            </HeaderCell>
          )
        })}
      </Header>
      <ListWrapper {...getCSSStyle('listWrapper')}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowHeight={48}
              rowRenderer={rowRenderer}
              width={width}
              rowCount={props.data.length}
            />
          )}
        </AutoSizer>
      </ListWrapper>
    </TableWrapper>
  )
}
