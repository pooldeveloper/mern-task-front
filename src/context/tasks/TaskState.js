import React,{ useReducer } from 'react';
import TaskContext from './TaskContext'
import TaskReducer from './TaskReducer'
import clientAxios from '../../config/clientAxios';

import {
    TASKS_PROJECT,
    ADDING_TASK,
    VALIDATE_TASK,
    DELATE_TASK,
    SELECT_TASK,
    UPDATE_TASK
}from '../../types';

const TaskState = props => {
    
    const initialState = {
        activeTasks: null,
        showError: false,
        selectTaskEdit: null
    }

    //Dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(TaskReducer,initialState); 

    const getTasks = async id =>{
        try{
            const result = await clientAxios.get(`/api/tasks/${id}`)
            dispatch({
                type: TASKS_PROJECT,
                payload: result.data
            })
        }catch(error){
            console.log(error)
        }
    }

    const addingTask = async task =>{
        try{
            const result = await clientAxios.post('/api/tasks', task)
            dispatch({
                type: ADDING_TASK,
                payload: result.data
            })
        }catch(error){
            console.log(error)
        }
    }

    const validateTask = () =>{
        dispatch({
            type: VALIDATE_TASK,
            payload: true
        })
        setTimeout(() => {
            dispatch({
            type: VALIDATE_TASK,
            payload: false
        })
        }, 5000);
    }

    const delateTask = async (id, project) =>{
        try{
            await clientAxios.delete(`/api/tasks/${id}`, {params: {project}})
            dispatch({
                type: DELATE_TASK,
                payload: id
            })
        }catch(error){
            console.log(error)
        }
    }

    const selectTask = task =>{
        dispatch({
            type: SELECT_TASK,
            payload: task
        })
    }

    const updateTask = async task =>{
        try{
            const result = await clientAxios.put(`/api/tasks/${task._id}`, task)
            dispatch({
                type: UPDATE_TASK,
                payload: result.data
            })    
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                activeTasks: state.activeTasks,
                showError: state.showError,
                selectTaskEdit: state.selectTaskEdit,
                getTasks,
                addingTask,
                validateTask,
                delateTask,
                selectTask,
                updateTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}
 
export default TaskState;