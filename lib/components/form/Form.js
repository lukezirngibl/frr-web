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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var CheckboxGroup_1 = require("./CheckboxGroup");
var NumberInput_1 = require("./NumberInput");
// import { RadioGroup, RadioGroupProps } from './RadioGroup'
var Dropdown_1 = require("./Dropdown");
var SingleCheckbox_1 = require("./SingleCheckbox");
var TextInput_1 = require("./TextInput");
var types_1 = require("./types");
var TextArea_1 = require("./TextArea");
var TextNumberInput_1 = require("./TextNumberInput");
var DatePicker_1 = require("./DatePicker");
var some_form_1 = require("./some.form");
var language_1 = require("../../theme/language");
var theme_1 = require("../../theme/theme");
var util_1 = require("../../theme/util");
var Button_1 = require("../Button");
var DropdownNumber_1 = require("./DropdownNumber");
var InputWithDropdown_1 = require("./InputWithDropdown");
var CountryDropdown_1 = require("./CountryDropdown");
var Switch_1 = require("./Switch");
var CurrencyInput_1 = require("./CurrencyInput");
var MultiSelect_1 = require("./MultiSelect");
var ButtonContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 0;\n  margin-bottom: 144px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 0;\n  margin-bottom: 144px;\n"])));
var FormWrapper = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n"])));
exports.FormContent = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding: 4px !important;\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  padding: 4px !important;\n"])));
exports.FormFieldRowWrapper = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  margin-bottom: 12px;\n  flex-shrink: 0;\n\n  @media (max-width: 768px) {\n    flex-wrap: wrap;\n  }\n\n  & > * {\n    margin-left: 4px;\n    margin-right: 4px;\n\n    &:first-child {\n      margin-left: 0;\n    }\n\n    &:last-child {\n      margin-right: 0;\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  margin-bottom: 12px;\n  flex-shrink: 0;\n\n  @media (max-width: 768px) {\n    flex-wrap: wrap;\n  }\n\n  & > * {\n    margin-left: 4px;\n    margin-right: 4px;\n\n    &:first-child {\n      margin-left: 0;\n    }\n\n    &:last-child {\n      margin-right: 0;\n    }\n  }\n"])));
exports.FormFieldWrapper = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: relative;\n  max-width: ", ";\n  width: ", ";\n\n  @media (max-width: 768px) {\n    width: 100% !important;\n    margin-top: 12px;\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n\n    &:first-of-type {\n      margin-top: 0;\n    }\n  }\n\n  .ui.checkbox.error {\n    label {\n      color: red !important;\n    }\n  }\n\n  .input {\n    width: 100%;\n\n    &.input.error {\n      .label {\n        background-color: red !important;\n        color: white !important;\n      }\n    }\n\n    .label {\n      transition: all 0.7s ease;\n      flex: none !important;\n      width: 96px;\n      font-size: 13px !important;\n      line-height: 16px !important;\n    }\n    input {\n      transition: all 0.7s ease;\n      flex: none !important;\n      max-width: ", ";\n      width: 100%;\n    }\n  }\n"], ["\n  position: relative;\n  max-width: ",
    ";\n  width: ", ";\n\n  @media (max-width: 768px) {\n    width: 100% !important;\n    margin-top: 12px;\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n\n    &:first-of-type {\n      margin-top: 0;\n    }\n  }\n\n  .ui.checkbox.error {\n    label {\n      color: red !important;\n    }\n  }\n\n  .input {\n    width: 100%;\n\n    &.input.error {\n      .label {\n        background-color: red !important;\n        color: white !important;\n      }\n    }\n\n    .label {\n      transition: all 0.7s ease;\n      flex: none !important;\n      width: 96px;\n      font-size: 13px !important;\n      line-height: 16px !important;\n    }\n    input {\n      transition: all 0.7s ease;\n      flex: none !important;\n      max-width: ",
    ";\n      width: 100%;\n    }\n  }\n"])), function (props) {
    return props.maxwidth !== undefined ? props.maxwidth + "px" : 'none';
}, function (props) { return props.width; }, function (props) {
    return props.maxwidth !== undefined ? props.maxwidth + "px" : 'none';
});
exports.FormFieldGroupWrapper = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 8px;\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 8px;\n  flex-shrink: 0;\n"])));
exports.FormFieldGroupTitle = styled_components_1.default.h4(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  margin: 32px 0 12px 0;\n"], ["\n  margin: 32px 0 12px 0;\n"])));
exports.FormSectionWrapper = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  margin: 16px 0 8px 0;\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  flex-direction: column;\n  margin: 16px 0 8px 0;\n  flex-shrink: 0;\n"])));
exports.FormSectionTitle = styled_components_1.default.h3(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  margin-bottom: 16px;\n  font-size: 18px;\n"], ["\n  margin-bottom: 16px;\n  font-size: 18px;\n"])));
exports.Form = function (props) {
    // const formRef = React.createRef<HTMLFormElement>()
    var theme = react_1.default.useContext(theme_1.getThemeContext());
    var getStyle = util_1.createGetStyle(theme, 'form')(props.style);
    var language = react_1.default.useContext(language_1.getLanguageContext());
    var translate = language_1.getTranslation(language);
    var _a = react_1.default.useState(false), showValidation = _a[0], setShowValidation = _a[1];
    react_1.useEffect(function () {
        setShowValidation(false);
    }, [props.formFields]);
    var isFieldInvalid = function (f) {
        if ('validate' in f && f.validate !== undefined) {
            return f.validate(props.data);
        }
        if ('required' in f && f.required) {
            var val = f.lens.get(props.data);
            var isInvalid = val === '' || val === null || val === undefined;
            if (f.type === types_1.FormFieldType.NumberInput &&
                'min' in f &&
                f.min !== undefined &&
                f.min > 0) {
                isInvalid = val < f.min;
            }
            return isInvalid;
        }
        return false;
    };
    var submit = function () {
        var isNotValid = some_form_1.someFormFields(props.formFields, isFieldInvalid);
        if (isNotValid) {
            setShowValidation(true);
        }
        else if (typeof props.onSubmit === 'function') {
            props.onSubmit();
        }
    };
    var renderFormFieldInput = function (field) {
        var data = props.data, onChange = props.onChange;
        var hasError = showValidation && isFieldInvalid(field);
        if (field.type === types_1.FormFieldType.TextArea) {
            var type = field.type, lens_1 = field.lens, fieldProps = __rest(field, ["type", "lens"]);
            return (react_1.default.createElement(TextArea_1.TextArea, __assign({}, fieldProps, { value: lens_1.get(data), onChange: function (value) { return onChange(lens_1.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.TextInput) {
            var type = field.type, lens_2 = field.lens, fieldProps = __rest(field, ["type", "lens"]);
            return (react_1.default.createElement(TextInput_1.TextInput, __assign({}, fieldProps, { value: lens_2.get(data) || '', onChange: function (value) { return onChange(lens_2.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.DatePicker) {
            var type = field.type, lens_3 = field.lens, fieldProps = __rest(field, ["type", "lens"]);
            return (react_1.default.createElement(DatePicker_1.DatePicker, __assign({}, fieldProps, { value: lens_3.get(data), onChange: function (value) { return onChange(lens_3.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.CheckboxGroup) {
            var lens_4 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(CheckboxGroup_1.CheckboxGroup, __assign({}, fieldProps, { value: lens_4.get(data), onChange: function (value) { return onChange(lens_4.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.SingleCheckbox) {
            var lens_5 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(SingleCheckbox_1.SingleCheckbox, __assign({}, fieldProps, { value: lens_5.get(data), onChange: function (value) { return onChange(lens_5.set(value)(data)); }, error: hasError })));
        }
        // if (field.type === FormFieldType.RadioGroup) {
        //   const { lens, ...fieldProps } = field
        //   return (
        //     <RadioGroup
        //       {...fieldProps}
        //       value={lens.get(data)}
        //       onChange={value => onChange(lens.set(value)(data))}
        //       error={hasError}
        //     />
        //   )
        // }
        if (field.type === types_1.FormFieldType.Switch) {
            var lens_6 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(Switch_1.Switch, __assign({}, fieldProps, { value: lens_6.get(data), onChange: function (value) { return onChange(lens_6.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.NumberInput) {
            var lens_7 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(NumberInput_1.NumberInput, __assign({}, fieldProps, { value: lens_7.get(data), onChange: function (value) { return onChange(lens_7.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.TextNumber) {
            var lens_8 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(TextNumberInput_1.TextNumberInput, __assign({}, fieldProps, { value: lens_8.get(data), onChange: function (value) { return onChange(lens_8.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.MultiSelect) {
            var lens_9 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(MultiSelect_1.MultiSelect, __assign({}, fieldProps, { value: lens_9.get(data), onChange: function (value) { return onChange(lens_9.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.InputWithDropdown) {
            var lens_10 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(InputWithDropdown_1.InputWithDropdown, __assign({}, fieldProps, { value: lens_10.get(data), onChange: function (value) { return onChange(lens_10.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.CountryDropdown) {
            var lens_11 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(CountryDropdown_1.CountryDropdown, __assign({}, fieldProps, { value: lens_11.get(data), onChange: function (value) { return onChange(lens_11.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.CurrencyInput) {
            var lens_12 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(CurrencyInput_1.CurrencyInput, __assign({}, fieldProps, { value: lens_12.get(data), onChange: function (value) { return onChange(lens_12.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.Dropdown) {
            var lens_13 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(Dropdown_1.Dropdown, __assign({}, fieldProps, { value: lens_13.get(data), onChange: function (value) { return onChange(lens_13.set(value)(data)); }, error: hasError })));
        }
        if (field.type === types_1.FormFieldType.DropdownNumber) {
            var lens_14 = field.lens, fieldProps = __rest(field, ["lens"]);
            return (react_1.default.createElement(DropdownNumber_1.DropdownNumber, __assign({}, fieldProps, { value: lens_14.get(data), onChange: function (value) { return onChange(lens_14.set(value)(data)); }, error: hasError })));
        }
        return react_1.default.createElement("div", null);
    };
    var renderFormFieldItem = function (width) {
        if (width === void 0) { width = 100; }
        return function (field, key) { return (react_1.default.createElement(exports.FormFieldWrapper, { key: key, width: "calc(" + width + "% - " + (width === 100 ? 0 : 4) + "px)", maxwidth: field.maxwidth, className: "form-field" }, renderFormFieldInput(field))); };
    };
    var renderFormFieldRow = function (formFieldRow, key) { return (react_1.default.createElement(exports.FormFieldRowWrapper, { key: key }, formFieldRow.map(renderFormFieldItem((1 / formFieldRow.length) * 100)))); };
    var renderFormField = function (formField, key) {
        if (Array.isArray(formField)) {
            return renderFormFieldRow(formField, key);
        }
        else {
            return (react_1.default.createElement(exports.FormFieldRowWrapper, null, renderFormFieldItem()(formField, key)));
        }
    };
    var renderFormSectionItem = function (formField, key) {
        if (!Array.isArray(formField) &&
            formField.type === types_1.FormFieldType.FormFieldGroup) {
            return renderFormGroup(formField, key);
        }
        else {
            return renderFormField(formField, key);
        }
    };
    var renderFormGroup = function (formGroup, key) { return (react_1.default.createElement(exports.FormFieldGroupWrapper, { key: key, style: formGroup.style },
        react_1.default.createElement(exports.FormFieldGroupTitle, { style: getStyle('groupTitle') }, translate(formGroup.title)),
        formGroup.fields.map(renderFormField))); };
    var renderFormSection = function (formSection, key) { return (react_1.default.createElement(exports.FormSectionWrapper, { key: key, style: formSection.style },
        react_1.default.createElement(exports.FormSectionTitle, { style: getStyle('sectionTitle') }, translate(formSection.title)),
        formSection.fields.map(renderFormSectionItem))); };
    var formFields = props.formFields;
    return (react_1.default.createElement(FormWrapper, { style: getStyle('wrapper') },
        props.renderTopChildren && props.renderTopChildren(props.data),
        react_1.default.createElement(exports.FormContent, null, formFields.map(function (f, key) {
            if (Array.isArray(f)) {
                return renderFormFieldRow(f, key);
            }
            else if (f.type === types_1.FormFieldType.FormFieldGroup) {
                return renderFormGroup(f, key);
            }
            else if (f.type === types_1.FormFieldType.FormSection) {
                return renderFormSection(f, key);
            }
            else {
                return renderFormField(f, key);
            }
        })),
        props.buttonProps && (react_1.default.createElement(ButtonContainer, null,
            react_1.default.createElement(Button_1.Button, __assign({}, props.buttonProps, { onClick: function () {
                    submit();
                } }))))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=Form.js.map