import React, { Component } from 'react'

import classes from './App.css'

import TodoCard from './containers/TodoCard/TodoCard'

class App extends Component {
  render () {
    return (
      <div className={classes.App}>
        <TodoCard />
      </div>
    )
  }
}

export default App
