import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_FAILURE,
  UPDATE_TODO_SUCCESS,
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

import { TodoActions, TodoState } from './types'

const initialState: TodoState = {
  loading: false,
  isAuthenticated: localStorage.getItem('todoauth') ? true : false,
  signInLoader: false,
  signUpLoader: false,
  addLoader: false,
  updateLoader: false,
  todos: [],
  error: null,
}

export default (state = initialState, action: TodoActions) => {
  console.log('ACTION IN REDUCER', action)
  switch (action.type) {
    //FETCH TYPES
    case FETCH_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload.todos,
        error: null,
      }
    case FETCH_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.error,
      }

    //ADD TODO
    case ADD_TODO_REQUEST:
      return {
        ...state,
        addLoader: true,
      }
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        addLoader: false,
      }
    case ADD_TODO_FAILURE:
      return {
        ...state,
        addLoader: false,
      }

    //UPDATE TODO

    case UPDATE_TODO_REQUEST:
      return {
        ...state,
        updateLoader: true,
      }
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        updateLoader: false,
      }
    case UPDATE_TODO_FAILURE:
      return {
        ...state,
        updateLoader: false,
      }

    //Delete TOdo

    case DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      }
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        loading: false,
      }

    case SIGN_IN_REQUEST:
      return {
        ...state,
        signInLoader: true,
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        signInloader: false,
      }

    case SIGN_IN_FAILURE:
      return {
        ...state,
        signInLoader: false,
      }

    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoader: true,
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUploader: false,
      }

    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUploader: false,
      }
    case SIGNOUT_REQUEST: {
      state = {
        ...state,
        isAuthenticated: false,
      }
      break
    }

    default:
      return {
        ...state,
      }
  }
}
