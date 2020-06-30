"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureApi = function (mapEndpointToFunc) {
    function createApiType() {
        return undefined;
    }
    var callApi = function (endpoint, types) { return function (c) {
        return {
            type: 'REST_CALL',
            payload: {
                credentials: 'include',
                meta: 'meta' in c ? c.meta : {},
                headers: {
                    'Content-Type': 'application/json',
                },
                body: c.body,
                func: mapEndpointToFunc[endpoint],
                types: types,
            },
        };
    }; };
    var createEndpoint = function () { return function (t, e) {
        var ActionA = createApiType();
        var call = callApi(e, t);
        return {
            call: call,
            action: undefined,
            types: t,
        };
    }; };
    return {
        createEndpoint: createEndpoint,
    };
};
//# sourceMappingURL=api-util.js.map