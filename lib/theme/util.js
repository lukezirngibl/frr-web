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
exports.createGetStyle = function (theme, componentKey) { return function (override) { return function (elementKey) {
    return __assign(__assign({}, theme[componentKey][elementKey]), (override && override[elementKey] ? override[elementKey] : {}));
}; }; };
//# sourceMappingURL=util.js.map