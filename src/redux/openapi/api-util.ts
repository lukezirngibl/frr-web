type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never

type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T

export type RestAction = {
  type: 'REST_CALL'
  payload: {
    credentials: 'include'
    headers: {
      'Content-Type': 'application/json'
    }
    body: unknown
    meta?: object
    func: (params: unknown) => Promise<unknown>
    types: {
      success: string
      request: string
      failure: string
    }
  }
}

export const configureApi = <
  Endpoints extends keyof any,
  EndpointMap extends { [key in Endpoints]: any }
>(
  mapEndpointToFunc: EndpointMap,
) => {
  type ActionTypes = {
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

  type CreateSuccessType<E extends Endpoints, T extends string, M = {}> = {
    type: T
    meta: ArgumentTypes<typeof mapEndpointToFunc[E]>[0] & M
    payload: UnwrapPromise<ReturnType<typeof mapEndpointToFunc[E]>>
  }

  type CreateRequestType<E extends Endpoints, T extends string, M = {}> = {
    type: T
    meta: ArgumentTypes<typeof mapEndpointToFunc[E]>[0] & M
    payload: ArgumentTypes<typeof mapEndpointToFunc[E]>[0]
  }

  type CreateFailureType<E extends Endpoints, T extends string, M = {}> = {
    type: T
    meta: ArgumentTypes<typeof mapEndpointToFunc[E]>[0] & M
    payload: {}
  }

  type CreateAPIConfigType<
    T extends ActionTypes,
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
    T extends ActionTypes,
    E extends Endpoints,
    M = undefined
  >(): CreateAPIConfigType<T, E, M> {
    return (undefined as unknown) as CreateAPIConfigType<T, E, M>
  }

  const callApi = <
    T extends APIConfig,
    M extends object | undefined = undefined
  >(
    endpoint: T['type'],
    types: {
      request: T['request']['type']
      success: T['success']['type']
      failure: T['failure']['type']
    },
  ) => (
    c: M extends undefined
      ? {
          body: ArgumentTypes<typeof mapEndpointToFunc[T['type']]>[0]
        }
      : {
          body: ArgumentTypes<typeof mapEndpointToFunc[T['type']]>[0]
          meta: M
        },
  ): RestAction => {
    return {
      type: 'REST_CALL',
      payload: {
        credentials: 'include',
        meta: 'meta' in c ? (c as any).meta : {},
        headers: {
          'Content-Type': 'application/json',
        },
        body: c.body,
        func: mapEndpointToFunc[endpoint] as any,
        types,
      },
    }
  }

  const createEndpoint = <M extends object | undefined = undefined>() => <
    T extends { request: string; failure: string; success: string },
    Endpoint extends Endpoints
  >(
    t: T,
    e: Endpoint,
  ) => {
    const ActionA = createApiType<T, Endpoint, M>()
    type Action = typeof ActionA
    const call = callApi<Action, M>(e, t)
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
