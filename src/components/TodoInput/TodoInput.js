import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

import classes from './TodoInput.css'

class TodoInput extends Component {
  state = {
    value: ''
  }

  inputChangeHandler = e => {
    this.setState({
      value: e.target.value
    })
  }

  keyPressed = e => {
    if (e.key === 'Enter') {
      this.props.addTodo(this.state.value)
      this.setState(prevState => ({
        value: ''
      }))
    }
  }

  render () {
    return (
      <TextField
        className={classes.TodoInput}
        type='text'
        label='Add New Todo'
        value={this.state.value}
        onChange={this.inputChangeHandler}
        onKeyPress={this.keyPressed}
      />
    )
  }
}

export default TodoInput
