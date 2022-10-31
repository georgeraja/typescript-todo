import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_FAILURE,
  FETCH_TODO_SUCCESS,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGNOUT_REQUEST,
} from './actionTypes'
import {
  FetchTodoRequest,
  FetchTodoSuccess,
  FetchTodoFailure,
  AddTodoRequest,
  AddTodoSuccess,
  AddTodoFailure,
  UpdateTodoRequest,
  UpdateTodoSuccess,
  UpdateTodoFailure,
  DeleteTodoRequest,
  DeleteTodoFailure,
  DeleteTodoSuccess,
  FetchTodoSuccessPayload,
  FetchTodoFailurePayload,
  AddTodoRequestPayload,
  AddTodoFailurePayload,
  AddTodoSuccessPayload,
  UpdateTodoRequestPayload,
  UpdateTodoFailurePayload,
  UpdateTodoSuccessPayload,
  DeleteTodoRequestPayload,
  SignInRequestPayload,
  SignInSuccessPayload,
  SignUpRequestPayload,
  SignUpFailurePayload,
  SignUpSuccessPayload,
  SignInRequest,
  SignInSuccess,
  SignInFailure,
  SignUpRequest,
  SignUpSuccess,
  SignUpFailure,
  SignOutRequest,
} from './types'

/*******************************************AUTH ACTION**************************************************/

export const signInRequest = (
  payload: SignInRequestPayload,
  cb: () => void,
): SignInRequest => ({
  type: SIGN_IN_REQUEST,
  payload,
  cb,
})

export const signInSuccess = (
  payload: SignInSuccessPayload,
): SignInSuccess => ({
  type: SIGN_IN_SUCCESS,
  payload,
})

export const signInFailure = (): SignInFailure => ({
  type: SIGN_IN_FAILURE,
})

//SIGN UP

export const signUpRequest = (
  payload: SignUpRequestPayload,
  cb: () => void,
): SignUpRequest => ({
  type: SIGN_UP_REQUEST,
  payload,
  cb,
})

export const signUpSuccess = (
  payload: SignUpSuccessPayload,
): SignUpSuccess => ({
  type: SIGN_UP_SUCCESS,
  payload,
})

export const signUpFailure = (): SignUpFailure => {
  return {
    type: SIGN_UP_FAILURE,
  }
}

//TODO ACTIONS

export const fetchTodoRequest = (): FetchTodoRequest => ({
  type: FETCH_TODO_REQUEST,
})

export const fetchTodoSuccess = (
  payload: FetchTodoSuccessPayload,
): FetchTodoSuccess => ({
  type: FETCH_TODO_SUCCESS,
  payload,
})

export const fetchTodoFailure = (
  error: FetchTodoFailurePayload,
): FetchTodoFailure => ({
  type: FETCH_TODO_FAILURE,
  error,
})

//Add Actions

export const addTodoRequest = (
  payload: AddTodoRequestPayload,
  cb: () => void,
): AddTodoRequest => ({
  type: ADD_TODO_REQUEST,
  payload,
  cb,
})

export const addTodoSuccess = (): AddTodoSuccess => ({
  type: ADD_TODO_SUCCESS,
})

export const addTodoFailure = (
  payload: AddTodoFailurePayload,
): AddTodoFailure => ({
  type: ADD_TODO_FAILURE,
  payload,
})

//Update Actions

export const updateTodoRequest = (
  payload: UpdateTodoRequestPayload,
  cb: () => void,
): UpdateTodoRequest => ({
  type: UPDATE_TODO_REQUEST,
  cb,
  payload,
})

export const updateTodoSuccess = (): UpdateTodoSuccess => ({
  type: UPDATE_TODO_SUCCESS,
})
export const updateTodoFailure = (): UpdateTodoFailure => ({
  type: UPDATE_TODO_FAILURE,
})

//Delete Actions

export const deleteTodoRequest = (
  params: DeleteTodoRequestPayload,
  cb: () => void,
): DeleteTodoRequest => {
  console.log('ID IN DELETE ACTION:', params)
  return {
    type: DELETE_TODO_REQUEST,
    cb,
    params,
  }
}

export const deleteTodoSuccess = (): DeleteTodoSuccess => ({
  type: DELETE_TODO_SUCCESS,
})
export const deleteTodoFailure = (): DeleteTodoFailure => ({
  type: DELETE_TODO_FAILURE,
})

export const signOutRequest = (): SignOutRequest => ({
  type: SIGNOUT_REQUEST,
})
