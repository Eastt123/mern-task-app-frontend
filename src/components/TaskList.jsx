import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Task from './Task';
import TaskForm from './TaskForm';
import { URL } from "../App";
import axios from "axios";
import loadingImage from "../assets/loader.gif"
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [isLoading, setIsLodaing] = useState(true);
    const [formData, setFormData] = useState({
        name:"",
        completed:false
    });
    const [isEditing, setIsEditing] = useState(false);
    const [taskId, setTaskId] = useState("");
    const {name} = formData;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    };

    const getTasks = async () => {
        setIsLodaing(true);
        try {
            const {data} = await axios.get("/api/tasks");
            setTasks(data);
            setIsLodaing(false);
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    const createTask = async (e) => {
        e.preventDefault();
        if(name === ""){
            return toast.error("Input Filed cant be empty")
        }
        try {
            await axios.post("/api/tasks", formData);
            setFormData({...formData, name:""});
            getTasks();
            toast.success("Task Added")
        } catch (error) {
            toast.error(error.message)
        }
    };
    const deleteTask = async (id) => {
try {
   await axios.delete(`/api/tasks/${id}`);
   setIsLodaing(true);
   getTasks();
   setIsLodaing(false);
} catch (error) {
    toast.error(error.message);
}
    };

    const getSingleTask = async (name, id) => {
        setFormData({name:name, completed:false});
        setTaskId(id);
        setIsEditing(true);
    }
    const updateTask = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/tasks/${taskId}`, formData);
            setFormData({...formData, name:""});
            getTasks();
            setIsEditing(false);
        } catch (error) {
            toast.error(error.message)
        }
    };

    const setToComplete = async (name, id) => {
        const newFormData = {
            name:name,
            completed:true
        };
        try {
           await axios.put(`/api/tasks/${id}`, newFormData);
            getTasks();
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getTasks();
    },[]);

    useEffect(()=>{
        const cTask = tasks.filter((item) => {
            return item.completed === true
        });
        setCompletedTasks(cTask);
    },[tasks])
    return (
        <div>
            <h2>Task Manager</h2>
            <TaskForm updateTask={updateTask} isEditing={isEditing} createTask={createTask} name={name} handleInputChange={handleInputChange} />
                {
                    tasks.length > 0 && (
            <div className='--flex-between iipb' >

                        <p>
                    <b>Total Tasks:</b> {tasks.length} 
                </p>
                <p>
                    <b>Completed Tasks:</b> {completedTasks.length} 
                </p>
            </div>

                    )
                }
                
            <hr />
            {
                isLoading && (
                    <div className='--flex-center'>
                        <img src={loadingImage} alt="" />
                    </div>

                )
            }

            {
                !isLoading && tasks.length === 0 ? (
                    <p className='--py'>No Tasks</p>
                ) :(
                    tasks.map((task, index) => {
                        return(
                            <Task 
                            setToComplete={setToComplete}
                            deleteTask={deleteTask} 
                            getSingleTask={getSingleTask}
                            index={index} 
                            key={task._id} 
                            name={task.name} 
                            completed={task.completed}
                            id={task._id}
                            />
                        )
                    })

                )
            }

           
        </div>
    );
};

export default TaskList;
