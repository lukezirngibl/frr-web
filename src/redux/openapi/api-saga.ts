import { fork, put, takeEvery, delay, race } from 'redux-saga/effects'
import { RestAction } from './api-util'

// 'Access-Control-Allow-Origin': '*',
// 'Access-Control-Allow-Headers': '*',
// Accept: 'application/json',
// 'Content-Type': 'application/json',

const showErrorTypes = [] as Array<string>

function* callRestApi(action: RestAction) {
  const { types, body, func, meta } = action.payload

  yield put({
    type: types.request,
    payload: undefined,
    meta,
  })

  try {
    const payload = (yield func(body)) as
      | undefined
      | object
      | { message: string }

    if (
      payload !== undefined &&
      'message' in payload &&
      payload.message !== undefined
    ) {
      // callToast.error(payload.message)
      yield put({
        type: types.failure,
        payload,
        meta,
      })
      // console.log(types.failure, payload)
    } else {
      yield put({
        type: types.success,
        payload,
        meta,
      })
    }
  } catch (error) {
    try {
      console.log('error: ', error)
      if ('message' in error && showErrorTypes.includes(types.failure)) {
        // callToast.error(res.message)
        yield put({
          type: types.failure,
          payload: error,
          meta,
        })
      } else {
        yield put({
          type: types.failure,
          payload: {},
          meta,
        })
      }
    } catch (error) {
      console.log('error: ', error)
      // callToast.error('Error')
      yield put({
        type: types.failure,
        payload: {},
        meta,
      })
    }
  }
}

export function* RestSaga() {
  yield takeEvery('REST_CALL', callRestApi)
}

export function* ApiSaga() {
  yield fork(RestSaga)
}
