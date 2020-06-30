import { put, takeEvery, delay as sagaDelay, race } from 'redux-saga/effects'
import { RestApiPayload, SystemActionType } from './api.types'

export type SagaApiConfig = {
  baseUrl: string
}

const makeApiRequest = (config: SagaApiConfig) => async ({
  method,
  endpoint,
  body,
  server,
}: {
  method: string
  endpoint: string
  server?: string
  body?: string | FormData
}) => {
  const token = await localStorage.getItem('@token')
  const options: RequestInit = {
    method,
    headers: {
      'x-access-token': token || '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
  }

  const e = endpoint.endsWith('/')
    ? endpoint.slice(0, endpoint.length - 1)
    : endpoint

  return fetch(`${server || config.baseUrl}/api${e}`, options)
}

const configuireRestApi = (config: SagaApiConfig) =>
  function* callRestApi(action: {
    payload: RestApiPayload
    type: SystemActionType.REST_CALL
  }) {
    const {
      types,
      meta,
      endpoint,
      body,
      method,
      delay,
      server,
    } = action.payload

    yield put({
      type: types.request,
      payload: undefined,
      meta,
    })

    if (delay !== undefined) {
      yield sagaDelay(delay)
    }

    try {
      // console.log('sending...')
      const { raw, timeout } = yield race({
        raw: makeApiRequest(config)({ method, endpoint, body, server }),
        timeout: sagaDelay(10000),
      })

      // console.log('receiving...')

      // console.log(raw, timeout)

      if (!raw) {
        // yield put(
        //   setToastMessage(
        //     some({
        //       message: 'Bad Internet Connection.',
        //       type: ToastType.Error,
        //       meta: action,
        //     }),
        //   ),
        // )
        return
      }

      const payload = yield raw.json()

      if (raw.status >= 400) {
        yield put({
          type: types.failure,
          payload,
          meta,
        })

        if (raw.status !== 410) {
          // console.log({
          //   message:
          //     'error' in payload && typeof payload.error === 'string'
          //       ? payload.error
          //       : 'Error has occurred.',
          //   type: ToastType.Error,
          //   meta: action,
          // })
          // yield put(
          //   setToastMessage(
          //     some({
          //       message:
          //         'error' in payload && typeof payload.error === 'string'
          //           ? payload.error
          //           : 'Error has occurred.',
          //       type: ToastType.Error,
          //       meta: action,
          //     }),
          //   ),
          // )
        }
      } else {
        yield put({
          type: types.success,
          payload,
          meta,
        })
      }
    } catch (error) {
      yield put({
        type: types.failure,
        payload: {},
        meta,
      })
      // console.log({
      //   message: 'Server error.',
      //   type: ToastType.Error,
      //   meta: action,
      // })
      // yield put(
      //   setToastMessage(
      //     some({
      //       message: 'Server error.',
      //       type: ToastType.Error,
      //       meta: action,
      //     }),
      //   ),
      // )
    }
  }

export const configureApiSaga = (config: SagaApiConfig) =>
  function* ApiSaga() {
    const callRestApi = configuireRestApi(config)
    yield takeEvery(SystemActionType.REST_CALL, callRestApi)
  }
