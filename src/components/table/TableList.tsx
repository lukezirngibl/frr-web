import { Namespace } from 'i18next'
import { useTranslation } from 'react-i18next'
import { AutoSizer, List, ListRowProps } from 'react-virtualized'
import styled, { CSSProperties } from 'styled-components'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { TableColumns } from '../types'

type TabelListProps<T extends {}> = {
  columns: TableColumns<T>
  data: Array<T>
  getRowStyle?: (row: T) => CSSProperties
  localeNamespace: Namespace
  onRowClick?: (row: T) => void
  style?: Partial<ComponentTheme['table']>
  width: number
}

export const TabelList = <T extends {}>(props: TabelListProps<T>) => {
  const { t } = useTranslation(props.localeNamespace)

  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'table')(props.style)

  const rowRenderer = (params: ListRowProps) => {
    const row = props.data[params.index]
    const rowSpecificStyle = {
      cursor: !!props.onRowClick ? 'pointer' : 'default',
    } as any
    return (
      <Row
        {...getCSSStyle(
          'rowWrapper',
          props.getRowStyle ? { ...props.getRowStyle(row), ...rowSpecificStyle } : rowSpecificStyle,
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
          const valueCustomRender = (c.valueCustomRender && c.valueCustomRender(value, t)) || undefined

          return (
            <RowCell
              {...getCSSStyle('rowCell', {
                width: `${(c.width / props.width) * 100}%`,
                flexShrink: 0,
                flexGrow: 0,
              })}
              key={c.dataKey}
            >
              {(c.customRender && c.customRender(value, row, t, valueCustomRender)) ||
                (c.isAmountValue && (
                  <RowAmountValue {...getCSSStyle('rowText')}>
                    {!!valueCustomRender ? valueCustomRender : value}
                  </RowAmountValue>
                )) || (
                  <RowValue {...getCSSStyle('rowText')}>
                    {!!valueCustomRender ? valueCustomRender : value}
                  </RowValue>
                )}
            </RowCell>
          )
        })}
      </Row>
    )
  }

  return (
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
  )
}

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
