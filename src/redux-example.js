import { createStore } from 'redux'

const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
const DECREMENT_COUNTER = 'DECREMENT_COUNTER'
const ADD = 'ADD'

const initialState = {
  counter: 0
}

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter + 1
      }
    case DECREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter - 1
      }
    case ADD:
      return {
        ...state,
        counter: state.counter + action.num
      }
    default:
      return state
  }
}

// Store
const store = createStore(counterReducer)

console.log(store.getState())

store.subscribe(() => {
  console.log(store.getState())
})

// Actions
store.dispatch({ type: INCREMENT_COUNTER })

// console.log(store.getState())

store.dispatch({ type: ADD, num: 10 })

// console.log(store.getState())
