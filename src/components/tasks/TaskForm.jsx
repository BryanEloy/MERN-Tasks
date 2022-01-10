import { useContext, useEffect, useState } from 'react'

import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const TaskForm = () => {

    //Extraer la informacion del state Project
    const projectContext= useContext(ProjectContext);
    const {actual_project}= projectContext;

    //Obtener la iformacion del state Task
    const taskContext= useContext(TaskContext);
    const {task_selected, addTask, error, showErrorTask, getTasks, editTask, clearTaskSelected}= taskContext;

    const [task, setTask]= useState({
        name:''
    });

    //En caso de que aya una tara seleccionada
    useEffect(()=>{
        if(task_selected){
            setTask(task_selected)
        }else{
            setTask({name:''})
        }

    }, [task_selected]);

    //Si no hay ningun proyecto seleccionado
    if(!actual_project) return null

    const [project]= actual_project;

    //Guardar la infoermacion ingresada en el state
    const handleChange= (e)=>{
        setTask( { ...task, [e.target.name]: e.target.value} );
    }
    
    //Agregar una nueva tarea al proyecto
    const handleSubmit= async (e)=>{
        e.preventDefault();
        //Validar  nombre
        if(task.name.trim()===''){
            showErrorTask();
            return
        } 

        //VERIFICAR SI ES EDICION O GUARDAR NUEVO
        if(!task_selected){
            //Guardamos la inormacion en el state
            task.project= project._id;
            await addTask(task);
             
        }else{
            editTask(task);
            clearTaskSelected()
        }

        //Reiniciamos el state
        setTask({name:''});  
        //Actualizamos las tareas del proyecto
        getTasks(project._id);
    }

    return ( 
        <div className="formulario">
            <form onSubmit={handleSubmit}>

                <div className="contenedor-input">
                    <input type="text" className="input-text" placeholder="Nombre tarea.." 
                        value={task.name} name="name" onChange={handleChange}/>
                </div>

                <div className="contenedor-input">
                    <input type="submit" value={task_selected ?'Guardar cambios' :'Agregar tarea'} className="btn btn-prmario btn-submit btn-block"/>
                </div>
            </form>
            {error
                ?<p className='mensaje error'>Nombre invalido</p>
                :null
            }
        </div>
     );
}
 
export default TaskForm;