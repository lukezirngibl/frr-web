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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var semantic_ui_react_1 = require("semantic-ui-react");
var use_debounce_1 = require("use-debounce");
var Label_1 = require("./Label");
var language_1 = require("../../theme/language");
exports.TextInput = function (props) {
    var inputType = props.inputType, label = props.label, value = props.value, placeholder = props.placeholder, otherProps = __rest(props, ["inputType", "label", "value", "placeholder"]);
    var language = react_1.default.useContext(language_1.getLanguageContext());
    var translate = language_1.getTranslation(language);
    var _a = react_1.useState(value), internalValue = _a[0], setInternalValue = _a[1];
    var onChange = use_debounce_1.useDebouncedCallback(function (text) {
        props.onChange(text);
    }, 300)[0];
    react_1.default.useEffect(function () {
        setInternalValue(value);
    }, [value]);
    react_1.default.useEffect(function () { return function () {
        if (internalValue !== value) {
            props.onChange(internalValue);
        }
    }; }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        label && react_1.default.createElement(Label_1.Label, { label: label }),
        react_1.default.createElement(semantic_ui_react_1.Input, __assign({}, otherProps, { onChange: function (e, _a) {
                var value = _a.value;
                setInternalValue(value);
                onChange(value);
            }, placeholder: placeholder ? translate(placeholder) : undefined, value: internalValue, type: inputType }))));
};
//# sourceMappingURL=TextInput.js.map