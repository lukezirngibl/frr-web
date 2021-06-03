import React, { ReactNode } from 'react'
import { RemoteData, RemoteSuccess } from '@devexperts/remote-data-ts'
import { useTranslation, Namespace } from 'react-i18next'
import { AutoSizer, List, ListRowProps } from 'react-virtualized'
import { useAppTheme, AppTheme } from '../theme/theme'
import { createStyled, useCSSStyles } from '../theme/util'
import { Translate } from '../translation'
import { Loading } from './Loading'
import { P } from '../html'
import { CSSProperties } from 'styled-components'

const NoResultsFoundWrapper = createStyled('div')
const LoaderWrapper = createStyled('div')
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
  customRender?: (value: T[keyof T], row: T, translate: Translate) => ReactNode
  width: number
}

export type TableColumns<T extends {}> = Array<TableColumn<T>>

type Props<T extends {}> = {
  data: RemoteData<any, Array<T>>
  columns: TableColumns<T>
  onRowClick?: (row: T) => void
  noResultsLabel?: string
  localeNamespace: Namespace
  style?: Partial<AppTheme['table']>
  getRowStyle?: (row: T) => CSSProperties
}

export const Table = <T extends {}>(props: Props<T>) => {
  const { t: translate } = useTranslation(props.localeNamespace)

  const theme = useAppTheme()
  const getCSSStyle = useCSSStyles(theme, 'table')(props.style)

  const rowRenderer = (params: ListRowProps) => {
    const row = (props.data as RemoteSuccess<any, Array<T>>).value[params.index]
    return (
      <Row
        {...getCSSStyle('rowWrapper', props.getRowStyle ? props.getRowStyle(row) : {})}
        key={params.key}
        style={params.style}
        onClick={() => {
          if (props.onRowClick) {
            props.onRowClick(row)
          }
        }}
      >
        {props.columns.map((c) => {
          const value = row[c.dataKey]
          return (
            <RowCell
              {...getCSSStyle('rowCell', {
                width: c.width,
                flexShrink: 0,
                flexGrow: 0,
              })}
              key={c.dataKey}
            >
              {c.customRender ? (
                c.customRender(value, row, translate)
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
        {props.data.fold(
          <></>,
          <LoaderWrapper {...getCSSStyle('loadingWrapper')}>
            <Loading style={getCSSStyle('loading').cssStyles} />
          </LoaderWrapper>,
          () => (
            <></>
          ),
          (data) =>
            data.length === 0 ? (
              <NoResultsFoundWrapper {...getCSSStyle('noResultsWrapper')}>
                <P
                  {...getCSSStyle('noResultsLabel')}
                  label={props.noResultsLabel || 'No results found.'}
                />
              </NoResultsFoundWrapper>
            ) : (
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    rowHeight={48}
                    rowRenderer={rowRenderer}
                    width={width}
                    rowCount={data.length}
                  />
                )}
              </AutoSizer>
            ),
        )}
      </ListWrapper>
    </TableWrapper>
  )
}
