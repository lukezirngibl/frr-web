"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var api_types_1 = require("./api.types");
var makeApiRequest = function (config) { return function (_a) {
    var method = _a.method, endpoint = _a.endpoint, body = _a.body, server = _a.server;
    return __awaiter(void 0, void 0, void 0, function () {
        var token, options, e;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, localStorage.getItem('@token')];
                case 1:
                    token = _b.sent();
                    options = {
                        method: method,
                        headers: {
                            'x-access-token': token || '',
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: body,
                    };
                    e = endpoint.endsWith('/')
                        ? endpoint.slice(0, endpoint.length - 1)
                        : endpoint;
                    return [2 /*return*/, fetch((server || config.baseUrl) + "/api" + e, options)];
            }
        });
    });
}; };
var configuireRestApi = function (config) {
    return function callRestApi(action) {
        var _a, types, meta, endpoint, body, method, delay, server, _b, raw, timeout, payload, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = action.payload, types = _a.types, meta = _a.meta, endpoint = _a.endpoint, body = _a.body, method = _a.method, delay = _a.delay, server = _a.server;
                    return [4 /*yield*/, effects_1.put({
                            type: types.request,
                            payload: undefined,
                            meta: meta,
                        })];
                case 1:
                    _c.sent();
                    if (!(delay !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, effects_1.delay(delay)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 10, , 12]);
                    return [4 /*yield*/, effects_1.race({
                            raw: makeApiRequest(config)({ method: method, endpoint: endpoint, body: body, server: server }),
                            timeout: effects_1.delay(10000),
                        })
                        // console.log('receiving...')
                        // console.log(raw, timeout)
                    ];
                case 4:
                    _b = _c.sent(), raw = _b.raw, timeout = _b.timeout;
                    // console.log('receiving...')
                    // console.log(raw, timeout)
                    if (!raw) {
                        // yield put(
                        //   setToastMessage(
                        //     some({
                        //       message: 'Bad Internet Connection.',
                        //       type: ToastType.Error,
                        //       meta: action,
                        //     }),
                        //   ),
                        // )
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, raw.json()];
                case 5:
                    payload = _c.sent();
                    if (!(raw.status >= 400)) return [3 /*break*/, 7];
                    return [4 /*yield*/, effects_1.put({
                            type: types.failure,
                            payload: payload,
                            meta: meta,
                        })];
                case 6:
                    _c.sent();
                    if (raw.status !== 410) {
                        // console.log({
                        //   message:
                        //     'error' in payload && typeof payload.error === 'string'
                        //       ? payload.error
                        //       : 'Error has occurred.',
                        //   type: ToastType.Error,
                        //   meta: action,
                        // })
                        // yield put(
                        //   setToastMessage(
                        //     some({
                        //       message:
                        //         'error' in payload && typeof payload.error === 'string'
                        //           ? payload.error
                        //           : 'Error has occurred.',
                        //       type: ToastType.Error,
                        //       meta: action,
                        //     }),
                        //   ),
                        // )
                    }
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, effects_1.put({
                        type: types.success,
                        payload: payload,
                        meta: meta,
                    })];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9: return [3 /*break*/, 12];
                case 10:
                    error_1 = _c.sent();
                    return [4 /*yield*/, effects_1.put({
                            type: types.failure,
                            payload: {},
                            meta: meta,
                        })
                        // console.log({
                        //   message: 'Server error.',
                        //   type: ToastType.Error,
                        //   meta: action,
                        // })
                        // yield put(
                        //   setToastMessage(
                        //     some({
                        //       message: 'Server error.',
                        //       type: ToastType.Error,
                        //       meta: action,
                        //     }),
                        //   ),
                        // )
                    ];
                case 11:
                    _c.sent();
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    };
};
exports.configureApiSaga = function (config) {
    return function ApiSaga() {
        var callRestApi;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    callRestApi = configuireRestApi(config);
                    return [4 /*yield*/, effects_1.takeEvery(api_types_1.SystemActionType.REST_CALL, callRestApi)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
};
//# sourceMappingURL=api.saga.js.map