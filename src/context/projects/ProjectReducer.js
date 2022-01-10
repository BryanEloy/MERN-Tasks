import { 
    PROJECT_ADD, 
    PROJECT_FORM, 
    PROJECTS_GET, 
    VALIDATE_FORM, 
    SELECT_PROJECT, 
    DELETE_PROJECT,
    PROJECT_ERROR } from "../../types"

export default (state, action)=>{

    switch(action.type){

        //Setea el form a true para mostrarlo
        case PROJECT_FORM:
            return{
                ...state,
                form: true
            }
        //Carga la informacion de los proyectos guardados 
        case PROJECTS_GET:
            return{
                ...state,
                projects: action.payload
            }
        //Agregar un nuevo proyecto al arreglo de proyectos
        case PROJECT_ADD:
            return{
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                error: false
            }
        //Setear la infromacion del proyecto seleccionado en el state
        case SELECT_PROJECT:
            return{
                ...state,
                actual_project: state.projects.filter( project=> project._id=== action.payload)
            }
        //Eliminar un proyecto
        case DELETE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter( project=> project._id!== action.payload),
                actual_project: null
            }    
        //En caso de que la informacion ingresada sea incorrecta setea el error a true
        case VALIDATE_FORM:
        return{
            ...state,
            error: true
        }

        //Mensaje en caso de algun error
        case PROJECT_ERROR:
            return{
                ...state,
                mesage: action.payload
            }
            
        default:
            return state
    }
}