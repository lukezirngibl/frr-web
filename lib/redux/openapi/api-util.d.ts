declare type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
declare type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;
export declare type RestAction = {
    type: 'REST_CALL';
    payload: {
        credentials: 'include';
        headers: {
            'Content-Type': 'application/json';
        };
        body: unknown;
        meta?: object;
        func: (params: unknown) => Promise<unknown>;
        types: {
            success: string;
            request: string;
            failure: string;
        };
    };
};
export declare const configureApi: <Endpoints extends string | number | symbol, EndpointMap extends { [key in Endpoints]: any; }>(mapEndpointToFunc: EndpointMap) => {
    createEndpoint: <M extends object = undefined>() => <T extends {
        request: string;
        failure: string;
        success: string;
    }, Endpoint extends Endpoints>(t: T, e: Endpoint) => {
        call: (c: M extends undefined ? {
            body: ArgumentTypes<EndpointMap[Endpoint]>[0];
        } : {
            body: ArgumentTypes<EndpointMap[Endpoint]>[0];
            meta: M;
        }) => RestAction;
        action: {
            type: Endpoint;
            meta: M;
            success: {
                type: T["success"];
                meta: ArgumentTypes<EndpointMap[Endpoint]>[0] & M;
                payload: UnwrapPromise<ReturnType<EndpointMap[Endpoint]>>;
            };
            request: {
                type: T["request"];
                meta: ArgumentTypes<EndpointMap[Endpoint]>[0] & M;
                payload: ArgumentTypes<EndpointMap[Endpoint]>[0];
            };
            failure: {
                type: T["failure"];
                meta: ArgumentTypes<EndpointMap[Endpoint]>[0] & M;
                payload: {};
            };
            all: {
                type: T["request"];
                meta: ArgumentTypes<EndpointMap[Endpoint]>[0] & M;
                payload: ArgumentTypes<EndpointMap[Endpoint]>[0];
            } | {
                type: T["failure"];
                meta: ArgumentTypes<EndpointMap[Endpoint]>[0] & M;
                payload: {};
            } | {
                type: T["success"];
                meta: ArgumentTypes<EndpointMap[Endpoint]>[0] & M;
                payload: UnwrapPromise<ReturnType<EndpointMap[Endpoint]>>;
            };
        };
        types: T;
    };
};
export {};
