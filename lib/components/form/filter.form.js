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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var processFormFieldRow = function (a, fn) {
    return a.reduce(function (acc, j) {
        return fn(j) ? __spreadArrays(acc, [j]) : acc;
    }, []);
};
var processFormFieldGroup = function (g, fn) { return (__assign(__assign({}, g), { fields: g.fields.reduce(function (filteredFields, e) {
        if (Array.isArray(e)) {
            return __spreadArrays(filteredFields, [processFormFieldRow(e, fn)]);
        }
        else {
            return __spreadArrays(filteredFields, (fn(e) ? [e] : []));
        }
    }, []) })); };
var processFormSectionFields = function (fields, fn) {
    return fields.reduce(function (acc, f) {
        if (Array.isArray(f)) {
            return __spreadArrays(acc, [processFormFieldRow(f, fn)]);
        }
        else if (f.type === types_1.FormFieldType.FormFieldGroup) {
            return __spreadArrays(acc, [processFormFieldGroup(f, fn)]);
        }
        else {
            return __spreadArrays(acc, (fn(f) ? [f] : []));
        }
    }, []);
};
var processFormSection = function (s, fn) { return (__assign(__assign({}, s), { fields: processFormSectionFields(s.fields, fn) })); };
exports.filterFormFields = function (formFields, fn) {
    return formFields.reduce(function (groups, f) {
        if (Array.isArray(f)) {
            return __spreadArrays(groups, [processFormFieldRow(f, fn)]);
        }
        else if (f.type === types_1.FormFieldType.FormFieldGroup) {
            return __spreadArrays(groups, [processFormFieldGroup(f, fn)]);
        }
        else if (f.type === types_1.FormFieldType.FormSection) {
            return __spreadArrays(groups, [processFormSection(f, fn)]);
        }
        else {
            return __spreadArrays(groups, (fn(f) ? [f] : []));
        }
    }, []);
};
//# sourceMappingURL=filter.form.js.map