import axios, { AxiosError, AxiosResponse } from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import {
  API_BASE_URL,
  AUTH_BASE_URL,
  FETCH_TODOS_ENDPOINT,
  UPDATE_TODO_ENDPOINT,
  ADD_TODO_ENDPOINT,
  DELETE_TODO_ENDPOINT,
  SIGN_IN_ENDPOINT,
  SIGN_UP_ENDPOINT,
} from '../constants'

import {
  fetchTodoFailure,
  fetchTodoSuccess,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  updateTodoRequest,
  updateTodoFailure,
  updateTodoSuccess,
  deleteTodoRequest,
  deleteTodoFailure,
  deleteTodoSuccess,
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
} from './actions'
import {
  FETCH_TODO_REQUEST,
  ADD_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_UP_REQUEST,
} from './actionTypes'
import {
  FetchTodoRequest,
  AddTodoRequest,
  DeleteTodoRequest,
  UpdateTodoRequest,
  SignInRequest,
  SignUpRequest,
  ITodo,
} from './types'

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/

type GetTodosResponse = {
  data: ITodo[]
}

function* fetchTodoSaga(action: FetchTodoRequest) {
  try {
    const res: AxiosResponse = yield call(
      axios.get,
      `${API_BASE_URL}${FETCH_TODOS_ENDPOINT}`,
    )

    console.log('RES OF FETCH TODOS', res)
    if (res.status == 200 || res.status == 201) {
      yield put(fetchTodoSuccess({ todos: res.data.data.data }))
    } else {
      // yield put(fetchTodoFailure())
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log('error message: ', err.message)
      return err.message
    } else {
      console.log('unexpected error: ', err)
      return 'An unexpected error occurred'
    }

    // yield put(fetchTodoFailure())
  }
}

type AddTodoResponse = {
  name: string
}

type AddTodoError = {
  message: string
}

function* addTodoSaga(action: AddTodoRequest) {
  try {
    const res: AxiosResponse<AddTodoResponse> = yield call(
      axios.post,
      `${API_BASE_URL}${ADD_TODO_ENDPOINT}`,
      { ...action.payload },
    )

    yield put(addTodoSuccess())
    action.cb()
  } catch (err) {
    const newError = err as AxiosError<AddTodoError>
    // newError.response?.data.message
    yield put(
      addTodoFailure({
        message: newError.response?.data.message ?? newError.message,
      }),
    )
    if (axios.isAxiosError(err)) {
      console.log('error message: ', err.message)
      return err.message
    } else {
      console.log('unexpected error: ', err)
      return 'An unexpected error occurred'
    }
  }
}

type UpdateTodoResponse = {
  payload: string
  id: string
}

function* updateTodoSaga(action: UpdateTodoRequest) {
  try {
    const res: AxiosResponse<UpdateTodoResponse> = yield call(
      axios.put,
      `${API_BASE_URL}${UPDATE_TODO_ENDPOINT}/${action.payload._id}`,
      { ...action.payload },
    )

    if (res.status == 200 || res.status == 201) {
      yield put(updateTodoSuccess())
      action.cb()
    } else {
      // yield put(addTodoFailure())
    }
  } catch (err) {
    // yield put(addTodoFailure())
  }
}

type DeleteTodoResponse = {
  id: string
}
function* deleteTodoSaga(action: DeleteTodoRequest) {
  try {
    const res: AxiosResponse<DeleteTodoResponse> = yield call(
      axios.delete,
      `${API_BASE_URL}${DELETE_TODO_ENDPOINT}/${action.params.id}`,
    )

    if (res.status == 200 || res.status == 201) {
      // yield put(addTodoSuccess({ todos: res.data.data }))
      action.cb()
    } else {
      // yield put(addTodoFailure())
    }
  } catch (err) {
    // yield put(addTodoFailure())
  }
}

// type SignInResponse = {
//   data: {}
//   status: string
//   password: strin
// }

type SignInError = {
  data: {
    message: string
  }
}
function* signInSaga(action: SignInRequest) {
  try {
    const res: AxiosResponse = yield call(
      axios.post,
      `${AUTH_BASE_URL}${SIGN_IN_ENDPOINT}`,
      { ...action.payload },
    )

    if (res.status == 200 || res.status == 201) {
      localStorage.setItem(
        'todoauth',
        JSON.stringify(res.data.data.data.x_auth_token),
      )
      message.success(res.data.data.message)
      action.cb()
      yield put(signInSuccess({ payload: res.data.data.data }))
    } else {
      yield put(signInFailure())
    }
  } catch (err) {
    yield put(signInFailure())
    const error = err as AxiosError<SignInError>
    message.error(error.response?.data.data.message)
  }
}

type SignUpError = {
  data: {
    message: string
  }
}
function* signUpSaga(action: SignUpRequest) {
  try {
    const res: AxiosResponse = yield call(
      axios.post,
      `${AUTH_BASE_URL}${SIGN_UP_ENDPOINT}`,
      { ...action.payload },
    )

    if (res.status == 200 || res.status == 201) {
      message.success('User created successfully')
      action.cb()
      yield put(signUpSuccess({ payload: res.data.data.data }))
    } else {
      yield put(signUpFailure())
    }
  } catch (err) {
    yield put(signUpFailure())
    const error = err as AxiosError<SignUpError>
    message.error(error.response?.data.data.message)
  }
}

function* todoSaga() {
  yield all([
    takeLatest(FETCH_TODO_REQUEST, fetchTodoSaga),
    takeLatest(ADD_TODO_REQUEST, addTodoSaga),
    takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga),
    takeLatest(UPDATE_TODO_REQUEST, updateTodoSaga),
    takeLatest(SIGN_IN_REQUEST, signInSaga),
    takeLatest(SIGN_UP_REQUEST, signUpSaga),
  ])
}

export default todoSaga
