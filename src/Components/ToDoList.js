import React, { useState, useEffect, useRef } from 'react';
//import data from '../data.json'
// Imported Components
import Header from './Header'
import TodoForm from './ToDoForm';
import Todo from './ToDo';
import Axios from 'axios';


function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3333/api/get').then((response) => {
            //console.log(response.data);
            setTodos(response.data);
            response.data.map((todo) => {
                console.log(todo.date);
            })
        });;
    }, []);

    const todoRef = useRef()

    const submitTodos = (id, input, date) => {
        Axios.post('http://localhost:3333/api/insert', {
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
        Axios.put('http://localhost:3333/api/update', {
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
        Axios.delete(`http://localhost:3333/api/delete/${tbd}`);
    }
    const removeTodo = id => {
        const removedArr = [...todos].filter(todo => todo.id !== id);
        setTodos(removedArr); 
        deleteTodo(id);
    };

    const switchToDo = (id, complete) => {
        Axios.put('http://localhost:3333/api/complete', {
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