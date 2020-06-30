import { Translations } from './theme/language';
export declare const keys: <A extends Record<string, unknown>, K extends keyof A>(x: A) => K[];
export declare type TranslationGeneric = Translations | Omit<symbol, 'description'>;
