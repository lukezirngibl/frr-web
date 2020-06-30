import {
  Data,
  DataObject,
  QueryObject,
  RestCallAction,
  RestMethod,
  SystemActionType,
} from './api.types'
import { toArray } from 'fp-ts/lib/Record'
import { fromNullable } from 'fp-ts/lib/Option'

export const configureTypeReduxApiCreator = <
  API extends any,
  Endpoints extends keyof API,
  EndpointMap extends { [key in Endpoints]: RestMethod }
>(
  endpointsToMethod: EndpointMap,
) => {
  type RestConfig<E extends Endpoints, M> = (M extends undefined
    ? {
        meta?: never
      }
    : {
        meta: M
      }) &
    (API[E] extends {
      json: Data
    }
      ? { json: API[E]['json'] }
      : { json?: never }) &
    (API[E] extends {
      params: Data
    }
      ? { params: API[E]['params'] }
      : { params?: never }) &
    (API[E] extends {
      form: DataObject
    }
      ? { form: API[E]['form'] }
      : { form?: never }) &
    (API[E] extends {
      query: QueryObject
    }
      ? { query: API[E]['query'] }
      : { query?: never }) &
    (API[E] extends {
      raw: string
    }
      ? { raw: API[E]['raw'] }
      : { raw?: never })

  type CreateSuccessType<E extends Endpoints, T extends string, M = {}> = {
    type: T
    meta: (M extends undefined ? {} : M) &
      (API[E] extends { body: object } ? API[E]['body'] : {})
    payload: API[E]['response']
  }

  type CreateRequestType<E extends Endpoints, T extends string, M = {}> = {
    type: T
    meta: (M extends undefined ? {} : M) &
      (API[E] extends { body: object } ? API[E]['body'] : {})
    payload: API[E] extends { body: object } ? API[E]['body'] : {}
  }

  type CreateFailureType<E extends Endpoints, T extends string, M = {}> = {
    type: T
    meta: (M extends undefined ? {} : M) &
      (API[E] extends { body: object } ? API[E]['body'] : {})
    payload: API[E] extends { failure: object } ? API[E]['failure'] : {}
  }

  type RestRequestActionTypes = {
    request: string
    failure: string
    success: string
  }

  type APIConfig = {
    type: Endpoints
    request: { type: string }
    failure: { type: string }
    success: { type: string }
    meta?: any
  }

  type CreateAPIConfigType<
    T extends RestRequestActionTypes,
    E extends Endpoints,
    M = undefined
  > = {
    type: E
    meta: M
    success: CreateSuccessType<E, T['success'], M>
    request: CreateRequestType<E, T['request'], M>
    failure: CreateFailureType<E, T['failure'], M>
    all:
      | CreateSuccessType<E, T['success'], M>
      | CreateRequestType<E, T['request'], M>
      | CreateFailureType<E, T['failure'], M>
  }

  function createApiType<
    T extends RestRequestActionTypes,
    E extends Endpoints,
    M = undefined
  >(): CreateAPIConfigType<T, E, M> {
    return (undefined as unknown) as CreateAPIConfigType<T, E, M>
  }

  type ActionTypesFromConfig<T extends APIConfig> = {
    request: T['request']['type']
    failure: T['failure']['type']
    success: T['success']['type']
  }

  type ExtraEndpointConfig = { delay?: number; server?: string }

  function callAPI<T extends APIConfig>(
    endpoint: T['type'],
    endpointConfig?: ExtraEndpointConfig,
  ): (
    actionTypes: ActionTypesFromConfig<T>,
  ) => RestConfig<T['type'], T['meta']> extends {
    meta?: never
    json?: never
    params?: never
    form?: never
    query?: never
    raw?: never
  }
    ? (config?: RestConfig<T['type'], T['meta']>) => RestCallAction
    : (config: RestConfig<T['type'], T['meta']>) => RestCallAction

  function callAPI<T extends APIConfig>(
    endpoint: T['type'],
    endpointConfig?: { delay?: number; server?: string },
  ) {
    return (actionTypes: ActionTypesFromConfig<T>) => (
      config: RestConfig<T['type'], T['meta']>,
    ): RestCallAction => {
      const method = endpointsToMethod[endpoint]

      const server =
        'server' in (endpointConfig || {}) ? endpointConfig.server : undefined
      const delay =
        'delay' in (endpointConfig || {}) ? endpointConfig.delay : undefined
      const json = 'json' in (config || {}) ? config.json : undefined
      const form = 'form' in (config || {}) ? config.form : undefined
      const query = 'query' in (config || {}) ? config.query : undefined
      const meta = 'meta' in (config || {}) ? config.meta : undefined
      const raw = 'raw' in (config || {}) ? config.raw : undefined

      const queryString = fromNullable(query)
        .map(q =>
          toArray(q).map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`),
        )
        .fold('', x => `?${x.join('&')}`)

      let body: FormData | string | undefined

      if (form !== undefined) {
        const formData = new FormData()
        Object.keys(form).forEach(k => {
          const val = form[k]

          formData.append(
            k,
            typeof val === 'string' ? val : JSON.stringify(val),
          )

          body = formData
        })
      } else if (json !== undefined) {
        body = JSON.stringify(json)
      } else if (raw !== undefined) {
        body = raw
      }

      return {
        type: SystemActionType.REST_CALL,
        payload: {
          meta,
          credentials: 'include',
          headers:
            form !== undefined
              ? undefined
              : {
                  'Content-Type': 'application/json',
                },
          body,
          endpoint: `${endpoint}/${queryString}`,
          types: actionTypes,
          method,
          delay,
          server,
        },
      }
    }
  }

  const createEndpoint = <M = undefined>() => <
    T extends { request: string; failure: string; success: string },
    Endpoint extends Endpoints
  >(
    t: T,
    e: Endpoint,
    config?: ExtraEndpointConfig,
  ) => {
    const ActionA = createApiType<T, Endpoint, M>()
    type Action = typeof ActionA
    const call = callAPI<Action>(e, config)(t)
    return {
      call,
      action: (undefined as unknown) as Action,
      types: t,
    }
  }

  return {
    createEndpoint,
  }
}

// export enum Endpoints {
//   Demo = '/demo',
// }

// export type API = {
//   [Endpoints.Demo]: PostRequest<{
//     json: { payload: boolean }
//     response: { abc: boolean }
//   }>
// }

// export const mapEndpointToMethod = {
//   [Endpoints.Demo]: RestMethod.POST,
// }

// const eco = configureTypeReduxApiCreator<
//   API,
//   Endpoints,
//   typeof mapEndpointToMethod
// >(mapEndpointToMethod)

// const Demo = eco.createEndpoint(
//   {
//     request: 'DEMO_REQUEST',
//     success: 'DEMO_SUCCESS',
//     failure: 'DEMO_FAILURE',
//   } as const,
//   Endpoints.Demo,
// )

// type DemoAction = typeof Demo['action']['all']

// type DemoState = {
//   demo: boolean
// }

// export const demoReducer = (
//   state: DemoState = { demo: true },
//   action: DemoAction,
// ): DemoState => {
//   switch (action.type) {
//     case Demo.types.success:
//       return {
//         ...state,
//         demo: action.payload.abc,
//       }

//     default:
//       return state
//   }
// }
