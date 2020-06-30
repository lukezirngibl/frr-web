"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function createViewAction(type, analytics) {
    return function (payload, meta) { return (__assign({ type: type,
        payload: payload,
        analytics: analytics }, (meta !== undefined ? { meta: meta } : {}))); };
}
exports.createViewAction = createViewAction;
exports.createEmptyViewAction = function (type, analytics) { return function () { return ({
    type: type,
    analytics: analytics,
}); }; };
//# sourceMappingURL=view.helpers.js.map