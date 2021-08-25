import React, { ReactNode } from 'react'
import { RemoteData, RemoteSuccess } from '@devexperts/remote-data-ts'
import { useTranslation, Namespace } from 'react-i18next'
import { AutoSizer, List, ListRowProps } from 'react-virtualized'
import styled, { css, CSSProperties } from 'styled-components'
import { Popover } from '@material-ui/core'

import { useAppTheme, AppTheme } from '../theme/theme'
import { createStyled, useCSSStyles, useInlineStyle } from '../theme/util'
import { Translate } from '../translation'
import { P } from '../html'

import { Loading } from './Loading'

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

  const getIcon = useInlineStyle(theme, 'icon')({})
  const infoIcon = getIcon('info')

  const [openPopup, setOpenPopup] = React.useState<string>('')

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event, dataKey) => {
    setAnchorEl(event.currentTarget)
    setOpenPopup(dataKey)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenPopup('')
  }

  const open = Boolean(anchorEl)

  const totalWidth = props.columns.reduce((sum, c) => sum + c.width, 0)

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
                  <>
                    <DescriptionIconWrapper
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                        handleClick(event, c.dataKey.toString())
                      }
                      dangerouslySetInnerHTML={{ __html: infoIcon.style.svg }}
                      svgCSSStyles={getCSSStyle('descriptionIcon').cssStyles}
                      {...getCSSStyle('descriptionIconWrapper')}
                    />
                    {openPopup === c.dataKey.toString() && (
                      <Popover
                        id={`Popover-${c.dataKey}`}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <DescriptionPopup {...getCSSStyle('descriptionPopup')}>
                          <P
                            {...getCSSStyle('descriptionText')}
                            label={c.labelInfo}
                            localeNamespace={props.localeNamespace}
                          />
                        </DescriptionPopup>
                      </Popover>
                    )}
                  </>
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

const DescriptionIconWrapper = createStyled(styled.span`
  & svg {
    ${({ svgCSSStyles }: { svgCSSStyles: string }) =>
      css`
        ${svgCSSStyles}
      `}
    color: currentColor;
  }
`)

const DescriptionPopup = createStyled('div')
