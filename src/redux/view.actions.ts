import { Option } from 'fp-ts/lib/Option'
import { createViewAction } from './view.helpers'

export enum ViewActionType {
  SET_TOAST_MESSAGE = 'BCL/SET_TOAST_MESSAGE',
}

export enum ToastType {
  Error = 'ToastError',
  Success = 'ToastSuccess',
}

export type ToastPayload = { message: string; type: ToastType }

export type SetToastMessage = {
  type: ViewActionType.SET_TOAST_MESSAGE
  payload: Option<ToastPayload>
}

export const setToastMessage = createViewAction<SetToastMessage>(
  ViewActionType.SET_TOAST_MESSAGE,
)
