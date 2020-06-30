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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var util_1 = require("../util");
var defaultTheme = {
    button: {
        chromeless: {},
        primary: {},
        secondary: {},
        common: {},
    },
    form: {
        label: {},
        groupTitle: {},
        sectionTitle: {},
        wrapper: {},
    },
    dropdown: {
        wrapper: {},
    },
};
var ThemeVal = defaultTheme;
var ThemeContext = React.createContext(defaultTheme);
exports.configureTheme = function (userTheme) {
    ThemeVal = util_1.keys(defaultTheme).reduce(function (acc1, k1) {
        var _a;
        return (__assign(__assign({}, acc1), (_a = {}, _a[k1] = util_1.keys(defaultTheme[k1]).reduce(function (acc2, k2) {
            var _a;
            return (__assign(__assign({}, acc2), (_a = {}, _a[k2] = __assign(__assign({}, defaultTheme[k1][k2]), (userTheme[k1] && userTheme[k1][k2]
                ? userTheme[k1][k2]
                : {})), _a)));
        }, {}), _a)));
    }, {});
    ThemeContext = React.createContext(ThemeVal);
    return ThemeContext;
};
exports.getThemeContext = function () { return ThemeContext; };
exports.getTheme = function () { return ThemeVal; };
//# sourceMappingURL=theme.js.map