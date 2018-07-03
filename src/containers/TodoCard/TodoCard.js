import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import axios from '../../axios-instance'

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
  state = {
    value: '',
    todos: []
  }

  inputChangeHandler = e => {
    this.setState({
      value: e.target.value
    })
  }

  keyPressed = e => {
    if (e.key === 'Enter') {
      this.addTodo(this.state.value)
    }
  }

  addTodo = content => {
    const todos = [
      ...this.state.todos,
      { id: this.state.todos.length, content, completed: false }
    ]
    axios.put('/todos.json', todos).then(() => {
      this.setState(prevState => ({
        value: '',
        todos
      }))
    })
  }

  toggleTodo = id => {
    const todos = this.state.todos.map(
      todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    )
    axios.put(`/todos.json`, todos).then(() => this.setState({ todos }))
  }

  deleteTodo = id => {
    axios.delete(`/todos/${id}.json`).then(() =>
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo.id !== id)
      }))
    )
  }

  onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const todos = reorder(
      this.state.todos,
      result.source.index,
      result.destination.index
    )
    axios.put('/todos.json', todos).then(() => this.setState({ todos }))
  }

  componentDidMount () {
    axios.get('/todos.json').then(response => {
      console.log(response)
      this.setState(prevState => ({
        todos: [...prevState.todos, ...response]
      }))
    })
  }

  render () {
    return (
      <Card className={classes.TodoCard}>
        <TodoInput
          value={this.state.value}
          changed={this.inputChangeHandler}
          keyPressed={this.keyPressed}
        />
        <TodoList
          todos={this.state.todos}
          toggleTodo={this.toggleTodo}
          deleteTodo={this.deleteTodo}
          onDragEnd={this.onDragEnd}
        />
      </Card>
    )
  }
}

export default TodoCard
