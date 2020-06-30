"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_helpers_1 = require("./view.helpers");
var ViewActionType;
(function (ViewActionType) {
    ViewActionType["SET_TOAST_MESSAGE"] = "BCL/SET_TOAST_MESSAGE";
})(ViewActionType = exports.ViewActionType || (exports.ViewActionType = {}));
var ToastType;
(function (ToastType) {
    ToastType["Error"] = "ToastError";
    ToastType["Success"] = "ToastSuccess";
})(ToastType = exports.ToastType || (exports.ToastType = {}));
exports.setToastMessage = view_helpers_1.createViewAction(ViewActionType.SET_TOAST_MESSAGE);
//# sourceMappingURL=view.actions.js.map