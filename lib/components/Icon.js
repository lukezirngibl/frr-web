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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importStar(require("styled-components"));
exports.MaterialIconFontFace = styled_components_1.createGlobalStyle(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  @font-face {\n    font-display: block;\n    font-family: 'Material Icons';\n    font-style: normal;\n    font-weight: 400;\n    src: url('../assets/fonts/MaterialIcons-Regular.eot'); /* For IE6-8 */\n    src: local('Material Icons'),\n    local('MaterialIcons-Regular'),\n    url('../assets/fonts/MaterialIcons-Regular.woff2') format('woff2'),\n    url('../assets/fonts/MaterialIcons-Regular.woff') format('woff'),\n    url('../assets/fonts/MaterialIcons-Regular.ttf') format('truetype');\n  }\n"], ["\n  @font-face {\n    font-display: block;\n    font-family: 'Material Icons';\n    font-style: normal;\n    font-weight: 400;\n    src: url('../assets/fonts/MaterialIcons-Regular.eot'); /* For IE6-8 */\n    src: local('Material Icons'),\n    local('MaterialIcons-Regular'),\n    url('../assets/fonts/MaterialIcons-Regular.woff2') format('woff2'),\n    url('../assets/fonts/MaterialIcons-Regular.woff') format('woff'),\n    url('../assets/fonts/MaterialIcons-Regular.ttf') format('truetype');\n  }\n"])));
var IconEle = styled_components_1.default.i(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  display: inline-block;\n  line-height: 1;\n  transition: all ease 0.7s;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  color: ", ";\n  white-space: nowrap;\n  direction: ltr;\n\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n\n  /* Support for IE. */\n  font-feature-settings: 'liga';\n  ", ";\n\n  cursor: pointer;\n\n  &:hover {\n    opacity: 0.7;\n  }\n"], ["\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  display: inline-block;\n  line-height: 1;\n  transition: all ease 0.7s;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  color: ", ";\n  white-space: nowrap;\n  direction: ltr;\n\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n\n  /* Support for IE. */\n  font-feature-settings: 'liga';\n  ", ";\n\n  cursor: pointer;\n\n  &:hover {\n    opacity: 0.7;\n  }\n"])), function (props) { return props.color || 'black'; }, function (props) { return (props.size ? "font-size: " + props.size + "px" : 'font-size: 24px'); });
exports.Icon = function (props) { return (react_1.default.createElement(IconEle, __assign({ className: "material-icons" }, props), props.icon)); };
var templateObject_1, templateObject_2;
//# sourceMappingURL=Icon.js.map