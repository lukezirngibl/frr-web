import React, { ReactNode } from 'react'
import { RemoteData, RemoteSuccess } from '@devexperts/remote-data-ts'
import { useTranslation, Namespace } from 'react-i18next'
import { AutoSizer, List, ListRowProps } from 'react-virtualized'
import styled, { css, CSSProperties } from 'styled-components'

import { useAppTheme, AppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { Translate } from '../translation'
import { P } from '../html'

import { Loading } from './Loading'
import { SimplePopover } from './PopOver'
import { Icon } from './Icon'

export type TableColumn<T extends {}> = {
  dataKey: keyof T
  label: string
  labelInfo?: string
  customRender?: (value: T[keyof T], row: T, translate: Translate) => ReactNode
  width: number
  isAmountValue?: boolean
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
  const getInlineStyle = useInlineStyle(theme, 'table')(props.style)

  const totalWidth = props.columns.reduce((sum, c) => sum + c.width, 0)

  const rowRenderer = (params: ListRowProps) => {
    const row = (props.data as RemoteSuccess<any, Array<T>>).value[params.index]
    const rowSpecificStyle = {
      cursor: !!props.onRowClick ? 'pointer' : 'default',
    } as any
    return (
      <Row
        {...getCSSStyle(
          'rowWrapper',
          props.getRowStyle ? { ...props.getRowStyle(row), rowSpecificStyle } : rowSpecificStyle,
        )}
        style={params.style}
        key={params.key}
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
                width: `${(c.width / totalWidth) * 100}%`,
                flexShrink: 0,
                flexGrow: 0,
              })}
              key={c.dataKey}
            >
              {(c.customRender && c.customRender(value, row, translate)) ||
                (c.isAmountValue && (
                  <RowAmountValue {...getCSSStyle('rowText')}>{value}</RowAmountValue>
                )) || <RowValue {...getCSSStyle('rowText')}>{value}</RowValue>}
            </RowCell>
          )
        })}
      </Row>
    )
  }

  return (
    <TableWrapper {...getCSSStyle('tableWrapper')}>
      <HeaderOuterWrapper {...getCSSStyle('headerOuterWrapper')}>
        <Header {...getCSSStyle('headerWrapper')}>
          {props.columns.map((c) => {
            return (
              <HeaderCell
                {...getCSSStyle('headerCell', {
                  width: `${(c.width / totalWidth) * 100}%`,
                  flexShrink: 0,
                  flexGrow: 0,
                })}
                key={c.dataKey}
              >
                <HeaderValue {...getCSSStyle('headerText')}>{translate(c.label)}</HeaderValue>
                {c.labelInfo !== undefined && translate(c.labelInfo).trim().length > 0 ? (
                  <SimplePopover
                    style={getInlineStyle('descriptionOuterWrapper').style}
                    trigger={({ onClick }) => (
                      <DescriptionIconWrapper {...getCSSStyle('descriptionIconWrapper')}>
                        <Icon
                          icon="info_outline"
                          style={getInlineStyle('descriptionIcon').style}
                          onClick={onClick}
                        />
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

const NoResultsFoundWrapper = createStyled('div')
const LoaderWrapper = createStyled('div')
const TableWrapper = createStyled('div')
const ListWrapper = createStyled('div')
const Header = createStyled('div')
const HeaderOuterWrapper = createStyled('div')
const HeaderCell = createStyled('div')
const HeaderValue = createStyled(styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
`)
const Row = createStyled('div')
const RowCell = createStyled('div')
const RowValue = createStyled(styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
`)
const RowAmountValue = createStyled(styled.p`
  text-align: right;
  max-width: 90px;
  text-overflow: ellipsis;
  overflow: hidden;
`)

const DescriptionPopup = createStyled('div')
const DescriptionIconWrapper = createStyled('div')
