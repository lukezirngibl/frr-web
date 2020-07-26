"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var theme_1 = require("../theme/theme");
var util_1 = require("../theme/util");
var language_1 = require("../theme/language");
var Icon_1 = require("./Icon");
var ButtonWrapper = styled_components_1.default.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  justify-content: center;\n"], ["\n  display: flex;\n  align-items: center;\n  flex-direction: row;\n  justify-content: center;\n"])));
var ButtonType;
(function (ButtonType) {
    ButtonType["Secondary"] = "Secondary";
    ButtonType["Chromeless"] = "Chromeless";
    ButtonType["Primary"] = "Primary";
})(ButtonType = exports.ButtonType || (exports.ButtonType = {}));
var mapTypeToStyleKey = (_a = {},
    _a[ButtonType.Chromeless] = 'chromeless',
    _a[ButtonType.Primary] = 'primary',
    _a[ButtonType.Secondary] = 'secondary',
    _a);
exports.Button = function (props) {
    var disabled = props.disabled;
    var type = props.type || ButtonType.Secondary;
    var theme = react_1.default.useContext(theme_1.getThemeContext());
    var language = react_1.default.useContext(language_1.getLanguageContext());
    var translate = language_1.getTranslation(language);
    var getStyle = util_1.createGetStyle(theme, 'button')(props.style);
    return (react_1.default.createElement(ButtonWrapper, { onClick: disabled ? undefined : props.onClick, style: __assign(__assign(__assign(__assign({}, getStyle('common')), getStyle(mapTypeToStyleKey[type])), (disabled ? { opacity: 0.4, pointerEvents: 'none' } : {})), (props.override || {})) },
        props.icon && react_1.default.createElement(Icon_1.Icon, __assign({}, props.icon)),
        react_1.default.createElement("div", { style: {
                color: 'inherit',
                flexGrow: 1,
                marginLeft: props.icon === undefined ? 0 : 8,
            } }, translate(props.label))));
};
var templateObject_1;
//# sourceMappingURL=Button.js.map