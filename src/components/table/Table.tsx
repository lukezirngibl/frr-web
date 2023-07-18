import { RemoteData } from '@devexperts/remote-data-ts'
import { Namespace } from 'i18next'
import { CSSProperties } from 'styled-components'
import { P } from '../../html'
import { ComponentTheme, useComponentTheme, useCSSStyles } from '../../theme/theme.components'
import { createStyled } from '../../theme/util'
import { Loading } from '../Loading'
import { TableColumns } from '../types'
import { Sorting, TableHeader } from './TableHeader'
import { TabelList } from './TableList'

type Props<T extends {}> = {
  columns: TableColumns<T>
  data: RemoteData<any, Array<T>>
  getRowStyle?: (row: T) => CSSProperties
  localeNamespace: Namespace
  noResultsLabel?: string
  onRowClick?: (row: T) => void
  sorting?: Sorting
  style?: Partial<ComponentTheme['table']>
  loadingStyle?: React.CSSProperties
}

export const Table = <T extends {}>(props: Props<T>) => {
  const theme = useComponentTheme()
  const getCSSStyle = useCSSStyles(theme, 'table')(props.style)
  const totalWidth = props.columns.reduce((sum, c) => sum + c.width, 0)

  return (
    <TableWrapper {...getCSSStyle('tableWrapper')}>
      <TableHeader
        columns={props.columns}
        localeNamespace={props.localeNamespace}
        sorting={props.sorting}
        style={props.style}
        width={totalWidth}
      />

      <ListWrapper {...getCSSStyle('listWrapper')}>
        {props.data.fold(
          <></>,
          <LoaderWrapper {...getCSSStyle('loadingWrapper')}>
            {/* Todo Joel: the loading component styling is broken, let's fix it when you're back */}
            {/* <Loading style={getCSSStyle('loading').cssStyles} /> */}
            <Loading style={props.loadingStyle} />
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
              <TabelList
                columns={props.columns}
                data={data}
                getRowStyle={props.getRowStyle}
                localeNamespace={props.localeNamespace}
                onRowClick={props.onRowClick}
                style={props.style}
                width={totalWidth}
              />
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
