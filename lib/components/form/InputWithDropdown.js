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
var styled_components_1 = __importDefault(require("styled-components"));
var Label_1 = require("./Label");
var TextInput_1 = require("./TextInput");
var Dropdown_1 = require("./Dropdown");
var Wrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n"], ["\n  display: flex;\n  align-items: center;\n  width: 100%;\n"])));
var DropdownWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: 0 0 96px;\n  margin-right: 8px;\n"], ["\n  flex: 0 0 96px;\n  margin-right: 8px;\n"])));
exports.InputWithDropdown = function (props) {
    var label = props.label, externalValue = props.value, placeholder = props.placeholder;
    var _a = react_1.default.useState(placeholder.length), sliceIndex = _a[0], setSliceIndex = _a[1];
    var value = {
        prefix: (externalValue || placeholder).slice(0, sliceIndex),
        tail: (externalValue || placeholder).slice(sliceIndex, (externalValue || placeholder).length),
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        label && react_1.default.createElement(Label_1.Label, { label: label }),
        react_1.default.createElement(Wrapper, null,
            react_1.default.createElement(DropdownWrapper, null,
                react_1.default.createElement(Dropdown_1.Dropdown, { options: props.options, value: value.prefix, error: props.error, onChange: function (v) {
                        setSliceIndex(v.length);
                        props.onChange("" + v + value.tail);
                    } })),
            react_1.default.createElement(TextInput_1.TextInput, { value: value.tail, error: props.error, onChange: function (str) {
                    props.onChange("" + value.prefix + str);
                } }))));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=InputWithDropdown.js.map