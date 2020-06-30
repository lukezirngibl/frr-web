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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var semantic_ui_react_1 = require("semantic-ui-react");
var styled_components_1 = __importDefault(require("styled-components"));
var language_1 = require("../../theme/language");
var Label_1 = require("./Label");
var theme_1 = require("../../theme/theme");
var util_1 = require("../../theme/util");
var DropdownWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n\n  &.disabled .label {\n    opacity: 0.45;\n  }\n\n  &.error {\n    .label {\n      background-color: #9f3a38 !important;\n      color: white !important;\n    }\n  }\n"], ["\n  width: 100%;\n\n  &.disabled .label {\n    opacity: 0.45;\n  }\n\n  &.error {\n    .label {\n      background-color: #9f3a38 !important;\n      color: white !important;\n    }\n  }\n"])));
exports.Dropdown = function (props) {
    var onChange = props.onChange, label = props.label, options = props.options, error = props.error, disabled = props.disabled, dropdownProps = props.dropdownProps, otherProps = __rest(props, ["onChange", "label", "options", "error", "disabled", "dropdownProps"]);
    var theme = react_1.default.useContext(theme_1.getThemeContext());
    var language = react_1.default.useContext(language_1.getLanguageContext());
    var translate = language_1.getTranslation(language);
    var getStyle = util_1.createGetStyle(theme, 'dropdown')(props.style);
    var processOptions = function (raw) {
        return raw.map(function (o) { return ({
            text: o.label !== undefined
                ? typeof o.label === 'string'
                    ? translate(o.label)
                    : "" + o.label
                : o.name || 'Unknown',
            value: o.value,
        }); });
    };
    return (react_1.default.createElement(DropdownWrapper, { className: error ? 'error' : disabled ? 'disabled' : '', style: getStyle('wrapper') },
        label && react_1.default.createElement(Label_1.Label, { label: label }),
        react_1.default.createElement(semantic_ui_react_1.Dropdown, __assign({ placeholder: "Select", fluid: true, selection: true, onChange: function (e, _a) {
                var value = _a.value;
                onChange(value);
            }, search: true, value: props.value, options: processOptions(typeof options === 'function' ? options(language) : options), error: error, disabled: disabled }, dropdownProps, otherProps))));
};
var templateObject_1;
//# sourceMappingURL=Dropdown.js.map