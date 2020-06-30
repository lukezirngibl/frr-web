import { Data, DataObject, QueryObject, RestCallAction, RestMethod } from './api.types';
export declare const configureTypeReduxApiCreator: <API extends any, Endpoints extends keyof API, EndpointMap extends { [key in Endpoints]: RestMethod; }>(endpointsToMethod: EndpointMap) => {
    createEndpoint: <M = undefined>() => <T extends {
        request: string;
        failure: string;
        success: string;
    }, Endpoint extends Endpoints>(t: T, e: Endpoint, config?: {
        delay?: number;
        server?: string;
    }) => {
        call: (M extends undefined ? {
            meta?: never;
        } : {
            meta: M;
        }) & (API[Endpoint] extends {
            json: Data;
        } ? {
            json: API[Endpoint]["json"];
        } : {
            json?: never;
        }) & (API[Endpoint] extends {
            params: Data;
        } ? {
            params: API[Endpoint]["params"];
        } : {
            params?: never;
        }) & (API[Endpoint] extends {
            form: DataObject;
        } ? {
            form: API[Endpoint]["form"];
        } : {
            form?: never;
        }) & (API[Endpoint] extends {
            query: QueryObject;
        } ? {
            query: API[Endpoint]["query"];
        } : {
            query?: never;
        }) & (API[Endpoint] extends {
            raw: string;
        } ? {
            raw: API[Endpoint]["raw"];
        } : {
            raw?: never;
        }) extends {
            meta?: never;
            json?: never;
            params?: never;
            form?: never;
            query?: never;
            raw?: never;
        } ? (config?: (M extends undefined ? {
            meta?: never;
        } : {
            meta: M;
        }) & (API[Endpoint] extends {
            json: Data;
        } ? {
            json: API[Endpoint]["json"];
        } : {
            json?: never;
        }) & (API[Endpoint] extends {
            params: Data;
        } ? {
            params: API[Endpoint]["params"];
        } : {
            params?: never;
        }) & (API[Endpoint] extends {
            form: DataObject;
        } ? {
            form: API[Endpoint]["form"];
        } : {
            form?: never;
        }) & (API[Endpoint] extends {
            query: QueryObject;
        } ? {
            query: API[Endpoint]["query"];
        } : {
            query?: never;
        }) & (API[Endpoint] extends {
            raw: string;
        } ? {
            raw: API[Endpoint]["raw"];
        } : {
            raw?: never;
        })) => RestCallAction : (config: (M extends undefined ? {
            meta?: never;
        } : {
            meta: M;
        }) & (API[Endpoint] extends {
            json: Data;
        } ? {
            json: API[Endpoint]["json"];
        } : {
            json?: never;
        }) & (API[Endpoint] extends {
            params: Data;
        } ? {
            params: API[Endpoint]["params"];
        } : {
            params?: never;
        }) & (API[Endpoint] extends {
            form: DataObject;
        } ? {
            form: API[Endpoint]["form"];
        } : {
            form?: never;
        }) & (API[Endpoint] extends {
            query: QueryObject;
        } ? {
            query: API[Endpoint]["query"];
        } : {
            query?: never;
        }) & (API[Endpoint] extends {
            raw: string;
        } ? {
            raw: API[Endpoint]["raw"];
        } : {
            raw?: never;
        })) => RestCallAction;
        action: {
            type: Endpoint;
            meta: M;
            success: {
                type: T["success"];
                meta: (M extends undefined ? {} : M) & (API[Endpoint] extends {
                    body: object;
                } ? API[Endpoint]["body"] : {});
                payload: API[Endpoint]["response"];
            };
            request: {
                type: T["request"];
                meta: (M extends undefined ? {} : M) & (API[Endpoint] extends {
                    body: object;
                } ? API[Endpoint]["body"] : {});
                payload: API[Endpoint] extends {
                    body: object;
                } ? API[Endpoint]["body"] : {};
            };
            failure: {
                type: T["failure"];
                meta: (M extends undefined ? {} : M) & (API[Endpoint] extends {
                    body: object;
                } ? API[Endpoint]["body"] : {});
                payload: API[Endpoint] extends {
                    failure: object;
                } ? API[Endpoint]["failure"] : {};
            };
            all: {
                type: T["request"];
                meta: (M extends undefined ? {} : M) & (API[Endpoint] extends {
                    body: object;
                } ? API[Endpoint]["body"] : {});
                payload: API[Endpoint] extends {
                    body: object;
                } ? API[Endpoint]["body"] : {};
            } | {
                type: T["failure"];
                meta: (M extends undefined ? {} : M) & (API[Endpoint] extends {
                    body: object;
                } ? API[Endpoint]["body"] : {});
                payload: API[Endpoint] extends {
                    failure: object;
                } ? API[Endpoint]["failure"] : {};
            } | {
                type: T["success"];
                meta: (M extends undefined ? {} : M) & (API[Endpoint] extends {
                    body: object;
                } ? API[Endpoint]["body"] : {});
                payload: API[Endpoint]["response"];
            };
        };
        types: T;
    };
};
