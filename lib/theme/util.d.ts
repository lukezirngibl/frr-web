import { Theme } from './theme';
export declare const createGetStyle: <C extends "button" | "form" | "dropdown">(theme: Theme, componentKey: C) => (override?: Partial<Theme[C]>) => <K extends keyof Theme[C]>(elementKey: K) => Theme[C][K];
