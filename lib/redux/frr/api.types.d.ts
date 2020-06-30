import { Exact } from 'typelevel-ts';
export declare enum RestMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
    PATCH = "PATCH"
}
export declare type Params = {
    [k: string]: string | number;
};
export declare type QueryObject = {
    [k: string]: string | number | boolean;
};
export declare type DataObject = {
    [k: string]: string | number | object | boolean;
};
export declare type Data = DataObject | Array<DataObject> | DataObject[string] | null;
declare type CommonRestProps = {
    params?: Params;
    response: Data;
    failure?: Data;
};
export declare type PostRequest<T extends Exact<CommonRestProps & {
    raw?: string;
}, T> | Exact<CommonRestProps & {
    json?: Data;
}, T> | Exact<CommonRestProps & {
    form?: DataObject | FormData;
}, T>> = {
    method: RestMethod.POST;
} & T;
export declare type PutRequest<T extends Exact<CommonRestProps & {
    raw?: string;
}, T> | Exact<CommonRestProps & {
    json?: Data;
}, T> | Exact<CommonRestProps & {
    form?: DataObject | FormData;
}, T>> = {
    method: RestMethod.PUT;
} & T;
export declare type PatchRequest<T extends Exact<CommonRestProps & {
    raw?: string;
}, T> | Exact<CommonRestProps & {
    json?: Data;
}, T> | Exact<CommonRestProps & {
    form?: DataObject | FormData;
}, T>> = {
    method: RestMethod.PATCH;
} & T;
export declare type GetRequest<T extends Exact<CommonRestProps & {
    query?: QueryObject;
}, T>> = {
    method: RestMethod.GET;
} & T;
export declare type DeleteRequest<T extends Exact<CommonRestProps & {
    raw?: string;
}, T> | Exact<CommonRestProps & {
    json?: Data;
}, T> | Exact<CommonRestProps & {
    form?: DataObject;
}, T>> = {
    method: RestMethod.DELETE;
} & T;
export declare type RestApiPayload = {
    credentials?: 'include';
    headers?: {
        'Content-Type': 'application/json';
    };
    body?: FormData | string;
    endpoint: string;
    types: {
        request: string;
        success: string;
        failure: string;
    };
    method: RestMethod;
    meta?: object;
    delay?: number;
    server?: string;
};
export declare enum SystemActionType {
    REST_CALL = "REST_CALL",
    SET_TOAST_MESSAGE = "SET_TOAST_MESSAGE"
}
export declare type RestCallAction = {
    type: SystemActionType.REST_CALL;
    payload: RestApiPayload;
};
export {};
