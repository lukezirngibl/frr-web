export declare function createViewAction<T extends {
    type: unknown;
    payload: unknown;
    meta: unknown;
}>(type: T['type'], analytics?: boolean): (payload: T['payload'], meta: T['meta']) => {
    type: T['type'];
    payload: T['payload'];
    meta: T['meta'];
    analytics?: boolean;
};
export declare function createViewAction<T extends {
    type: unknown;
    payload: unknown;
}>(type: T['type'], analytics?: boolean): (payload: T['payload']) => {
    type: T['type'];
    payload: T['payload'];
    analytics?: boolean;
};
export declare const createEmptyViewAction: <T extends {
    type: unknown;
}>(type: T["type"], analytics?: boolean) => () => {
    type: T["type"];
    analytics?: boolean;
};
