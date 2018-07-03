import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import todoReducer from './store/reducers/todoReducer'

// This is how you would combine reducers
// const rootReducer = combineReducers({
//     todo: todoReducer,
//     input: inputReducer
// })

// const store = createStore(rootReducer)

const store = createStore(
  todoReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)
