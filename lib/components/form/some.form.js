"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var processFormFieldRow = function (a, fn) { return a.some(function (j) { return fn(j); }); };
var processFormFieldGroup = function (g, fn) {
    return g.fields.some(function (f) {
        if (Array.isArray(f)) {
            return processFormFieldRow(f, fn);
        }
        else {
            return fn(f);
        }
    });
};
var processFormSectionFields = function (fields, fn) {
    return fields.some(function (f) {
        if (Array.isArray(f)) {
            return processFormFieldRow(f, fn);
        }
        else if (f.type === types_1.FormFieldType.FormFieldGroup) {
            return processFormFieldGroup(f, fn);
        }
        else {
            return fn(f);
        }
    });
};
exports.someFormFields = function (formFields, fn) {
    return formFields.some(function (f) {
        if (Array.isArray(f)) {
            return processFormFieldRow(f, fn);
        }
        else if (f.type === types_1.FormFieldType.FormFieldGroup) {
            return processFormFieldGroup(f, fn);
        }
        else if (f.type === types_1.FormFieldType.FormSection) {
            return processFormSectionFields(f.fields, fn);
        }
        else {
            return fn(f);
        }
    });
};
//# sourceMappingURL=some.form.js.map