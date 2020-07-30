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
var styled_components_1 = __importDefault(require("styled-components"));
var Label_1 = require("./Label");
var TextAreaElement = styled_components_1.default.textarea(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 64px !important;\n  width: 100%;\n  opacity: ", ";\n"], ["\n  height: 64px !important;\n  width: 100%;\n  opacity: ", ";\n"])), function (props) { return (props.disabled ? 0.45 : 1); });
exports.TextArea = function (props) {
    var onChange = props.onChange, disabled = props.disabled, label = props.label, otherProps = __rest(props, ["onChange", "disabled", "label"]);
    return (react_1.default.createElement("div", { className: "ui form", style: { width: '100%' } },
        label && react_1.default.createElement(Label_1.Label, { label: label }),
        react_1.default.createElement(TextAreaElement, __assign({}, otherProps, { onChange: function (e) { return props.onChange(e.target.value); }, className: "input", disabled: disabled }))));
};
var templateObject_1;
//# sourceMappingURL=TextArea.js.map