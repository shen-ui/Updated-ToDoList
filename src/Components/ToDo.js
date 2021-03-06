import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

// Imported Components
import TodoForm from './ToDoForm';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: '',
    text: '',
    date: ''
  });
  
  const submitUpdate = input => {
    // update edit state
    updateTodo(edit.id, input);
    // after update reset state to empty
    setEdit({
      id: '',
      text: '',
      date: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />
  }

  return todos.map((todo, index) => (
    <div
      // styling for when a todo is complete
      className={todo.complete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
        <div className="todo-text" key={todo.id} onClick={() => completeTodo(todo.id)}>
            {todo.text}
            <p className="todo-date">
              {todo.date.slice(5,7) + "/" + todo.date.slice(8,10) + "/" + todo.date.slice(0,4)+ 
              " - " + todo.date.slice(11,13) + ":" + todo.date.slice(14,16) + ":" + todo.date.slice(17,19) }
            </p>
        </div>

        <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, text: todo.text })}
          className='edit-icon'
        />
        </div>
    </div>
  ));
};

export default Todo;