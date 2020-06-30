"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var semantic_ui_react_1 = require("semantic-ui-react");
var Label_1 = require("./Label");
var language_1 = require("../../theme/language");
var CheckboxGroupWapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var CheckboxRow = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 8px 0;\n"], ["\n  margin: 8px 0;\n"])));
exports.CheckboxGroup = function (props) {
    var language = react_1.default.useContext(language_1.getLanguageContext());
    var translate = language_1.getTranslation(language);
    var onChange = function (key) { return function (bool) {
        var value = props.value, onChange = props.onChange;
        if (onChange) {
            onChange(bool ? __spreadArrays((value || []), [key]) : (value || []).filter(function (v) { return v !== key; }));
        }
    }; };
    var isChecked = function (key) { return (props.value || []).includes(key); };
    var options = props.options, label = props.label;
    return (react_1.default.createElement(CheckboxGroupWapper, null,
        label && react_1.default.createElement(Label_1.Label, { label: label }),
        options.map(function (o, k) { return (react_1.default.createElement(CheckboxRow, { key: k },
            react_1.default.createElement(semantic_ui_react_1.Checkbox, { className: props.error ? 'error' : '', label: translate(o.label), checked: isChecked(o.value), onChange: function () { return onChange(o.value)(!isChecked(o.value)); } }))); })));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=CheckboxGroup.js.map