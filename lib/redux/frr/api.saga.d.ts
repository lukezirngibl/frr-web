export declare type SagaApiConfig = {
    baseUrl: string;
};
export declare const configureApiSaga: (config: SagaApiConfig) => () => Generator<import("redux-saga/effects").ForkEffect<never>, void, unknown>;
