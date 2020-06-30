import { At } from '../index';
import { Option } from 'fp-ts/lib/Option';
export declare function atRecord<A = never>(): At<Record<string, A>, string, Option<A>>;
