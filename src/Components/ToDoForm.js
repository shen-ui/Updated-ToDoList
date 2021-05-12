import React, { useState, useEffect, useRef } from 'react';
import { GrAdd } from 'react-icons/gr';
import { GrCheckmark } from 'react-icons/gr';

function TodoForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = e => {
        setInput(e.target.value);
    };
    
    const assignDate = () => {
        var d = new Date().toJSON().slice(0, 19)
        return d;
    };

    const handleSubmit = e => {
        e.preventDefault();
        // possible bug fix: increment the id with the size of the todo_list length.
        //                   then push to the beginning of the list.
        //                   map, sort, and reassign id.
        let local_id = props.listLength + 1;
        let local_date = assignDate();
        props.onSubmit({
            id: local_id,
            text: input,
            date: local_date,
            complete: false
        });
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className='todo-form'>
        {props.edit ? (
            <>
            {/** returns edit is not empty */}
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
            {/** returns if not edit */}
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