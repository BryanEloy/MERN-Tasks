import React, { useReducer } from 'react';

import TaskReducer from './TaskReducer';
import TaskContext from './TaskContext';

import { 
    PROJECT_TASKS,
    ADD_TASK, 
    VALIDATE_TASK, 
    DELETE_TASK, 
    SELECT_TASK, 
    EDIT_TASK, 
    CLEAR_TASK_SELECTED } from '../../types';

import clienteAxios from '../../config/axios';

const TaskState= props=>{

    const initialState={
        task_selected: null,
        project_tasks: [],
        error: false
    }

    //Crear el dispatch y el state
    const [state, dispatch]= useReducer(TaskReducer, initialState);

    //Obtener tareas del proyecto
    const getTasks= async (project)=>{
        try {
            const res= await clienteAxios.get( '/api/tasks', {params: {project}} );
            dispatch({
                type: PROJECT_TASKS,
                payload: res.data.tasks
            });  

        } catch (error) {
            console.log(error);
        }
    }

    //Agregar nueva tarea al proyecto
    const addTask= async task=>{
        try {
            const res= await clienteAxios.post('/api/tasks', task);
            dispatch({
                type: ADD_TASK,
                payload: res.data
            });  

        } catch (error) {
            console.log(error);
        }        
    }

    //Validar nueva tarea
    const showErrorTask= ()=>{
        dispatch({
            type: VALIDATE_TASK
        })
    }

    //Eliminar tarea
    const deleteTask= async (id, project)=>{

        try {
            await clienteAxios.delete(`/api/tasks/${id}`, {params: {project}} )
            dispatch({
                type: DELETE_TASK,
                payload: id
            }); 
        } catch (error) {
            console.log(error);
        }
        
    }

    //selecionar una tarea
    const selectTask= (task)=>{
        dispatch({
            type: SELECT_TASK,
            payload: task
        })
    }

    //Editar una tarea
    const editTask= async task=>{
        try {
            const res= await clienteAxios.put(`/api/tasks/${task._id}`, task);
            dispatch({
                type: EDIT_TASK,
                payload: res.data.task
            });

        } catch (error) {
            console.log(error);
        }
        
    }

    //Borara la tarea slecionada del state
    const clearTaskSelected= ()=>{
        dispatch({
           type: CLEAR_TASK_SELECTED 
        }) 
    }

    return(
        <TaskContext.Provider 
            value={{
                project_tasks: state.project_tasks,
                error: state.error,
                task_selected: state.task_selected,
                getTasks,
                addTask,
                showErrorTask,
                deleteTask,
                selectTask,
                editTask,
                clearTaskSelected
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;