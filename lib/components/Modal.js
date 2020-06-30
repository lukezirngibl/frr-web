"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var ModalOuterWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  margin: auto;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  padding: 16px;\n  outline: none;\n  overflow: hidden;\n"], ["\n  width: 100%;\n  margin: auto;\n  height: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  padding: 16px;\n  outline: none;\n  overflow: hidden;\n"])));
var ModalInnerWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),\n    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);\n  width: 100%;\n  background-color: white;\n  border-radius: 0;\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n"], ["\n  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),\n    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);\n  width: 100%;\n  background-color: white;\n  border-radius: 0;\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n"])));
exports.Modal = function (props) {
    return (react_1.default.createElement(core_1.Modal, { open: props.open },
        react_1.default.createElement(ModalOuterWrapper, null,
            react_1.default.createElement(ModalInnerWrapper, null, props.open ? props.children : react_1.default.createElement(react_1.default.Fragment, null)))));
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=Modal.js.map