import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

import classes from './TodoInput.css'

class TodoInput extends Component {
  render () {
    return (
      <TextField
        className={classes.TodoInput}
        type='text'
        label='Add New Todo'
        value={this.props.value}
        onChange={this.props.changed}
        onKeyPress={this.props.keyPressed}
      />
    )
  }
}

export default TodoInput
