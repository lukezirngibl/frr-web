"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
var react_1 = __importDefault(require("react"));
var theme_1 = require("../../theme/theme");
var util_1 = require("../../theme/util");
var language_1 = require("../../theme/language");
exports.LabelWrapper = styled_components_1.default.p(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
exports.Label = function (props) {
    var theme = react_1.default.useContext(theme_1.getThemeContext());
    var getStyle = util_1.createGetStyle(theme, 'form')(props.style);
    var language = react_1.default.useContext(language_1.getLanguageContext());
    var translate = language_1.getTranslation(language);
    return (react_1.default.createElement(exports.LabelWrapper, { style: getStyle('label') }, translate(props.label)));
};
var templateObject_1;
//# sourceMappingURL=Label.js.map