import React from 'react';

const TaskForm = ({isEditing, updateTask,createTask, name, handleInputChange}) => {
    return (
        <form onSubmit={ isEditing === false ? createTask : updateTask} className='task-form' >  
        <input type="text" placeholder='Add a Task' name='name'
        value={name}
        onChange={handleInputChange}
        />
        {isEditing === false ? 
        <button type='submit'>Add</button> :
        <button type='submit'>Edit</button>
        }
        </form>
    );
};

export default TaskForm;