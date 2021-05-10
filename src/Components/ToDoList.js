import React, { useState } from 'react';
import data from '../data.json'
// Imported Components
import Header from './Header'
import TodoForm from './ToDoForm';
import Todo from './ToDo';


function TodoList() {
    const [todos, setTodos] = useState(data);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
        return;
        }
        // add new todo to front of list of todos.
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        // if id is matched, sets the updated todo as the previous todo, otherwise return previous item.
        setTodos(prev => prev.map(item => ((item.id === todoId) ? (newValue) : (item))));
    };

    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removedArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            // if (todo.complete == true){ todo.complete == false ... (and vice versa)};
            todo.complete = !todo.complete;
        }
        return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <>
        <Header/>
        <TodoForm onSubmit={addTodo} listLength={todos.length} />
        <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
        /> 
        </>
    );
}

export default TodoList;

/*
<button onClick={saveToDo} >Save</button>
onClick={submitTodos()}

    const saveToDo = todos => {
        var fileName = 'data.json';
        //create a blob to save
        var fileToSave = new Blob([JSON.stringify(todos)], {
            type: 'application/json',
            name: fileName
        });

        //save(fileToSave, fileName);
    }
*/