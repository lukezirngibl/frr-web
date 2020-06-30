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
var LoadingWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", ";\n\n  .lds-spinner {\n    color: official;\n    display: inline-block;\n    position: relative;\n    width: 80px;\n    height: 80px;\n  }\n  .lds-spinner div {\n    transform-origin: 40px 40px;\n    animation: lds-spinner 1.2s linear infinite;\n  }\n  .lds-spinner div:after {\n    content: ' ';\n    display: block;\n    position: absolute;\n    top: 3px;\n    left: 37px;\n    width: 6px;\n    height: 18px;\n    border-radius: 20%;\n    background: black;\n  }\n  .lds-spinner div:nth-child(1) {\n    transform: rotate(0deg);\n    animation-delay: -1.1s;\n  }\n  .lds-spinner div:nth-child(2) {\n    transform: rotate(30deg);\n    animation-delay: -1s;\n  }\n  .lds-spinner div:nth-child(3) {\n    transform: rotate(60deg);\n    animation-delay: -0.9s;\n  }\n  .lds-spinner div:nth-child(4) {\n    transform: rotate(90deg);\n    animation-delay: -0.8s;\n  }\n  .lds-spinner div:nth-child(5) {\n    transform: rotate(120deg);\n    animation-delay: -0.7s;\n  }\n  .lds-spinner div:nth-child(6) {\n    transform: rotate(150deg);\n    animation-delay: -0.6s;\n  }\n  .lds-spinner div:nth-child(7) {\n    transform: rotate(180deg);\n    animation-delay: -0.5s;\n  }\n  .lds-spinner div:nth-child(8) {\n    transform: rotate(210deg);\n    animation-delay: -0.4s;\n  }\n  .lds-spinner div:nth-child(9) {\n    transform: rotate(240deg);\n    animation-delay: -0.3s;\n  }\n  .lds-spinner div:nth-child(10) {\n    transform: rotate(270deg);\n    animation-delay: -0.2s;\n  }\n  .lds-spinner div:nth-child(11) {\n    transform: rotate(300deg);\n    animation-delay: -0.1s;\n  }\n  .lds-spinner div:nth-child(12) {\n    transform: rotate(330deg);\n    animation-delay: 0s;\n  }\n  @keyframes lds-spinner {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n"], ["\n  ", ";\n\n  .lds-spinner {\n    color: official;\n    display: inline-block;\n    position: relative;\n    width: 80px;\n    height: 80px;\n  }\n  .lds-spinner div {\n    transform-origin: 40px 40px;\n    animation: lds-spinner 1.2s linear infinite;\n  }\n  .lds-spinner div:after {\n    content: ' ';\n    display: block;\n    position: absolute;\n    top: 3px;\n    left: 37px;\n    width: 6px;\n    height: 18px;\n    border-radius: 20%;\n    background: black;\n  }\n  .lds-spinner div:nth-child(1) {\n    transform: rotate(0deg);\n    animation-delay: -1.1s;\n  }\n  .lds-spinner div:nth-child(2) {\n    transform: rotate(30deg);\n    animation-delay: -1s;\n  }\n  .lds-spinner div:nth-child(3) {\n    transform: rotate(60deg);\n    animation-delay: -0.9s;\n  }\n  .lds-spinner div:nth-child(4) {\n    transform: rotate(90deg);\n    animation-delay: -0.8s;\n  }\n  .lds-spinner div:nth-child(5) {\n    transform: rotate(120deg);\n    animation-delay: -0.7s;\n  }\n  .lds-spinner div:nth-child(6) {\n    transform: rotate(150deg);\n    animation-delay: -0.6s;\n  }\n  .lds-spinner div:nth-child(7) {\n    transform: rotate(180deg);\n    animation-delay: -0.5s;\n  }\n  .lds-spinner div:nth-child(8) {\n    transform: rotate(210deg);\n    animation-delay: -0.4s;\n  }\n  .lds-spinner div:nth-child(9) {\n    transform: rotate(240deg);\n    animation-delay: -0.3s;\n  }\n  .lds-spinner div:nth-child(10) {\n    transform: rotate(270deg);\n    animation-delay: -0.2s;\n  }\n  .lds-spinner div:nth-child(11) {\n    transform: rotate(300deg);\n    animation-delay: -0.1s;\n  }\n  .lds-spinner div:nth-child(12) {\n    transform: rotate(330deg);\n    animation-delay: 0s;\n  }\n  @keyframes lds-spinner {\n    0% {\n      opacity: 1;\n    }\n    100% {\n      opacity: 0;\n    }\n  }\n"])), function (props) { return props.css; });
exports.Loading = function (props) { return (react_1.default.createElement(LoadingWrapper, { css: props.style },
    react_1.default.createElement("div", { className: "lds-spinner" },
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null),
        react_1.default.createElement("div", null)))); };
var templateObject_1;
//# sourceMappingURL=Loading.js.map