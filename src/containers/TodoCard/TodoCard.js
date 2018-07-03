import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import axios from '../../axios-instance'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/action-types'

import TodoInput from '../../components/TodoInput/TodoInput'
import TodoList from '../../components/TodoList/TodoList'

import classes from './TodoCard.css'

const reorder = (list, startIndex, endIndex) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

class TodoCard extends Component {
  addTodo = content => {
    const todos = [
      ...this.props.todos,
      { id: this.props.todos.length, content, completed: false }
    ]
    axios.put('/todos.json', todos).then(() => {
      this.props.createTodo(todos)
    })
  }

  toggleTodo = id => {
    const todos = this.props.todos.map(
      todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    )
    axios.put(`/todos.json`, todos).then(() => this.props.updateTodo(todos))
  }

  deleteTodo = id => {
    axios
      .delete(`/todos/${id}.json`)
      .then(() =>
        this.props.deleteTodo(this.props.todos.filter(todo => todo.id !== id))
      )
  }

  onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const todos = reorder(
      this.props.todos,
      result.source.index,
      result.destination.index
    )
    axios.put('/todos.json', todos).then(() => this.props.updateTodo(todos))
  }

  componentDidMount () {
    axios.get('/todos.json').then(response => {
      // this.setState(prevState => ({
      //   todos: [...prevState.todos, ...response]
      // }))
      this.props.getTodos(response)
    })
  }

  render () {
    return (
      <Card className={classes.TodoCard}>
        <TodoInput addTodo={this.addTodo} />
        <TodoList
          todos={this.props.todos}
          toggleTodo={this.toggleTodo}
          deleteTodo={this.deleteTodo}
          onDragEnd={this.onDragEnd}
        />
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos
  // todos: state.todo.todos  For use when combining reducers
})

const mapDispatchToProps = dispatch => ({
  getTodos: todos => dispatch({ type: actionTypes.GET_TODOS, todos }),
  createTodo: todos => dispatch({ type: actionTypes.CREATE_TODO, todos }),
  updateTodo: todos => dispatch({ type: actionTypes.UPDATE_TODO, todos }),
  deleteTodo: todos => dispatch({ type: actionTypes.DELETE_TODO, todos })
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard)
