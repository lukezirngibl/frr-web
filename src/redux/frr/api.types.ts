import { Exact } from 'typelevel-ts'

export enum RestMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export type Params = { [k: string]: string | number }

export type QueryObject = { [k: string]: string | number | boolean }

export type DataObject = {
  [k: string]: string | number | object | boolean
}

export type Data = DataObject | Array<DataObject> | DataObject[string] | null

type CommonRestProps = {
  params?: Params
  response: Data
  failure?: Data
}

export type PostRequest<
  T extends
    | Exact<CommonRestProps & { raw?: string }, T>
    | Exact<CommonRestProps & { json?: Data }, T>
    | Exact<CommonRestProps & { form?: DataObject | FormData }, T>
> = {
  method: RestMethod.POST
} & T

export type PutRequest<
  T extends
    | Exact<CommonRestProps & { raw?: string }, T>
    | Exact<CommonRestProps & { json?: Data }, T>
    | Exact<CommonRestProps & { form?: DataObject | FormData }, T>
> = {
  method: RestMethod.PUT
} & T

export type PatchRequest<
  T extends
    | Exact<CommonRestProps & { raw?: string }, T>
    | Exact<CommonRestProps & { json?: Data }, T>
    | Exact<CommonRestProps & { form?: DataObject | FormData }, T>
> = {
  method: RestMethod.PATCH
} & T

export type GetRequest<
  T extends Exact<CommonRestProps & { query?: QueryObject }, T>
> = {
  method: RestMethod.GET
} & T

export type DeleteRequest<
  T extends
    | Exact<CommonRestProps & { raw?: string }, T>
    | Exact<CommonRestProps & { json?: Data }, T>
    | Exact<CommonRestProps & { form?: DataObject }, T>
> = {
  method: RestMethod.DELETE
} & T

export type RestApiPayload = {
  credentials?: 'include'
  headers?: {
    'Content-Type': 'application/json'
  }
  body?: FormData | string
  endpoint: string
  types: {
    request: string
    success: string
    failure: string
  }
  method: RestMethod
  meta?: object
  delay?: number
  server?: string
}

export enum SystemActionType {
  REST_CALL = 'REST_CALL',
  SET_TOAST_MESSAGE = 'SET_TOAST_MESSAGE',
}

export type RestCallAction = {
  type: SystemActionType.REST_CALL
  payload: RestApiPayload
}
