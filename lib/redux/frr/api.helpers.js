"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_types_1 = require("./api.types");
var Record_1 = require("fp-ts/lib/Record");
var Option_1 = require("fp-ts/lib/Option");
exports.configureTypeReduxApiCreator = function (endpointsToMethod) {
    function createApiType() {
        return undefined;
    }
    function callAPI(endpoint, endpointConfig) {
        return function (actionTypes) { return function (config) {
            var method = endpointsToMethod[endpoint];
            var server = 'server' in (endpointConfig || {}) ? endpointConfig.server : undefined;
            var delay = 'delay' in (endpointConfig || {}) ? endpointConfig.delay : undefined;
            var json = 'json' in (config || {}) ? config.json : undefined;
            var form = 'form' in (config || {}) ? config.form : undefined;
            var query = 'query' in (config || {}) ? config.query : undefined;
            var meta = 'meta' in (config || {}) ? config.meta : undefined;
            var raw = 'raw' in (config || {}) ? config.raw : undefined;
            var queryString = Option_1.fromNullable(query)
                .map(function (q) {
                return Record_1.toArray(q).map(function (_a) {
                    var k = _a[0], v = _a[1];
                    return k + "=" + encodeURIComponent(v);
                });
            })
                .fold('', function (x) { return "?" + x.join('&'); });
            var body;
            if (form !== undefined) {
                var formData_1 = new FormData();
                Object.keys(form).forEach(function (k) {
                    var val = form[k];
                    formData_1.append(k, typeof val === 'string' ? val : JSON.stringify(val));
                    body = formData_1;
                });
            }
            else if (json !== undefined) {
                body = JSON.stringify(json);
            }
            else if (raw !== undefined) {
                body = raw;
            }
            return {
                type: api_types_1.SystemActionType.REST_CALL,
                payload: {
                    meta: meta,
                    credentials: 'include',
                    headers: form !== undefined
                        ? undefined
                        : {
                            'Content-Type': 'application/json',
                        },
                    body: body,
                    endpoint: endpoint + "/" + queryString,
                    types: actionTypes,
                    method: method,
                    delay: delay,
                    server: server,
                },
            };
        }; };
    }
    var createEndpoint = function () { return function (t, e, config) {
        var ActionA = createApiType();
        var call = callAPI(e, config)(t);
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
// export enum Endpoints {
//   Demo = '/demo',
// }
// export type API = {
//   [Endpoints.Demo]: PostRequest<{
//     json: { payload: boolean }
//     response: { abc: boolean }
//   }>
// }
// export const mapEndpointToMethod = {
//   [Endpoints.Demo]: RestMethod.POST,
// }
// const eco = configureTypeReduxApiCreator<
//   API,
//   Endpoints,
//   typeof mapEndpointToMethod
// >(mapEndpointToMethod)
// const Demo = eco.createEndpoint(
//   {
//     request: 'DEMO_REQUEST',
//     success: 'DEMO_SUCCESS',
//     failure: 'DEMO_FAILURE',
//   } as const,
//   Endpoints.Demo,
// )
// type DemoAction = typeof Demo['action']['all']
// type DemoState = {
//   demo: boolean
// }
// export const demoReducer = (
//   state: DemoState = { demo: true },
//   action: DemoAction,
// ): DemoState => {
//   switch (action.type) {
//     case Demo.types.success:
//       return {
//         ...state,
//         demo: action.payload.abc,
//       }
//     default:
//       return state
//   }
// }
//# sourceMappingURL=api.helpers.js.map