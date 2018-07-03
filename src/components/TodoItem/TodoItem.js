import React, { Component, Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import DragHandle from '@material-ui/icons/DragHandle'
import Delete from '@material-ui/icons/Delete'
import Check from '@material-ui/icons/Check'
import Undo from '@material-ui/icons/Undo'

import classes from './TodoItem.css'

class TodoItem extends Component {
  render () {
    return (
      <ListItem>
        <DragHandle {...this.props.draggable} />
        <ListItemText
          className={`${this.props.completed ? classes.Completed : ''} ${classes.TodoItemText}`}
          primary={this.props.content}
        />
        <ListItemSecondaryAction>
          {!this.props.completed
            ? <IconButton aria-label='Check' onClick={this.props.toggleTodo}>
              <Check />
            </IconButton>
            : <Fragment>
              <IconButton aria-label='Undo' onClick={this.props.toggleTodo}>
                <Undo />
              </IconButton>
              <IconButton aria-label='Delete' onClick={this.props.deleteTodo}>
                <Delete />
              </IconButton>
            </Fragment>}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default TodoItem
