import { Option } from 'fp-ts/lib/Option';
export declare enum ViewActionType {
    SET_TOAST_MESSAGE = "BCL/SET_TOAST_MESSAGE"
}
export declare enum ToastType {
    Error = "ToastError",
    Success = "ToastSuccess"
}
export declare type ToastPayload = {
    message: string;
    type: ToastType;
};
export declare type SetToastMessage = {
    type: ViewActionType.SET_TOAST_MESSAGE;
    payload: Option<ToastPayload>;
};
export declare const setToastMessage: (payload: Option<ToastPayload>) => {
    type: ViewActionType;
    payload: Option<ToastPayload>;
    analytics?: boolean;
};
