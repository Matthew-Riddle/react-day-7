import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import List from '@material-ui/core/List'

import TodoItem from '../TodoItem/TodoItem'

class TodoList extends Component {
  render () {
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              <List>
                {this.props.todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <TodoItem
                          draggable={provided.dragHandleProps}
                          content={todo.content}
                          completed={todo.completed}
                          toggleTodo={() => this.props.toggleTodo(todo.id)}
                          deleteTodo={() => this.props.deleteTodo(todo.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </List>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default TodoList
