import React, { useState } from 'react';
import Axios from 'axios';
import data from '../data.json'
// Imported Components
import Header from './Header'
import TodoForm from './ToDoForm';
import Todo from './ToDo';


function TodoList() {
    const [todos, setTodos] = useState(data);

    // Function that takes a newToDo from ToDoForm and add pushes it onto the list
    // if text in ToDoForm is empty or only contains special characters return
    // otherwise create a newTodo and add the value to the beginning of list
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
        return;
        }

        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };

    // checks if an update contains text or is only special characters b
    // otherwise updates the todo text and updates the date upon edit
    // bug: does not delete the previous todo before edit but will add it to top of the todolist
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        //referance to original item
        // if id is matched, sets the updated todo as the previous todo, otherwise return previous item.
        setTodos(prev => prev.map(item => ((item.id === todoId) ? (newValue) : (item))));
        
        
        
    };

    // removes a todo from the todolist
    // filters all todo with matching perameter id
    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removedArr);
    };

    // If a todo is completed, change completed: false to true
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            todo.complete = !todo.complete;
        }
        return todo;
        });
        setTodos(updatedTodos);
    };


    /*
    const saveToDo = todos => {
        var fileName = 'data.json';
        //create a blob to save
        var fileToSave = new Blob([JSON.stringify(todos)], {
            type: 'application/json',
            name: fileName
        });

        //save(fileToSave, fileName);
    }*/
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
/*<button onClick={saveToDo} >Save</button>
onClick={submitTodos()}*/