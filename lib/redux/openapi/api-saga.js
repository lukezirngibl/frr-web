"use strict";
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
// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Headers': '*',
// Accept: 'application/json',
// 'Content-Type': 'application/json',
var showErrorTypes = [];
function callRestApi(action) {
    var _a, types, body, func, meta, payload, error_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = action.payload, types = _a.types, body = _a.body, func = _a.func, meta = _a.meta;
                return [4 /*yield*/, effects_1.put({
                        type: types.request,
                        payload: undefined,
                        meta: meta,
                    })];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, , 17]);
                return [4 /*yield*/, func(body)];
            case 3:
                payload = (_b.sent());
                if (!(payload !== undefined &&
                    'message' in payload &&
                    payload.message !== undefined)) return [3 /*break*/, 5];
                // callToast.error(payload.message)
                return [4 /*yield*/, effects_1.put({
                        type: types.failure,
                        payload: payload,
                        meta: meta,
                    })
                    // console.log(types.failure, payload)
                ];
            case 4:
                // callToast.error(payload.message)
                _b.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, effects_1.put({
                    type: types.success,
                    payload: payload,
                    meta: meta,
                })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: return [3 /*break*/, 17];
            case 8:
                error_1 = _b.sent();
                _b.label = 9;
            case 9:
                _b.trys.push([9, 14, , 16]);
                console.log('error: ', error_1);
                if (!('message' in error_1 && showErrorTypes.includes(types.failure))) return [3 /*break*/, 11];
                // callToast.error(res.message)
                return [4 /*yield*/, effects_1.put({
                        type: types.failure,
                        payload: error_1,
                        meta: meta,
                    })];
            case 10:
                // callToast.error(res.message)
                _b.sent();
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, effects_1.put({
                    type: types.failure,
                    payload: {},
                    meta: meta,
                })];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13: return [3 /*break*/, 16];
            case 14:
                error_2 = _b.sent();
                console.log('error: ', error_2);
                // callToast.error('Error')
                return [4 /*yield*/, effects_1.put({
                        type: types.failure,
                        payload: {},
                        meta: meta,
                    })];
            case 15:
                // callToast.error('Error')
                _b.sent();
                return [3 /*break*/, 16];
            case 16: return [3 /*break*/, 17];
            case 17: return [2 /*return*/];
        }
    });
}
function RestSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery('REST_CALL', callRestApi)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.RestSaga = RestSaga;
function ApiSaga() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.fork(RestSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.ApiSaga = ApiSaga;
//# sourceMappingURL=api-saga.js.map