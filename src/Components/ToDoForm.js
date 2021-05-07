import React, { useState, useEffect, useRef } from 'react';
import { GrAdd } from 'react-icons/gr';
import { GrCheckmark } from 'react-icons/gr';
import Axios from 'axios';

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    //
    const inputRef = useRef(null);

    // allows targeting of the text input field
    useEffect(() => {
        inputRef.current.focus();
    });

    // allows the change of input state in the input field.
    const handleChange = e => {
        setInput(e.target.value);
    };

    // contructs a date and time as a string and returns it as const date.
    const newDate = () => {
        var d = new Date();
        // getMonth is indexed at 0
        const date =  d.getMonth() + 1 + "/"
                    + d.getDate() + "/"
                    + d.getFullYear() + " @"
                    + d.getHours() + ":" 
                    + d.getMinutes() + ":" 
                    + d.getSeconds()
        return date;
    }
    // submits submissions to sql server
    const submitTodos = (input, date) => {
        //Axios.post(address)
        Axios.post('http://localhost:3001/', {text: input, date: date, complete: false});
    };

    // generate todo items here
    // id: numerical identifier for every todo in state
    // text: the text for each todo
    // date: calls newDate() and generates the date and time for every todo
    //       (NOTE: also updates date upon handleChange.)
    const handleSubmit = e => {
        e.preventDefault();
        const local_id = Math.floor(Math.random() * 10000);
        const local_date = newDate();
        submitTodos(local_id, input, local_date);
        props.onSubmit({
        // will need to find a better way of swapping id when updating a todo
        id: local_id,
        text: input,
        date: local_date
        });
        //reset input to '' upon enter
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
        {props.edit ? (
            <>
            <button>Save</button>
            <input
                placeholder='Update your item'
                value={input}
                onChange={handleChange}
                name='text'
                ref={inputRef}
                className='todo-input edit'
            />
            <GrCheckmark 
                onClick={handleSubmit} 
                className='update-icon'>
            </GrCheckmark>
            
            </>
        ) : (
            <>
            <input
                placeholder='Add a todo'
                value={input}
                onChange={handleChange}
                name='text'
                className='todo-input'
                ref={inputRef}
            />
            < GrAdd 
                onClick={handleSubmit} 
                className='add-icon'>
            </GrAdd>
            </>
        )}
        </form>
    );
}

export default TodoForm;

