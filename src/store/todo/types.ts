import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
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

export interface ITodo {
  name: string
}

export interface TodoState {
  loading: boolean
  isAuthenticated: boolean
  signInLoader: boolean
  signUpLoader: boolean
  addLoader: boolean
  updateLoader: boolean
  todos: ITodo[]
  error: string | null
}

/********************************************payload types************************************************/

//AUTH payload types

export interface SignInRequestPayload {
  email: string
  password: string
}

export interface SignInSuccessPayload {}

export interface SignUpRequestPayload {
  fullName: string
  email: string
  password: string
}

export interface SignUpSuccessPayload {}

export interface SignUpFailurePayload {
  error: string
}

//Fetch payload types

export interface FetchTodoSuccessPayload {
  todos: ITodo[]
}

export interface FetchTodoFailurePayload {
  error: string
}

//Add payload types

export interface AddTodoRequestPayload {
  name: string
}
export interface AddTodoSuccessPayload {
  todos: ITodo[]
}

export interface AddTodoFailurePayload {
  message: string
}

//Update payload types
export interface UpdateTodoRequestPayload {
  name: string
  _id: string
}
export interface UpdateTodoSuccessPayload {
  todos: ITodo[]
}

export interface UpdateTodoFailurePayload {
  error: string
}

//Update payload types

export interface DeleteTodoRequestPayload {
  id: string
}

/*******************************************Action types************************************************/

//Auth Actions

//SIGN IN

export interface SignInRequest {
  type: typeof SIGN_IN_REQUEST
  payload: SignInRequestPayload
  cb: () => void
}

export interface SignInSuccess {
  type: typeof SIGN_IN_SUCCESS
  payload: SignInSuccessPayload
}

export interface SignInFailure {
  type: typeof SIGN_IN_FAILURE
}

//SIGN UP

export interface SignUpRequest {
  type: typeof SIGN_UP_REQUEST
  payload: SignUpRequestPayload
  cb: () => void
}

export interface SignUpSuccess {
  type: typeof SIGN_UP_SUCCESS
  payload: SignUpSuccessPayload
}

export interface SignUpFailure {
  type: typeof SIGN_UP_FAILURE
}

//Fetch Todo Type

export interface FetchTodoRequest {
  type: typeof FETCH_TODO_REQUEST
}

export type FetchTodoSuccess = {
  type: typeof FETCH_TODO_SUCCESS
  payload: FetchTodoSuccessPayload
}

export type FetchTodoFailure = {
  type: typeof FETCH_TODO_FAILURE
  error: FetchTodoFailurePayload
}

//Add Todo Type

export interface AddTodoRequest {
  payload: AddTodoRequestPayload
  cb: () => void
  type: typeof ADD_TODO_REQUEST
}

export type AddTodoSuccess = {
  type: typeof ADD_TODO_SUCCESS
}

export type AddTodoFailure = {
  type: typeof ADD_TODO_FAILURE
  payload: AddTodoFailurePayload
}

//Update Todo Type

export interface UpdateTodoRequest {
  payload: UpdateTodoRequestPayload
  cb: () => void
  type: typeof UPDATE_TODO_REQUEST
}

export type UpdateTodoSuccess = {
  type: typeof UPDATE_TODO_SUCCESS
}

export type UpdateTodoFailure = {
  type: typeof UPDATE_TODO_FAILURE
}

//DELETE Todo Type

export interface DeleteTodoRequest {
  params: DeleteTodoRequestPayload
  cb: () => void
  type: typeof DELETE_TODO_REQUEST
}

export type DeleteTodoSuccess = {
  type: typeof DELETE_TODO_SUCCESS
}

export type DeleteTodoFailure = {
  type: typeof DELETE_TODO_FAILURE
}

export type SignOutRequest = { type: typeof SIGNOUT_REQUEST }

export type TodoActions =
  | FetchTodoRequest
  | FetchTodoSuccess
  | FetchTodoFailure
  | AddTodoRequest
  | AddTodoFailure
  | AddTodoSuccess
  | UpdateTodoRequest
  | UpdateTodoFailure
  | UpdateTodoSuccess
  | DeleteTodoRequest
  | DeleteTodoFailure
  | DeleteTodoSuccess
  | SignInRequest
  | SignInSuccess
  | SignInFailure
  | SignUpRequest
  | SignUpSuccess
  | SignUpFailure
  | SignOutRequest
