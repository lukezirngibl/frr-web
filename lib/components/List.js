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
var ListWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  flex: 0 0 280px;\n  flex-shrink: 0;\n  overflow: hidden;\n  background-color: #f9f9f9;\n  max-height: ", "px;\n  border: 1px solid #f0f0f0;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n"], ["\n  flex: 0 0 280px;\n  flex-shrink: 0;\n  overflow: hidden;\n  background-color: #f9f9f9;\n  max-height: ", "px;\n  border: 1px solid #f0f0f0;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n"])), window.innerHeight - 200);
var ListContent = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  overflow-y: auto;\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n"], ["\n  width: 100%;\n  overflow-y: auto;\n\n  &::-webkit-scrollbar {\n    display: none;\n  }\n"])));
var ListItem = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  overflow: hidden;\n  height: 32px;\n  padding: 0 16px 0 12px;\n  border-bottom: 1px solid #f0f0f0;\n"], ["\n  display: flex;\n  align-items: center;\n  width: 100%;\n  overflow: hidden;\n  height: 32px;\n  padding: 0 16px 0 12px;\n  border-bottom: 1px solid #f0f0f0;\n"])));
var Name = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: 11px;\n  flex-grow: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"], ["\n  font-size: 11px;\n  flex-grow: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"])));
var Percentage = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: 10px;\n  flex: 0 0 48px;\n  opacity: 0.4;\n  font-weight: 400;\n"], ["\n  font-size: 10px;\n  flex: 0 0 48px;\n  opacity: 0.4;\n  font-weight: 400;\n"])));
var Count = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-size: 12px;\n  flex: 0 0 36px;\n  font-weight: bold;\n"], ["\n  font-size: 12px;\n  flex: 0 0 36px;\n  font-weight: bold;\n"])));
var Price = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: 12px;\n  flex: 0 0 88px;\n  font-weight: bold;\n"], ["\n  font-size: 12px;\n  flex: 0 0 88px;\n  font-weight: bold;\n"])));
exports.List = function (props) {
    return (react_1.default.createElement(ListWrapper, null,
        react_1.default.createElement(ListContent, null, props.items.map(function (p, k) { return (react_1.default.createElement("div", { key: k },
            react_1.default.createElement(ListItem, null,
                p.count !== undefined && react_1.default.createElement(Count, null, p.count),
                p.price !== undefined && (react_1.default.createElement(Price, null,
                    "$",
                    p.price.toLocaleString())),
                p.percentage !== undefined && (react_1.default.createElement(Percentage, null,
                    p.percentage,
                    "%")),
                p.name && react_1.default.createElement(Name, null, p.name)),
            p.subItems &&
                p.subItems.map(function (i, ik) { return (react_1.default.createElement(ListItem, { key: ik, style: { height: 28, paddingLeft: 48 } },
                    react_1.default.createElement(Count, { style: { fontWeight: 400, opacity: 0.7, fontSize: 11 } }, i.count),
                    react_1.default.createElement(Name, { style: { fontSize: 10 } }, i.label))); }))); }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=List.js.map