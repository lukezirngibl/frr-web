import { ReactNode } from 'react';
declare module '@material-ui/core/styles/withStyles' {
    interface BaseCSSProperties {
        flip?: boolean;
    }
}
interface ColumnData {
    dataKey: string;
    label: string;
    numeric?: boolean;
    width: number;
}
declare type Props<T extends {}> = {
    data: Array<T>;
    columns: Array<ColumnData>;
    onRowClick?: (item: T) => void;
    renderCell: (params: {
        rowData: T;
        index: number;
        value: string;
    }) => ReactNode;
};
export declare const Table: <T extends {}>(props: Props<T>) => JSX.Element;
export {};
