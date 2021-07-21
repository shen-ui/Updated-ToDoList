import React, { useState, useEffect } from 'react';
import data from '../data.json'
// Imported Components
import Header from './Header'
import TodoForm from './ToDoForm';
import Todo from './ToDo';
import Axios from 'axios';


function TodoList() {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        Axios.get(
            'https://www.shenslist.xyz/api/get'
        )
        .then(res => {setTodos(res.data);})
        setTodos(data);
    }, []);

    const submitTodos = (id, input, date) => {
        Axios.post(
            'https://www.shenslist.xyz/api/insert', {
            id: id, 
            text: input, 
            date: date,
            complete: false
        }).then(() => {
            console.log('Post Successful');
        });
    };
    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
        return;
        }
        // add new todo to front of list of todos.
        submitTodos(todo.id, todo.text, todo.date);
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };

    const changeTodo = (todoId, edittedTodo) => {
        Axios.put(
            "https://www.shenslist.xyz/api/update", {
            id: todoId,
            text: edittedTodo.text, 
            date: edittedTodo.date,
        }).then(() => {
            console.log('Post Successful');
        })
    };
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        changeTodo(todoId, newValue)
        newValue.id = todoId;
        setTodos(prev => prev.map(item => ((item.id === todoId) 
                                        ?  (newValue) 
                                        :  (item)
                                        )));
    };

    const deleteTodo = tbd => {
        console.log(tbd)
        Axios.delete(`https://www.shenslist.xyz/api/delete/${tbd}`);
    }
    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removedArr); 
        deleteTodo(id);
    };

    const switchToDo = (id, complete) => {
        Axios.put('https://www.shenslist.xyz/api/complete', {
            id: id, 
            complete: complete
        }).then(() => {
            console.log('Complete Change Successful');
        });
    }
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            todo.complete = !todo.complete;
            switchToDo(id, todo.complete);
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