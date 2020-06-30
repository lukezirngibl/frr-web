"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Array_1 = require("fp-ts/lib/Array");
var styled_components_1 = __importDefault(require("styled-components"));
var monocle_ts_1 = require("monocle-ts");
var DropdownNumber_1 = require("./DropdownNumber");
var date_fns_1 = require("date-fns");
var DatePickerWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n\n  & > div {\n    &:nth-child(1) {\n      flex-grow: 1;\n    }\n    &:nth-child(2) {\n      flex-grow: 1.5;\n    }\n    &:nth-child(3) {\n      flex-grow: 1.2;\n    }\n  }\n\n  & > div {\n    margin-left: 4px;\n    margin-right: 4px;\n\n    &:first-child {\n      margin-left: 0;\n    }\n\n    &:last-child {\n      margin-right: 0;\n    }\n  }\n"], ["\n  width: 100%;\n  display: flex;\n\n  & > div {\n    &:nth-child(1) {\n      flex-grow: 1;\n    }\n    &:nth-child(2) {\n      flex-grow: 1.5;\n    }\n    &:nth-child(3) {\n      flex-grow: 1.2;\n    }\n  }\n\n  & > div {\n    margin-left: 4px;\n    margin-right: 4px;\n\n    &:first-child {\n      margin-left: 0;\n    }\n\n    &:last-child {\n      margin-right: 0;\n    }\n  }\n"])));
var MonthOptions = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
var mkDateLens = monocle_ts_1.Lens.fromProp();
var dayLens = mkDateLens('day');
var monthLens = mkDateLens('month');
var yearLens = mkDateLens('year');
var pad = function (n, width) {
    var z = '0';
    var str = n + '';
    return str.length >= width
        ? n
        : new Array(width - str.length + 1).join(z) + str;
};
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    function DatePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DatePicker.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, externalValue = _a.value, error = _a.error, disabled = _a.disabled;
        var e = externalValue || '1980-01-01';
        var value = {
            day: Number(e.split('-')[2]),
            month: Number(e.split('-')[1]),
            year: Number(e.split('-')[0]),
        };
        var convertToString = function (v) {
            return v.year + "-" + pad(v.month, 2) + "-" + pad(v.day, 2);
        };
        return (react_1.default.createElement(DatePickerWrapper, null,
            react_1.default.createElement(DropdownNumber_1.DropdownNumber, { options: Array_1.range(1, date_fns_1.getDaysInMonth(new Date(value.year, value.month - 1))).map(function (o) { return ({
                    label: o,
                    value: o,
                }); }), onChange: function (v) { return onChange(convertToString(dayLens.set(v)(value))); }, label: "day", value: value.day, error: error, search: true, disabled: disabled }),
            react_1.default.createElement(DropdownNumber_1.DropdownNumber, { options: MonthOptions.map(function (m, i) { return ({
                    label: m,
                    value: i + 1,
                }); }), onChange: function (v) { return onChange(convertToString(monthLens.set(v)(value))); }, label: "month", value: value.month, error: error, search: true, disabled: disabled }),
            react_1.default.createElement(DropdownNumber_1.DropdownNumber, { options: Array_1.range(1940, 2020).map(function (o) { return ({
                    label: o,
                    value: o,
                }); }), onChange: function (v) { return onChange(convertToString(yearLens.set(v)(value))); }, label: "year", value: value.year, error: error, search: true, disabled: disabled })));
    };
    return DatePicker;
}(react_1.Component));
exports.DatePicker = DatePicker;
var templateObject_1;
//# sourceMappingURL=DatePicker.js.map