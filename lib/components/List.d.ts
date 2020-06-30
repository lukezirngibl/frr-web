import { FC } from 'react';
declare type Props = {
    items: Array<{
        name: string | number;
        count?: number | string;
        percentage?: number | string;
        price?: number;
        subItems?: Array<{
            label: string;
            count: number;
        }>;
    }>;
};
export declare const List: FC<Props>;
export {};
