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
var Label_1 = require("./Label");
exports.NumberInput = function (props) {
    var onChange = props.onChange, label = props.label, otherProps = __rest(props, ["onChange", "label"]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        label && react_1.default.createElement(Label_1.Label, { label: label }),
        react_1.default.createElement(semantic_ui_react_1.Input, __assign({}, otherProps, { onChange: function (e, _a) {
                var value = _a.value;
                onChange(Number(value));
            }, type: "number" }))));
};
//# sourceMappingURL=NumberInput.js.map