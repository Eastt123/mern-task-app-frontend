import React from 'react';
import {FaEdit, FaCheckDouble, FaRegTrashAlt} from "react-icons/fa"
const Task = ({name,completed ,setToComplete, deleteTask, index, id, getSingleTask }) => {
    return (
        <div className={completed ? "task completed" : "task"}>
        <p>
            <b>{index + 1}. </b>
            {name}
        </p>
        <div className="task-icons">
            <FaCheckDouble onClick={()=>{setToComplete(name,id)}} color='green' />
            <FaEdit onClick={()=>{getSingleTask(name, id)}} color='purple' />
            <FaRegTrashAlt onClick={()=>{deleteTask(id)}} color='red' />
        </div>
        </div>
    );
};

export default Task;