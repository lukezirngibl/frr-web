"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Label_1 = require("./Label");
var styled_components_1 = __importDefault(require("styled-components"));
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  height: 75px;\n  padding-top: 24px;\n"], ["\n  display: flex;\n  align-items: center;\n  height: 75px;\n  padding-top: 24px;\n"])));
exports.SingleCheckbox = function (props) {
    var value = props.value, label = props.label;
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(Label_1.Label, { label: label, style: { label: { marginBottom: 0 } } }),
        react_1.default.createElement("input", { type: "checkbox", checked: value, onChange: function () { return props.onChange(!value); }, style: {
                marginLeft: 16,
            } })));
};
var templateObject_1;
//# sourceMappingURL=SingleCheckbox.js.map