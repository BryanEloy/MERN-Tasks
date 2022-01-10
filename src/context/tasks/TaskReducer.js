import { 
    ADD_TASK, 
    DELETE_TASK, 
    SELECT_TASK, 
    PROJECT_TASKS, 
    VALIDATE_TASK, 
    EDIT_TASK, 
    CLEAR_TASK_SELECTED } from "../../types"


export default (state, action)=>{

    switch (action.type) {

        //Filtra las tareas en base al projectId para mostrar las tareas de un proyecto especifico
        case PROJECT_TASKS:
            return{
                ...state,
                project_tasks: action.payload
            }
        //Agrega una nueva tarea al proyecto
        case ADD_TASK:
            return{
                ...state,
                project_tasks: [...state.project_tasks, action.payload],
                error: false
            }
        //Validar tarea
        case VALIDATE_TASK:
            return{
                ...state,
                error: true
            }
        //Eliminar una tarea
        case DELETE_TASK:
            return{
                ...state,
                project_tasks: state.project_tasks.filter( task=> task._id!== action.payload)
            }
        //Editar una tarea
        case EDIT_TASK:
            return{
                ...state,
                project_tasks: state.project_tasks.map( task=> task._id === action.payload._id
                                                            ? action.payload
                                                            : task)
            }
        //seleccionar una tarea
        case SELECT_TASK:
            return{
                ...state,
                task_selected: action.payload
            }
        //seleccionar una tarea
        case CLEAR_TASK_SELECTED:
            return{
                ...state,
                task_selected: null
            }

        default:
            return state
    }
}