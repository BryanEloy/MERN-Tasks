import React, {useReducer} from 'react';

import ProjectContext from "./ProjectContext";
import ProjectReducer from "./ProjectReducer";

import { 
    PROJECTS_GET,
    PROJECT_FORM, 
    PROJECT_ADD, 
    VALIDATE_FORM, 
    SELECT_PROJECT, 
    DELETE_PROJECT, 
    PROJECT_ERROR } from '../../types';

import clienteAxios from '../../config/axios';

const ProjectState= props =>{

    const initialState={
        projects: [],
        form: false,
        error: false,
        actual_project: null,
        mesage: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch]= useReducer(ProjectReducer, initialState);

    //Mostrar el formulario
    const showForm= ()=>{
        dispatch({
            type: PROJECT_FORM
        })
    }

    //Obtener Proyectos
    const getProjects= async ()=>{
        
        try {
            const res= await clienteAxios.get('/api/projects');
            
            dispatch({
                type: PROJECTS_GET,
                payload: res.data.projects
            });

        } catch (error) {
            const alert= {
                msg: 'Algo salio mal',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    }

    //Agregar proyectos
    const addProject= async project=>{

        try {
            const res= await clienteAxios.post('/api/projects', project);
            //Agregar el proyecto en el state
            dispatch({
                type: PROJECT_ADD,
                payload: res.data.project
            });

        } catch (error) {
            const alert= {
                msg: 'Algo salio mal',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    }

    //Validar errores en el formulario
    const showError= ()=>{
        dispatch({
            type: VALIDATE_FORM
        })
    }

    //Seleccionar un proyecto
    const selectProject= projectId=>{
        dispatch({
            type: SELECT_PROJECT,
            payload: projectId
        })
    }

    //Eliminar un proyecto
    const deleteProject= async projectId=>{

        try {
            await clienteAxios.delete(`/api/projects/${projectId}`);
            dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        });

        } catch (error) {
            const alert= {
                msg: 'Algo salio mal',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }        
    }

    return(
        <ProjectContext.Provider value={{
            projects: state.projects, 
            form: state.form,
            error: state.error,
            mesage: state.mesage,
            actual_project: state.actual_project,
            showForm,
            showError,
            getProjects,
            addProject,
            selectProject,
            deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;

