import { Either } from 'fp-ts/lib/Either';
import { Prism } from '.';
export declare const _right: <L, A>() => Prism<Either<L, A>, A>;
export declare const _left: <L, A>() => Prism<Either<L, A>, L>;
