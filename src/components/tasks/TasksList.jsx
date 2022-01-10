import { useContext } from 'react'
import { CSSTransition, TransitionGroup  } from 'react-transition-group';

import Task from "./Task";

import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const TasksList = () => {

    //Extraer la informacion del state
    const projectContext= useContext(ProjectContext);
    const {actual_project, deleteProject}= projectContext;

    //Obtener la iformacion del state Task
    const taskContext= useContext(TaskContext);
    const {project_tasks}= taskContext;

    //Si no hay ningun proyecto seleccionado
    if(!actual_project) return <h2>Selecciona un proyecto</h2>

    const [project]= actual_project;

    return ( 
        <>
            <h2>Proyecto: {project.name} </h2>

            <ul className="listado-tareas">
                {project_tasks.length===0
                    ?   ( <li className="tarea"> <p>No hay tareas agregadas a este proyecto</p> </li>)
                    :   <TransitionGroup>
                            {project_tasks.map((task, index) =>(
                                <CSSTransition key={index} timeout={500} classNames="tarea">
                                   <Task  task={task} /> 
                                </CSSTransition>                                
                            ))}
                        </TransitionGroup>
                }
            </ul>

            <button type="button" className="btn btn-eliminar" onClick={()=>deleteProject(project._id)}>
                Eliminar Proyecto &times;</button>
        </>
     );
}
 
export default TasksList;