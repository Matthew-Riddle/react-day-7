import * as actionTypes from '../actions/action-types'

const initialState = {
  todos: []
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TODOS:
      return {
        ...state,
        todos: action.todos
      }
    case actionTypes.CREATE_TODO:
      return {
        ...state,
        todos: action.todos
      }
    case actionTypes.UPDATE_TODO:
      return {
        ...state,
        todos: action.todos
      }
    case actionTypes.DELETE_TODO:
      return {
        ...state,
        todos: action.todos
      }
    default:
      return state
  }
}

export default todoReducer
