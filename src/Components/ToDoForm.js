import React, { useState, useEffect, useRef } from 'react';
import { GrAdd } from 'react-icons/gr';
import { GrCheckmark } from 'react-icons/gr';
import Axios from 'axios';

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    // Allows targeting of the text input field
    useEffect(() => {
        inputRef.current.focus();
    });

    // Allows the change of input state in the input field.
    const handleChange = e => {
        setInput(e.target.value); 
    };

    
    const assignDate = () => {
        // returns a Date object. I think SQL
        var d = new Date().toJSON().slice(0, 19).replace('T', ' ')
        return d;
    };

    // Submits submissions to sql server
    const submitTodos = (id, input, date) => {
        Axios.post('http://localhost:3333/api/insert', {
            id: id, 
            text: input, 
            date: date, 
            complete: false
        }).then(() => {
            alert('Post Successful');
        });
    };
        
    // Generate todo items here
    // id: numerical identifier for every todo in state
    // text: the text for each todo
    // date: calls newDate() and generates the date and time for every todo
    // will change classname when complete is true
    // (NOTE: also updates date upon handleChange.)
    const handleSubmit = e => {
        e.preventDefault();
        const local_id = Math.floor(Math.random() * 10000);
        const local_date = assignDate();
        props.onSubmit({
        // will need to find a better way of swapping id when updating a todo
        id: local_id,
        text: input,
        date: local_date,
        complete: false
        });

        submitTodos(local_id, input, local_date, 0)
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