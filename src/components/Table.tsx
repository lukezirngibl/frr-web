import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import clsx from 'clsx'
import React, { ReactNode } from 'react'
import {
  AutoSizer,
  Column,
  Table as MaterialTable,
  TableCellRenderer,
  TableHeaderProps,
} from 'react-virtualized'

declare module '@material-ui/core/styles/withStyles' {
  // Augment the BaseCSSProperties so that we can control jss-rtl
  interface BaseCSSProperties {
    /*
     * Used to control if the rule-set should be affected by rtl transformation
     */
    flip?: boolean
  }
}

const styles = (theme: Theme) =>
  createStyles({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      '& .ReactVirtualized__Table__headerRow': {
        flip: false,
        paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
  })

interface ColumnData {
  dataKey: string
  label: string
  numeric?: boolean
  width: number
}

interface Row {
  index: number
}

type Props<T extends {}> = {
  data: Array<T>
  columns: Array<ColumnData>
  onRowClick?: (item: T) => void
  renderCell: (params: {
    rowData: T
    index: number
    value: string
  }) => ReactNode
}

const InnerTable = <T extends {}>(
  props: Props<T> & WithStyles<typeof styles>,
) => {
  const getRowClassName = (row: Row) => {
    const { index } = row
    return clsx(props.classes.tableRow, classes.flexContainer, {
      [props.classes.tableRowHover]: index !== -1 && props.onRowClick !== null,
    })
  }

  const cellRenderer: TableCellRenderer = cell => {
    const { cellData, columnIndex } = cell

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: props.onRowClick === null,
        })}
        variant="body"
        onClick={() => {
          if (props.onRowClick) {
            props.onRowClick(cell.rowData)
          }

          // this.props.setDetailId(some(`${cell.rowData.id}-${cell.rowData.app}`))
        }}
        style={{
          height: 48,
          backgroundColor:
            cell.rowData.status === 'OrderConfirmed' ? '#e9f7ec' : 'white',
        }}
        align={
          (columnIndex !== null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {props.renderCell({
          rowData: cell.rowData,
          index: columnIndex,
          value: cellData,
        })}
      </TableCell>
    )
  }

  const headerRenderer = ({
    label,
    columnIndex,
  }: TableHeaderProps & { columnIndex: number }) => {
    return (
      <TableCell
        component="div"
        className={clsx(
          props.classes.tableCell,
          props.classes.flexContainer,
          props.classes.noClick,
        )}
        variant="head"
        style={{ height: 48, borderBottomColor: 'rgb(243,243,245)' }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    )
  }

  const { classes, columns, data, ...tableProps } = props
  return (
    <AutoSizer>
      {({ height, width }) => (
        <MaterialTable
          rowCount={data.length}
          height={height}
          width={width}
          rowHeight={48}
          gridStyle={{
            direction: 'inherit',
          }}
          headerHeight={48}
          className={classes.table}
          {...tableProps}
          rowGetter={({ index }) => data[index]}
          onRowClick={undefined}
          rowClassName={getRowClassName}
        >
          {columns.map(({ dataKey, ...other }, index) => {
            return (
              <Column
                key={dataKey}
                headerRenderer={headerProps =>
                  headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                }
                className={classes.flexContainer}
                cellRenderer={cellRenderer}
                dataKey={dataKey}
                {...other}
              />
            )
          })}
        </MaterialTable>
      )}
    </AutoSizer>
  )
}

const InnerTableWithStyles = withStyles(styles)(InnerTable) as any

export const Table = <T extends {}>(props: Props<T>) => {
  return <InnerTableWithStyles {...(props as any)} />
}
